import { Component, Input, OnInit, effect, input } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { MaintainanceService } from "../../../services/maintainance.service";

@Component({
    selector: "maintainance-pie-chart",
    template: `
    <canvas baseChart *ngIf="allMaintainance.length" class="chart" [data]="pieChartData" [type]="pieChartType" [options]="pieChartOptions"
      [plugins]="pieChartPlugins">
    </canvas>
    `
})
export class MaintainancePieChart implements OnInit {

    // Depricated: Used signal to update
    // _filter: any = {};
    // @Input() set filter(value: any) {
    //     this._filter = value;
    //     this.updateChartData();
    // }

    filter = input.required<any>();

    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                formatter: (value: any, ctx: any) => {
                    return "Rs"+ value + "/-";
                    // if (ctx.chart.data.labels) {
                    //   return ctx.chart.data.labels[ctx.dataIndex];
                    // }
                },
            },
        },
    };
    
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: ['Maintenance Amount', 'Penalty Amount'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ["#59E659", "#FF4040"]
            },
        ]
    };

    public pieChartType: ChartType = 'pie';
    public pieChartPlugins = [DatalabelsPlugin];

    allMaintainance = [];

    constructor(private maintainanceService: MaintainanceService) {
        effect(() => {
            this.updateChartData();
        });
    }

    ngOnInit() {
        this.maintainanceService.fetchAllMaintenance()
            .subscribe((event) => {
                if (event.type == "fetchAll") {
                    this.allMaintainance = event.payload;
                    this.updateChartData();
                }
            });
    }

    updateChartData() {
        let { start, end } = this.filter();
        
        if (!start || !end) return;

        start = new Date(start).getTime();
        end = new Date(end).getTime();

        const tempData = this.allMaintainance
            .filter((obj: any) => {
                const maintainanceDate = new Date(obj.date).getTime();
                return maintainanceDate >= start && maintainanceDate <= end;
            });

        let totalMaintainance = 0;
        let totalPenalty = 0;

        tempData.forEach((obj: any) => {
            totalMaintainance += obj.maintainanceAmt ? Number(obj.maintainanceAmt) : 0;
            totalPenalty += (obj.penaltyAmt && obj.maintainanceAmt > 0) ? Number(obj.penaltyAmt) : 0;
        });

        let newPieChartData = Object.assign({}, this.pieChartData);
        newPieChartData.datasets[0].data = [totalMaintainance, totalPenalty];
        this.pieChartData = newPieChartData;
    }
}
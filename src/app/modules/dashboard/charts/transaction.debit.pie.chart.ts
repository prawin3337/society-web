import { Component, Input, OnInit, effect, input } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { groupBy, sumBy, upperCase } from "lodash";

import { TransactionsService } from "src/app/services/transactions.service";

@Component({
    selector: "transaction-type-pie-chart",
    template: `
    <canvas baseChart *ngIf="allTransactions.length" class="chart" [data]="pieChartData" [type]="pieChartType" [options]="pieChartOptions"
      [plugins]="pieChartPlugins">
    </canvas>
    `
})
export class TransactionDebitPieChart implements OnInit {

    // _filter: any = {};
    // @Input() set filter(value: any) {
    //     this._filter = value;
    //     this.processChartData();
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
                    return value + "%";
                    // if (ctx.chart.data.labels) {
                    //   return ctx.chart.data.labels[ctx.dataIndex];
                    // }
                },
            },
        },
    };
    
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
                // backgroundColor: ["#59E659", "#FF4040"]
            },
        ]
    };

    public pieChartType: ChartType = 'pie';
    public pieChartPlugins = [DatalabelsPlugin];

    allTransactions = [];

    constructor(private transactionsService: TransactionsService) {
        effect(() => {
            this.processChartData();
        });
    }

    ngOnInit() {
        this.transactionsService.transactions
            .subscribe((event) => {
                if (event.type == "fetchAll") {
                    this.allTransactions = event.payload
                        .map((obj:any) => {
                            obj.debitAmount = Number(obj.debitAmount)
                            return obj;
                        });
                    this.processChartData();
                    
                }
            });
    }

    processChartData(): void {
        let { start, end } = this.filter();

        if (!start || !end) return;

        start = new Date(start).getTime();
        end = new Date(end).getTime();

        const newData = this.allTransactions
            .filter((obj: any) => {
                const transactionDate = new Date(obj.transactionDate).getTime();
                return transactionDate >= start && transactionDate <= end;
            })
            .filter((obj: any) => obj.debitAmount && Number(obj.debitAmount) > 0);
        
            
        this.updateChartData(newData);
    }

    updateChartData(newData: any[]) {
        const totalDebitCnt = sumBy(newData, "debitAmount");
        const dataGroup = groupBy(newData, "transactionType");

        const labels:any[] = []; ;
        const dataArr:any[] = [];

        Object.keys(dataGroup).forEach((key) => {
            const groupTotal = sumBy(dataGroup[key], "debitAmount");
            const perVal = Math.round(groupTotal / totalDebitCnt * 100);
            if (perVal) {
                const lebel = upperCase(key.replace(/([A-Z])/g, " $1"));
                labels.push(lebel);
                dataArr.push(perVal);
            }
        });

        let newPieChartData = Object.assign({}, this.pieChartData);
        newPieChartData.labels = labels;
        newPieChartData.datasets[0].data = dataArr;
        this.pieChartData = newPieChartData;
    }
}
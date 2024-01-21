import { Component, ViewChild } from '@angular/core';
import { TransactionsService } from "../../services/transactions.service";
import { groupBy, orderBy } from "lodash"

import { months } from "../../util";

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {

  allTransactions:any[] = [];

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(new Date(new Date().setMonth(new Date().getMonth()-11))),
    end: new FormControl<Date | null>(new Date()),
  });

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Credit Amount', backgroundColor: "#59E659" },
      { data: [], label: 'Debit Amount', backgroundColor: "#FF4040" },
    ],
  }

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions()
      .subscribe((event: any) => {
        if (event.type == "fetchAll") {
          this.allTransactions = event.payload.filter((obj:any) => obj.isApproved === "y");
          this.updateChartData();
        }
      });

    this.dateRange.valueChanges
      .subscribe(() => {
        this.updateChartData();
      });
  }

  private getFilterVal() {
    const obj = this.dateRange.value;
    let startDate:number = new Date().getTime();
    let endDate: number = new Date().getTime();

    if (obj.start && obj.end) {
      startDate = new Date(obj.start).getTime();
      endDate = new Date(obj.end).getTime();
    }

    return ({ startDate, endDate });
  }

  updateChartData(transactions = this.allTransactions) {
    let newChartData = Object.assign({}, this.barChartData);

    const { startDate, endDate } = this.getFilterVal();

    const tempTrans = this.allTransactions
      .filter((tran) => {
        const transactionDate = new Date(tran.transactionDate).getTime();
        return transactionDate >= startDate && transactionDate <= endDate;
      });

    const tranGroupByMon = this.tranGroupByMon(tempTrans);

    const labels = this.getLabels(tranGroupByMon);
    newChartData.labels = labels;

    const { creditAmtArr, debitAmtArr } = this.getCreditDebitRec(labels, tranGroupByMon);
    newChartData.datasets[0].data = creditAmtArr;
    newChartData.datasets[1].data = debitAmtArr;

    this.barChartData = newChartData;
  }

  private getCreditDebitRec(keys: string[], obj: any) {
    let creditAmtArr:any[] = [];
    let debitAmtArr:any[] = [];

    keys.forEach((key) => {
      let crSum = obj[key].reduce((acc: number, cur: any) => acc + Number(cur.creditAmount | 0), 0);
      creditAmtArr.push(crSum);

      let dbSum = obj[key].reduce((acc: number, cur: any) => acc + Number(cur.debitAmount | 0), 0);
      debitAmtArr.push(dbSum);
    });
    return { creditAmtArr, debitAmtArr };
  }

  private getLabels(data: any) {
    return orderBy(Object.keys(data), (key) => new Date(key))
  }

  private tranGroupByMon(data: any[]) {
    return groupBy(data, (obj) => {
      const tDate = new Date(obj.transactionDate);
      return months[tDate.getMonth()]+"-"+tDate.getFullYear();
    })
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

}

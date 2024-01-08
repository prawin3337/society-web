import { Component, Input, OnInit } from '@angular/core';
import { MaintainanceService } from "../../../services/maintainance.service";
import { ColDef } from 'ag-grid-community';
import { formatDate, handleNullColumn } from 'src/app/util';

@Component({
  selector: 'app-show-maintainance',
  templateUrl: './show-maintainance.component.html',
  styleUrls: ['./show-maintainance.component.scss'],
})
export class ShowMaintainanceComponent  implements OnInit {

  _filter: any;
  @Input() set filter(value: any) {
    const { flatNo, financYear } = value;
    this._filter = value;
    this.maintainanceService.fetchMaintenance(flatNo, financYear);
  }

  maintainance = [];
  tableCol: ColDef[] = [];
  defaultColDef = {
    resizable: false
  }
  rowClassRules = {
    // apply red to 2000
    'penalty': (params: any) => { return params.data.penaltyAmt > 0 }
  };

  constructor(private maintainanceService: MaintainanceService) {
    this.tableCol = [
      {
        field: "date",
        headerName: "Date",
        width: 100,
        cellRenderer: (params: any) => {
          // put the value in bold
          return formatDate(params.value)
        }
      },
      {
        field: "maintainanceAmt",
        headerName: "Maintainance Amount",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      },
      {
        field: "penaltyAmt",
        headerName: "Penalty Amount",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      },
      {
        field: "penaltyFromTo",
        width: 400,
        headerName: "Penalty from to",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      },
      {
        field: "penaltyMonCnt",
        headerName: "Penalty month count",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      }
    ]
  }

  ngOnInit() {
    this.maintainanceService.maintenance
      .subscribe((data) => {
        this.maintainance = data.payload;
        console.log(this.maintainance);
      });
  }

}

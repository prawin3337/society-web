import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintainanceService {

  maintenance: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  fetchMaintenance(flatNo: string, financYear: string) {
    const finYear = financYear.split("-");
    const fromDate = `${finYear[0]}-04-1 00:00:00`;
    const toDate = `${finYear[1]}-03-28 23:59:00`;
    const params = {
      flatNo,
      financYear: JSON.stringify({ fromDate, toDate })
    }
    return this.http.get(environment.apis.maintenanceAll, { params })
      .subscribe((res: any) => {
        if (res.success) {
          this.maintenance.next({
            type: "fetch",
            payload: res.data
          });
        }
      });
  }

  fetchAllMaintenance() {
    this.http.get(environment.apis.maintenanceAll)
      .subscribe((res: any) => {
        if (res.success) {
          this.maintenance.next({
            type: "fetchAll",
            payload: res.data
          });
        }
      });
    return this.maintenance;
  }
}

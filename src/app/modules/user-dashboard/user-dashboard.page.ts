import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'user.dashboard.page.html',
  styleUrls: ['user.dashboard.page.scss']
})
export class UserDashboardPage {

  // onFilterChange: EventEmitter<{ financYear: string, flatNo: string }> = new EventEmitter();
  filter: { financYear: string, flatNo: string } = {} as { financYear: string, flatNo: string };

  panelOpenState = false;
  userInfo: any = {};
  members: any[] = [];
  filterForm: FormGroup = new FormGroup({
    flatNo: new FormControl(''),
    financYear: new FormControl('')
  });

  maintainaceDetails = {
    totalMaintainance: 0,
    totalPenalty: 0
  };

  transactionDet = {
    totalAmt: 0,
    approvedAmt: 0
  }

  transactionType = "Credit";

  selectedTransaction:any = null;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.userInfo = this.memberService.getUserInfo();

    this.memberService.getMemberIds()
      .subscribe((res: any) => {
        if (res.success) {
          this.members = res.data;
        }
      });

    this.filterForm.setValue({
      flatNo: this.userInfo.flatNo,
      financYear: "2024-2025"
    })

    this.filter = this.filterForm.value;

    this.filterForm.valueChanges
      .subscribe(() => {
        this.filter = this.filterForm.value;
        // this.onFilterChange.emit(this.filterForm.value);
      });
  }

  onMaintainaceDetails(event: any) {
    this.maintainaceDetails = event;
  }

  onTransactionDet(event: any) {
    if(this.filter.flatNo === "0") {
      this.transactionType = "Debit";
      this.transactionDet = event.payload.debit;
    } else {
      this.transactionType = "Credit";
      this.transactionDet = event.payload.credit;
    }
  }

  onTransactionSelect(event: any) {
    this.selectedTransaction = event;
    if(this.selectedTransaction) {
      this.panelOpenState = true;
    }
  }

}

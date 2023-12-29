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
      financYear: "2023-2024"
    })

    this.filter = this.filterForm.value;

    this.filterForm.valueChanges
      .subscribe(() => {
        this.filter = this.filterForm.value;
        // this.onFilterChange.emit(this.filterForm.value);
      });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  _dashboarName: string = "";
  @Input() set dashboarName(event: string) {
    this._dashboarName = event;
  }

  userInfo: any = {};

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.userInfo = this.memberService.getUserInfo();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule]
})
export class ReportsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

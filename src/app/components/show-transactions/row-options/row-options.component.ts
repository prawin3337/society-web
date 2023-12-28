import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-row-options',
  templateUrl: './row-options.component.html',
  styleUrls: ['./row-options.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class RowOptionsComponent  implements OnInit {

  @Input() parentRef: any;
  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}

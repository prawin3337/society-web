import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }

}

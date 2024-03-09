import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPage {

  taps = [{
    tap: "user-dashboard",
    label: "User Dashboard",
    url: "/society/user-dashboard",
    icon: "podium"
  }, {
    tap: "dashboard",
    label: "Society Dashboard",
    url: "/society/dashboard",
    icon: "analytics"
  }, {
    tap: "reports",
    label: "Reports",
    url: "/society/reports",
    icon: "document"
  }, {
    tap: "settings",
    label: "Settings",
    url: "/society/settings",
    icon: "settings"
  }]

  constructor() { }

}

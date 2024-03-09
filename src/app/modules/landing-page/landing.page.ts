import { Component } from '@angular/core';

interface Itab {
  tapId: string,
  label: string,
  url: string,
  icon: string,
  selected?: boolean
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPage {
  dashboarName: string;
  taps: Itab[] = [{
    tapId: "user-dashboard",
    label: "User Dashboard",
    url: "/society/user-dashboard",
    icon: "podium"
  }, {
    tapId: "dashboard",
    label: "Society Dashboard",
    url: "/society/dashboard",
    icon: "analytics"
  }, {
    tapId: "reports",
    label: "Reports",
    url: "/society/reports",
    icon: "document"
  }, {
    tapId: "settings",
    label: "Settings",
    url: "/society/settings",
    icon: "settings"
  }]

  constructor() {
    this.dashboarName = this.taps[0].label;
  }

  onTabSelect(tapObj: any) {
    const selected = this.taps.find(({ tapId }) => tapId == tapObj.tab) || this.taps[0];
    this.dashboarName = selected.label;
  }

}

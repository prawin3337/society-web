import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { ILogin } from "../../../models";
import { LoginService } from 'src/app/services/login.service';

import { GetLogin } from "../../../store/login.action";
import { LoginSate } from "../../../store/login.state";
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  hide = true;
  loginData = {}

  @Select(LoginSate.selectStateData) loginData$: Observable<ILogin> | undefined;

  constructor(private store: Store, private storageService: StorageService) { }

  ngOnInit() {
    this.loginData$?.subscribe((res: any) => {
      if (res.tokan) {
        console.log(res.tokan);
        this.storageService.set("authToken", res.tokan);

        setTimeout(async () => {
          const authToken = await this.storageService.get('authToken');
          console.log("authToken= ", authToken);
        }, 10);
      }
    })
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new GetLogin(form.value));
  }

}

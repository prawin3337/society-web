import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { ILogin } from "../../../models";
import { LoginService } from 'src/app/services/login.service';

import { GetLogin } from "../../../store/login.action";
import { LoginSate } from "../../../store/login.state";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  hide = true;
  loginData = {}

  @Select(LoginSate.selectStateData) loginData$: Observable<ILogin> | undefined;

  constructor(private store: Store) { }

  ngOnInit() {
    this.loginData$?.subscribe((returnData) => {
      this.loginData = returnData;
      console.log(this.loginData);
    })
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new GetLogin(form.value));
  }

}

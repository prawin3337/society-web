import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { ILogin } from "../../../models";

import { GetLogin } from "../../../store/login.action";
import { LoginSate } from "../../../store/login.state";
import { Observable, catchError, debounce, map, of, startWith, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService, TokenEnum } from 'src/app/services/token.service';
import { MemberService } from 'src/app/services/member.service';
import { updateItem } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  hidePassword = true;
  hideConfirmPassword = true;

  loginData = {};

  @Select(LoginSate.selectStateData) loginData$: Observable<ILogin> | undefined;
  options: string[] = [];
  flatNoList: any[] = [];
  isRegisteredMember = true;
  filteredOptions: Observable<string[]> = {} as Observable<string[]>;

  flatNoControl = new FormControl('', {
    validators: [
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        const isValid = this.options.some((flatNo) => flatNo == control.value);
        return isValid ? null : { invalidFlat: "Entered Invalid flat number." }
      }
    ], updateOn: 'change'
  });

  panControl = new FormControl('', {
    validators: [
      Validators.required,
      (control: FormControl): ValidationErrors | null => {
        const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return !regex.test(control.value) ? {invalidPan: "Please enter valid pan number."} : null;
      }
    ],
    asyncValidators: [
      (control: AbstractControl): Observable<ValidationErrors | null> => {
        const panNo = (control.value).toUpperCase();
        const flatNo = this.flatNoControl.value;

        return this.http.post(environment.apis.validatePan, { panNo, flatNo })
          .pipe(
            map((res: any) => !res.data.isValidPan ? { isValidPan: "Please enter valid pan number." } : null),
            catchError(() => of(null))
          );
      }
    ],
    updateOn: 'change'
  });

  passwordControl = new FormControl('', {
    validators: [
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        const isValid = true;
        return isValid ? null : { invalidPassword: "Please enter valid password." }
      }
    ], updateOn: 'change'
  });

  confirmPasswordControl = new FormControl('', {
    validators: [
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        const isValid = true;
        return isValid ? null : { invalidPassword: "Please enter valid password." }
      },
      (control: AbstractControl): ValidationErrors | null => {
        const isValid = control.value == this.passwordControl.value;
        return isValid ? null : {invalidConfirmPass: "Password and confirm password does not match."}
      }
    ], updateOn: 'change'
  });

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private memberService: MemberService,
    private http: HttpClient) {}

  private get password() {
    return this.passwordControl.value;
  }

  private get confirmPassword() {
    return this.confirmPasswordControl.value;
  }

  private get panNo() {
    return this.panControl.value;
  }

  private get flatNo() {
    return this.flatNoControl.value;
  }

  async ngOnInit() {
    this.authService.verifyAuthToken()
      .then((isValid: boolean) => {
        isValid && this.router.navigateByUrl('society');
      });

    this.loginData$?.subscribe(async (res: any) => {
      if (res && res.tokan) {
        this.tokenService.addToken(TokenEnum.AuthToke, res.tokan);
        this.router.navigateByUrl('society');
      }
    });

    this.memberService.getMemberIds()
      .subscribe((res: any) => {
        if(res.success) {
          this.flatNoList = res.data;
          this.options = res.data.map((obj: any) => obj.flatNo);
        }
      });

    this.filteredOptions = this.flatNoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  onFlatNoSelect() {
    this.isRegistered();
  }

  private isRegistered() {
    this.isRegisteredMember = this.flatNoControl.valid;
    if (this.flatNoControl.valid) {
      this.isRegisteredMember = this.flatNoList
        .find((obj) => obj.flatNo == this.flatNoControl.value)
        ?.isRegistered;
    }
  }

  isValidPan() {
    return (this.panControl.dirty && this.panControl.valid);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSetPassword() {
    const password = this.password;
    const confirmPassword = this.confirmPassword;
    const panNo = this.panNo;
    const flatNo = this.flatNo;

    if(panNo && flatNo && password && password === confirmPassword) {
      this.http.patch(environment.apis.updatePassword, { flatNo, panNo, password })
        .subscribe((res: any) => {
          if (res.success) {
            window.location.reload();
          }
        });
    }
  }

  login() {
    const flatNo = this.flatNoControl.value;
    const password = this.passwordControl.value;
    if (flatNo && password) {
      const params: ILogin = { flatNo, password };
      this.store.dispatch(new GetLogin(params));
    }
  }
}

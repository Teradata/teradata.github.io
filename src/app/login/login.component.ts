/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core/loading';

import { LoginService, IUser, JWTDataService, ErrorService } from '../../services';

@Component({
  selector: 'td-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ],
})
export class LoginComponent {

  // Current date
  year: any = new Date().getFullYear();

  username: string;
  password: string;
  invalidError: boolean = false;

  get activeTheme(): string {
    return localStorage.getItem('theme');
  }

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private _errorService: ErrorService,
              private _jwtDataService: JWTDataService,
              private _loginService: LoginService) {
  }

  async login(): Promise<void> {
    try {
      this.invalidError = false;
      this._loadingService.register();
      await this._loginService.login({username: this.username, password: this.password}).toPromise();
      this._navigate();
    } catch (error) {
      if (error.httpStatus === 504) {
        this._errorService.open(error);
      } else {
        this.invalidError = true;
      }
    } finally {
      this._loadingService.resolve();
    }
  }

  private _navigate(): void {
    if (this._jwtDataService.redirect) {
      this._router.navigateByUrl(this._jwtDataService.redirect);
    } else {
      this._router.navigate(['/']);
    }
    this._jwtDataService.clearRedirect();
  }
}

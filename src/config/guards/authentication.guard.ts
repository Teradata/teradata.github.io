/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTDataService } from '../../services/';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private _router: Router, private _jwtDataService: JWTDataService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    let tokenExpired: boolean = this._jwtDataService.isTokenExpired();
    if (tokenExpired) {
      this._jwtDataService.redirect = state.url;
      this._jwtDataService.clear();
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTDataService } from '../../../services/';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private _router: Router, private _jwtDataService: JWTDataService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    let tokenExpired: boolean = this._jwtDataService.isTokenExpired();
    if (!tokenExpired) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}

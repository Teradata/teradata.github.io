/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { JWTDataService } from '../../services/';
import { IHttpInterceptor } from '@covalent/http';

/* 4XX errors */
const UNAUTHORIZED: number = 401;
const FORBIDDEN: number = 403;
const PAYLOAD_TOO_LARGE: number = 413;

/* 5XX errors */
const SERVICE_UNAVAILABLE: number = 503;
const GATEWAY_TIMEOUT: number = 504;

/* APP CENTER errors */
const STOP_JOB_BEFORE_DELETE: number = 1401;

@Injectable()
export class AuthenticationInterceptor implements IHttpInterceptor {

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _jwtDataService: JWTDataService,
              private _translate: TranslateService) {}

  onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    if (!this._jwtDataService.isTokenExpired()) {
      if (!requestOptions.headers) {
        requestOptions.headers = new Headers();
      }
      requestOptions.headers.set('Authorization', 'Bearer ' + this._jwtDataService.tokenId);
    } else {
      this._jwtDataService.redirect = this._router.url;
      this._router.navigateByUrl('/login');
      this._jwtDataService.clear();
      throw { message: this._translate.instant('SESSION_EXPIRED') };
    }
    return requestOptions;
  }

  onResponseError(error: Response): Response {
    let json: any;
    try {
      json = error.json();
    } catch (e) {
      json = undefined;
    }
    if (error.status === UNAUTHORIZED) {
      this._router.navigateByUrl('/login');
      this._jwtDataService.clear();
      return new Response(new ResponseOptions({
        body: '{"message": "' + this._translate.instant('SESSION_EXPIRED') + '"}',
      }));
    } else if (error.status === FORBIDDEN) {
      if (json && json.error !== STOP_JOB_BEFORE_DELETE) {
        this._router.navigate(['/']);
      }
    } else if (error.status === PAYLOAD_TOO_LARGE) {
      return new Response(new ResponseOptions({body: '{"message": "' + this._translate.instant('ENTITY_TOO_LARGE') + '"}'}));
    } else if (error.status === GATEWAY_TIMEOUT || error.status === SERVICE_UNAVAILABLE) {
      return new Response(new ResponseOptions({
        body: '{"message": "' + this._translate.instant('SERVICE_DOWN') + '"}',
      }));
    } else if (error.status === 0) {
      return new Response(new ResponseOptions({body: '{"message": ""}'}));
    }
    return error;
  }
}

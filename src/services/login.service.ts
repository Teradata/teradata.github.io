/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response, Headers, Http } from '@angular/http';

import { Observable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { RESTService } from '@covalent/http';

import { USERS_API } from '../config/api.config';
import { JWTDataService, IUser } from './jwt-data.service';

@Injectable()
export class LoginService extends RESTService<any> {

  constructor(private _http: Http, 
              private _jwtDataService: JWTDataService,
              private _translate: TranslateService) {
    super(_http, {
      baseHeaders: new Headers({'Accept': 'application/json'}),
      baseUrl: USERS_API,
      path: '/token',
    });
  }

  login(user: {username: string, password: string}): Observable<any> {
    let requestOptions: RequestOptionsArgs = this.buildRequestOptions();
    let request: Observable<Response> = this.http.post(this.buildUrl(), user, requestOptions);
    return request.pipe(
      map((res: Response) => {
        let data: IUser = res.json();
        let tokenId: string = res.headers.get('X-AUTH-TOKEN') || data.access_token;
        this._jwtDataService.store({data: data, tokenId: tokenId });
        return data;
      }),
      catchError((error: Response) => {
        return new Observable<any>((subscriber: Subscriber<any>) => {
          try {
            if (error.status === 504 || error.status === 0) {
              subscriber.error({httpStatus: 504, message: this._translate.instant('SERVICE_DOWN')});
            } else {
              subscriber.error(this.transform(error));
            }
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
    );
  }
}

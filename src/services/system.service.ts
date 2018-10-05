/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { RESTService, HttpInterceptorService, IRestQuery } from '@covalent/http';

import { Observable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SYSTEM_API } from '../config/api.config';

export interface ISystem {
  id?: string;
  nickname?: string;
  port?: number;
  system_type?: string;
  platform_id?: string;
  system_attributes?: {
    attributes: {
      database: string,
      log_mech: string,
      char_set: string,
      t_mode: string,
      username: string,
    },
  };
  version?: string;
}

@Injectable()
export class SystemService extends RESTService<ISystem> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseHeaders: new Headers({'Accept': 'application/json'}),
      baseUrl: SYSTEM_API,
      path: '/systems',
    });
  }

  public getSystems(query?: IRestQuery): Observable<ISystem[]> {
    let request: Observable<Response> = this.http.get(this.buildUrl() + this.buildQuery(query), this.buildRequestOptions());

    return request.pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError((error: Response) => {
        return new Observable<any>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
    );
  }

}

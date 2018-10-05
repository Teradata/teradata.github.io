/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';

import { RESTService, HttpInterceptorService, IRestQuery } from '@covalent/http';
import { map, catchError } from 'rxjs/operators';

import { APP_CENTER_API } from '../config/api.config';

export enum AppType {
  SQL = 'sql',
  BTEQ = 'bteq',
  JAVA = 'java',
  CUSTOM = 'custom',
}

export interface IApp {
  app_id?: string;
  app_type?: AppType;
  app_code?: string;
  collaborators?: IAppPermissions;
  color?: string;
  config?: any;
  cpus?: number;
  description?: string;
  dockerImageName?: string;
  icon?: string;
  install_time?: string;
  installed_by?: string;
  last_updated_by?: string;
  last_updated_time?: string;
  memory?: number;
  name?: string;
  owners?: IAppPermissions;
  public?: boolean;
  results_config?: any;
  versions?: any;
  last_version_status?: string;
  database?: string;
  system_name?: string;
  username?: string;
  password?: string;
  param_name?: string;
  ephemeral?: boolean;
  can_execute?: boolean;
  web_root?: string;
  access_url?: string;
  tag_names?: any[];
  exposedPorts?: any[];
  containerPort?: number;
}

export interface IAppPermissions {
  users?: string[];
  groups?: string[];
}

@Injectable()
export class AppsService extends RESTService<IApp> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseHeaders: new Headers({'Accept': 'application/json'}),
      baseUrl: APP_CENTER_API,
      path: '/apps',
    });
  }

  public uploadFile(appId: string, file: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    let request: Observable<Response> = this.http.post(this.buildUrl(appId) + '/container/',
                                                      formData,
                                                      this.buildRequestOptions());
    return request.pipe(
      map((res: Response) => {
        return true;
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

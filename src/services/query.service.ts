/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { QUERY_API } from '../config/api.config';
import { JWTDataService } from './jwt-data.service';
import { JWTDbCredentialsService } from './jwt-db-credentials.service';

/**
 * Query Service Docs
 * http://sdl03084.labs.teradata.com:31080/resources/index.html
 */

export interface IQueryPayload {
  query: string;
  rowOffset?: number;
  rowLimit?: number;
  format?: string; // (default)-object, array, or csv
  includeColumns?: boolean;
}

export interface IQueryResultSet {
  queueDuration: number;
  queryDuration: number;
  results: { 
    data: {[name: string]: string}[],
    resultSet: boolean,
    rowCount: number,
    rowLimitExceeded: boolean,
    columns?: {[name: string]: string}[],
  }[];
}

export interface IQueryInfo {
  system: string;
  database?: string;
  table?: string;
  query?: string;
}

@Injectable()
export class QueryService {

  constructor(private _httpClient: HttpClient,
              private _jwtDataService: JWTDataService,
              private _jwtDbCredentialsService: JWTDbCredentialsService) {}

  querySystem(systemName: string, payload: IQueryPayload): Observable<IQueryResultSet> {
    if (!this._jwtDbCredentialsService.get(systemName)) {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        subscriber.error({message: 'No connection was configured.'});
      });
    } else if (this._jwtDataService.isTokenExpired()) {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        subscriber.error({message: 'Token has expired'});
      });
    }
    let headers: HttpHeaders = new HttpHeaders({ 
                                                'X-AUTH-TOKEN': 'Bearer ' + this._jwtDataService.tokenId,
                                                'Authorization': 'Basic ' + this._jwtDbCredentialsService.get(systemName),
                                                'Accept': 'application/vnd.com.teradata.rest-v1.0+json',
                                                'Content-Type': 'application/json',
                                              });
    let request: Observable<Object> = this._httpClient.post(QUERY_API + '/tdrest/systems/' + systemName + '/queries', payload, { headers: headers });
    
    return request.pipe(
      map((resultSet: IQueryResultSet) => {
        return resultSet;
      }),
      catchError((error: Response) => {
        return new Observable<any>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(error);
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
    );
  }

}

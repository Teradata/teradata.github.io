/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';

export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  local?: boolean;
  admin?: boolean;
  appCenterAdmin?: boolean;
  groups?: string[];
  display_name?: string;
  access_token?: string;
  expires_at?: number;
}

export interface IJWTData {
 tokenId: string;
 data: IUser;
}

@Injectable()
export class JWTDataService {

  get tokenId(): string {
    return localStorage.getItem('token_id');
  }

  get data(): IUser {
    return JSON.parse(localStorage.getItem('data'));
  }

  set redirect(url: string) {
    localStorage.setItem('redirect', url);
  }
  get redirect(): string {
    return localStorage.getItem('redirect');
  }
  clearRedirect(): void {
    localStorage.removeItem('redirect');
  }

  isTokenExpired(): boolean {
    const token: string = localStorage.getItem('token_id');
    const expiredTime: Date = this.data ? new Date(this.data.expires_at) : undefined;
    return !token || (expiredTime ? (Date.now() > expiredTime.getTime()) : true);
  }

  store(jwtData: IJWTData): void {
    localStorage.setItem('data', JSON.stringify(jwtData.data));
    localStorage.setItem('token_id', jwtData.tokenId);
  }

  clear(): void {
    localStorage.removeItem('data');
    localStorage.removeItem('token_id');
  }

}

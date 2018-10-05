/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';

@Injectable()
export class JWTDbCredentialsService {

  store(nickname: string, jwtDbCredential: string): void {
    sessionStorage.setItem('db.' + nickname, jwtDbCredential);
  }

  get(nickname: string): string {
    return sessionStorage.getItem('db.' + nickname);
  }

  clear(nickname: string): void {
    for (let index: number = 0; index < sessionStorage.length; index++) {
      let key: string = 'db.' + nickname;
      if (sessionStorage.key(index) === key) {
        sessionStorage.removeItem(key);
      }
    }
  }

  clearAll(): void {
    sessionStorage.clear();
  }

}

/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import {
  TestBed,
  inject,
  async,
} from '@angular/core/testing';
import { XHRBackend, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CovalentHttpModule } from '@covalent/http';
import { TranslateModule } from '@ngx-translate/core';
import { JWTDataService, IUser } from './jwt-data.service';
import { LoginService } from './login.service';

describe('Service: Login', () => {

  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CovalentHttpModule.forRoot(),
        TranslateModule.forRoot(),
      ],
      providers: [
        MockBackend,
        { provide: XHRBackend, useExisting: MockBackend },
        LoginService,
        JWTDataService,
      ],
    });
  }));

  beforeEach(inject([MockBackend], (mockBE: MockBackend) => {
    mockBackend = mockBE;
  }));

  it('expect to successfully login and store data/token',
    inject([LoginService, JWTDataService], (loginService: LoginService, jwtDataService: JWTDataService) => {
      jwtDataService.clear();
      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions(
          {headers: new Headers({'X-AUTH-TOKEN': 'TOKEN'}), status: 200, body: JSON.stringify({
            username: 'test',
            admin: false,
            token_id: 'TOKEN',
          })},
        )));
      });

      expect(jwtDataService.tokenId).toBeNull();
      expect(jwtDataService.data).toBeNull();

      loginService.login({username: 'em255017', password: '****'}).subscribe((user: IUser) => {
        expect(user.username).toBe('test');
        expect(jwtDataService.tokenId).toBe('TOKEN');
        expect(jwtDataService.data.username).toBe('test');
      });
    }),
  );

  it('expect to fail login',
    inject([LoginService, JWTDataService], (loginService: LoginService, jwtDataService: JWTDataService) => {
      jwtDataService.clear();
      expect(jwtDataService.tokenId).toBeNull();
      expect(jwtDataService.data).toBeNull();

      mockBackend.connections.subscribe((connection: any) => {
        connection.mockError(new Error('Authentication Failed.'));
      });

      loginService.login({username: 'em255017', password: '****'}).subscribe((success: boolean) => {
        // nothing here
      }, (error: Error) => {
        expect(error.message).toBe('Authentication Failed.');
        expect(jwtDataService.tokenId).toBeNull();
        expect(jwtDataService.data).toBeNull();
      });
    }),
  );
});

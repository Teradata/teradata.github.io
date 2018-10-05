/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import {
  TestBed,
  inject,
  async,
} from '@angular/core/testing';
import { Response, ResponseOptions, RequestOptionsArgs } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { JWTDataService, IJWTData } from '../../services';
import { AuthenticationInterceptor } from './authentication.interceptor';

describe('Interceptor: Authentication', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'login', redirectTo: '/'},
        ]),
        TranslateModule.forRoot(),
      ],
      providers: [
        JWTDataService,
        AuthenticationInterceptor,
      ],
    });
  }));

  let userData: IJWTData = {data: {admin: false, expires_at: (Date.now() + 1000000)}, tokenId: 'SDFG123D'};

  it('expect to not contain Authorization header',
    inject([AuthenticationInterceptor, JWTDataService],
    (authInterceptor: AuthenticationInterceptor, jwtDataService: JWTDataService) => {
      let requestOptions: RequestOptionsArgs = {};
      jwtDataService.clear();
      try {
        authInterceptor.onRequest(requestOptions);
      } catch (e) {
        expect(requestOptions.headers).toBeUndefined();
      }
    }),
  );

  it('expect to contain "Authorization" header',
    inject([AuthenticationInterceptor, JWTDataService],
    (authInterceptor: AuthenticationInterceptor, jwtDataService: JWTDataService) => {
      let requestOptions: RequestOptionsArgs = {};
      jwtDataService.store(userData);
      authInterceptor.onRequest(requestOptions);
      expect(requestOptions.headers.get('Authorization')).toBeDefined();
      expect(requestOptions.headers.get('Authorization')).toBe('Bearer ' + userData.tokenId);
    }),
  );

  it('expect to redirect to "/login" and clear [JWTDataService]',
    inject([AuthenticationInterceptor, JWTDataService],
    (authInterceptor: AuthenticationInterceptor, jwtDataService: JWTDataService) => {
      jwtDataService.store(userData);
      let response: Response = new Response(new ResponseOptions({status: 401}));
      authInterceptor.onResponseError(response);
      expect(jwtDataService.tokenId).toBeNull();
      expect(jwtDataService.data).toBeNull();
    }),
  );

  it('expect to not clear [JWTDataService]',
    inject([AuthenticationInterceptor, JWTDataService],
    (authInterceptor: AuthenticationInterceptor, jwtDataService: JWTDataService) => {
      jwtDataService.store(userData);
      let response: Response = new Response(new ResponseOptions({status: 404}));
      authInterceptor.onResponseError(response);
      expect(jwtDataService.tokenId).toBeDefined();
      expect(jwtDataService.data).toBeDefined();
    }),
  );
});

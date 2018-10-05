/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import {
  TestBed,
  inject,
  async,
} from '@angular/core/testing';
import { JWTDataService, IJWTData } from './jwt-data.service';

describe('Service: JWTData', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        JWTDataService,
      ],
    });
  }));

  let userData: IJWTData = {data: {admin: false}, tokenId: 'SDFG123D'};

  it('expect to store data and tokenId',
    inject([JWTDataService], (jwtDataService: JWTDataService) => {
      jwtDataService.clear();
      jwtDataService.store(userData);
      expect(jwtDataService.tokenId).toBe(userData.tokenId);
      expect(jwtDataService.data).toBeDefined();
    }),
  );

  it('expect to clear data and tokenId',
    inject([JWTDataService], (jwtDataService: JWTDataService) => {
      jwtDataService.clear();
      jwtDataService.store(userData);
      expect(jwtDataService.tokenId).toBe(userData.tokenId);
      expect(jwtDataService.data).toBeDefined();
      jwtDataService.clear();
      expect(jwtDataService.tokenId).toBeNull();
      expect(jwtDataService.data).toBeNull();
    }),
  );
});

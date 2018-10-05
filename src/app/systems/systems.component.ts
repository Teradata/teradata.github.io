/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import {
  ErrorService, SystemService, ISystem, AppsService, IApp,
} from '../../services';

import { APP_CENTER_BASE_URL } from '../../config/api.config';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'td-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss'],
  preserveWhitespaces: true,
})
export class SystemsComponent implements OnInit {

  systems: ISystem[];
  apps: IApp[];
  types = [{
      title: 'TERADATA',
      svg: 'teradata-icon',
    },
    {
      title: 'OTHER',
      icon: 'dns',
    },
  ];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _systemService: SystemService,
              private _appsService: AppsService,
              private _loadingService: TdLoadingService,
              private _errorService: ErrorService,
              public media: TdMediaService) {
  }

  async ngOnInit(): Promise<void> {
    this._loadingService.register('systems.dashboard');
    try {
      await forkJoin([
        this.loadSystems(),
        this.loadApps(),
      ]).toPromise();
    } catch (error) {
      this._errorService.open(error);
    }
    this._loadingService.resolve('systems.dashboard');
  }

  async loadSystems(): Promise<void> {
    this.systems = await this._systemService.getSystems().toPromise();
  }

  async loadApps(): Promise<void> {
    this.apps = await this._appsService.query({per_page: 5, page: 1}).toPromise();
  }

  routeToApp(app: IApp): string {
    return APP_CENTER_BASE_URL + '/browse/' + app.app_id;
  }
}

/*
© 2017 Teradata. All rights reserved.
*/

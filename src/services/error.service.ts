/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TdDialogService, IAlertConfig } from '@covalent/core/dialogs';

import { TranslateService } from '@ngx-translate/core';

export class ACError {
  message: string;
  error: number;
}

const APP_NOT_EXIST: number = 1202;
const JOB_NOT_EXIST: number = 1208;

@Injectable()
export class ErrorService {

  constructor(private _dialogService: TdDialogService,
              private _router: Router,
              private _translate: TranslateService) {}

  open(error: ACError): void {
    if (error) {
      let config: IAlertConfig = {
        title: this._translate.instant('THERE_WAS_A_PROBLEM'),
        message: error.message,
        disableClose: true,
        closeButton: this._translate.instant('CLOSE'),
      };
      if (error.error) {
        config.message += ` (${error.error.toString()})`;
      }
      if (config.message || config.title) {
        this._dialogService.openAlert(config).afterClosed().subscribe(() => {
          this._checkACError(error.error);
        });
      }
    }
  }

  private _checkACError(error: number): void {
    if (error === APP_NOT_EXIST || error === JOB_NOT_EXIST) {
      this._router.navigateByUrl('/');
    }
  }

}

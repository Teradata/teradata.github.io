/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdLoadingService } from '@covalent/core/loading';
import { StepState } from '@covalent/core/steps';
import {
  ErrorService, SystemService, ISystem, AppsService, IApp,
} from '../../services';

import { APP_CENTER_BASE_URL } from '../../config/api.config';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'td-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  preserveWhitespaces: true,
})
export class ComponentsComponent implements OnInit {

  systems: ISystem[];
  apps: IApp[];

  // Material stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Material grid list
  products: { name: string, description: string, color: string, icon: string }[] = [
    { name: 'AppCenter', description: 'product description', color: 'teal', icon: 'appcenter' },
    { name: 'Control Center', description: 'product description', color: 'slate', icon: 'control-center' },
    { name: 'Workload Analytics', description: 'product description', color: 'slate-600', icon: 'workload-analytics' },
    { name: 'Listener', description: 'product description', color: 'orange', icon: 'listener' },
    { name: 'Viewpoint', description: 'product description', color: 'blue', icon: 'viewpoint' },
    { name: 'Unity', description: 'product description', color: 'blue-600', icon: 'unity' },
  ];

  // Covalent stepper
  activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
  stateStep2: StepState = StepState.Required;
  stateStep3: StepState = StepState.Complete;
  disabled: boolean = false;

  // Covalent chips
  chips: string[] = [
    'stepper',
    'expansion-panel',
    'markdown',
    'highlight',
    'loading',
    'media',
    'chips',
    'http',
    'json-formatter',
    'pipes',
    'need more?',
  ];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _systemService: SystemService,
              private _appsService: AppsService,
              private _loadingService: TdLoadingService,
              private _errorService: ErrorService,
              private _formBuilder: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this._loadingService.register('components.loader');
    try {
      this.formGroup(),
      await forkJoin([
        this.loadSystems(),
        this.loadApps(),
      ]).toPromise();
    } catch (error) {
      this._errorService.open(error);
    }
    this._loadingService.resolve('components.loader');
  }

  formGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

  deactiveStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Deactive event emitted.';
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

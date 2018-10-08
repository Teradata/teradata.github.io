/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatRippleModule } from '@angular/material/core';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentMessageModule } from '@covalent/core/message';

import { CovalentHttpModule } from '@covalent/http';

import { AuthenticationInterceptor } from '../config/interceptors/authentication.interceptor';

import { JWTDataService, ErrorService, JWTDbCredentialsService } from '../services/';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { getSelectedLanguage, getSelectedLocale, createTranslateLoader, SUPPORTED_LANGS } from '../config/translate';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const httpInterceptorProviders: Type<any>[] = [
  AuthenticationInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    appRoutes,
    /** Angular Modules */
    HttpModule,
    HttpClientModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    /** Material Modules */
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentMessageModule,
    TranslateModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: AuthenticationInterceptor, paths: ['**'],
      }],
    }),
  ], // modules needed to run this module
  providers: [
    JWTDataService,
    JWTDbCredentialsService,
    httpInterceptorProviders,
    ErrorService,
  ], // additional providers needed for this module
  bootstrap: [ AppComponent ],
})
export class AppModule {
  constructor(translateService: TranslateService) {

    // set the default language
    translateService.setDefaultLang('en');
    translateService.addLangs(SUPPORTED_LANGS);

    // Get selected language and load it
    let selectedLocale: string = getSelectedLocale(translateService);
    let selectedLanguage: string = getSelectedLanguage(translateService);

    // using require here so can avoid making an http request ajax to get the language files
    // this prevents the language keys from flashing on the screen for a second before the actual
    // language files are loaded

    /* tslint:disable-next-line */
    const data: any = require('../assets/i18n/' + selectedLanguage + '.json');
    translateService.setTranslation(selectedLanguage, data, false);
    translateService.use(selectedLanguage);
  }
}

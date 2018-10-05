/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { CovalentStepsModule } from '@covalent/core/steps';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentMessageModule } from '@covalent/core/message';
import { CovalentVirtualScrollModule } from '@covalent/core/virtual-scroll';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentChipsModule } from '@covalent/core/chips';

import { CovalentHttpModule } from '@covalent/http';
import { CovalentBaseEchartsModule } from '@covalent/echarts';

import { AuthenticationInterceptor } from '../config/interceptors/authentication.interceptor';

import { JWTDataService, ErrorService, SystemService, QueryService, AppsService, JWTDbCredentialsService } from '../services/';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { getSelectedLanguage, getSelectedLocale, createTranslateLoader, SUPPORTED_LANGS } from '../config/translate';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemsComponent } from './systems/systems.component';
import { BrandComponent } from './brand/brand.component';
import { ComponentsComponent } from './components/components.component';

const httpInterceptorProviders: Type<any>[] = [
  AuthenticationInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    SystemsComponent,
    BrandComponent,
    ComponentsComponent,
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
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatStepperModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    CovalentVirtualScrollModule,
    CovalentHighlightModule,
    CovalentBaseEchartsModule,
    CovalentChipsModule,
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
    SystemService,
    QueryService,
    AppsService,
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

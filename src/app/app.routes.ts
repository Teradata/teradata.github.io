/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', component: DashboardComponent },
        ],
    },
    { path: '**', redirectTo: '/' },
];

export const appRoutes: any = RouterModule.forRoot(routes);

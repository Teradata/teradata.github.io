/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTDataService, IUser } from '../../services';

@Component({
  selector: 'covalent-app',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  // Current date
  year: any = new Date().getFullYear();

  // Logged in user
  user: IUser;

  // Sidenav routes
  routes: Object[] = [];

  constructor(private _router: Router,
              private _jwtDataService: JWTDataService) {
  }

  ngOnInit(): void {
    this.user = this._jwtDataService.data;
    this.routes = [{
      title: 'DASHBOARD',
      route: '/',
      icon: 'dashboard',
      show: true,
    },
    {
      title: 'BRAND',
      route: '/brand',
      icon: 'palette',
      show: true,
    },
    {
      title: 'COMPONENTS',
      route: '/components',
      icon: 'widgets',
      show: true,
    },
    {
      title: 'SYSTEMS',
      route: '/systems',
      icon: 'dns',
      show: true,
    },
    ];
  }

  logout(): void {
    this.user = undefined;
    this._jwtDataService.clear();
    this._router.navigate(['/login']);
  }

  // Theme toggle
  get activeTheme(): string {
    return localStorage.getItem('theme');
  }
  theme(theme: string): void {
    localStorage.setItem('theme', theme);
  }
  
}

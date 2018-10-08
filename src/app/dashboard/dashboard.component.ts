/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';
import {
  ErrorService
} from '../../services';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'td-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit {

  items: Object[];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _loadingService: TdLoadingService,
              private _errorService: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this._loadingService.register('overview.dashboard');
    try {
      await forkJoin([
        this.loadProjects(),
      ]).toPromise();
    } catch (error) {
      this._errorService.open(error);
    }
    this._loadingService.resolve('overview.dashboard');
  }

  async loadProjects(): Promise<void> {
    this.items = [{
      title: 'Jupyter SQL Extension',
      link: 'https://github.com/Teradata/jupyterextensions',
      src: 'jupyter',
      color: 'td-slate',
      description: 'The Teradata SQL extension for Jupyter provides a SQL kernel and navigator UI extension that allows the user to explore and execute queries on Teradata Vantage',
    }, {
        title: 'Covalent',
        link: 'https://github.com/Teradata/covalent',
        src: 'covalent',
        color: 'td-slate',
        description: 'Teradata UI Platform built on Angular & Material Design',
    }, {
      title: 'Teradata Presto',
      link: 'https://github.com/Teradata/presto',
      src: 'presto',
      color: 'indigo-600',
      description: 'Teradata Distribution of Presto -- A Distributed SQL Query Engine for Big Data',
    }, {
        title: 'PyTd',
        link: 'https://github.com/Teradata/PyTd',
        src: 'python',
        color: 'indigo-900',
        description: 'A Python Module to make it easy to script powerful interactions with Teradata Database in a DevOps friendly way.',
    }, {
      title: 'TPC-DS',
      link: 'https://github.com/Teradata/tpcds',
      icon: 'network_check',
      color: 'light-blue-700',
      description: 'Port of TPC-DS dsdgen to Java',
    }, {
      title: 'Teradata Presto Admin',
      link: 'https://github.com/Teradata/presto-admin',
      src: 'presto',
      color: 'cyan-600',
      description: 'A tool to install, configure and manage Presto installations',
    }, {
      title: 'Covalent Quickstart',
      link: 'https://github.com/Teradata/covalent-quickstart',
      icon: 'flash_on',
      color: 'orange-700',
      description: 'Quickstart app for Teradata Covalent UI Platform',
    }, {
      title: 'SQLAlchemy Teradata',
      link: 'https://github.com/Teradata/sqlalchemy-teradata',
      icon: 'code',
      color: 'red-700',
      description: 'A SQLAlchemy dialect for Teradata',
    }, {
      title: 'Tempto',
      link: 'https://github.com/Teradata/tempto',
      src: 'presto',
      color: 'blue-800',
      description: 'A testing framework for Presto',
    }, {
      title: 'Presto Yarn',
      link: 'https://github.com/Teradata/presto-yarn',
      src: 'presto',
      color: 'green-600',
      description: 'YARN Integration for Presto',
    }, {
      title: 'Gitbook Plugin Snippets',
      link: 'https://github.com/Teradata/gitbook-plugin-snippets',
      icon: 'chrome_reader_mode',
      color: 'grey-700',
      description: 'GitBook snippets plugin.',
    }, {
      title: 'Redlinerpm Maven Plugin',
      link: 'https://github.com/Teradata/redlinerpm-maven-plugin',
      src: 'maven',
      color: 'deep-orange-600',
      description: 'Redlinerpm maven plugin',
    }, {
      title: 'Redline',
      link: 'https://github.com/Teradata/redline',
      icon: 'network_check',
      color: 'red-900',
      description: 'Pure Java Rpm Library',
    }, {
      title: 'Ambari Presto Service',
      link: 'https://github.com/Teradata/ambari-presto-service',
      src: 'presto',
      color: 'grey-500',
      description: 'Ambari service for Presto',
    }, {
      title: 're2j',
      link: 'https://github.com/Teradata/re2j',
      src: 'java',
      color: 'orange-200',
      description: 'linear time regular expression matching in Java',
    }, {
      title: 'Presto Hadoop CDH4',
      link: 'https://github.com/Teradata/presto-hadoop-cdh4',
      src: 'presto',
      color: 'teal-700',
      description: 'Shaded version of CDH4 Hadoop for Presto',
    }, {
      title: 'Presto Hadoop Apache 2.x',
      link: 'https://github.com/Teradata/presto-hadoop-apache2',
      src: 'presto',
      color: 'purple-700',
      description: 'Shaded version of Apache Hadoop 2.x for Presto',
    }, {
      title: 'Presto Hadoopo Apache 1.x',
      link: 'https://github.com/Teradata/presto-hadoop-apache1',
      src: 'presto',
      color: 'deep-purple-700',
      description: 'Shaded version of Apache Hadoop 1.x for Presto',
    }, {
      title: 'TPC-H',
      link: 'https://github.com/Teradata/tpch',
      src: 'java',
      color: 'blue-100',
      description: 'Port of TPC-H dbgen to Java',
    },
    ];
  }
}

/*
© 2017 Teradata. All rights reserved.
*/

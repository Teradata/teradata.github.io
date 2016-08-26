import { Component, OnInit } from '@angular/core';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon } from '@angular2-material/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { TD_LAYOUT_DIRECTIVES, TdExpansionPanelComponent } from '@covalent/core';
import { TdDigitsPipe, TdBytesPipe, TdTimeAgoPipe } from '@covalent/core';

@Component({
  moduleId: module.id,
  selector: 'qs-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    ROUTER_DIRECTIVES,
    MdIcon,
    TD_LAYOUT_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    TdExpansionPanelComponent,
  ],
  pipes: [ TdDigitsPipe, TdBytesPipe, TdTimeAgoPipe ],
})
export class HomeComponent implements OnInit {
  items: Object[];
  resources: Object[];

  ngOnInit(): void {
    this.items = [{
        title: 'Teradata Presto',
        link: 'https://github.com/Teradata/presto',
        src: 'assets/icons/presto.svg',
        color: 'indigo-600',
        description: 'Teradata Distribution of Presto -- A Distributed SQL Query Engine for Big Data',
      }, {
        title: 'TPC-DS',
        link: 'https://github.com/Teradata/tpcds',
        icon: 'network_check',
        color: 'light-blue-700',
        description: 'Port of TPC-DS dsdgen to Java',
      }, {
        title: 'Teradata Presto Admin',
        link: 'https://github.com/Teradata/presto-admin',
        src: 'assets/icons/presto.svg',
        color: 'cyan-600',
        description: 'A tool to install, configure and manage Presto installations',
      }, {
        title: 'Covalent',
        link: 'https://github.com/Teradata/covalent',
        src: 'assets/icons/covalent.svg',
        color: 'orange-900',
        description: 'Teradata UI Platform built on Angular-Material 2.0',
      }, {
        title: 'PyTd',
        link: 'https://github.com/Teradata/PyTd',
        src: 'assets/icons/python.svg',
        color: 'yellow-800',
        description: 'A Python Module to make it easy to script powerful interactions with Teradata Database in a DevOps friendly way.',
      }, {
        title: 'Covalent Quickstart',
        link: 'https://github.com/Teradata/covalent-quickstart',
        icon: 'flash_on',
        color: 'orange-700',
        description: 'Quickstart app for Teradata Covalent UI Platform',
      }, {
        title: 'SQLAlchemy Teradata',
        link: 'https://github.com/Teradata/sqlalchemy-teradata',
        src: 'assets/icons/teradata.svg',
        color: 'red-700',
        description: 'A SQLAlchemy dialect for Teradata',
      }, {
        title: 'Tempto',
        link: 'https://github.com/Teradata/tempto',
        src: 'assets/icons/presto.svg',
        color: 'blue-800',
        description: 'A testing framework for Presto',
      }, {
        title: 'Listener Documentation',
        link: 'https://github.com/Teradata/listener-documentation',
        src: 'assets/icons/listener.svg',
        color: 'orange-600',
        description: 'Teradata Listener Documentation Site',
      }, {
        title: 'Presto Yarn',
        link: 'https://github.com/Teradata/presto-yarn',
        src: 'assets/icons/presto.svg',
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
        src: 'assets/icons/maven.svg',
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
        src: 'assets/icons/presto.svg',
        color: 'grey-500',
        description: 'Ambari service for Presto',
      }, {
        title: 're2j',
        link: 'https://github.com/Teradata/re2j',
        src: 'assets/icons/java.svg',
        color: 'orange-200',
        description: 'linear time regular expression matching in Java',
      }, {
        title: 'Presto Hadoop CDH4',
        link: 'https://github.com/Teradata/presto-hadoop-cdh4',
        src: 'assets/icons/presto.svg',
        color: 'teal-700',
        description: 'Shaded version of CDH4 Hadoop for Presto',
      }, {
        title: 'Presto Hadoop Apache 2.x',
        link: 'https://github.com/Teradata/presto-hadoop-apache2',
        src: 'assets/icons/presto.svg',
        color: 'purple-700',
        description: 'Shaded version of Apache Hadoop 2.x for Presto',
      }, {
        title: 'Presto Hadoopo Apache 1.x',
        link: 'https://github.com/Teradata/presto-hadoop-apache1',
        src: 'assets/icons/presto.svg',
        color: 'deep-purple-700',
        description: 'Shaded version of Apache Hadoop 1.x for Presto',
      }, {
        title: 'TPC-H',
        link: 'https://github.com/Teradata/tpch',
        src: 'assets/icons/java.svg',
        color: 'blue-100',
        description: 'Port of TPC-H dbgen to Java',
      },
    ];
  }
}

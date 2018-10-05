/*
 * Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
 * TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET
 */

'use strict';

var gulp = require('gulp-help')(require('gulp'));
var exec = require('child_process').exec;
var config = require('../build.conf');

gulp.task('build-docker', function (cb) {
  var dockerBuild = 'docker build -f deploy/' + config.docker.deploymentServer + '/Dockerfile -t ' + config.docker.imageName + ' ./deploy';
  exec(dockerBuild, function (err, stdout, stderr) {
    cb(err);
  }).stdout.pipe(process.stdout);
});

gulp.task('tag-docker', function (cb) {
  var dockerTag = 'docker tag ' + config.docker.imageName + ':latest' + ' ' + config.docker.repository + '/' + config.docker.imageName + ':' + config.docker.tag;
  exec(dockerTag, function (err, stdout, stderr) {
    cb(err);
  }).stdout.pipe(process.stdout);
});

gulp.task('push-docker', function (cb) {
  var dockerPush = 'docker push ' + config.docker.repository + '/' + config.docker.imageName + ':' + config.docker.tag;
  exec(dockerPush, function (err, stdout, stderr) {
    cb(err);
  }).stdout.pipe(process.stdout);
});

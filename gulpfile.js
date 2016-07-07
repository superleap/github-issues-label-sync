"use strict";
var exec = require('child_process').exec;
var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');

gulp.task('nsp', function (cb) {
    nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('bithound', function () {
    if (!process.env.CI) {
        return;
    }

    exec('bithound check git@github.com:superleap/github-issues-label-sync.git', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('prepublish', ['nsp', 'bithound']);

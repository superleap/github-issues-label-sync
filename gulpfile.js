"use strict";
var paths = {
    "pkg": "./package.json",
    "docs": `./build/docs`
};
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var pkg = require('read-package-json');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var esdoc = require("gulp-esdoc");
var ghPages = require("gulp-gh-pages");

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

gulp.task('doc', function (cb) {
    var config = {
        "destination": paths.docs,
        "title": "GitHub Issues Label Sync Module"
    };

    return gulp.src('./lib')
        .pipe(esdoc(config));
});

gulp.task('predeploy', ['doc'], function () {
    pkg(paths.pkg, console.log, true, function (error, data) {
        var pkgName = data.name;
        var pkgUser = data.repository.url.match(/github\.com\/([^\/]+)\//i)[1];

        return fs.writeFile(`${paths.docs}/CNAME`, `${pkgName}-package.${pkgUser}.xyz`);
    });
});

gulp.task('deploy', ['predeploy'], function () {
    if (!process.env.COVERAGE_REPORT) {
        return;
    }

    return gulp.src(`${paths.docs}/**/*`)
        .pipe(ghPages());
});

gulp.task('prepublish', ['nsp', 'bithound']);

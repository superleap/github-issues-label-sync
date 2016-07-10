"use strict";
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var pkg = Promise.promisify(require('read-package-json'));
var exec = require('child_process').exec;
var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var esdoc = require('gulp-esdoc');
var ghPages = require('gulp-gh-pages');
var paths = {
    "pkg": "./package.json",
    "docs": "./build/docs",
    "manual": "./build/manual"
};

/**
 * Promisified child_process.exec
 * @param cmd
 * @param {Object} opts See child_process.exec node docs
 * @property {stream.Writable} [opts.stdout=process.stdout] - If defined, child process stdout will be piped to it.
 * @property {stream.Writable} [opts.stderr=process.stderr] - If defined, child process stderr will be piped to it.
 * @returns {Promise<{ stdout: string, stderr: stderr }>}
 */
function execp(cmd, opts) {
    opts || (opts = {});
    return new Promise((resolve, reject) => {
        const child = exec(cmd, opts,
            (err, stdout, stderr) => err ? reject(err) : resolve({
                stdout: stdout,
                stderr: stderr
            }));

        if (opts.stdout) {
            child.stdout.pipe(opts.stdout);
        }
        if (opts.stderr) {
            child.stderr.pipe(opts.stderr);
        }
    });
}

gulp.task('changelog', function () {
    return execp('mkdir -p ./build/manual && conventional-changelog -p angular -i ./build/manual/changelog.md -s -r 0');
});

gulp.task('manual', ['changelog'], function () {
    // parse github readme for available sections
    return readFile('./README.md', 'utf8').then(function (response) {
        // split file based on headers (##) and generate mapping
        var blocks = response.split(/\n##\s[^\n]+\n\n/i).map(function (element) {
            return element;
        });

        return readFile(paths.manual + '/changelog.md', 'utf8').then(function (response) {
            var versions = response.split(/<a name="(?:(?:0|[1-9]\d*)\.){2}(?:0|[1-9]\d*)"><\/a>/i);
            versions.splice(0, 1);

            return versions.join('');
        }).then(function (response) {
            var bindings = {
                "index": blocks[0] + "\n\n" + blocks[1] + "\n\n## LICENSE\n" + blocks[6],
                "installation": blocks[2],
                "usage": blocks[3],
                "configuration": blocks[4],
                "examples": blocks[5],
                "changelog": response
            };

            var log = [];

            // create async file write array
            for (var key in bindings) {
                var path = paths.manual + '/' + key + '.md';
                var data = bindings[key];
                log.push(fs.writeFileSync(path, data));
            }

            return Promise.all(log).then(function (response) {
                return response;
            });
        });
    });
});

gulp.task('doc', ['manual'], function () {
    var config = {
        "destination": paths.docs,
        "title": "GitHub Issues Label Sync Module",
        "index": paths.manual + "/index.md",
        "manual": {
            "installation": [paths.manual + "/installation.md"],
            "configuration": [paths.manual + "/configuration.md"],
            "usage": [paths.manual + "/usage.md"],
            "example": [paths.manual + "/examples.md"],
            "changelog": [paths.manual + "/changelog.md"]
        }
    };

    return gulp.src('./lib')
        .pipe(esdoc(config));
});

gulp.task('predeploy', ['doc'], function () {
    return pkg(paths.pkg, console.log, true).then(function (data) {
        var pkgName = data.name;
        var pkgUser = data.repository.url.match(/github\.com\/([^\/]+)\//i)[1];

        return writeFile(`${paths.docs}/CNAME`, `${pkgName}-package.${pkgUser}.xyz`);
    });
});

gulp.task('deploy', ['predeploy'], function () {
    if (!process.env.COVERAGE_REPORT) {
        return;
    }

    return gulp.src(`${paths.docs}/**/*`)
        .pipe(ghPages());
});

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

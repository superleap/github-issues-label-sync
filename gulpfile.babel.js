import Promise from 'bluebird';
import childProcess from 'child_process';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import mkdirp from 'mkdirp';
import path from 'path';
import readPackage from 'read-package-json';
import standardChangelog from 'standard-changelog';

let pkg = Promise.promisify(readPackage);
let readFile = Promise.promisify(fs.readFile);
let spawn = childProcess.spawn;
let writeFile = Promise.promisify(fs.writeFile);

const gp = gulpLoadPlugins();
const paths = {
    "pkg": "./package.json",
    "docs": "./build/docs",
    "manual": "./build/manual",
    "src": "./src/*",
    "srcEsdoc": "./src",
    "srcTest": "./test",
    "compile": "./lib"
};

/**
 * Promisified child_process.spawn
 * @async
 * @param {String} proc - The process we want to spawn
 * @param {Array} args - The arguments we want to spawn the process with
 * @param {Object} opts - See child_process.exec node docs
 * @param {String} [opts.stdio=`inherit`] - spawn environment inherits parent
 * @return {Promise<Error>}
 */
function spawnp(proc, args = [], opts = {"stdio": `inherit`}) {
    return new Promise((resolve, reject) => {
        const child = spawn(proc, args, opts);

        child.on(`error`, (err) => {
            reject(err);
        });

        child.on(`close`, (code) => {
            if (code === 0) {
                resolve();
            }
        });
    });
}

gulp.task(`changelog`, [`setup`], () => {
    return standardChangelog({
        "preset": `angular`,
        "releaseCount": 0
    })
        .pipe(fs.createWriteStream(`${paths.manual}/changelog.md`));
});

gulp.task(`manual`, [`changelog`], () => {
    // parse github readme for available sections
    return readFile(`./README.md`, `utf8`).then((response) => {
        // split file based on headers (##) and generate mapping
        let blocks = response.split(/\n##\s[^\n]+\n\n/i).map((element) => {
            return element;
        });

        return readFile(`${paths.manual}/changelog.md`, `utf8`).then((response) => {
            let versions = response.split(/<a name="(?:(?:0|[1-9]\d*)\.){2}(?:0|[1-9]\d*)"><\/a>/i);
            versions.splice(0, 1);

            return versions.join(``);
        }).then((response) => {
            let overview = `## Overview\n${blocks[1]}\n\n`;
            let reqs = `## Requirements\n${blocks[2]}\n\n`;
            let contrib = `## Contributing\n${blocks[7]}\n\n`;
            let license = `## LICENSE\n${blocks[9]}`;

            let bindings = {
                "index": `${blocks[0]}\n\n${overview}${reqs}${contrib}${license}`,
                "installation": `${blocks[2]}\n\n${blocks[3]}`,
                "usage": blocks[4],
                "configuration": blocks[5],
                "examples": blocks[6],
                "changelog": response
            };

            let log = [];

            // create async file write array
            for (let key in bindings) {
                if (Reflect.getOwnPropertyDescriptor(bindings, key)) {
                    let path = `${paths.manual}/${key}.md`;
                    let data = bindings[key];
                    log.push(writeFile(path, data));
                }
            }

            return Promise.all(log).then((response) => {
                return response;
            });
        });
    });
});

gulp.task(`doc`, [`manual`], () => {
    let config = {
        "destination": paths.docs,
        "title": `GitHub Issues Label Sync Module`,
        "index": `${paths.manual}/index.md`,
        "plugins": [
            {"name": "esdoc-node"},
            {"name": "esdoc-hacker-vision"}
        ],
        "manual": {
            "installation": [`${paths.manual}/installation.md`],
            "configuration": [`${paths.manual}/configuration.md`],
            "usage": [`${paths.manual}/usage.md`],
            "example": [`${paths.manual}/examples.md`],
            "changelog": [`${paths.manual}/changelog.md`]
        },
        "lint": true,
        "test": {
            "type": "mocha",
            "source": paths.srcTest
        }
    };

    return gulp.src(paths.srcEsdoc)
        .pipe(gp.esdoc(config));
});

gulp.task(`predeploy`, [`doc`], () => {
    return pkg(paths.pkg, console.log, true).then((data) => {
        let pkgName = data.name;
        let pkgUser = data.repository.url.match(/github\.com\/([^/]+)\//i)[1];

        return writeFile(`${paths.docs}/CNAME`, `${pkgName}-package.${pkgUser}.xyz`);
    });
});

gulp.task(`deploy`, [`predeploy`], () => {
    return gulp.src(`${paths.docs}/**/*`)
        .pipe(gp.ghPages());
});

gulp.task(`lint`, () => {
    return gulp.src([`**/*.js`, `!node_modules/**`])
        .pipe(gp.excludeGitignore())
        .pipe(gp.eslint())
        .pipe(gp.eslint.format())
        .pipe(gp.eslint.failAfterError());
});

gulp.task(`nsp`, (cb) => {
    return gp.nsp({"package": path.resolve(`package.json`)}, cb);
});

gulp.task(`snyk`, () => {
    return spawnp(`node_modules/.bin/snyk`, ["test", "--debug"]);
});

gulp.task(`bithound`, () => {
    return pkg(paths.pkg, console.log, true).then((data) => {
        let pkgName = data.name;
        let pkgUser = data.repository.url.match(/github\.com\/([^/]+)\//i)[1];

        return spawnp(`node_modules/.bin/bithound`, [`check`, `git@github.com:${pkgUser}/${pkgName}.git`]);
    });
});

gulp.task(`package`, () => {
    return pkg(paths.pkg, console.log, true).then((data) => {
        return gulp.src(paths.src)
            .pipe(gp.babel(data.babel))
            .pipe(gulp.dest(paths.compile));
    });
});

gulp.task(`clean:docs`, () => {
    return del([`${paths.docs}/*`]);
});

gulp.task(`clean:manual`, () => {
    return del([`${paths.manual}/*`]);
});

gulp.task(`setup`, [`clean`], () => {
    let log = [
        mkdirp(paths.docs),
        mkdirp(paths.manual)
    ];

    return Promise.all(log).then((response) => {
        return response;
    });
});

gulp.task(`test:code`, () => {
    return gulp.src([`${paths.srcTest}/**/*.js`])
        .pipe(gp.spawnMocha({
            "env": {
                "NODE_ENV": 'test'
            },
            "R": 'spec',
            "r": 'babel-register',
            "istanbul": false
        }));
});


gulp.task(`test:install`, [`nsp`, `snyk`, `bithound`]);
gulp.task(`test:publish`, [`package`]);
gulp.task(`clean`, [`clean:docs`, `clean:manual`]);
gulp.task(`postinstall`, [`test:install`]);
gulp.task(`prepublish`, [`test:publish`]);
gulp.task(`default`, [`test:code`, `lint`]);

let Promise = require('bluebird');
let config = {
    "github": {
        "user": "superleap",
        "repo": "github-issues-label-sync",
        "token": "dab5ae868be49ec9179b34d2532d699a603f8be0",
        "options": {
            // "debug": true,
            "followRedirects": false,
            "Promise": Promise
        }
    }
};

module.exports = config;

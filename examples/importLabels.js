let config = require('./config/config');
let labels = require('./config/labels');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubIssuesLabelSync.importLabels(labels, false).then((response) => {
    /**
     * @example
     * [ { url: 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Semver:%20premajor',
     *     name: 'Semver: premajor',
     *     color: 'e99695' },
     *     ...
     *   { url: 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Type:%20feature-request',
     *     name: 'Type: feature-request',
     *     color: 'c7def8' } ]
     */
    console.log(response);
}).catch((error) => {
    /**
     * @example
     * { code: 401,
     *   status: 'Unauthorized',
     *   message: '{"message":"Bad credentials","documentation_url":"https://developer.github.com/v3"}' }
     */
    console.log(error.toJSON());
});

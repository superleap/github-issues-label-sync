let config = require('./config/config');
let labels = require('./config/labels');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubIssuesLabelSync.deleteLabels(labels).then((response) => {
    /**
     * @example
     * [ { name: 'Semver: premajor',
     *     color: 'e99695',
     *     status: 'success' },
     *     ...
     *   { name: 'Type: feature-request',
     *     color: 'c7def8',
     *     status: 'not found' } ]
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

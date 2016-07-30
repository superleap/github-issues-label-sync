let config = require('./config/config');
let labels = require('./config/labels');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubIssuesLabelSync.deleteLabel(labels[0]).then((response) => {
    /**
     * @example
     * [ { name: 'TEST GH Review: accepted',
     *     color: '009800',
     *     status: 'success' } ]
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

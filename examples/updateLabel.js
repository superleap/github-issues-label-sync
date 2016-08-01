let config = require('./config/config');
let labels = require('./config/labels');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

let label = labels[0];
label.color = '000';

githubIssuesLabelSync.updateLabel(label).then((response) => {
    /**
     * @example
     * [ { name: 'TEST GH Review: accepted',
     *     color: '000',
     *     status: 'success' } ]
     */
    console.log(response);
}).catch((error) => {
    /**
     * @example
     * { code: 401,
     *   status: 'Unauthorized',
     *   message: '{"message":"Bad credentials","documentation_url":"https://developer.github.com/v3"}' }
     * @example
     * { code: 404,
     *   status: 'Not Found',
     *   message: '{"message":"Not Found","documentation_url":"https://developer.github.com/v3/issues/labels/#update-a-label"}' }
     */
    console.log(error.toJSON());
});

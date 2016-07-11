let config = require('./config');
let GILS = require('./../lib/LabelSync');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new GILS(options, user, repo, token);

githubIssuesLabelSync.purgeLabels().then((response) => {
    // log raw response body
    console.log(response);
    // log deleted labels
    console.log(githubIssuesLabelSync.deletedLabels);
});

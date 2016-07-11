let config = require('./config');
let GILS = require('./../lib/LabelSync');
let {user, repo, token, options} = config.github;
let githubIssuesLabelSync = new GILS(options, user, repo, token);

githubIssuesLabelSync.getLabels().then((response) => {
    // log labels
    console.log(response);
});

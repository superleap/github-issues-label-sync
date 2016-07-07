let config = require('./config');
let {user, repo, token, options} = config.github;
let githubLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubLabelSync.getLabels().then((response) => {
    console.log(response);
});

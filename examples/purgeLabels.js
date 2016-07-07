let config = require('./config');
let {user, repo, token, options} = config.github;
let githubLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubLabelSync.purgeLabels().then((response) => {
    console.log(response);
    console.log(githubLabelSync.deletedLabels);
});

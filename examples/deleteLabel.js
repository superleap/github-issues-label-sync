let config = require('./config');
let {user, repo, token, options} = config.github;
let labels = require('./config/labels');
let githubLabelSync = new (require('./../lib/LabelSync'))(options, user, repo, token);

githubLabelSync.deleteLabel(labels[0]).then((response) => {
    console.log(response);
    console.log(githubLabelSync.deletedLabels);
});

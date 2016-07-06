let config = require('./config');
let {user, repo, token, options} = config.github;
let githubSync = new (require('./../lib/GithubSync'))(options, user, repo, token);

githubSync.purgeLabels().then((response) => {
    console.log(response);
    console.log(githubSync.deletedLabels);
});

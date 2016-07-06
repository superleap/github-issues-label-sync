let config = require('./config');
let {user, repo, token, options} = config.github;
let githubSync = new (require('./../lib/GithubSync'))(options, user, repo, token);

githubSync.getLabels().then((response) => {
    console.log(response);
});

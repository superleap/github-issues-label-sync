let GitHubApi = require("github");
let isFunction = function(fn) {
    return typeof fn === "function";
};

class LabelSync {
    constructor(options) {
        this._githubOptions = options.connect;
        this._githubUser = options.user;
        this._githubRepo = options.repo;
        this._githubToken = options.token;
        this._github = new GitHubApi(this.githubOptions);

        this.authenticate();
    }

    get github() {
        return this._github;
    }

    get githubOptions() {
        return this._githubOptions;
    }

    get githubUser() {
        return this._githubUser;
    }

    get githubRepo() {
        return this._githubRepo;
    }

    get githubToken() {
        return this._githubToken;
    }

    get githubLabels() {
        return this._githubLabels;
    }

    set githubLabels(labels) {
        if (labels) {
            delete labels.meta;
        }

        this._githubLabels = labels;
    }

    authenticate() {
        this.github.authenticate({
            type: "oauth",
            token: this.githubToken
        });
    }

    getRepositoryLabels(callback) {
        let self = this;

        self.github.issues.getLabels({
            user: self.githubUser,
            repo: self.githubRepo
        }, function(error, resource) {
            self.githubLabels = resource;

            if (isFunction(callback)) {
                callback(error, self.githubLabels);
            }
        });
    }
}

module.exports = LabelSync;

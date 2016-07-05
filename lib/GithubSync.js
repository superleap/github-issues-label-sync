let GitHubApi = require("github");

class GithubSync {
    /**
     * In order to work as an NPM module this class has to be called with specific parameters
     * @param {Object} options - GitHub
     * @param {string} user - GitHub repository user
     * @param {string} repo - GitHub repository name
     * @param {string} token - GitHub personal access token
     */
    constructor(options = {}, user, repo, token) {
        this.options = options;
        this.user = user;
        this.repo = repo;
        this.token = token;
        this.github = new GitHubApi(this.options);
        this.labels = [];

        this.authenticate();
    }

    /**
     * Get GitHubApi module connect options
     * @returns {Object}
     */
    get options() {
        return this._options;
    }

    /**
     * Get GitHub repository username
     * @returns {String}
     */
    get user() {
        return this._user;
    }

    /**
     * Get GitHub repository name
     * @returns {String}
     */
    get repo() {
        return this._repo;
    }

    /**
     * Get GitHub repository token
     * @returns {String}
     */
    get token() {
        return this._token;
    }

    /**
     * Get GitHubApi module
     * @returns {GitHubApi|module.exports}
     */
    get github() {
        return this._github;
    }

    /**
     * Get GitHub repository labels
     * @returns {Array}
     */
    get labels() {
        return this._labels;
    }

    /**
     * Set GitHubApi module connect options
     * @param {Object} object
     */
    set options(object) {
        this._options = object;
    }

    /**
     * Set GitHubApi repository username
     * @param {String} repoUrlUser
     */
    set user(repoUrlUser) {
        this._user = repoUrlUser;
    }

    /**
     * Set GitHubApi repository name
     * @param {String} repoUrlName
     */
    set repo(repoUrlName) {
        this._repo = repoUrlName;
    }

    /**
     * Set GitHubApi OAuth2 personal access token
     * @param {String} personalAccessToken
     */
    set token(personalAccessToken) {
        this._token = personalAccessToken;
    }

    /**
     * Set GitHubApi Client
     * @param {GitHubApi|module.exports} Client
     */
    set github(Client) {
        this._github = Client;
    }

    /**
     * Set GitHubApi repository labels
     * @param {Array} labels
     */
    set labels(labels) {
        this._labels = labels;
    }

    /**
     * We only do this once
     */
    authenticate() {
        this.github.authenticate({
            type: "oauth",
            token: this.token
        });
    }

    /**
     * Get GitHubApi repository labels from remote
     * @async
     * @param {Boolean} meta
     * @returns {Promise}
     */
    getLabels(meta = false) {
        return this.github.issues.getLabels({
            user: this.user,
            repo: this.repo
        }).then((response) => {
            if (true !== meta) {
                delete response["meta"];
            }

            this.labels = response;

            return this.labels;
        });
    }
}

module.exports = GithubSync;

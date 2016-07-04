let GitHubApi = require("github");
let isFunction = function(fn) {
    return typeof fn === "function";
};

/**
 * Abstract GitHub repository label importer
 */
class LabelSync {
    /**
     * In order to work as an NPM module this class has to be called with specific parameters
     * @param {Object} options - GitHub
     * @param {string} user - GitHub repository user
     * @param {string} repo - GitHub repository name
     * @param {string} token - GitHub personal access token
     */
    constructor(options = {}, user, repo, token) {
        this._githubDeletedLabels = [];
        this._githubOptions = options;
        this._githubUser = user;
        this._githubRepo = repo;
        this._githubToken = token;
        this._github = new GitHubApi(this.githubOptions);

        this.authenticate();
    }

    /**
     * Get GitHubApi module
     * @returns {GitHubApi|module.exports}
     */
    get github() {
        return this._github;
    }

    /**
     * Get GitHubApi module connect options
     * @returns {Object}
     */
    get githubOptions() {
        return this._githubOptions;
    }

    /**
     * Get GitHub repository username
     * @returns {string}
     */
    get githubUser() {
        return this._githubUser;
    }

    /**
     * Get GitHub repository name
     * @returns {string}
     */
    get githubRepo() {
        return this._githubRepo;
    }

    /**
     * Get GitHub repository token
     * @returns {string}
     */
    get githubToken() {
        return this._githubToken;
    }

    /**
     * Get GitHub labels for current repository
     * @returns {*}
     */
    get githubLabels() {
        return this._githubLabels;
    }

    /**
     * Get GitHub deleted labels for current repository
     * @returns {Array}
     */
    get githubDeletedLabels() {
        return this._githubDeletedLabels;
    }

    /**
     * Remove "meta" key from GitHubApi response
     * @param {Array} labels
     */
    set githubLabels(labels) {
        if (labels) {
            delete labels.meta;
        }

        this._githubLabels = labels;
    }

    /**
     * Send a deleted label to the log
     * @param {Object} label
     */
    set githubDeletedLabel(label) {
        this._githubDeletedLabels.push(label);
    }

    authenticate() {
        this.github.authenticate({
            type: "oauth",
            token: this.githubToken
        });
    }

    /**
     * Get GitHubApi labels for current repository response and set labels
     * @param {Function} callback
     */
    getRepositoryLabels(callback) {
        this.github.issues.getLabels({
            user: this.githubUser,
            repo: this.githubRepo
        }, (error, resource) => {
            this.githubLabels = resource;

            if (isFunction(callback)) {
                callback(error, this.githubLabels);
            }
        });
    }

    /**
     * Delete a GitHubApi label for current repository
     * @param {Object} label
     * @param {Function} callback
     */
    deleteLabel(label, callback) {
        this.github.issues.deleteLabel({
            user: this.githubUser,
            repo: this.githubRepo,
            name: label.name
        }, (error, resource) => {
            if (! error) {
                this.githubDeletedLabel = label;
            }

            if (isFunction(callback)) {
                callback(error, resource);
            }
        });
    }

    /**
     * Delete all GitHubApi labels for current repository
     * @param {Function} callback
     */
    deleteAllLabels(callback) {
        this.getRepositoryLabels((error, labels) => {
            if (labels) {
                labels.map((label) => {
                    this.deleteLabel(label, (error) => {
                        if (isFunction(callback)) {
                            callback(error);
                        }
                    });
                });
            }
        });
    }
}

module.exports = LabelSync;

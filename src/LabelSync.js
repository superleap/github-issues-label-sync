import GithubApiClient from 'github';
import Promise from 'bluebird';

/**
 * Simple wrapper around the github module issues function
 * @access public
 */
export default class GithubIssuesLabelSync {

    /**
     * The node-github npmjs.com package
     * @typedef {Object} GithubApiClient
     * @see https://github.com/mikedeboer/node-github
     */

    /**
     * The bluebird npmjs.com package
     * @typedef {Object} Promise
     * @see https://github.com/petkaantonov/bluebird
     */

    /**
     * The github issue label model
     * @typedef {Object} Label
     * @property {String} Label.name The name of the label
     * @property {String} [Label.color] The colour of the label
     * @property {String} [Label.status] Once a label operation is complete this field gets updated
     */

    /**
     * In order to work as an NPM module this class has to be called with specific parameters
     * @example
     * let config = {
     *   "github": {
     *     "user": "superleap",
     *     "repo": "github-issues-label-sync",
     *     "token": process.env.GH_TOKEN,
     *     "options": {
     *       "debug": true
     *     }
     *   },
     *   "categories": [
     *     {
     *       "name": "GH Review",
     *       "labels": [
     *         {
     *           "name": "accepted",
     *           "color": "009800"
     *         },
     *         {
     *           "name": "on hold",
     *           "color": "bfdadc"
     *         },
     *         {
     *           "name": "review-needed",
     *           "color": "fbca04"
     *         }
     *       ]
     *     },
     *     {
     *       "name": "Status",
     *       "labels": [
     *         {
     *           "name": "new",
     *           "color": "006b75"
     *         },
     *         {
     *           "name": "reverted",
     *           "color": "d93f0b"
     *         }
     *       ]
     *     }
     *   ];
     * }
     * let labels = [];
     * let {user, repo, token, options} = config.github;
     * let githubIssuesLabelSync = new (require('./lib/LabelSync'))(options, user, repo, token);
     * Array.from(config.categories).forEach((category) => {
     *   category.labels.forEach((label) => {
     *     label.name = `${category.name}: ${label.name}`;
     *     labels.push(label);
     *   });
     * });
     * @param {Object} [options={}] - github API Client options
     * @param {String} user - github repository user
     * @param {String} repo - github repository name
     * @param {String} token - github personal access token
     */
    constructor(options = {}, user, repo, token) {
        this.options = options;
        this.user = user;
        this.repo = repo;
        this.token = token;
        this.github = new GithubApiClient(this.options);
        this._labels = [];
        this._deletedLabels = [];
        this._createdLabels = [];
        this._updatedLabels = [];

        this.authenticate();
    }

    /**
     * Get github API Client options
     * @type {Object}
     */
    get options() {
        return this._options;
    }

    /**
     * Get github repository username
     * @type {String}
     */
    get user() {
        return this._user;
    }

    /**
     * Get github repository name
     * @type {String}
     */
    get repo() {
        return this._repo;
    }

    /**
     * Get github repository token
     * @type {String}
     */
    get token() {
        return this._token;
    }

    /**
     * Get github API Client
     * @type {GithubApiClient}
     */
    get github() {
        return this._github;
    }

    /**
     * Get github repository labels
     * @type {Array<GithubIssuesLabelSync.Label>}
     */
    get labels() {
        return this._labels;
    }

    /**
     * Get github API repository deleted labels
     * @type {Array<GithubIssuesLabelSync.Label>}
     */
    get deletedLabels() {
        return this._deletedLabels;
    }

    /**
     * Get github API repository created labels
     * @type {Array<GithubIssuesLabelSync.Label>}
     */
    get createdLabels() {
        return this._createdLabels;
    }

    /**
     * Get github API repository updated labels
     * @type {Array<GithubIssuesLabelSync.Label>}
     */
    get updatedLabels() {
        return this._updatedLabels;
    }

    /**
     * Set github API Client options
     * @type {Object} Options we instantiate the github api package with
     * @property {Boolean} [options.debug=false] Get request information with each call
     * @property {Boolean} [options.followRedirects=false] We don't need this for issues
     * @property {Promise} Promise We are using bluebird promises peering with github api package
     */
    set options(object) {
        this._options = object;
        this._options.followRedirects = false;
        this._options.Promise = Promise;
    }

    /**
     * Set github API repository username
     * @type {String}
     */
    set user(repoUrlUser) {
        this._user = repoUrlUser;
    }

    /**
     * Set github API repository name
     * @type {String}
     */
    set repo(repoUrlName) {
        this._repo = repoUrlName;
    }

    /**
     * Set github API OAuth2 personal access token
     * @type {String}
     */
    set token(personalAccessToken) {
        this._token = personalAccessToken;
    }

    /**
     * Set github API Client
     * @type {GithubApiClient}
     */
    set github(GithubApiClient) {
        this._github = GithubApiClient;
    }

    /**
     * Set github API repository labels
     * @type {Array<GithubIssuesLabelSync.Label>}
     */
    set labels(labels) {
        this._labels = labels;
    }

    /**
     * Push github API repository deleted label
     * @type {GithubIssuesLabelSync.Label}
     */
    set deletedLabel(label) {
        this._deletedLabels.push(label);
    }

    /**
     * Push github API repository created label
     * @type {GithubIssuesLabelSync.Label}
     */
    set createdLabel(label) {
        this._createdLabels.push(label);
    }

    /**
     * Push github API repository updated label
     * @type {GithubIssuesLabelSync.Label}
     */
    set updatedLabel(label) {
        this._updatedLabels.push(label);
    }

    /**
     * We only do this once
     * @access private
     */
    authenticate() {
        this.github.authenticate({
            "type": "oauth",
            "token": this.token
        });
    }

    /**
     * Get github API repository labels from remote
     * @example
     * githubIssuesLabelSync.getLabels().then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {Boolean} [meta=false] - Get extended response information
     * @return {Promise<GithubIssuesLabelSync.labels, Error>} Array of existing labels
     */
    getLabels(meta = false) {
        return new Promise((resolve, reject) => {
            return this.github.issues.getLabels({
                "user": this.user,
                "repo": this.repo
            }, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    if (true !== meta) {
                        Reflect.deleteProperty(response, 'meta');
                    }

                    this.labels = response;

                    resolve(this.labels);
                }
            });
        });
    }

    /**
     * Delete github API repository label from remote
     * @example
     * githubIssuesLabelSync.deleteLabel(label).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {GithubIssuesLabelSync.Label} label - The label we want to delete
     * @param {String} label.name - The label's name
     * @return {Promise<GithubIssuesLabelSync.deletedLabels, Error>} Deleted label
     */
    deleteLabel(label) {
        return new Promise((resolve, reject) => {
            return this.github.issues.deleteLabel({
                "user": this.user,
                "repo": this.repo,
                "name": label.name
            }, (error) => {
                let success = true;

                if (error) {
                    if (error.toJSON().code === 404) {
                        label.status = 'not found';
                    } else {
                        success = false;
                        reject(error);
                    }
                } else {
                    label.status = 'success';
                }

                if (success) {
                    this.deletedLabel = label;

                    resolve(this.deletedLabels);
                }
            });
        });
    }

    /**
     * Delete github API repository labels from remote
     * @example
     * githubIssuesLabelSync.deleteLabels(labels).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {Array<GithubIssuesLabelSync.Label>} labels - The labels we want to delete
     * @return {Promise<GithubIssuesLabelSync.deletedLabels, Error>} Array of deleted labels
     */
    deleteLabels(labels) {
        return Promise.all(labels).map((label) => {
            return this.deleteLabel(label);
        });
    }

    /**
     * Create github API repository label on remote
     * @example
     * githubIssuesLabelSync.createLabel(label).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {GithubIssuesLabelSync.Label} label - The label we want to create
     * @param {String} label.name - The label's name
     * @param {String} label.color - The label's colour
     * @param {String} label.status - Promise status of operation
     * @return {Promise<GithubIssuesLabelSync.createdLabels, Error>} Created label
     */
    createLabel(label) {
        return new Promise((resolve, reject) => {
            return this.github.issues.createLabel({
                "user": this.user,
                "repo": this.repo,
                "name": label.name,
                "color": label.color
            }, (error) => {
                let success = true;

                if (error) {
                    if (error.code === 422 && JSON.parse(error.message).errors[0].code === 'already_exists') {
                        label.status = 'duplicate';
                    } else {
                        success = false;
                        reject(error);
                    }
                } else {
                    label.status = 'success';
                }

                if (success) {
                    this.createdLabel = label;

                    resolve(this.createdLabels);
                }
            });
        });
    }

    /**
     * Create github API repository labels on remote
     * @example
     * githubIssuesLabelSync.importLabels(labels).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {Array<GithubIssuesLabelSync.Label>} labels - The labels we want to create
     * @return {Promise<GithubIssuesLabelSync.createdLabels, Error>} Array of created labels
     */
    createLabels(labels) {
        return Promise.all(labels).map((label) => {
            return this.createLabel(label);
        });
    }

    /**
     * Update github API repository label on remote
     * @example
     * githubIssuesLabelSync.updateLabel(label).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {GithubIssuesLabelSync.Label} label - The label we want to update
     * @param {String} label.name - The label's name
     * @param {String} label.color - The label's colour
     * @param {String} label.status - Promise status of operation
     * @return {Promise<GithubIssuesLabelSync.createdLabels, Error>} Updated label
     */
    updateLabel(label) {
        return new Promise((resolve, reject) => {
            return this.github.issues.updateLabel({
                "user": this.user,
                "repo": this.repo,
                "name": label.name,
                "color": label.color
            }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    label.status = 'success';
                    this.updatedLabel = label;
                    resolve(this.updatedLabels);
                }
            });
        });
    }

    /**
     * Update github API repository labels on remote
     * @example
     * githubIssuesLabelSync.updateLabels(labels).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {Array<GithubIssuesLabelSync.Label>} labels - The labels we want to update
     * @return {Promise<GithubIssuesLabelSync.createdLabels, Error>} Array of updated labels
     */
    updateLabels(labels) {
        return Promise.all(labels).map((label) => {
            return this.updateLabel(label);
        });
    }

    /**
     * Delete all github API repository labels on remote
     * @example
     * githubIssuesLabelSync.purgeLabels().then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @return {Promise<GithubIssuesLabelSync.deletedLabels, Error>} Array of deleted labels
     */
    purgeLabels() {
        return this.getLabels().then((labels) => {
            return Promise.all(labels).map((label) => {
                return this.deleteLabel(label);
            });
        });
    }

    /**
     * Import all github API repository labels on remote while optionally removing all the others
     * @example
     * githubIssuesLabelSync.importLabels(labels, false).then((response) => {
     *   console.log(response);
     * }).catch((error) => {
     *   console.log(error.toJSON());
     * });
     * @async
     * @param {Array<GithubIssuesLabelSync.Label>} labels - The labels we want to import
     * @param {Boolean} [purge=false] - Wether to delete all existing tags on remote or not
     * @return {Promise<GithubIssuesLabelSync.createdLabels, Error>} Array of created labels
     */
    importLabels(labels, purge = true) {
        return Promise.resolve(true === purge ? this.purgeLabels() : true).then(() => {
            return this.createLabels(labels);
        });
    }
}

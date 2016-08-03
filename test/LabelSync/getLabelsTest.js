import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import config from './../test-config';

let expect = chai.expect;
let LabelSync = require('./../../src/LabelSync');

chai.use(chaiAsPromised);

/**
 * @test {LabelSync}
 */
describe('LabelSync#getlabels', () => {
    let LabelSyncTest;
    let getLabelsTest;
    let authenticate;
    let labels;
    let error;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        getLabelsTest = sinon.stub(LabelSyncTest.github.issues, 'getLabels');
        labels = [
            {
                url: 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Semver:%20premajor',
                name: 'Semver: premajor',
                color: 'e99695'
            },
            {
                url: 'https://api.github.com/repos/superleap/github-issues-label-sync/labels/Type:%20feature-request',
                name: 'Type: feature-request',
                color: 'c7def8'
            }
        ];
        labels.meta = {
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '4995',
            'x-ratelimit-reset': '1470247853',
            'x-oauth-scopes': 'admin:gpg_key, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, delete_repo, gist, notifications, repo, user',
            link: '<https://api.github.com/repositories/62481389/labels?access_token=f77d5f4a01e2a745b092ea281a8d2b8e63087b8a&page=2>; rel="next", <https://api.github.com/repositories/62481389/labels?access_token=f77d5f4a01e2a745b092ea281a8d2b8e63087b8a&page=2>; rel="last"',
            etag: '"bfc5008b7bcf38ddc25ac34f44152479"',
            status: '200 OK'
        };
        error = {
            "code": 401,
            "status": 'Unauthorized',
            "message": '{"message":"Bad credentials","documentation_url":"https://developer.github.com/v3"}'
        };

        authenticate = sinon.stub(LabelSyncTest, 'authenticate');

    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('[meta=true] should return a promise resolving to existing labels', (done) => {
        getLabelsTest.yieldsAsync(null, labels);

        let response = LabelSyncTest.getLabels(true);
        expect(response).to.eventually.become(labels);
        expect(response).to.eventually.have.property('meta');

        done();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('[meta=false] should return a promise resolving to existing labels', (done) => {
        getLabelsTest.yieldsAsync(null, labels);
        Reflect.deleteProperty(labels, 'meta');

        let response = LabelSyncTest.getLabels(false);
        expect(response).to.eventually.become(labels);
        expect(response).to.eventually.not.have.property('meta');

        done();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('should return a promise rejecting with error', (done) => {
        getLabelsTest.yieldsAsync(error, null);

        expect(LabelSyncTest.getLabels()).to.eventually.be.rejectedWith(error);

        done();
    });
});

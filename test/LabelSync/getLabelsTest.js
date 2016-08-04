import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import config from './../test-config';
import mocks from './../test-mocks';

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

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        getLabelsTest = sinon.stub(LabelSyncTest.github.issues, 'getLabels');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
        labels = mocks.Label.getLabels;
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('should return a promise resolving to existing labels with meta information', (done) => {
        getLabelsTest.yieldsAsync(null, labels);

        let response = LabelSyncTest.getLabels(true);
        expect(response).to.eventually.become(labels);
        expect(response).to.eventually.have.property('meta');

        done();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('should return a promise resolving to existing labels without meta information', (done) => {
        getLabelsTest.yieldsAsync(null, labels);
        delete labels.meta;

        let response = LabelSyncTest.getLabels(false);
        expect(response).to.eventually.become(labels);
        expect(response).to.eventually.not.have.property('meta');

        done();
    });

    /**
     * @test {LabelSync#getLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        getLabelsTest.yieldsAsync(mocks.Error.Unauthorized, null);

        expect(LabelSyncTest.getLabels()).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

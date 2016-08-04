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
    let Error;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        getLabelsTest = sinon.stub(LabelSyncTest.github.issues, 'getLabels');
        labels = mocks.Label.getLabels;
        Error = mocks.Error;

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
    it('should return a promise rejecting with error when unauthorized', (done) => {
        getLabelsTest.yieldsAsync(Error, null);

        expect(LabelSyncTest.getLabels()).to.eventually.be.rejectedWith(Error.Unauthorized);

        done();
    });
});

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
describe('LabelSync#importLabels', () => {
    let LabelSyncTest;
    let createLabelTest;
    let purgeLabelsTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        createLabelTest = sinon.stub(LabelSyncTest.github.issues, 'createLabel');
        purgeLabelsTest = sinon.stub(LabelSyncTest, 'purgeLabels');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#importLabels}
     */
    it('should return an array of imported labels when called with purge', (done) => {
        purgeLabelsTest.returns(true);

        let response = LabelSyncTest.importLabels(mocks.Label.createLabels);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(2);

        done();
    });

    /**
     * @test {LabelSync#importLabels}
     */
    it('should return an array of imported labels when called without purge', (done) => {
        purgeLabelsTest.returns(true);

        let response = LabelSyncTest.importLabels(mocks.Label.createLabels, false);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(2);

        done();
    });

    /**
     * @test {LabelSync#importLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        createLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.importLabels(mocks.Label.createLabels)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

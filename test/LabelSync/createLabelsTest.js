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
describe('LabelSync#createLabels', () => {
    let LabelSyncTest;
    let createLabelTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        createLabelTest = sinon.stub(LabelSyncTest.github.issues, 'createLabel');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#createLabel}
     */
    it('should return an array of successful operations when adding new labels', (done) => {
        createLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.createLabels(mocks.Label.createLabels);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(mocks.Label.createLabels.length);

        done();
    });

    /**
     * @test {LabelSync#createLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        createLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.createLabels(mocks.Label.createLabels)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

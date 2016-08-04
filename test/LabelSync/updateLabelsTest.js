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
describe('LabelSync#updateLabels', () => {
    let LabelSyncTest;
    let updateLabelTest;
    let authenticate;
    let labels;
    let Error;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        updateLabelTest = sinon.stub(LabelSyncTest.github.issues, 'updateLabel');
        labels = mocks.Label.updateLabels;
        Error = mocks.Error;

        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#updateLabel}
     */
    it('should return an array of successful operations when adding new labels', (done) => {
        updateLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.updateLabels(labels);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(labels.length);

        done();
    });

    /**
     * @test {LabelSync#updateLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        updateLabelTest.yieldsAsync(Error.Unauthorized);

        expect(LabelSyncTest.updateLabels(labels)).to.eventually.be.rejectedWith(Error.Unauthorized);

        done();
    });
});

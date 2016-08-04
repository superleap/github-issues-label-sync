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
describe('LabelSync#deleteLabels', () => {
    let LabelSyncTest;
    let deleteLabelTest;
    let authenticate;
    let labels;
    let Error;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        deleteLabelTest = sinon.stub(LabelSyncTest.github.issues, 'deleteLabel');
        labels = mocks.Label.deleteLabels;
        Error = mocks.Error;

        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#deleteLabel}
     */
    it('should return an array of successful operations when adding new labels', (done) => {
        deleteLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.deleteLabels(labels);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(labels.length);

        done();
    });

    /**
     * @test {LabelSync#deleteLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        deleteLabelTest.yieldsAsync(Error.Unauthorized);

        expect(LabelSyncTest.deleteLabels(labels)).to.eventually.be.rejectedWith(Error.Unauthorized);

        done();
    });
});

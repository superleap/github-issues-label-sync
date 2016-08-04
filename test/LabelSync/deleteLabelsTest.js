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

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        deleteLabelTest = sinon.stub(LabelSyncTest.github.issues, 'deleteLabel');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#deleteLabel}
     */
    it('should return an array of successful operations when trying to delete existing labels', (done) => {
        deleteLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.deleteLabels(mocks.Label.deleteLabels);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(mocks.Label.deleteLabels.length);

        done();
    });

    /**
     * @test {LabelSync#deleteLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        deleteLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.deleteLabels(mocks.Label.deleteLabels)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

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
describe('LabelSync#deleteLabel', () => {
    let LabelSyncTest;
    let deleteLabelTest;
    let authenticate;
    let label;
    let deletedLabel;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        deleteLabelTest = sinon.stub(LabelSyncTest.github.issues, 'deleteLabel');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
        label = mocks.Label.deleteLabel;
        deletedLabel = mocks.Label.setters.deletedLabel;
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#deleteLabel}
     */
    it('should return { "status": "success" } when trying to delete an existing label', (done) => {
        deleteLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.deleteLabel(label);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(1);
        expect(response).to.eventually.have.deep.property('[0].status', 'success');

        done();
    });

    /**
     * @test {LabelSync#deleteLabel}
     */
    it('should return { "status": "not found" } when trying to delete a non existing label', (done) => {
        deleteLabelTest.yieldsAsync(mocks.Error.Deletedlabel);
        deletedLabel.status = 'not found';

        let response = LabelSyncTest.deleteLabel(label);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(1);
        expect(response).to.eventually.have.deep.property('[0].status', 'not found');

        done();
    });

    /**
     * @test {LabelSync#deleteLabel}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        deleteLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.deleteLabel(label)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

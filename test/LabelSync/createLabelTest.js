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
describe('LabelSync#createLabel', () => {
    let LabelSyncTest;
    let createLabelTest;
    let authenticate;
    let label;
    let createdLabel;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        createLabelTest = sinon.stub(LabelSyncTest.github.issues, 'createLabel');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
        label = mocks.Label.createLabel;
        createdLabel = mocks.Label.setters.createdLabel;
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#createLabel}
     */
    it('should return { "status": "success" } when trying to add a new label', (done) => {
        createLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.createLabel(label);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(1);
        expect(response).to.eventually.have.deep.property('[0].status', 'success');

        done();
    });

    /**
     * @test {LabelSync#createLabel}
     */
    it('should return { "status": "duplicate" } when trying to add an existing label', (done) => {
        createLabelTest.yieldsAsync(mocks.Error.DuplicateLabel);
        createdLabel.status = 'duplicate';

        let response = LabelSyncTest.createLabel(label);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(1);
        expect(response).to.eventually.have.deep.property('[0].status', 'duplicate');

        done();
    });

    /**
     * @test {LabelSync#createLabel}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        createLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.createLabel(label)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

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
describe('LabelSync#updatelabel', () => {
    let LabelSyncTest;
    let updateLabelTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        updateLabelTest = sinon.stub(LabelSyncTest.github.issues, 'updateLabel');
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#updateLabel}
     */
    it('should return { "status": "success" } when updating an existing label', (done) => {
        updateLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.updateLabel(mocks.Label.updateLabel);
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(1);
        expect(response).to.eventually.have.deep.property('[0].status', 'success');
        expect(response).to.eventually.have.deep.property('[0].color', '000');

        done();
    });

    /**
     * @test {LabelSync#updateLabel}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        updateLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.updateLabel(mocks.Label.updateLabel)).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

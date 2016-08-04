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
describe('LabelSync#purgeLabels', () => {
    let LabelSyncTest;
    let deleteLabelTest;
    let getLabelsTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        deleteLabelTest = sinon.stub(LabelSyncTest.github.issues, 'deleteLabel');
        getLabelsTest = sinon.stub(LabelSyncTest, 'getLabels', function () {
            return Promise.resolve(mocks.Label.getLabels);
        });
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#purgeLabels}
     */
    it('should return an array of purged labels when called', (done) => {
        deleteLabelTest.yieldsAsync(null);

        let response = LabelSyncTest.purgeLabels();
        expect(response).to.be.fulfilled;
        expect(response).to.eventually.have.lengthOf(2);

        done();
    });

    /**
     * @test {LabelSync#purgeLabels}
     */
    it('should return a promise rejecting with error when unauthorized', (done) => {
        deleteLabelTest.yieldsAsync(mocks.Error.Unauthorized);

        expect(LabelSyncTest.purgeLabels()).to.eventually.be.rejectedWith(mocks.Error.Unauthorized);

        done();
    });
});

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import config from './../test-config';

let expect = chai.expect;
let LabelSync = require('./../../src/LabelSync');

chai.use(chaiAsPromised);

/**
 * @test {LabelSync}
 */
describe('LabelSync#constructor', () => {
    let LabelSyncTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(undefined, config.user, config.repo, config.token);
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#constructor}
     */
    it('should be able to setup the class with default parameters', () => {
        expect(LabelSyncTest).to.be.an('object');
    });
});

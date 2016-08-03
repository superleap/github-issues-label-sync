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
describe('LabelSync#setters', () => {
    let LabelSyncTest;
    let authenticate;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(() => {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#options}
     */
    it('should be able to <set> _options', () => {
        LabelSyncTest.options = config.options;

        expect(LabelSyncTest.options).to.be.an('object');
        expect(LabelSyncTest.options).to.equal(config.options);
    });

    /**
     * @test {LabelSync#labels}
     */
    it('should be able to <set> _labels', () => {
        LabelSyncTest.labels = [];

        expect(LabelSyncTest.labels).to.be.an('array');
        expect(LabelSyncTest.labels).to.have.length(0);
    });

    /**
     * @test {LabelSync#deletedLabel}
     */
    it('should be able to <set> _deletedLabel', () => {
        LabelSyncTest.deletedLabel = config.labels.deletedLabel;

        expect(LabelSyncTest.deletedLabels).to.be.an('array');
        expect(LabelSyncTest.deletedLabels).to.contain(config.labels.deletedLabel);
    });

    /**
     * @test {LabelSync#createdLabel}
     */
    it('should be able to <set> _createdLabel', () => {
        LabelSyncTest.createdLabel = config.labels.createdLabel;

        expect(LabelSyncTest.createdLabels).to.be.an('array');
        expect(LabelSyncTest.createdLabels).to.contain(config.labels.createdLabel);
    });

    /**
     * @test {LabelSync#updatedLabel}
     */
    it('should be able to <set> _updatedLabel', () => {
        LabelSyncTest.updatedLabel = config.labels.updatedLabel;

        expect(LabelSyncTest.updatedLabels).to.be.an('array');
        expect(LabelSyncTest.updatedLabels).to.contain(config.labels.updatedLabel);
    });
});

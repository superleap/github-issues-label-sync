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
describe('LabelSync#setters', () => {
    let LabelSyncTest;
    let authenticate;
    let labelsSetters;

    beforeEach(() => {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
        labelsSetters = mocks.Label.setters;
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
        LabelSyncTest.deletedLabel = labelsSetters.deletedLabel;

        expect(LabelSyncTest.deletedLabels).to.be.an('array');
        expect(LabelSyncTest.deletedLabels).to.contain(labelsSetters.deletedLabel);
    });

    /**
     * @test {LabelSync#createdLabel}
     */
    it('should be able to <set> _createdLabel', () => {
        LabelSyncTest.createdLabel = labelsSetters.createdLabel;

        expect(LabelSyncTest.createdLabels).to.be.an('array');
        expect(LabelSyncTest.createdLabels).to.contain(labelsSetters.createdLabel);
    });

    /**
     * @test {LabelSync#updatedLabel}
     */
    it('should be able to <set> _updatedLabel', () => {
        LabelSyncTest.updatedLabel = labelsSetters.updatedLabel;

        expect(LabelSyncTest.updatedLabels).to.be.an('array');
        expect(LabelSyncTest.updatedLabels).to.contain(labelsSetters.updatedLabel);
    });
});

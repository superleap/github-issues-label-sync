let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let LabelSync = require('./../../src/LabelSync');
let config = require('./../test-config');

/**
 * @test {LabelSync}
 */
describe('LabelSync setters', function () {
    var LabelSyncTest;
    var authenticate;

    beforeEach(function () {
        LabelSyncTest = new LabelSync(config.options, config.user, config.repo, config.token);
        authenticate = sinon.stub(LabelSyncTest, 'authenticate');
    });

    afterEach(function () {
        authenticate.restore();
    });

    /**
     * @test {LabelSync#options}
     */
    it('should be able to <set> _options', function () {
        LabelSyncTest.options = config.options;

        expect(LabelSyncTest.options).to.be.an('object');
        expect(LabelSyncTest.options).to.equal(config.options);
    });

    /**
     * @test {LabelSync#labels}
     */
    it('should be able to <set> _labels', function () {
        LabelSyncTest.labels = [];

        expect(LabelSyncTest.labels).to.be.an('array');
        expect(LabelSyncTest.labels).to.have.length(0);
    });

    /**
     * @test {LabelSync#deletedLabel}
     */
    it('should be able to <set> _deletedLabel', function () {
        LabelSyncTest.deletedLabel = config.labels.deletedLabel;

        expect(LabelSyncTest.deletedLabels).to.be.an('array');
        expect(LabelSyncTest.deletedLabels).to.contain(config.labels.deletedLabel);
    });

    /**
     * @test {LabelSync#createdLabel}
     */
    it('should be able to <set> _createdLabel', function () {
        LabelSyncTest.createdLabel = config.labels.createdLabel;

        expect(LabelSyncTest.createdLabels).to.be.an('array');
        expect(LabelSyncTest.createdLabels).to.contain(config.labels.createdLabel);
    });

    /**
     * @test {LabelSync#updatedLabel}
     */
    it('should be able to <set> _updatedLabel', function () {
        LabelSyncTest.updatedLabel = config.labels.updatedLabel;

        expect(LabelSyncTest.updatedLabels).to.be.an('array');
        expect(LabelSyncTest.updatedLabels).to.contain(config.labels.updatedLabel);
    });
});

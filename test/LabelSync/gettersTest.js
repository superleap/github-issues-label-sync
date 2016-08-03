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
    it('should be able to <get> _options', function () {
        expect(LabelSyncTest.options).to.be.an('object');
        expect(LabelSyncTest.options).to.equal(config.options);
    });

    /**
     * @test {LabelSync#user}
     */
    it('should be able to <get> _user', function () {
        expect(LabelSyncTest.user).to.be.a('string');
        expect(LabelSyncTest.user).to.equal(config.user);
    });

    /**
     * @test {LabelSync#repo}
     */
    it('should be able to <get> _repo', function () {
        expect(LabelSyncTest.repo).to.be.a('string');
        expect(LabelSyncTest.repo).to.equal(config.repo);
    });

    /**
     * @test {LabelSync#token}
     */
    it('should be able to <get> _token', function () {
        expect(LabelSyncTest.token).to.be.a('string');
        expect(LabelSyncTest.token).to.equal(config.token);
    });

    /**
     * @test {LabelSync#labels}
     */
    it('should be able to <get> _labels', function () {
        expect(LabelSyncTest.labels).to.be.an('array');
        expect(LabelSyncTest.labels).to.have.length(0);
    });

    /**
     * @test {LabelSync#deletedLabels}
     */
    it('should be able to <get> _deletedLabels', function () {
        expect(LabelSyncTest.deletedLabels).to.be.an('array');
        expect(LabelSyncTest.deletedLabels).to.have.length(0);
    });

    /**
     * @test {LabelSync#createdLabels}
     */
    it('should be able to <get> _createdLabels', function () {
        expect(LabelSyncTest.createdLabels).to.be.an('array');
        expect(LabelSyncTest.createdLabels).to.have.length(0);
    });

    /**
     * @test {LabelSync#updatedLabels}
     */
    it('should be able to <get> _updatedLabels', function () {
        expect(LabelSyncTest.updatedLabels).to.be.an('array');
        expect(LabelSyncTest.updatedLabels).to.have.length(0);
    });
});

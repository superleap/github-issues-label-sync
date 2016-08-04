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
describe('LabelSync#getters', () => {
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
    it('should be able to <get> _options', () => {
        expect(LabelSyncTest.options).to.be.an('object');
        expect(LabelSyncTest.options).to.equal(config.options);
    });

    /**
     * @test {LabelSync#user}
     */
    it('should be able to <get> _user', () => {
        expect(LabelSyncTest.user).to.be.a('string');
        expect(LabelSyncTest.user).to.equal(config.user);
    });

    /**
     * @test {LabelSync#repo}
     */
    it('should be able to <get> _repo', () => {
        expect(LabelSyncTest.repo).to.be.a('string');
        expect(LabelSyncTest.repo).to.equal(config.repo);
    });

    /**
     * @test {LabelSync#token}
     */
    it('should be able to <get> _token', () => {
        expect(LabelSyncTest.token).to.be.a('string');
        expect(LabelSyncTest.token).to.equal(config.token);
    });

    /**
     * @test {LabelSync#labels}
     */
    it('should be able to <get> _labels', () => {
        expect(LabelSyncTest.labels).to.be.an('array');
        expect(LabelSyncTest.labels).to.have.length(0);
    });

    /**
     * @test {LabelSync#deletedLabels}
     */
    it('should be able to <get> _deletedLabels', () => {
        expect(LabelSyncTest.deletedLabels).to.be.an('array');
        expect(LabelSyncTest.deletedLabels).to.have.length(0);
    });

    /**
     * @test {LabelSync#createdLabels}
     */
    it('should be able to <get> _createdLabels', () => {
        expect(LabelSyncTest.createdLabels).to.be.an('array');
        expect(LabelSyncTest.createdLabels).to.have.length(0);
    });

    /**
     * @test {LabelSync#updatedLabels}
     */
    it('should be able to <get> _updatedLabels', () => {
        expect(LabelSyncTest.updatedLabels).to.be.an('array');
        expect(LabelSyncTest.updatedLabels).to.have.length(0);
    });
});

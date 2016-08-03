let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let LabelSync = require('./../../src/LabelSync');
let config = require('./../test-config');

/**
 * @test {LabelSync}
 */
describe('LabelSync constructor', function () {
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
     * @test {LabelSync#constructor}
     */
    it('should be able to setup the class', function () {
        expect(LabelSyncTest).to.be.an('object');
    });
});

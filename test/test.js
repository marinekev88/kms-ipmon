const expect = require('chai').expect;
const { Kms } = require("../dist");
const HttpStatus = require('http-status-codes');

const _mockKms = new Kms();

describe('Return String Ip Address', () => {
    it('Should Be an ip Address string V4', async () => {
        let res = await _mockKms.getIp4();
        expect(res).to.be.a('string');
    });

    it('Should Be an ip Address string V6', async () => {
        let res = await _mockKms.getIp6();
        expect(res).to.be.a('string');
    });

    it('Should Return HttpStatus number', async () => {
        let res = await _mockKms.networkTest('https://api.kmserver.co/api/v1/HealthCheck/Status');
        expect(res).to.equal(HttpStatus.OK);
    })
});

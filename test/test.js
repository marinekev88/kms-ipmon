const expect = require('chai').expect;
const { KmsIP } = require("../dist");
const HttpStatus = require('http-status-codes');

const _mockKms = new KmsIP();

describe('Return String Ip Address', () => {
    it('Should Be an ip Address string V4', async () => {
        const res = await _mockKms.getIp4();
        expect(res).to.be.a('string');
    });

    it('Should Be an ip Address string V6', async () => {
        const res = await _mockKms.getIp6();
        expect(res).to.be.a('string');
    });

    it('Should Return HttpStatus number', async () => {
        const res = await _mockKms.networkTest('https://api.kmserver.co/api/v1/HealthCheck/Status');
        expect(res).to.equal(HttpStatus.OK);
    })
});



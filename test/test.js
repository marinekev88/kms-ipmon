const expect = require('chai').expect;
const { Kms } = require('../dist/index');
const index = new Kms()

describe('Return String Ip Address', () => {
    it('Should Be an ip Address string V4', async () => {
        let res = await index.getIp4();

        expect(res).to.be.a('string');
    });

    it('Should Be an ip Address string V6', async () => {
        let res = await index.getIp6();

        expect(res).to.be.a('string');
    });
});

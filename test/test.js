import Chai from 'chai';
import Kms from '../dist/index.js';

const expect = Chai.expect;
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
});

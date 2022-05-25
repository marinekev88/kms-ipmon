const expect = require('chai').expect;
const assert = require('chai').assert;
require('dotenv').config();
const { KmsIP, Ionos } = require("../dist");
const HttpStatus = require('http-status-codes');
const _mockIonosClient = new Ionos(`${process.env.IONOS_PREFIX}`, `${process.env.IONOS_SECRET}`);
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
        const res = await _mockKms.networkTest('https://api.kmserver.co/api/v2/status/get');
        expect(res).to.equal(HttpStatus.OK);
    })
});

describe('Return data from ionos', () => {
   it('Returns a response', async (done) => {
        const domain = "kmsdev.io";
        const subDomains = ["test"];
        const newIp = "72.210.62.7";

        _mockIonosClient.UpdateARecords(newIp, domain, subDomains).then((res) => {
            res.to.be.equal(true);
        })

        done();
    });

    it("Returns Error No Domain Id Found", async () => {

        const domain = "kmdev.io";
        const subDomains = ["test"];
        const newIp = "72.210.62.7";

        _mockIonosClient.UpdateARecords(newIp, domain, subDomains)
            .then((res) => console.dir(res, { depth: null }))
            .catch((err) => {
                console.dir(err, { depth: null })
            });
    })
})



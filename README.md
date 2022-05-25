# KMS-IPMON
Server Public Ip Monitoring Class For 'api.ipify.org'

## Installation 
```sh
npm i -S kms-ipmon
yarn add kms-ipmon
bower install kms-ipmon --save 
```

## Usage
###Javascript
```javascript
//Add {"type": "module"} to package.json of your project//
import { KmsIP } from 'kms-ipmon';
const _service = new KmsIP(); // You can name your const what ever you want and new up a Kms instance//
//For Ip V4
_service.getIp4().then(res => console.log(res));
//For Ip V6
_service.getIp6().then(res => console.log(res));
//For NetworkTest Externally, outputs Http Status Code of the provided URL to your known endpoint//
_service.networkTest('https://google.com').then(res => console.log(res));
```
###Typescript

```typescript
import { KmsIP } from 'kms-ipmon';
const _service: KmsIP = new KmsIP(); // You can name your const what ever you want and new up a Kms instance //
//For Ip V4 To Console
_service.getIp4().then(res => console.log(res));
//For Ip V6 To Console
_service.getIp6().then(res => console.log(res));
//For NetworkTest Externally, outputs Http Status Code of the provided URL//
_service.networkTest('https://google.com').then(res => console.log(res));
```
```shell
Sample getIp output to console
35.45.1.223

Sample networkTest output to console
200
```
```javascript

//Using as a variable
import { KmsIP } from "kms-ipmon";
const _service = new KmsIP();

(async () => {
  const currentIp = '000.000.0.0'; //Or whatever you monitoring
  const ip = await _service.getIp4();

  if (ip != currentIp) {
    const netTest = await _service.networkTest('https://someendpointtotest.com');
    if(netTest != HttpStatus.OK)
      throw 'Some Notifiation or automation to update'
  }  
})();
```
 ###DNS Provider Update
The beta branch is being updated to include popular DNS providers in order to\
allow this monitor package to be inclusive of home lab developers on Dynamic Ip's\
\
The Current Providers:
  - GoDaddy 
  - DnsExit
  - Ionos

The Planned Provider Additions:
  - BlueHost << Currently does not have a developer API 
  - HostGator << Requires an active customer account which I do not have

Please Email <a href="mailto:km@xpro.dev">Me</a> with any suggestions on providers with a link to their developer api page.
 ###DNS Usage
  ####Godaddy:
```javascript
// Import the Provider and Ip Getter
import { GodaddyProvider, DnsExit, Ionos, KmsIP } from "kms-ipmon";

// You need to provide your API key that you
// get from https://developers.godaddy.com to the constructor
const _godaddy = new GodaddyProvider("YOUR_GODADDY_API_KEY"); // Godaddy format is "apikeystring:apisecretstring" << Conjoin the key and secret
const _dnsExit = new DnsExit("YOUR_DNSEXIT_API_KEY");
const _ionos = new Ionos("YOUR_PUBLIC_PREFIX", "YOUR_SECRET_KEY");
const _service = new KmsIP();

// Current functionalitiy will only update "A" records of root domain and subdomains
// With GoDaddy the sub domain list must include "@" to signify the ROOT domain > 
// Example: whatever.com === "@" and shop.whatever.com === "shop"
// You will need to provide 3 objects to the UpdateARecords method 
// >>> New Ip address, ROOT domain, Array of subdomains including '@' as the first index
const Updater = async () => {
    
    const newIp = _service.getIp4(); 
    // However you want to generate you new ip 
    // KmsIP has a get method for it though getIp4 or getIp6 
    const updateObject = {
        rootDomian: "whatever.com",
        subdomains: [ "@", "shop", "buy", "support" ]
    }
    // Returns a bool value upon updating data
    return await _godaddy.UpdateARecords(newIp, updateObject.rootDomian, updateObject.subdomains);
    
    // The reason of splitting the root and the subdomain list 
    // was for users to be able to write their data in different ways
    // Examples of other data inputs:
    // const domainArray = ["@", "hello", "world"];
    // return await _provider.UpdateARecords(newIp, "mydoamin.com", domainArray);
    // or:
    // return await _provider.UpdateARecords(newIp, "mydoamin.com", ["@", "hello", "there"]);
    // ^^ Not the recommended way though
    // Object passing is my recommended way
}

Updater().then(res => console.log(res)).catch(err => console.log(err));
```
# Contributing Code Changes
## Pull Requests
- All PR's require approval for merge, make sure any tests created are covering you class/code. 
- Make sure to document you changes and their purpose clearly so I can approve them quickly.
- Any question's regarding PR's can be emailed to me.
## Testing
```shell
git clone https://github.com/marinekev88/kms-ipmon.git
cd kms-ipmon

npm i
npm run build

npm test
```

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
import {KmsIP} from 'kms-ipmon';
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
import {KmsIP} from 'kms-ipmon';
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
import {KmsIP} from "kms-ipmon";
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

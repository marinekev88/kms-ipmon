# KMS-IPMON
Server Public Ip Monitoring Class For 'api.ipify.org'

## Installation 
```sh
npm i -S kms-ipmon [non-shorthand: npm install kms-ipmon --save]
yarn add kms-ipmon
bower install kms-ipmon --save 
```

## Usage
###Javascript
```javascript
const { Kms } = require('kms-ipmon');
const app = new Kms();
//For Ip V4
app.getIp4().then(res => console.log(res));
//For Ip V6
app.getIp6().then(res => console.log(res));
```
###Typescript

```typescript
import { Kms } from "kms-ipmon";
const app: Kms = new Kms();
//For Ip V4
app.getIp4().then(res => console.log(res));
//For Ip V6
app.getIp6().then(res => console.log(res));
```
```shell
Sample output to console
35.45.1.223
```
## Test
```shell
npm run test
```

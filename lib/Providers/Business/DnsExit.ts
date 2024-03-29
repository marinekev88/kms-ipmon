﻿import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DnsExitData, DnsExitUpdate } from '../Models';

class DnsExit {
  private readonly _key: string;
  private readonly _rootApi: string;

  constructor(ApiKey: string) {
    this._key = ApiKey;
    this._rootApi = 'https://api.dnsexit.com/dns/';
  }

  private handler = async (Data: DnsExitData, RecordType: string): Promise<boolean> => {
    const domainUpdateList: DnsExitUpdate[] = [];

    for (const dom of Data.DomainList) {
      const domainData: DnsExitUpdate = {
        type: RecordType,
        name: dom,
        content: Data.IpUpdate,
        ttl: 600,
      };
      domainUpdateList.push(domainData);
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this._rootApi,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        apikey: this._key,
        domain: Data.RootDomain,
        update: domainUpdateList,
      },
    };

    try {
      return await axios.request(config);
    } catch (err: unknown) {
      console.log(err);
      return false;
    }
  };

  UpdateARecords = async (IpAddressUpdate: AxiosResponse, rootDomain: string, subDomains: string[]): Promise<boolean> => {
    const Record = 'A';
    const UpdateData: DnsExitData = {
      IpUpdate: IpAddressUpdate.toString(),
      RootDomain: rootDomain,
      DomainList: subDomains,
    };

    return await this.handler(UpdateData, Record);
  };
}

export default DnsExit;

import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { IonosRecordsDto, IonosZoneResponseDto } from '../Models';

class Ionos {
  private readonly _prefix: string;
  private readonly _secret: string;
  private readonly _rootApiUrl: string;
  private readonly _headers: AxiosRequestHeaders;

  constructor(prefix: string, secret: string) {
    this._prefix = prefix;
    this._secret = secret;
    this._rootApiUrl = 'https://api.hosting.ionos.com/dns/v1/zones';

    this._headers = {
      Accept: 'application/json',
      'X-API-Key': `${this._prefix}.${this._secret}`,
    };
  }

  private handler = async (newIp: string, domain: string, subDomains: string[]): Promise<boolean> => {
    const zoneId = await this.getZoneIdAsync(domain);
    const updateList = this.buildRecordUpdateDataList(newIp, domain, subDomains);

    return await this.updateRecordsForDomain(zoneId, updateList);
  };

  private getZoneIdAsync = async (domainName: string): Promise<string> => {
    // tslint:disable-next-line:one-variable-per-declaration
    let zoneId: string | null = null;
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this._rootApiUrl,
      headers: this._headers,
    };

    const zoneDataList: IonosZoneResponseDto[] = (await axios(config)).data;

    for (const zone of zoneDataList) {
      if (zone.name === domainName) {
        zoneId = zone.id;
      }
    }

    if (zoneId === null || zoneId === undefined) {
      throw new Error(`Domain: [${domainName}] not found in zone id list`);
    }

    return zoneId;
  };

  private updateRecordsForDomain = async (zoneId: string, updateList: IonosRecordsDto[]): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: `${this._rootApiUrl}/${zoneId}`,
      headers: this._headers,
      data: updateList,
    };

    try {
      return (await axios(config)).status === 200;
    } catch (err: unknown) {
      throw err;
    }
  };

  private buildRecordUpdateDataList = (ip: string, domain: string, subDomains: string[]): IonosRecordsDto[] => {
    const updateRecordList: IonosRecordsDto[] = [];

    const rootDomainDto: IonosRecordsDto = {
      name: domain,
      type: 'A',
      content: ip,
      ttl: 3600,
      prio: 0,
      disabled: false,
    };

    updateRecordList.push(rootDomainDto);

    for (const subDom of subDomains) {
      const dto: IonosRecordsDto = {
        name: `${subDom}.${domain}`,
        type: 'A',
        content: ip,
        ttl: 3600,
        prio: 0,
        disabled: false,
      };

      updateRecordList.push(dto);
    }

    return updateRecordList;
  };

  UpdateARecords = async (ipAddress: AxiosResponse, rootDomain: string, subDomains: string[]): Promise<boolean> => {
    try {
      return await this.handler(ipAddress.toString(), rootDomain, subDomains);
    } catch (err: unknown) {
      throw err;
    }
  };
}

export default Ionos;

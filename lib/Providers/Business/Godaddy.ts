import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GodaddyBase, GodaddyDomain } from '../Models';

class GodaddyProvider {
  private readonly _apiRoot: string;
  private readonly _credentials: string;

  constructor(ApiCredentials: string) {
    this._apiRoot = 'https://api.godaddy.com/v1/';
    this._credentials = ApiCredentials;
  }

  private DomainUpdateHandler = async (DataPack: GodaddyBase): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: this._apiRoot + DataPack.url,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `sso-key ${this._credentials}`,
      },
      data: DataPack.data,
    };

    return await axios.request(config);
  };

  private DomainDataMapper = async (Data: GodaddyBase, DomainList: string[]): Promise<boolean> => {
    const updateList: GodaddyDomain[] = [];

    for (const sub of DomainList) {
      const update: GodaddyDomain = {
        name: sub,
        data: Data.IpUpdate,
        ttl: 600,
        type: Data.type,
      };

      updateList.push(update);
    }

    const dataMap: GodaddyBase = {
      RootDomain: Data.RootDomain,
      type: Data.type,
      url: Data.url,
      data: updateList,
    };

    try {
      return await this.DomainUpdateHandler(dataMap);
    } catch (err: unknown) {
      console.log(err);
      return false;
    }
  };

  // Godaddy subdomain list will always be populated as the root domain requires the '@' to be in the subdomain list
  // This method will replace ALL 'A' records on the DNS... DONT USE TO UPDATE IF A RECORDS HAVE DIFFERENT IP's

  UpdateARecords = async (
    IpAddressUpdate: AxiosResponse,
    rootDomain: string,
    subDomains: string[]
  ): Promise<boolean> => {
    const updateUrl: string = `domains/${rootDomain}/records/A`;

    const UpdateData: GodaddyBase = {
      IpUpdate: IpAddressUpdate,
      RootDomain: rootDomain,
      type: 'A',
      url: updateUrl,
      data: [],
    };

    return await this.DomainDataMapper(UpdateData, subDomains);
  };
}

export default GodaddyProvider;

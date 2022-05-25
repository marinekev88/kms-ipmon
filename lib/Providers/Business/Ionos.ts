import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


class Ionos {

  private readonly _prefix: string;
  private readonly _secret: string;
  private readonly _rootApiUrl: string;

  constructor(prefix: string, secret: string)
  {
    this._prefix = prefix;
    this._secret = secret;
    this._rootApiUrl = "";
  }

  private handler = async (): Promise<boolean> => {
    return true;
  }

  UpdateARecord = async (ipAddress: AxiosResponse, rootDomain: string, subDomains: string[]): Promise<boolean> => {
    return this.handler();
  }
}

export default Ionos;

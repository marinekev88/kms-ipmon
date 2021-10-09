import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class Kms {
  private readonly _url4: string;
  private readonly _url6: string;

  constructor() {
    this._url6 = 'https://api64.ipify.org';
    this._url4 = 'https://api.ipify.org';
  }

  private main = async (Url: string): Promise<AxiosResponse> => {
    let config: AxiosRequestConfig;
    config = {
      method: 'GET',
      url: Url,
      headers: {
        accept: 'application/json',
      },
    };

    return await axios.request(config).then((res: AxiosResponse<any>) => res.data);
  };

  getIp4 = async (): Promise<AxiosResponse> => {
    return await this.main(this._url4);
  };
  getIp6 = async (): Promise<AxiosResponse> => {
    return await this.main(this._url6);
  };
}

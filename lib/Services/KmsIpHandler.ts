import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

class KmsIP {
    private readonly _url4: string;
    private readonly _url6: string;

    constructor() {
        this._url6 = 'https://api64.ipify.org';
        this._url4 = 'https://api.ipify.org';
    }

    private main = async (Url: string): Promise<AxiosResponse> => {
        
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: Url,
            headers: {
                accept: 'application/json',
            },
        };

        const res:AxiosResponse = await axios.request(config);
        
        if (Url === this._url4 || Url === this._url6)
            return res.data;
        else
            return res;
    };

    getIp4 = async (): Promise<AxiosResponse> => {
        return await this.main(this._url4);
    };

    getIp6 = async (): Promise<AxiosResponse> => {
        return await this.main(this._url6);
    };

    networkTest = async (Url: string): Promise<number> => {
        const response: AxiosResponse = await this.main(Url);
        return response.status;
    };
}

export default KmsIP;
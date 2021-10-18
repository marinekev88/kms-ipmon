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

        return await axios.request(config);
    };

    getIp4 = async (): Promise<any> => {
        return await this.main(this._url4).then(res => res.data);
    };

    getIp6 = async (): Promise<any> => {
        return await this.main(this._url6).then(res => res.data);
    };

    networkTest = async (Url: string): Promise<number> => {
        const response: AxiosResponse = await this.main(Url)
        return response.status;
    };
}

export default KmsIP;
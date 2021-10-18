import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {Domain, GodaddyBase, GodaddyDomain} from '../Models/GodaddyModel';

class GodaddyProvider {
    private readonly _apiRoot: string;
    private _config: AxiosRequestConfig;

    constructor(ApiCredentials: string, ApiUrl: string) {
        this._apiRoot = ApiUrl;
        this._config = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `sso-key ${ApiCredentials}`,
            },
        };
    }

    private DomainUpdateHandler = async (DataPack: GodaddyBase): Promise<boolean> => {
        this._config = {
            method: 'PUT',
            url: this._apiRoot + DataPack.url,
            data: DataPack.data,
        };

        return await axios.request(this._config);
    };

    private DomainDataMapper = async (Data: GodaddyBase, DomainList: Domain[]): Promise<boolean> => {
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

    UpdateARecords = async (IpAddressUpdate: AxiosResponse, rootDomain: string, subDomains: Domain[]): Promise<boolean> => {
        const UpdateData: GodaddyBase = {
            IpUpdate: IpAddressUpdate,
            RootDomain: rootDomain,
            type: 'A',
            url: `/${rootDomain}/records/A`,
            data: [],
        };

        return await this.DomainDataMapper(UpdateData, subDomains);
    };
}

export default GodaddyProvider;

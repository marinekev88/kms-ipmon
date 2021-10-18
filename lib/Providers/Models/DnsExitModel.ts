import { AxiosResponse } from 'axios';

export type DnsExitData = {
    IpUpdate: AxiosResponse | string;
    RootDomain: string;
    DomainList: Domain[];
    update?: DnsExitUpdate[];
};

export type DnsExitUpdate = {
    type: string;
    name: Domain;
    content: string | AxiosResponse;
    ttl: number;
};

export type Domain = {
    name: string;
};

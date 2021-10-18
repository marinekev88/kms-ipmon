import { AxiosResponse } from 'axios';

export type GodaddyBase = {
    IpUpdate?: AxiosResponse | string;
    RootDomain: string;
    type: string;
    url: string;
    data: GodaddyDomain[];
};

export type GodaddyDomain = {
    name: Domain;
    data?: AxiosResponse | string;
    ttl: number;
    type: string;
};

export type DomainList = Domain[];

export type Domain = {
    name: string;
};

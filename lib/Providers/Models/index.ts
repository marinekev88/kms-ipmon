import { AxiosResponse } from 'axios';

export type GodaddyBase = {
  IpUpdate?: AxiosResponse | string;
  RootDomain: string;
  type: string;
  url: string;
  data: GodaddyDomain[];
};

export type GodaddyDomain = {
  name: string;
  data?: AxiosResponse | string;
  ttl: number;
  type: string;
};

export type DnsExitData = {
  IpUpdate: AxiosResponse | string;
  RootDomain: string;
  DomainList: string[];
  update?: DnsExitUpdate[];
};

export type DnsExitUpdate = {
  type: string;
  name: string;
  content: string | AxiosResponse;
  ttl: number;
};

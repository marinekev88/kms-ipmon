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

export type IonosZoneResponseDto = {
  id: string;
  name: string;
  type: string;
  records: IonosRecordsDto[];
};

export type IonosRecordsDto = {
  id?: string;
  name: string;
  rootName?: string;
  type: string;
  content: string;
  changeDate?: string;
  ttl: number;
  disabled: boolean;
  prio?: number;
};

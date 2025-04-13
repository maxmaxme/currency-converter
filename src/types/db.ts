export interface IItem {
  id?: number;
  currency: string;
}

export interface ICurrency {
  id?: number;
  code: string;
  rate: number;
}

export interface IConfig {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

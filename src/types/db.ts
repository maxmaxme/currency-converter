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
  value: any;
}

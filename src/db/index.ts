import Dexie from "dexie";
import {IConfig, ICurrency, IItem} from "@/types/db";

const database = new Dexie("database");
database.version(4).stores({
  items: '++id, currency',
  currencies: '++id, name, description, rate',
  config: 'id, value'
});

export const itemsTable = database.table<IItem>('items');
export const currenciesTable = database.table<ICurrency>('currencies');
export const configTable = database.table<IConfig>('config');

export default database;

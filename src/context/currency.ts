import {createContext} from "react";
import {ICurrency} from "@/types/db";

export const CurrencyContext = createContext<ICurrency[]>([])

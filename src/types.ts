export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_CURRENCY_RATES = "FETCH_CURRENCY_RATES";
export const UPDATE_BASE_CURRENCY = "UPDATE_BASE_CURRENCY";

export enum BaseCurrency {
  USD = "USD",
  JPY = "JPY",
  GBP = "GBP",
  EUR = "EUR",
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CurrencyRates {
  EUR: number;
  JPY: number;
  GBP: number;
}

export interface ConvertPrice {
  price: string;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
}

export interface State {
  posts: Array<Product> | any[];
  baseCurrency: BaseCurrency;
  currencyRates: CurrencyRates;
}

export interface fetchPostsAction {
  type: typeof FETCH_POSTS;
  payload: Array<Product>;
}

export interface fetchCurrencyRatesAction {
  type: typeof FETCH_CURRENCY_RATES;
  payload: CurrencyRates;
}

export interface updateBaseCurrencyAction {
  type: typeof UPDATE_BASE_CURRENCY;
  payload: BaseCurrency;
}

export type ActionTypes =
  | fetchPostsAction
  | fetchCurrencyRatesAction
  | updateBaseCurrencyAction;

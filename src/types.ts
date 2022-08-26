export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_CURRENCY_RATES = "FETCH_CURRENCY_RATES";
export const UPDATE_BASE_CURRENCY = "UPDATE_BASE_CURRENCY";
export const HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";

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

export interface rates {
  EUR: number;
  JPY: number;
  GBP: number;
}

export interface ConvertPrice {
  price: number;
  rates: rates;
  baseCurrency: BaseCurrency;
}

export interface State {
  posts: Array<Product>;
  baseCurrency: BaseCurrency;
  rates: rates;
}

export interface fetchPostsAction {
  type: typeof FETCH_POSTS;
  payload: Array<Product>;
}

export interface fetchratesAction {
  type: typeof FETCH_CURRENCY_RATES;
  payload: rates;
}

export interface updateBaseCurrencyAction {
  type: typeof UPDATE_BASE_CURRENCY;
  payload: BaseCurrency;
}

export interface hydate {
  type: typeof HYDRATE;
  payload: State;
}

export type ActionTypes =
  | fetchPostsAction
  | fetchratesAction
  | updateBaseCurrencyAction
  | hydate;

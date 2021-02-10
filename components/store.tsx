import { createStore } from "redux";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  State,
  FETCH_POSTS,
  FETCH_CURRENCY_RATES,
  UPDATE_BASE_CURRENCY,
  ActionTypes,
} from "../src/types";

const initialState: State = {
  posts: [],
  baseCurrency: "JPY",
  currencyRates: {},
};

// create your reducer
const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case HYDRATE:
      // TODO: look into the line below
      if (state.posts.length > 0) return state;
      return { ...state, ...action.payload };
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case FETCH_CURRENCY_RATES:
      return { ...state, currencyRates: action.payload };
    case UPDATE_BASE_CURRENCY:
      // TODO: see if I can convert the price here so that I dont pass props down too much
      return { ...state, baseCurrency: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore: MakeStore<State> = () => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: false });

import {createStore} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

// create your reducer
const reducer = (state = { posts: [], baseCurrency: "USD", currencyRates: {} }, action) => {
    switch (action.type) {
        case HYDRATE:
            if(state.posts.length >0) return state;
            return {...state, ...action.payload};
        case 'FETCH_POSTS':
            return {...state, posts: action.payload};
        case 'FETCH_CURRENCY_RATES':
            return {...state, currencyRates: action.payload}
        case 'UPDATE_BASE_CURRENCY': 
            return {...state, baseCurrency: action.payload }
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = context => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});
import * as actionTypes from './types';

const INITIAL_STATE = {
    items: [],
    currencies:[],
    loading: false,
    error: null,
    cart: [],
    currentItem: null,
    selectedCurr: '$'
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products
            };
        
        case actionTypes.FETCH_CURRENCIES:
            return {
                ...state,
                loading: false,
                currencies: action.payload.currencies
            };
        
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case actionTypes.CHANGE_CURRENCY:
            return{
                ...state,
                selectedCurr: action.payload
            }
        case actionTypes.ADD_TO_CART:
            const item = state.items.category.products.find(prod => prod.id === action.payload.id);
            const inCart = state.cart.find(item => item.id === action.payload.id ? true: false);
            return {
                ...state,
                cart: inCart 
                    ? state.cart.map(item => 
                        item.id === action.payload.id 
                        ? {...item, qty: item.qty + 1} 
                        : item) 
                    : [...state.cart, {...item, qty: 1}],
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === action.payload.id 
                    ? {...item,qty: action.payload.qty} 
                    : item)
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            } 
        default:
            return state;   
    }
}

export default shopReducer;
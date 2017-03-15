/**
 * Created by LDQ on 2016/8/17.
 */


import {
    SET_PRODUCTID,
    GET_PRODUCTID,
    SET_STOCKGAMEID,
    GET_STOCKGAMEID,
    SET_GUESSTYPE,
    GET_GUESSTYPE,
    SET_TRADEORDER,
    SET_PURCHASEGAMEID,
    SET_PRODUCTINFO
} from '../actions/storageActionKeys'

export const storage = function(state = {},action){

    switch (action.type) {
        case 'SET_PRODUCTID':
            return Object.assign({},state,{
                productId:action.id
            });

        case 'GET_PRODUCTID':
            return state.productId;
        case 'SET_PRODUCTINFO':
            return Object.assign({},state,{
                productInfo:action.item
            });
        case 'SET_STOCKGAMEID':
            return Object.assign({},state,{
                stockGameId:action.id
            });

        case 'GET_STOCKGAMEID':
            return state.stockGameId;

        case 'SET_GUESSTYPE':
            return Object.assign({},state,{
                guessType:action.id
            });
        case 'GET_GUESSTYPE':
            return state.guessType;

        case 'SET_TRADEORDER':
            return Object.assign({},state,{
                tradeInfo:action.tradeInfo,
                productInfo:action.item
            });
        case 'SET_PROVINCE':
            return Object.assign({},state,{
                provinceInfo:action.item
            });
        case 'SET_CITY':
            return Object.assign({},state,{
                cityInfo:action.item
            });
        case 'SET_AREA':
            return Object.assign({},state,{
                areaInfo:action.item
            });
        case 'SET_PURCHASEGAMEID':
            return Object.assign({},state,{
                purchaseGameId:action.id
            });
        default:
            return state
    }
};
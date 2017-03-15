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
    SET_PURCHASEGAMEID,
    SET_PRODUCTINFO
} from './storageActionKeys';

export const storageActions = {

    setProductId: (id)=>{
        return {
            type : SET_PRODUCTID,
            id
        }
    },
    setProductInfo:(item)=>{
        return {
            type : SET_PRODUCTINFO,
            item
        }
    },

    getProductId: () =>{
        return {
            type : GET_PRODUCTID,
        }
    },
    setStockGameId: (id)=>{
        return {
            type : SET_STOCKGAMEID,
            id
        }
    },
    getStockGameId: () =>{
        return {
            type : GET_STOCKGAMEID,
        }
    },
    setGuessType: (id)=>{
        return {
            type : SET_GUESSTYPE,
            id
        }
    },
    getGuessType: () =>{
        return {
            type : GET_GUESSTYPE,
        }
    },
    setPurchaseGameId: (id)=>{
        return {
            type:SET_PURCHASEGAMEID,
            id
        }
    }


};
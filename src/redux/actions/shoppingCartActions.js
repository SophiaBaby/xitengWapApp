/**
 * Created by LDQ on 2016/8/18.
 */

import {
    ADD_PRODUCTITEM,
    CALC_TOTALMONEY,
    DELETE_PRODUCTS,
    CHECKED_ITEM,
    ALLCHECKED,
    INCREASE,
    REDUCE,
    EDIT
} from '../actions/shoppingCartActionKeys';

export const shoppingCartActions = {

    addProductItem:(item)=>{
        return {
            type:ADD_PRODUCTITEM,
            item
        }
    },
    calcTotalMoney:()=>{
        return {
            type:CALC_TOTALMONEY
        }
    },
    checkedItem:(index)=>{
        return {
            type:CHECKED_ITEM,
            index
        }
    },
    allCheck:(bool=true)=>{
        return {
            type:ALLCHECKED,
            bool
        }
    },
    increase:(index)=>{
        return{
            type:INCREASE,
            index
        }
    },
    reduce:(index)=>{
        return {
            type:REDUCE,
            index
        }
    },
    deleteProducts:()=>{
        return {
            type:DELETE_PRODUCTS
        }
    },
    edit:()=>{
        return {
            type:EDIT
        }
    }

};
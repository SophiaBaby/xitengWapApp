/**
 * Created by LDQ on 2016/10/8.
 */
import { DELETE_PRODUCTS } from './shoppingCartActionKeys';
import { CREATE_SUCCESS,CREATE_FAIL,SET_TRADEORDER } from './createTradeOrderActionKeys';
import { SHOW_DIALOG } from './dialogActionKeys';
import _h from '../../Util/HB';
import {createTradeOrder} from '../../Util/xitengBaseConfig';

function checkedProducts(list){
    var newList = [];
    for(let i = 0;i < list.length;i++){
        if(list[i].checked){

            newList.push({
                productId:list[i].productId,
                totalCount:list[i].num,
                price:list[i].price,
                shopId:list[i].shopId
            });
        }
    }
    return newList;
}



export const createTradeOrderActions = {
    createTradeOrder : (
        price,
        productType=createTradeOrder.productType.diamonds,
        orderType=createTradeOrder.orderType.commonOrder
    )=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.loginData,
                totalPrice:price,
                totalProductCount:price,
                productType:productType,
                orderType:orderType
            };

            _h.ajax.resource('/createTradeOrder').save({},postData)
                .then((tradeInfo)=>{
                    dispatch({type:'SET_TRADEORDER', tradeInfo,price});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    exchangeProduct : (productArr)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let shoppingCart = getState().shoppingCart;
            let address = getState().address;
            let productList = productArr||checkedProducts(shoppingCart.products);
            let postData = {
                accessInfo:loginInfo.loginData,
                productList:productList,
                count:shoppingCart.totalNum,
                xtbPrice:shoppingCart.realCount,
                addressId:address.currentAddress.id,
                orderType:2
            };
            _h.ajax.resource('/exchange/product').save({},postData)
                .then((tradeInfo)=>{
                    dispatch({type:'DELETE_PRODUCTS'});
                    dispatch({type:'SET_TRADEORDER', tradeInfo});
                    dispatch({type:'CREATE_SUCCESS'});
                    dispatch({type:'SHOW_DIALOG'});
                })
                .catch((error)=>{
                    console.log(error);
                    dispatch({type:'CREATE_FAIL'});
                    dispatch({type:'SHOW_DIALOG'});

                })
        }
    },

    setTradeOrder : (tradeInfo,amount)=>{
        return {
            type:SET_TRADEORDER,
            tradeInfo,
            amount
        }
    }
};
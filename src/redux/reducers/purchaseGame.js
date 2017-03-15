/**
 * Created by LDQ on 2016/12/22.
 */
import {
    SET_PURCHASEORDER_COUNT,
    GET_NEWEST_WIN_LIST,
    GET_PRODUCT_LIST,
    GET_SHOW_LIST,
    GET_DETAIL,
    CUT_TYPE,
    GET_OPEN
} from '../actions/purchaseGameActionKeys';

import {purchaseGameConfig} from '../../Util/xitengBaseConfig';

function unSelectedAll(list){
    for(let i = 0;i < list.length;i++){
        list[i].selected = false;
    }
}


export const purchaseGame = function(state = {},action){

    switch (action.type) {
        case 'GET_NEWEST_WIN_LIST':
            return Object.assign({},state,{
                newestWin:action.data.content
            });
        case 'GET_PRODUCT_LIST':
            var productList = [];
            if(action.pageNo == 0){
                productList = action.data.content;
            }else{
                productList = state.products.productList.concat(action.data.content);
            }

            let products = {
                productList:productList,
                last:action.data.last,
                pageNo:action.pageNo
            };

            return Object.assign({},state,{
                products:products
            });
        case 'CUT_TYPE':
            let productTypeList = [...state.productType];

            function findName(item){
                return item.name == action.item.name
            }
            let index = productTypeList.findIndex(findName);

            unSelectedAll(productTypeList);
            productTypeList[index].selected = true;

            return Object.assign({},state,{
                productType:productTypeList
            });
        case 'GET_DETAIL':
            function findStatus(ele){
                return ele.key == action.data.content.purchaseGameStatus
            }
            let purchaseGameStatus = purchaseGameConfig.purchaseGameStatus.find(findStatus);
            action.data.content.purchaseGameStatus = purchaseGameStatus;

            return Object.assign({},state,{
                detail:action.data.content
            });
        case 'GET_BID_DETAIL':
            return Object.assign({},state,{
                bidDetail:action.data
            });
        case 'GET_OPEN':
            var userList = [];
            if(action.pageNo == 0){
                userList = action.data.content;
            }else{
                userList = state.openProducts.userList.concat(action.data.content);
            }
            let openProducts = {
                userList:userList,
                last:action.data.last,
                pageNo:action.pageNo
            };
            return Object.assign({},state,{
                openProducts:openProducts
            });
        case 'GET_SHOW_LIST':
            var showList = [];
            if(action.pageNo == 0){
                showList = action.data.content;
            }else{
                showList = state.show.showList.concat(action.data.content);
            }
            let show = {
                showList:showList,
                last:action.data.last,
                pageNo:action.pageNo
            };

            return Object.assign({},state,{
                show:show
            });
        case 'SET_PURCHASEORDER_COUNT':
            var order = {
                purchaseGameCount:action.purchaseGameCount,
                bidRecords:[]
            };
            return Object.assign({},state,{
                order:order
            });
        case 'BID':
            console.log(action.data.content);
            return Object.assign({},state,{
                order:action.data.content
            });
        default:
            return state
    }
};
/**
 * Created by LDQ on 2016/8/15.
 */


import {GET_PRODUCTS,PREVENT_MULTIPLE_POST} from '../actions/shopActionKeys';




export const shop = function(state = {},action){

    switch (action.type) {

        case 'GET_PRODUCTS':
            let type = [...state.type];
            type.map((item,index)=>{
                item.selected = false;
            });

            type[action.index].selected = true;
            console.log('reducer---pageNo---',action.pageNo);
            let productList = action.data.datas;
            if(action.pageNo != 0){
                productList = state.productList.concat(action.data.datas);
            }
            return Object.assign({},state,{
                productList:productList,
                type:type,
                last:action.data.last,
                pageNo:action.pageNo
            });
        case 'PREVENT_MULTIPLE_POST':
            return Object.assign({},state,{
                last:true
            });
        default:
            return state
    }
};
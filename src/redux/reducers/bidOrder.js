/**
 * Created by LDQ on 2016/12/27.
 */
import { GET_RECORD,GET_ORDERLIST } from '../actions/bidOrderActionKeys';

export const bidOrder = function(state = {},action){

    switch (action.type) {
        case 'GET_RECORD':
            var list = [];
            if(action.pageNo == 0){
                list = action.data.content;
            }else{
                list = state.record.list.concat(action.data.content);
            }
            let record = {
                pageNo:action.pageNo,
                last:action.data.last,
                list:list
            };
            return Object.assign({},state,{
                record:record
            });
        case 'GET_ORDERLIST':
            var orderList = [];
            if(action.pageNo == 0){
                orderList = action.data.content;
            }else{
                orderList = state.record.list.concat(action.data.content);
            }
            let listObj = {
                pageNo:action.pageNo,
                last:action.data.last,
                list:orderList
            };
            return Object.assign({},state,{
                list:listObj
            });
        default:
            return state
    }
};
/**
 * Created by LDQ on 2016/10/27.
 */
import { GET_BET_RECORD,GET_BET_LIST } from '../actions/betRecordActionKeys';

export const betRecord = function(state = {},action){

    switch (action.type) {
        case 'GET_BET_RECORD':
            return Object.assign({},state,{
                overView:action.data
            });

        case 'GET_BET_LIST':

            return Object.assign({},state,{
                detailList:state.detailList.concat(action.data.content),
                isLast:action.data.last,
                pageNo:action.pageNo,
            });
        case 'PREVENT_MULTIPLE_POST':
            return Object.assign({},state,{
                isLast:true
            });
        default:
            return state
    }
};
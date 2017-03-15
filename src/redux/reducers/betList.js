/**
 * Created by LDQ on 2016/10/10.
 */
import { GET_BETLIST } from '../actions/betListActionKeys';

export const betList = function(state = {},action){

    switch (action.type) {
        case 'GET_BETLIST':

            let betList = action.data.content;

            return Object.assign({},state,{
                betList:betList,
                last:action.data.last,
            });

        default:
            return state
    }
};
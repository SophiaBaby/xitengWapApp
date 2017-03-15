/**
 * Created by LDQ on 2016/9/29.
 */

import { GET_ACCOUNT,RECALC } from '../actions/accountActionKeys';

export const account = function(state = {},action){

    switch (action.type) {
        case 'GET_ACCOUNT':
            console.log(action.data);
            return Object.assign({},state,action.data);
        case 'RECALC':

            return Object.assign({},state,{
                xtbTotalAmount:state.xtbTotalAmount-action.money
            });
        default:
            return state
    }
};


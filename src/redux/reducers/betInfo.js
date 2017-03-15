/**
 * Created by LDQ on 2016/12/6.
 */
import { GET_ODDS } from '../actions/betActionKeys';

export const betInfo = function(state = {},action){

    switch (action.type) {
        case 'GET_ODDS':
            return Object.assign({},state,{
                upOdds:action.data.upOdds,
                downOdds:action.data.downOdds
            });

        default:
            return state
    }
};


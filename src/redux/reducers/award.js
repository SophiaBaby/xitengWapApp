/**
 * Created by LDQ on 2016/10/10.
 */
import { GET_AWARD } from '../actions/awardActionKeys';

export const award = function(state = {},action){

    switch (action.type) {
        case 'GET_AWARD':
            console.log(action.data);

            return Object.assign({},state,{
                awardList:action.data.awards
            });

        default:
            return state
    }
};

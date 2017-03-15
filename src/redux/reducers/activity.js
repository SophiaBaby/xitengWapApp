/**
 * Created by LDQ on 2016/12/21.
 */
import { GET_ACTIVITY_LIST } from '../actions/activityActionKeys';

export const activity = function(state = {},action){

    switch (action.type) {
        case 'GET_ACTIVITY_LIST':

            return Object.assign({},state,{
                list:action.data.content
            });

        default:
            return state
    }
};

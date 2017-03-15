/**
 * Created by LDQ on 2016/11/8.
 */
import {GET_WX_APPID} from '../actions/WXInfoActionKeys';

export const WXInfo = function(state = {},action){

    switch (action.type) {
        case 'GET_WX_APPID':

            return state.appId;

        default:
            return state
    }
};
/**
 * Created by liudq on 2016/10/20.
 */

import { GET_CITIES } from '../actions/areaAcitonKeys';


export const cities = function(state = {},action){

    switch (action.type) {
        case 'GET_CITIES':
            console.log(action.data.areas);
            return Object.assign({},state,{
                list:action.data.areas
            });

        default:
            return state
    }
};


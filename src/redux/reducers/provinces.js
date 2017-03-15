/**
 * Created by LDQ on 2016/10/19.
 */

import { GET_PROVINCES } from '../actions/areaAcitonKeys';


export const provinces = function(state = {},action){

    switch (action.type) {
        case 'GET_PROVINCES':
            return Object.assign({},state,{
                list:action.data.areas
            });

        default:
            return state
    }
};
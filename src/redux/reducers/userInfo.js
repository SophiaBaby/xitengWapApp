/**
 * Created by LDQ on 2016/12/8.
 */



import {GET_USERINFO} from '../actions/userInfoActionKeys'

export const userInfo = function(state = {},action){

    switch (action.type) {
        case 'GET_USERINFO':
            console.log('reducer-userInfo-',action.data);
            let userInfo = action.data.userInfo;
            return Object.assign({},state,userInfo);

        default:
            return state
    }
};
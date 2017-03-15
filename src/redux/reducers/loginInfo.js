/**
 * Created by LDQ on 2016/8/29.
 */


import _h from '../../../src/Util/HB';
import {appKey,appSecret} from '../../Util/xitengBaseConfig';
import {hex_md5} from '../../Util/md5';


import {SET_PHONENUM,LOGIN,START_TIMER,GET_CHECKCODE,FIND_PASSWORD,SET_PASSWORD} from '../actions/loginInfoActionKeys';

export const loginInfo = function(state = {},action){

    switch (action.type) {
        case 'SET_PHONENUM':

            return Object.assign({},state,{
                phoneNum:_h.valid.validNum(action.num,[3,4,4]," ")
            });

        case 'LOGIN':
            let loginInfo = action.data;
            let hasPhoneNum = !_h.obj.isEmpty(loginInfo.userInfo.phoneNumber);
            return Object.assign({},state,{
                login:true,
                code:loginInfo.code,
                loginData:{
                    app_key:appKey,
                    access_token:loginInfo.token.access_token,
                    phone_num:"",
                    signature:hex_md5(appSecret + '&' +  loginInfo.token.access_token_secret)
                },
                hasPhoneNum:hasPhoneNum
            });

        case 'START_TIMER':
            return Object.assign({},state,{
                timer:action.timer
            });
        case 'GET_CHECKCODE':
            return Object.assign({},state,{
                checkCode:action.data
            });
        case 'FIND_PASSWORD':
            return Object.assign({},state,{
                findPassword:action.isFindPassword
            });
        case 'SET_PASSWORD':
            return Object.assign({},state,{
                hasPhoneNum:true
            });
        default:
            return state
    }
};
/**
 * Created by LDQ on 2016/11/8.
 */

import {GET_WX_APPID} from './WXInfoActionKeys';

export const WXInfoActions = {

    getWXAppId: ()=>{
        return {
            type : GET_WX_APPID
        }
    },
};
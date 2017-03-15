/**
 * Created by LDQ on 2016/8/29.
 */

import {appKey,appSecret} from '../../Util/xitengBaseConfig';
import {hex_md5} from '../../Util/md5';
let baseLoginData = {
    app_key:appKey,
    phone_num:"",
    signature:hex_md5(appSecret),
};

function wxLoginPostData(){
    return Object.assign({},baseLoginData,{
        loginType:'weixin'
    })
}
function postMD5Data(phone_num=""){
    return Object.assign({},baseLoginData,{
        phone_num:phone_num,
        access_token:""
    })
}
function phoneNumLogin(phone_num,md5){
    return Object.assign({},baseLoginData,{
        access_token:"",
        phone_num:phone_num,
        signature:hex_md5(appSecret + md5).toUpperCase(),
        loginType:"phonenum"
    })
}
function wxPayLogin(loginData,unionid){
    return Object.assign({},loginData,{
        phone_num:unionid
    })
}


export const loginInfoInit = {
    checkCode:"",
    findPassword:false,
    timer:"60秒后获取",
    expired:false,
    login:false,
    baseLoginData:baseLoginData,
    loginData:{},
    wxLoginPostData:wxLoginPostData(),
    hasPhoneNum:false,
    code:"",
    postMD5Data:postMD5Data,
    phoneNumLogin:phoneNumLogin,
    wxPayLogin:wxPayLogin
};

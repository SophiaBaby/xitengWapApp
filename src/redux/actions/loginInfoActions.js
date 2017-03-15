/**
 * Created by LDQ on 2016/8/29.
 */
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';
import {HB_uuid} from '../../Util/uuid';

import {SET_PHONENUM,LOGIN,WX_LOGIN,START_TIMER,GET_CHECKCODE,FIND_PASSWORD} from './loginInfoActionKeys';
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';

export const loginInfoActions = {

    setPhoneNum: (num)=>{
        return {
            type : SET_PHONENUM,
            num
        }
    },
    getCheckCode: ()=>{
        return (dispatch,getState)=>{
            let trimPhoneNum = _h.valid.trimAllBlank(getState().loginInfo.phoneNum + "");

            let loginInfo = getState().loginInfo;
            let url = "/reqcheckCode/register?phoneNum=";
            if(loginInfo.findPassword){
                url = "/reqcheckCode/resetPwd?phoneNum=";
            }
            _h.ajax.resource(url + trimPhoneNum).query({}).then((data)=>{
                dispatch({type:'GET_CHECKCODE', data});
            })
            .catch((error)=>{
                console.log("error",error);
            })
        }
    },
    startTimer: (initTime,endTime=0,step=1)=>{
        return (dispatch)=>{

            var timer = setInterval(()=>{
                if(initTime > endTime){
                    initTime-=step;
                    dispatch({type:'START_TIMER', timer:initTime+'秒后获取'});
                }else{
                    clearInterval(timer);
                    dispatch({
                        type:'START_TIMER',
                        timer:'重新获取验证码'
                    });
                }
            },step*1000);

        }
    },
    wxLogin : ()=>{
        return (dispatch,getState)=>{

            let code = _h.url.getSearchKey('code');
            let appId = getState().WXInfo.appId;
            let loginInfo = getState().loginInfo;
            if(code && !loginInfo.login){
                let postData = {
                    code:code,
                    accessInfo:loginInfo.wxLoginPostData
                };
                _h.ajax.resource('/client/wap/login').save({},postData,false)
                    .then((data)=>{
                        data.code = code;
                        dispatch({type:'LOGIN', data});
                    })
                    .catch((error)=>{
                        console.log("error",error);
                    })

            }else if(!code){

                let url = _h.url.getBaseUrl();
                let hash = window.location.hash;
                let fullUrl = url + "/xitengWapApp/index.html"+hash;
                let encodeUrl = encodeURIComponent(fullUrl);
                let nowState = getState();
                _h.save.setStorage({
                    storageInit:nowState.storage
                });
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeUrl+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
            }
        }

    },
    phoneNumLogin: (phoneNum,password) =>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let trimPhoneNum = _h.valid.trimAllBlank(phoneNum + "");
            let postMD5Data = {
                accessInfo:loginInfo.postMD5Data(trimPhoneNum)
            };
            _h.ajax.resource('/userMD5').save({},postMD5Data)
                .then((uuid)=>{

                    let md5 = hex_md5(trimPhoneNum + password + uuid.userMD5).toUpperCase();
                    let postLoginData = {
                        userName:trimPhoneNum,
                        app_key:loginInfo.appKey,
                        accessInfo:loginInfo.phoneNumLogin(trimPhoneNum,md5)
                    };

                    return _h.ajax.resource('/login').save({},postLoginData)
                })
                .then((loginInfo)=>{

                    let data = {
                        token:{
                            access_token:loginInfo.access_token,
                            access_token_secret:loginInfo.access_token_secret
                        }
                    };

                    dispatch({type:'LOGIN',data})


                })
                .catch((error)=>{
                    dispatch({type:'SHOW_DIALOG'})
                })
                .catch((error)=>{
                    dispatch({type:'SHOW_DIALOG'})
                });
        }
    },
    setPassword: (password)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let uuid = HB_uuid.uuid();
            let trimPhoneNum = _h.valid.trimAllBlank(loginInfo.phoneNum + "");
            let postData = {
                phone_num:trimPhoneNum,
                check_code:loginInfo.checkCode,
                password:hex_md5(trimPhoneNum + password + uuid).toUpperCase(),
                md5_key:uuid,
                cName:"",
                userIconUrl:"",
                accessInfo:loginInfo.loginData
            };
            _h.ajax.resource("/bindPhone").save({},postData).then(()=>{
                dispatch({type:'SET_PASSWORD'});
                let urlList = [...getState().historyUrls.urlList];
                _h.url.setBrowserHistoryFromBefore(urlList,"/Guess");
            })
        }
    },
    resetPassword:(password)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let trimPhoneNum = _h.valid.trimAllBlank(loginInfo.phoneNum + "");
            let postMD5Data = {
                accessInfo:loginInfo.postMD5Data
            };
            _h.ajax.resource('/userMD5').save({},postMD5Data)
                .then((uuid)=>{

                    let pwd = hex_md5(trimPhoneNum + password + uuid.userMD5).toUpperCase();
                    let postResetData = {
                        phone_num:trimPhoneNum,
                        password:pwd,
                        check_code:loginInfo.checkCode,
                        accessInfo:loginInfo.postMD5Data
                    };

                    return _h.ajax.resource('/resetPwd').save({},postResetData)
                })
        }
    },
    findPassword: (isFindPassword)=>{
        return {
            type:'FIND_PASSWORD',
            isFindPassword
        }
    }

};
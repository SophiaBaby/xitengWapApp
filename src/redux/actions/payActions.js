/**
 * Created by LDQ on 2016/11/14.
 */
import { PREPAY , WX_PAY_INFO } from './payActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';



export var payActions = {

    WXPay:()=>{
        return (dispatch,getState)=>{
            let code = _h.url.getSearchKey('code')||_h.url.getHashKey('code');
            let loginInfo = getState().loginInfo;
            let order = getState().order;
            let appId = getState().WXInfo.appId;
            let pay = getState().pay;
            if(code && pay.prePay){
                let getWXInfo = {
                    code:code,
                    accessInfo:loginInfo.baseLoginData
                };
                _h.ajax.resource('/weixin/user/info').save({},getWXInfo)
                    .then((userData)=>{
                        var loginData = loginInfo.loginData;
                        let wxPayAss = Object.assign({},loginData,{
                            phone_num:userData.unionid
                        });

                        var payData = {
                            orderId:order.tradeOrder.orderId,
                            channel:'WeixinJSPay',
                            description:'购买钻石',
                            totalFee:order.tradeOrder.realTotalFee,
                            resubmit:false,
                            openId:userData.openid,
                            accessInfo:wxPayAss
                        };

                        return _h.ajax.resource('/delegater/tradeOrder/confirm').save({},payData)

                    }).then((data)=>{
                        dispatch({type:'WX_PAY_INFO', data});
                        let wxPayInfo = getState().pay.wxPay;
                        var sign = "appId="+appId+"&nonceStr="+wxPayInfo.noncestr+
                            "&package=prepay_id="+wxPayInfo.prepay_id+"&signType=MD5&timeStamp="+
                            wxPayInfo.timestamp+"&key=k2Q0WoE1Y2386zK7Twetv7761AQ38f17";
                        var paySign = hex_md5(sign).toUpperCase();

                        function onBridgeReady(){
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId" :appId,                          // 公众号名称，由商户传入
                                    "timeStamp":wxPayInfo.timestamp,         // 时间戳，自1970年以来的秒数
                                    "nonceStr" :wxPayInfo.noncestr,          // 随机串
                                    "package" :"prepay_id=" + wxPayInfo.prepay_id,
                                    "signType" :"MD5",                       // 微信签名方式：
                                    "paySign" : paySign                      // 微信签名
                                },
                                function(res){

                                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                                        window.location.hash = "/PaySuccess";

                                    }else{
                                        window.location.hash = "/PayFail";
                                    }
                                });
                        }
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            onBridgeReady();
                        }
                    })
                    .catch((error)=>{
                        console.log("error",error);
                    });

            }else{


                // localStorage.nowState = JSON.stringify(nowState);
                dispatch({type:'PREPAY'});

                //  存储store 到 localStorage
                let nowState = getState();
                _h.save.setStorage({
                    storageInit:nowState.storage,
                    loginInfoInit:nowState.loginInfo,
                    userInfoInit:nowState.userInfo,
                    orderInit:nowState.order,
                    payInit:nowState.pay,
                    historyUrlsInit:nowState.historyUrls
                });
                var url = _h.url.getBaseUrl();
                var fullUrl = url + "/xitengWapApp/index.html#/Pay";
                var encodeUrl = encodeURIComponent(fullUrl);
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeUrl+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
            }
        }
    }
};
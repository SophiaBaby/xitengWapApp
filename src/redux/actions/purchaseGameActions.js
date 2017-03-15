/**
 * Created by LDQ on 2016/12/22.
 */

import {
    SET_PURCHASEORDER_COUNT,
    GET_NEWEST_WIN_LIST,
    GET_PRODUCT_LIST,
    GET_BID_DETAIL,
    GET_SHOW_LIST,
    GET_DETAIL,
    CUT_TYPE,
    GET_OPEN,
    BID
} from './purchaseGameActionKeys';
import _h from '../../Util/HB';

export var purchaseGameActions = {

    getNewestWinList:(path)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.baseLoginData
            };

            _h.ajax.resource('/purchaseGame/:win').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_NEWEST_WIN_LIST', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getProductList:(path,query={popularity:-1},pageNo=0,size=5)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                popularity:"",
                productName:"",
                price:"",
                rateOfProgress:"",
                size:size,
                pageNo:pageNo
            };
            postData = Object.assign({},postData,query);

            _h.ajax.resource('/purchaseGame/:productList').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCT_LIST', data,pageNo})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    cutType:(item)=>{
        return {
            type: CUT_TYPE,
            item
        }
    },
    getDetail:(path,purchaseGameId)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                purchaseGameId:purchaseGameId
            };
            _h.ajax.resource('/purchaseGame/:detail').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_DETAIL', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getBidDetail:(path,purchaseGameId)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.loginData,
                purchaseGameId:purchaseGameId
            };
            _h.ajax.resource('/purchaseGame/:bidDetail').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_BID_DETAIL', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getOpen:(path,pageNo=0,productId="",status="",size=10)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                productId:productId,
                status:status,
                pageNo:pageNo,
                size:size
            };
            _h.ajax.resource('/purchaseGame/:open').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_OPEN', data, pageNo})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getShowList:(pageNo=0,productId="",isAll="no",size=10)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                isAll:isAll,
                productId:productId,
                stage:"",
                purchaseGameId:"",
                pageNo:pageNo,
                size:size
            };
            _h.ajax.resource('/purchaseGame/show/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_SHOW_LIST', data, pageNo})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    setPurchaseOrderCount:(purchaseGameCount)=>{
        return {
            type:SET_PURCHASEORDER_COUNT,
            purchaseGameCount
        }
    },
    bid:(path)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            var purchaseGame = getState().purchaseGame;

            let purchaseGameId = purchaseGame.detail.purchaseGameId;
            let bidXtb = purchaseGame.order.purchaseGameCount * purchaseGame.detail.priceOfOneBidInXtb;

            var area;
            function getLocation()
            {
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(showPosition);
                }
            }
            function showPosition(position)
            {
                area = "Latitude: " + position.coords.latitude +
                    "Longitude: " + position.coords.longitude;
            }

            let postData = {
                accessInfo:loginInfo.loginData,
                purchaseGameId:purchaseGameId,
                bidXtb:bidXtb,
                ip:"通过公众号参与夺宝",
                area:"北京",
                phoneModel:"通过公众号参与夺宝"
            };
            _h.ajax.resource('/purchaseGame/:bid').save(path,postData)
                .then((data)=>{
                    dispatch({type:'BID', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },

};

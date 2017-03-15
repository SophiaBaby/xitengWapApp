/**
 * Created by LDQ on 2016/8/18.
 */
import {GET_PRODUCTINFO} from './productInfoActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export var productActions = {

    getProductInfo:()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let productId = getState().storage.productId;
            let postData = {
                accessInfo:loginInfo.baseLoginData,
                productId:productId
            };

            _h.ajax.resource('/product/detail').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTINFO', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }
};

/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_PRODUCTS,PREVENT_MULTIPLE_POST} from './shopActionKeys';
import _h from '../../Util/HB';

export const shopActions = {

    getProductList:(mannerId={tagName:"推荐"},index=0,pageNo=0,size=6)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let myManner = mannerId;
            for(let prop in mannerId){
                if(-(mannerId[prop]*-1)==mannerId[prop]){
                    myManner[prop] = mannerId[prop]*-1;
                }
            }

            dispatch({type:'PREVENT_MULTIPLE_POST'});

            let postData = Object.assign({},{
                accessInfo:loginInfo.baseLoginData,
                pageNo:pageNo,
                size:size
            },myManner);

            _h.ajax.resource('/product/list').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_PRODUCTS', data,index,pageNo})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },

};
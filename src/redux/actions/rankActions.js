/**
 * Created by LDQ on 2016/10/10.
 */
/**
 * Created by LDQ on 2016/8/15.
 */

import {GET_RANK,SELECTED} from './rankActionKeys';
import _h from '../../Util/HB';
import $ from 'jquery'

export const rankActions= {

    getRank:(pageNo=0,type="currentYear",size=3)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = JSON.stringify({
                accessInfo:loginInfo.baseLoginData,
                pageNo:pageNo,
                size:size,
                type:type
            });

            // _h.ajax.resource('/rakingList').save({},postData)
            //     .then((data)=>{
            //         dispatch({type:'GET_RANK', data,pageNo})
            //     })
            //     .catch((error)=>{
            //         console.log("error",error);
            //     })
            var p1 = new Promise(function (res, rej) {
                 console.log(postData);
                $.ajax({
                    url:"/rakingList",
                    type:"POST",
                    data:postData,
                    contentType:'application/json; charset=utf-8',
                    success:function (data) {
                        res(data);
                        console.log("排行：",data)
                    },
                    error:function (data) {
                        rej("请求失败");
                    }
                })
            });
            p1.then(
                (data)=>{
                    dispatch({type:'GET_RANK', data})
                });
        }
    },
    selected:(id)=>{
        return {
            type:"SELECTED",
            id
        }
    }

};
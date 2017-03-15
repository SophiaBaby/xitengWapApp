/**
 * Created by LDQ on 2016/10/10.
 */

import {GET_AWARD} from './awardActionKeys';
import _h from '../../Util/HB';
import {award} from '../../Util/xitengBaseConfig';
import $ from 'jquery'

export var awardActions = {
    getAward : (awardType)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = JSON.stringify({
                accessInfo:loginInfo.baseLoginData,
                awardType:awardType

            });

            // _h.ajax.resource('/award/list').save({},postData).then((data)=>{
            //     dispatch({type:'GET_AWARD',data})
            // }).catch((error)=>{
            //     console.log(error);
            // })
            var p1 = new Promise(function (res, rej) {
                console.log(postData);
                $.ajax({
                    // url:"src/data/award.json",
                    url:'/award/list',
                    type:"POST",
                    dataType:"json",
                    data:postData,
                    contentType:'application/json; charset=utf-8',
                    success:function (data) {
                        res(data);
                    },
                    error:function (data) {
                        rej("请求失败");
                    }
                })
            });
            p1.then(
                (data)=>{
                    dispatch({type:'GET_AWARD', data})
                });
        }
    }
};
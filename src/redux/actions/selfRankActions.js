/**
 * Created by zhangxin on 2/23 0023.
 */
import {GET_SELF_RANK} from './selfRankActionKeys';
import _h from '../../Util/HB';
import $ from 'jquery'

export const selfRankActions= {

    getSelfRank:(type="currentYear")=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = JSON.stringify({
                accessInfo:loginInfo.loginData,
                type:type
            });
            var p1 = new Promise(function (res, rej) {
                $.ajax({
                    url:'/selfProfit',
                    type:"POST",
                    contentType:'application/json; charset=utf-8',
                    dataType:"json",
                    data:postData,
                    success:function (data) {
                        res(data);
                        console.log('selfrankAction-getSelfRank---',data);
                    },
                    error:function (data) {
                        rej("请求失败");
                    }
                })
            });
            p1.then(
                (data)=>{
                    dispatch({type:'GET_SELF_RANK', data})
                });
        }
    }
};

/**
 * Created by zhangxin on 2/13 0013.
 */

import React,{Component}from 'react';
import { render } from 'react-dom'
import $ from 'jquery';


const getRankListDetail = (type)=>{
    const data = {
        accessInfo:{
            app_key:"xxxxxxxxx",
            access_token:"",
            phone_num:"15810157156",
            signature:"xxxxxxxxx"
        },
        size: 10,
        pageNo: 0,
        type:type //2-上周排名 3-上月排名 8-上年排名
    }
    var back = '初始数据'
    var p1 = new Promise(function (res, rej) {
        $.ajax({
            url:"src/container/productList55.json",
            type:"GET",
            dataType:"json",
            // data:data,
            success:function (data) {
                res(data);
            },
            error:function (data) {
                rej("请求失败");
            }
        })
    })
    p1.then(function (data) {
        alert(data)
    },function (data) {
        return data;
    })
}

export default getRankListDetail;
































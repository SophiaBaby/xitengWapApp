/**
 * Created by LDQ on 2016/8/8.
 */

import {COUNT_INIT,COUNT_DOWN,GET_GAMELIST,REFRESH} from './stockGameActionKeys';

import _h from '../../Util/HB';

export const stockGameActions = {
    countDown: (nowTime,startTime,endTime,step = 1000)=>{
        return {
            type : COUNT_DOWN,
            step,
            nowTime,
            startTime,
            endTime
        }
    },

    countInit: (time)=>{
        return {
            type: COUNT_INIT,
            init:time
        }
    },

    getGameList:()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let stockGameInfo = getState().stockGame;
            let postData = {
                accessInfo:loginInfo.baseLoginData,
                pageNo:stockGameInfo.pageNo,
                size:stockGameInfo.size
            };
            _h.ajax.resource('/stockGameList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_GAMELIST', data});
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    refresh:(id)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.baseLoginData,
                stockGameId:id
            };
            _h.ajax.resource('/stockGameDetail').save({},postData)
                .then((data)=>{
                    dispatch({type:'REFRESH', data,id})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    }

};


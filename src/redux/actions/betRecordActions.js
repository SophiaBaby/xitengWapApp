/**
 * Created by LDQ on 2016/10/27.
 */
import { GET_BET_RECORD,GET_BET_LIST,PREVENT_MULTIPLE_POST } from './betRecordActionKeys';
import _h from '../../Util/HB';


export var betRecordActions = {
    getBetRecord : ()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.loginData,
            };
            _h.ajax.resource('/getGuessWithStockStatistics').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BET_RECORD', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },
    getBetList : (pageNo=0,sortProperties=["time"],size=5)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.loginData,
                pageNo:pageNo,
                sortProperties:sortProperties,
                direction:"DESC",
                size:size
            };
            dispatch({type:"PREVENT_MULTIPLE_POST"});
            _h.ajax.resource('/getWithStockList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BET_LIST', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }

};
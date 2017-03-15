/**
 * Created by LDQ on 2016/9/13.
 */
import { GET_STOCKDETAIL,GET_STOCKKLINE} from '../actions/stockGameDetailActionKeys'

import _h from '../../Util/HB';

export var stockGameDetailActions = {

    getStockDetail:(id)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.baseLoginData,
                stockGameId:id
            };
            _h.ajax.resource('/stockGameDetail').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_STOCKDETAIL', data})
                })
                .catch((error)=>{
                    console.log("error",error);
                })
        }
    },
    getStockKLine:(index)=>{
        return {
            type : GET_STOCKKLINE,
            index
        }

    }

};
/**
 * Created by LDQ on 2016/10/10.
 */

import { GET_BETLIST } from './betListActionKeys';
import _h from '../../Util/HB';
import {getJustNowWithStockList} from '../../Util/xitengBaseConfig';


export const betListActions = {
    getBetList : (
        pageNo=getJustNowWithStockList.pageNo,
        size=getJustNowWithStockList.size,
        sortProperties=getJustNowWithStockList.sortProperties.time,
        direction=getJustNowWithStockList.direction
    )=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                pageNo:pageNo,
                size:size,
                sortProperties:sortProperties,
                direction:direction
            };

            _h.ajax.resource('/getJustNowWithStockList').save({},postData)
                .then((data)=>{
                    dispatch({type:'GET_BETLIST', data,pageNo});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};
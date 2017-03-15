/**
 * Created by LDQ on 2016/12/21.
 */
import { GET_ACTIVITY_LIST } from './activityActionKeys';
import {activityList} from '../../Util/xitengBaseConfig';
import _h from '../../Util/HB';

export const activityActions = {
    getActivityList : (path,activityCategory=activityList.activityCategory.home)=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.baseLoginData,
                activityCategory:activityCategory
            };

            _h.ajax.resource('/activity/:path').save(path,postData)
                .then((data)=>{
                    dispatch({type:'GET_ACTIVITY_LIST', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};
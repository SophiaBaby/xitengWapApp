/**
 * Created by LDQ on 2016/12/8.
 */
import {GET_USERINFO} from '../actions/userInfoActionKeys';
import _h from '../../Util/HB';

export const userInfoActions = {

    getUserInfo : ()=>{

        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;


            let postData = {
                accessInfo:loginInfo.loginData,
            };

            _h.ajax.resource('/user/info').save({},postData).then((data)=>{
                dispatch({type:'GET_USERINFO',data})
            })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};
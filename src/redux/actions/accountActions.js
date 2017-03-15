/**
 * Created by LDQ on 2016/9/29.
 */
import { GET_ACCOUNT,RECALC } from './accountActionKeys';
import _h from '../../Util/HB';

export var accountActions = {
    getAccount : ()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let postData = {
                accessInfo:loginInfo.loginData
            };

            _h.ajax.resource('/account/:info').save({info:'info'},postData)
                .then((data)=>{
                    dispatch({type:'GET_ACCOUNT', data});
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }
};
/**
 * Created by LDQ on 2016/10/19.
 */

import {
    CREATE_ADDRESS,
    GET_DEFAULT,
    GET_LIST,
    SET_PROVINCE,
    SET_CITY,
    SET_AREA,
    SET_NAME,
    SET_PHONE_NUM,
    SET_DETAIL_ADDRESS,
    CHECKED_ADDRESS,
    SAVE_CURRENT,
    SET_DEFAULT,
    SET_NEW_ADDRESS
} from './addressActionKeys';

import _h from '../../Util/HB';

export var addressActions = {
    getList:()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let postData = {
                accessInfo:loginInfo.loginData,
                size:10,
                pageNo:0
            };

            _h.ajax.resource('/deliveryAddress/list').save({},postData).then((data)=>{
                dispatch({type:'GET_LIST',data})
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    createAddress:()=>{
        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;

            let newAddressInfo = getState().address.newAddressInfo;
            let postData = Object.assign({},{
                accessInfo:loginInfo.loginData,
                provinceId:newAddressInfo.provinceId,
                cityId:newAddressInfo.cityId,
                fullAddress:newAddressInfo.districtAddress + newAddressInfo.detailAddress,
                districtAddress:newAddressInfo.districtAddress,
                positionX:"0",
                positionY:"0",
                isDefault:newAddressInfo.isDefault,
                phoneNum:newAddressInfo.phoneNum,
                recievName:newAddressInfo.recievName,
                detailAddress:newAddressInfo.detailAddress
            });
            let path = "create";
            if(newAddressInfo.id){
                path = "edit";
                postData.id=newAddressInfo.id;
            }
            _h.ajax.resource('/deliveryAddress/:path').save({path:path},postData)
                .then((data)=>{
                    dispatch({type:'CREATE_ADDRESS',data});
                    window.location.hash = "#/SelectAddress"
                }).catch((error)=>{
                    console.log(error);
                })
        }
    },
    setProvince: (item) =>{
        return {
            type : SET_PROVINCE,
            item
        }
    },
    setCity: (item) =>{
        return {
            type : SET_CITY,
            item
        }
    },
    setArea: (item) =>{
        return {
            type : SET_AREA,
            item
        }
    },
    setName: (item) =>{
        return {
            type : SET_NAME,
            item
        }
    },
    setPhoneNum: (item) =>{
        return {
            type : SET_PHONE_NUM,
            item
        }
    },
    setDetailAddress: (item) =>{
        return {
            type : SET_DETAIL_ADDRESS,
            item
        }
    },
    checkedAddress: (item) =>{
        return {
            type : CHECKED_ADDRESS,
            item
        }
    },
    setDefault: ()=>{
        return {
            type : SET_DEFAULT,
        }
    },
    setNewAddress: (item)=>{
        return {
            type : SET_NEW_ADDRESS,
            item
        }
    }

};

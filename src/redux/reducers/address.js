/**
 * Created by LDQ on 2016/10/19.
 */

import {
    GET_DEFAULT ,
    GET_LIST ,
    SET_PROVINCE,
    SET_CITY,
    SET_AREA,
    SET_NAME,
    SET_PHONE_NUM,
    SET_DEFAULT,
    SET_DETAIL_ADDRESS,
    CHECKED_ADDRESS,
    SAVE_CURRENT,
    SET_NEW_ADDRESS
} from '../actions/addressActionKeys';

function hasCurrentAddress(addressList){
    if(addressList.length > 0){
        return true;
    }else{
        return false;
    }
}

function getDefAddress(ele){
    return ele.isDefault == 1;
}
function getCurrentAddress(listAddress){
    let defAddress = listAddress.find(getDefAddress);
    let firstAddress = listAddress[0];
    return defAddress || firstAddress || {};
}

function checkedAddress(listAddress,item) {
    for(let i = 0;i < listAddress.length;i++){
        listAddress[i].checked = false;

        if(listAddress[i].id == item.id){
            listAddress[i].checked = true;
        }
    }
    return listAddress;
}

function getTitle(item){
    let title = "编辑";
    if(item.id == ""){
        title = "新建"
    }
    return title;
}
function setNewAddress(item){
    let title = getTitle(item);
    return Object.assign({},item,{
        title:title
    })
}

export const address = function(state = {},action){
    var newState = Object.assign({},state);

    switch (action.type) {
        case 'GET_LIST':

            return Object.assign({},state,{
                listAddress:action.data.content,
                hasCurrentAddress:hasCurrentAddress(action.data.content),
                currentAddress:getCurrentAddress(action.data.content)
            });
        case 'SET_PROVINCE':

            newState.newAddressInfo.provinceId = action.item.id;
            newState.newAddressInfo.districtAddress = action.item.label;
            return Object.assign({},state,newState);
        case 'SET_CITY':

            newState.newAddressInfo.cityId = action.item.id;
            newState.newAddressInfo.districtAddress += action.item.label;
            return Object.assign({},state,newState);

        case 'SET_AREA':

            newState.newAddressInfo.districtAddress += action.item.label;
            return Object.assign({},state,newState);
        case 'SET_NAME':

            newState.newAddressInfo.recievName = action.item;
            return Object.assign({},state,newState);
        case 'SET_PHONE_NUM':

            newState.newAddressInfo.phoneNum = action.item;
            return Object.assign({},state,newState);
        case 'SET_DEFAULT':

            newState.newAddressInfo.isDefault = Number(!Boolean(state.newAddressInfo.isDefault));
            return Object.assign({},state,newState);
        case 'SET_DETAIL_ADDRESS':

            newState.newAddressInfo.detailAddress = action.item;
            return Object.assign({},state,newState);
        case 'CHECKED_ADDRESS':
            return Object.assign({},state,{
                listAddress:checkedAddress([...state.listAddress],action.item),
                currentAddress:action.item
            });
        case 'SET_NEW_ADDRESS':
            return Object.assign({},state,{
                newAddressInfo:setNewAddress(action.item),
            });

        default:
            return state
    }
};
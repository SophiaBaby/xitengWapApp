/**
 * Created by LDQ on 2016/9/30.
 */
import {SELECTED_BUY_XTCOIN} from '../actions/XTCoinsActionKeys';
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const XTCoinsActions = {

    selectedBuyXTCoin: (index)=>{
        return {
            type : SELECTED_BUY_XTCOIN,
            index
        }
    },
    exchangeXTCoins : (tradeWay)=>{

        return (dispatch,getState)=>{
            let loginInfo = getState().loginInfo;
            let diamondsPrice = getState().XTCoins.price;
            let xtbCount = getState().XTCoins.XTCoinList.map((item,index)=>{
                if(item.selected){
                    return item.count;
                }
            });


            let postData = {
                accessInfo:loginInfo.loginData,
                xtbCount:xtbCount,
                diamondPrice:diamondsPrice,
                tradeWay:tradeWay
            };
            console.log(postData);

            _h.ajax.resource('/exchange/xtb').save({},postData).then((data)=>{
                dispatch({type:'HIDE_DIALOG'})
            })
                .catch((error)=>{
                    console.log(error);
                    dispatch({type:'SHOW_DIALOG'});
                })
        }
    }
};
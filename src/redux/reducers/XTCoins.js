/**
 * Created by liudq on 16/9/29.
 */
import {SELECTED_BUY_XTCOIN} from '../actions/XTCoinsActionKeys';


function getPrice(XTCoins){
    let rate = 1/12;
    return XTCoins * rate;
}

export const XTCoins = function(state = {},action){

    switch (action.type) {
        case 'SELECTED_BUY_XTCOIN':
            let XTCoinList = [...state.XTCoinList];
            XTCoinList.map((item,index)=>{
               item.selected = false
            });
            XTCoinList[action.index].selected = true;

            return Object.assign({},state,{
                XTCoinList:XTCoinList,
                price:getPrice(XTCoinList[action.index].count)
            });

        default:
            return state
    }
};
/**
 * Created by liudq on 16/9/29.
 */

let XTCoinsList = [120,600,1200,2400,6000,12000];

let myXTCoinsList = XTCoinsList.map((item,index)=>{
    return {
        count:item,
        selected:false
    }
});


export const XTCoinsInit = {
    XTCoinList:myXTCoinsList,
    price:0
};
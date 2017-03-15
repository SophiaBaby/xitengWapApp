/**
 * Created by LDQ on 2016/11/14.
 */
import { WX_PAY_INFO,PREPAY } from '../actions/payActionKeys';


export const pay = function (state={},action){
    switch (action.type) {
        case WX_PAY_INFO:
            let wxPayInfo = action.data;

            return Object.assign({},state,{
                wxPay:{
                    timestamp:wxPayInfo.wexinSpec.timestamp,
                    noncestr:wxPayInfo.wexinSpec.noncestr,
                    prepay_id:wxPayInfo.wexinSpec.prepay_id,
                    sign:wxPayInfo.wexinSpec.sign
                },
                prePay:false
            });
        case PREPAY:
            return Object.assign({},state,{
                prePay:true
            });
        default:
            return state
    }

};
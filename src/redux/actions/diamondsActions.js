/**
 * Created by LDQ on 2016/10/14.
 */
import {SELECTED_DIAMONDS,CLEAR_SELECTED,SET_AMOUNT} from './diamondsActionKeys';
import _h from '../../Util/HB';
import {hex_md5} from '../../Util/md5';

export const diamondsActions= {

    selectedDiamonds:(index)=>{
        return {
            type:SELECTED_DIAMONDS,
            index
        }
    },
    clearSelected:()=>{
        return {
            type:CLEAR_SELECTED
        }
    },
    setAmount:(amount)=>{
        return {
            type:SET_AMOUNT,
            amount
        }
    }

};
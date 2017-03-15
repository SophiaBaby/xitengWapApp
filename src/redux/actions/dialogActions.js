/**
 * Created by LDQ on 2016/8/30.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from './dialogActionKeys';

export var dialogActions = {
    showDialog: ()=>{
        return {
            type : SHOW_DIALOG
        }
    },

    hideDialog: ()=>{
        return {
            type: HIDE_DIALOG
        }
    },
};
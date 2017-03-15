/**
 * Created by LDQ on 2016/8/30.
 */
import {SHOW_DIALOG,HIDE_DIALOG} from '../actions/dialogActionKeys';

export const showDialog = function (state = {},action) {
    switch (action.type) {
        case 'SHOW_DIALOG':
            console.log('----dialogData',action.data);
            let data = action.data||{};
            return Object.assign({},state,{
                showDialog:true,
                title:data.title,
                body:data.body,
                cancel:data.cancel,
                certain:data.certain
            });

        case 'HIDE_DIALOG':
            return Object.assign({},state,{
                showDialog:false
            });
        default:
            return state
    }

};

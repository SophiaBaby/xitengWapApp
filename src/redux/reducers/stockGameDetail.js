/**
 * Created by LDQ on 2016/9/13.
 */

import { GET_STOCKDETAIL,GET_STOCKKLINE} from '../actions/stockGameDetailActionKeys'


export const stockGameDetail = function (state = {},action){
    switch (action.type) {
        case 'GET_STOCKDETAIL':

            return Object.assign({},state,{
                detail:action.data
            });

        case 'GET_STOCKKLINE':

            var KLineTags = [...state.KLineTags];
            KLineTags.map((tag,index)=>{
                tag.selected = false;
            });
            KLineTags[action.index].selected = true;
            return Object.assign({},state,{
                KLineTags:KLineTags
            });

        default:
            return state
    }

};
/**
 * Created by zhangxin on 2/23 0023.
 */
import { GET_SELF_RANK } from '../actions/selfRankActionKeys';

export const selfRank = function(state = {},action){

    switch (action.type) {
        case 'GET_SELF_RANK':
            // console.log("readucer出来了")
            return Object.assign({},state,{
                selfRank : action.data
            });

        default:
            return state
    }
};
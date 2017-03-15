/**
 * Created by LDQ on 2016/10/10.
 */
import { GET_RANK ,SELECTED} from '../actions/rankActionKeys';

export const rank = function(state = {},action){

    switch (action.type) {
        case 'GET_RANK':
            // console.log(action.data);

            return Object.assign({},state,{
                rankList:action.data.content,
                // last:action.data.last,
                // pageNo:action.pageNo
            });
        case 'SELECTED':
            let rankType = [...state.rankType];
            for(var i = 0;i < rankType.length;i++){
                rankType[i].selected = false;
                if(rankType[i].id == action.id){
                    rankType[i].selected = true;
                }
            }
            return Object.assign({},state,{
                rankType:rankType
            });


        default:
            return state
    }
};
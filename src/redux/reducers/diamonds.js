/**
 * Created by LDQ on 2016/8/23.
 */
import {SELECTED_DIAMONDS,CLEAR_SELECTED,SET_AMOUNT,CLEAR_CUSTOM} from '../actions/diamondsActionKeys';

function selected(diamondList,index){
    diamondList[index].selected = true;
    return diamondList;
}
function clear(diamondList){
    for(let i = 0;i < diamondList.length;i++){
        diamondList[i].selected = false;
    }
    return diamondList
}


export const diamonds = function(state = {},action){

    switch (action.type) {
        case 'SELECTED_DIAMONDS':

            return Object.assign({},state,{
                diamondList:selected([...state.diamondList],action.index),
                amount:state.diamondList[action.index].amount
            });
        case 'CLEAR_SELECTED':
            return Object.assign({},state,{
                diamondList:clear([...state.diamondList]),
                amount:0
            });
        case 'SET_AMOUNT':
            return Object.assign({},state,{
                amount:action.amount
            });
        default:
            return state
    }
};

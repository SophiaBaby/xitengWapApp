/**
 * Created by LDQ on 2016/9/24.
 */
import {PUSH_URL,POP_URL,RECALL,MARK} from './historyUrlsActionKeys';

export const historyUrlsActions = {
    pushUrl: (url)=>{
        return {
            type : PUSH_URL,
            url
        }
    },

    popUrl: (index = -1)=>{
        return {
            type: POP_URL,
            index
        }
    },

    recall: (url)=>{
        return {
            type: RECALL,
            url
        }
    },
    mark: (url)=>{
        return {
            type: MARK,
            url
        }
    },
    saveStateGo : (url)=>{
        return (dispatch,getState)=>{
            let nowState = getState();
            localStorage.nowState = JSON.stringify(nowState);
            window.location.href = url;
        }
    }
};

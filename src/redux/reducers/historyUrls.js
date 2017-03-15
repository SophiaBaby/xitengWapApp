/**
 * Created by LDQ on 2016/9/24.
 */

import {PUSH_URL,POP_URL,RECALL,MARK} from '../actions/historyUrlsActionKeys';
import _h from '../../Util/HB';
class HistoryUrls{
    pushUrl(url,urls){
        if(url == "/Guess" || url == "/Discover" || url == "/My"){
            // history.pushState({},"", "about:blank");
            return [url];
        }else if(urls[urls.length-1] != url){
            return [...urls,url]
        }else{
            return urls
        }
    }
    popUrl(index,urls){
        urls.splice(index,1);
        return urls;
    }
    setToLocalStorage(historyUrls){
        localStorage.historyUrls = JSON.stringify(historyUrls);
        console.log(localStorage.historyUrls)
    }
    setFromLocalStorage(){
        return JSON.parse(localStorage.historyUrls);
    }
    recall(urls,url){
        let index = urls.indexOf(url) + 1;
        return urls.slice(0,index);
    }
}


export const historyUrls = function(state = {},action){
    var historyUrls = new HistoryUrls();

    switch (action.type) {
        case 'PUSH_URL':

            var urlList = historyUrls.pushUrl(action.url,[...state.urlList]);
            let previousUrl = urlList[urlList.length-2]||action.url;
            return Object.assign({},state,{
                urlList:urlList,
                last:previousUrl
            });

        case 'POP_URL':
            return Object.assign({},state,{
                urlList:historyUrls.popUrl(action.index,[...state.urlList])
            });
        case 'RECALL':
            var urlList = historyUrls.recall([...state.urlList],action.url);
            console.log('reducer-recall-newUrlList',urlList);
            return Object.assign({},state,{
                urlList:urlList
            });
        case 'MARK':
            return Object.assign({},state,{
                mark:action.url
            });
        default:
            return state
    }
};
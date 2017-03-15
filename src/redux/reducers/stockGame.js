/**
 * Created by LDQ on 2016/8/8.
 */
import { COUNT_DOWN,GET_GAMELIST,REFRESH} from '../actions/stockGameActionKeys'
import {stockGameList} from '../../Util/xitengBaseConfig';


export const stockGame = function (state = {},action){
    switch (action.type) {
        case 'GET_GAMELIST':
            let myGameList = action.data.content;

            let startTime = myGameList[0].gameStartTime;
            let endTime = myGameList[0].gameEndTime;
            startTime = new Date(startTime.replace(new RegExp("-","gm"),"/")).getTime();
            endTime = new Date(endTime.replace(new RegExp("-","gm"),"/")).getTime();
            let endMonth = new Date(endTime).getMonth();
            let endDate = new Date(endTime).getDate();
            let endDay = new Date(endTime).getDay();

            addTitlePic(myGameList,stockGameList.name2pic);

            return Object.assign({},state,{
                gameTime:{
                    startTime:startTime,
                    endTime:endTime,
                    endMonth:endMonth,
                    endDate:endDate,
                    endDay:endDay
                },
                gameList:myGameList,
                last:action.data.last,
            });
        case 'COUNT_DOWN':
            let nowTime = action.nowTime.getTime();
            var countDownTime = action.endTime - nowTime;
            if(countDownTime < 0){
                countDownTime = "已结束";
            }else{
                countDownTime = trimTime(countDownTime - action.step,":");
            }
            return Object.assign({},state,{
               countDown:{
                   countDownTime:countDownTime
               }

            });
        case 'REFRESH':

            let index = state.gameList.findIndex((gameItem)=>{
                return gameItem.stockGameId == action.id;
            });
            var gameList = [...state.gameList];
            gameList[index] = action.data;

            addTitlePic(gameList,stockGameList.name2pic);
            return Object.assign({},state,{
                gameList:gameList
            });

        default:
            return state
    }

};

function paddingZero(i){
    if(i < 10){
        return "0" + i;
    }else{
        return i;
    }
}

function trimTime(time){
    var day = parseInt(time / 86400000);

    var y = time % 86400000;

    var h = parseInt(y / 3600000);
    h = paddingZero(h);

    y = time % 3600000;
    var min = parseInt( y / 60000);
    min = paddingZero(min);

    y = y % 60000;
    var sec = parseInt(y / 1000);
    sec = paddingZero(sec);

    return day+"天"+h + "时" + min + "分" + sec + "秒";

}


function findName(pic,stockItem){

    return function findStockName(pic){

        return pic.name == stockItem.stockGameName;
    }

}

function addTitlePic(stockList,picList){


    for(let i = 0;i < stockList.length;i++){

        stockList[i].picUrl = picList.find(findName(picList,stockList[i])).pic;
    }
}
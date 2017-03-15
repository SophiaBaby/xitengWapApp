/**
 * Created by LDQ on 2016/9/13.
 */
export const stockGameDetail = {
    detail:{
        stockGameId: "",
        stockGameName: "",
        guessUpXtBAmount: "",
        guessDownXtBAmount: "",
        status: "",
        tradeDay: "",
        gameStartTime: "",
        gameEndTime: "",
        stockCode: "",
        stockModel: {
            stockName: "",
            todayOpend: "",
            yesterDayClosed: "",
            nowPrice: "",
            todayMaxPrice: "",
            todayMinPrice: "",
            turnoverStockAmount: "",
            turnoverStockMoney: "",
            currentPoint: "",
            changeRate: "",
            chg: ""
        },
        comesTime: "",
        leastCathectic: "",
        guessUpRate: "",
        guessDownRate: "",
        guessXtbCount: "",
        upOrDown:true
    },
    KLineTags:[
        {tag:"min",tagTitle:"分时",selected:true},
        {tag:"daily",tagTitle:"日K",selected:false},
        {tag:"weekly",tagTitle:"周K",selected:false},
        {tag:"monthly",tagTitle:"月K",selected:false}
    ]
};
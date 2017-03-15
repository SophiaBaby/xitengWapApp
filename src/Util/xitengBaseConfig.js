/**
 * Created by LDQ on 2016/12/8.
 */

export const appKey = "b5958b665e0b4d8cae77d28e1ad3f521";
export const appSecret = "71838ae252714085bc0fb2fc3f420110";
export const getJustNowWithStockList = {
    sortProperties:{time:["time"]},
    direction:"DESC",
    pageNo:0,
    size:30
};
export const award = {
    list:{
        awardType:{week:1,month:2,year:3}
    }
};
export const createTradeOrder = {
    productType:{
        member:1,
        diamonds:2,
        product:3
    },
    orderType:{
        commonOrder:1,
        agency:2
    }
};
export const stockGameList = {
    name2pic:[
        {
            name:'上证综指',
            pic:'src/images/shangzhengzongzhi@2x.png'
        },
        {
            name:'创业板指',
            pic:'src/images/chuangyebanzhi@2x.png'
        }
    ]
};

export const activityList = {
    activityCategory:{
        home:"home",
        purchaseGame:"purchaseGame"
    }
};
export const purchaseGameConfig = {
    purchaseGameStatus:[
        {key:"bidding",id:1,text:"进行中"},
        {key:"finish_bid",id:2,text:"夺宝结束"},
        {key:"have_lottery",id:3,text:"已经开奖"}
    ]
};

export const picUrl = [
    "/Home-green-flag@2x.png",
    "/Home-Guess-down-button@2x.png",
    "/cai2-PK@2x.png",
    "/cai2-S-currency-@2x.png",
    "/Home-Guess-up-button@2x.png",
    "/Home-red-flag@2x.png",
    "/home-S-currency@2x.png",
    "/home_chuangyebanzhi@2x.png",
    "/home_shangzhengzongzhi@2x.png",
    "/icon_arrow_down@2x.png",
    "/icon_arrow_up-@2x.png",
    "/icon_bear@2x.png",
    "/icon_cow@2x.png",
    "/pay_fail.png",
    "/PK@2x.png",
    "/xt_coins_2.png",
    "/cai3-bg@2x.png",
    "/cai3-light-@2x.png",
    "/tab_faxian@2x.png",
    "/tab_faxian_s@2x.png",
    "/tab_me@2x.png",
    "/tab_me_s@2x.png",
    "/tab_xiteng@2x.png",
    "/tab_xiteng_s@2x.png",
    "/shangzhengzongzhi@2x.png",
    "/chuangyebanzhi@2x.png"
];
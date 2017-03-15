/**
 * Created by LDQ on 2016/12/22.
 */
export const purchaseGameInit = {
    newestWin:[],
    products:{
        productList:[],
        last:false,
        pageNo:0
    },
    productType:[
        {
            query:{
                popularity:1,
            },
            name:"人气",
            selected:true,
        },
        {
            query:{
                rateOfProgress:1,
            },
            name:"进度",
            selected:false,
        },
        {
            query:{
                price:1,
            },
            name:"价格",
            selected:false,
        },
    ],
    detail:{
        pictures:[],
        purchaseGameStatus:{
            text:""
        }
    },
    bidDetail:{
        bid:false,
        bidRecords:[]
    },
    openProducts:{
        userList:[],
        last:false,
        pageNo:0
    },
    show:{
        showList:[],
        last:false,
        pageNo:0
    },
    order:{
        bidRecords:[],
        purchaseGameCount:1,
    }

};
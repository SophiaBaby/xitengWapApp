/**
 * Created by LDQ on 2016/10/14.
 */
export const shopInit = {
    productList:[],
    pageNo:0,
    last:false,
    type:[
        {
            mannerId:{tagName:"推荐"},
            title:"推荐",
            selected:true
        },
        {
            mannerId:{salesTag:-1},
            title:"销量",
            selected:false
        },
        {
            mannerId:{priceTag:-1},
            title:"价格",
            selected:false
        }
    ]
};
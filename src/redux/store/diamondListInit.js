/**
 * Created by LDQ on 2016/11/13.
 */

var diamonds = [10,50,100,1000,5000];

let rate = 1;

var diamondList = function(list){
    var myList = [];
    for(let i =0;i < list.length;i++){
        myList.push({
            price:list[i] * rate,
            amount:list[i],
            selected:false
        })
    }
    return myList;
};

export const diamondListInit = {
    diamondList:diamondList(diamonds),
    amount:0
};
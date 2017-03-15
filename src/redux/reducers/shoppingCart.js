/**
 * Created by LDQ on 2016/8/18.
 */

import {
    ADD_PRODUCTITEM,
    CALC_TOTALMONEY,
    DELETE_PRODUCTS,
    CHECKED_ITEM,
    ALLCHECKED,
    INCREASE,
    REDUCE,
    EDIT
} from '../actions/shoppingCartActionKeys';


function pushOrAdd(products,item){
    let product = Object.assign({},item,{checked:true,num:1});
    let productId= product.productId;
    for(let i = 0;i < products.length;i++){
        if(products[i].productId === productId){
            products[i].num += (product.num);
            return products;
        }
    }
    products = [...products,product];
    return products;
}
function calcTotalMoney(products){
    let realCount = 0;
    products.map((goods,index)=>{
        if(goods.checked){
            realCount += (goods.num * goods.price);
        }
    });
    return realCount;
}
function checkedItem(products,index){
    products[index].checked = !products[index].checked;
    return products;
}

function isAllChecked(products){
    var allChecked = true;
    products.map((product,index)=>{
        if(!product.checked){
            allChecked = false
        }
    });
    return allChecked;
}
function allCheck(state,bool){
    var allChecked = !state.allChecked;
    if(!bool){
        allChecked = false;
    }

    var productList = [...state.products];
    productList.map((goods,index)=>{
        goods.checked = allChecked;
    });
    return {
        productList:productList,
        allChecked:allChecked
    }
}
function increase(products,index){
    products[index].num += 1;
    return products;
}
function reduce(products,index){
    if(products[index].num > 0){
        products[index].num -= 1;
    }
    return products;
}
function deleteProducts(products){
    var productList = [];
    for(let i = 0;i < products.length;i++){
        if(!products[i].checked){
            productList.push(products[i]);
        }
    }
    return productList
}
function calcTotleNum(products){
    var totalNum = 0;
    products.map((goods,index)=>{
        totalNum += goods.num
    });
    return totalNum;
}

export const shoppingCart = function(state = {},action){

    switch (action.type) {
        case 'ADD_PRODUCTITEM':
            var productList = pushOrAdd([...state.products],action.item);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'CALC_TOTALMONEY':
            return Object.assign({},state,{
                realCount:calcTotalMoney(state.products)
            });

        case 'CHECKED_ITEM':
            let productList = checkedItem([...state.products],action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                allChecked:isAllChecked(productList)
            });

        case 'ALLCHECKED':
            let newState = allCheck(state,action.bool);
            return Object.assign({},state,{
                products:newState.productList,
                allChecked:newState.allChecked,
                realCount:calcTotalMoney(newState.productList)
            });

        case 'INCREASE':
            var productList = increase([...state.products],action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'REDUCE':
            var productList = reduce([...state.products],action.index);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'DELETE_PRODUCTS':
            var productList = deleteProducts([...state.products]);
            return Object.assign({},state,{
                products:productList,
                realCount:calcTotalMoney(productList),
                allChecked:isAllChecked(productList),
                totalNum:calcTotleNum(productList)
            });

        case 'EDIT':
            let edit = state.edit;
            return Object.assign({},state,{
                edit:!edit
            });
        default:
            return state;
    }
};
/**
 * Created by LDQ on 2016/8/9.
 */
// import {applyMiddleware, compose, createStore } from 'redux';
// var rootReducer = require('./../reducers/index');
//
// import thunk from 'redux-thunk'
//
// const enhancer = compose(
//     //你要使用的中间件，放在前面
//     applyMiddleware(thunk),
//     //必须的！启用带有monitors（监视显示）的DevTools
//     window.devToolsExtension && window.devToolsExtension()
//  );
//
// function createStoreWithMiddleware(initialState){
//     return createStore(
//         rootReducer,
//         initialState,
//         enhancer
//     )
// }
//
// module.exports = createStoreWithMiddleware;




import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
var rootReducer = require('./../reducers/index');

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
}

module.exports = configureStore;

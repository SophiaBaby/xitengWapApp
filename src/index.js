/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var ReactDom = require('react-dom');
var { Router, Route, hashHistory,IndexRedirect} = require('react-router');
var Store = require('../src/redux/store/store');
var {Provider} = require('react-redux');


var PreLoading = require('../src/container/PreLoading');
var HomePage = require('../src/components/HomePage');
var AskBar = require('../src/components/AskBar');

var Guess = require('../src/container/Guess');
var Discover = require('../src/container/Discover');
var My = require('../src/container/My');
var Shop = require('../src/container/Shop');
var ShoppingCart = require('../src/container/ShoppingCart');
var ProductDetails = require('../src/container/ProductDetails');
var BuyDiamonds = require('../src/container/BuyDiamonds');
var Register = require('../src/container/Register');
var CheckCode = require('../src/container/CheckCode');
var Login = require('../src/container/Login');
var StockDetails = require('../src/container/StockDetails');
var Bet = require('../src/container/Bet');
var ExchangeXTCoins = require('../src/container/ExchangeXTCoins');
var Pay = require('../src/container/Pay');
var PaySuccess = require('../src/container/PaySuccess');
var ConfirmOrder = require('../src/container/ConfirmOrder');
var SelectAddress = require('../src/container/SelectAddress');
var CreateAddress = require('../src/container/CreateAddress');
var Provinces = require('../src/container/Provinces');
var Cities = require('../src/container/Cities');
var Areas = require('../src/container/Areas');
var MyAsset = require('../src/container/MyAsset');
var MyRecord = require('../src/container/MyRecord');
var SetPassword = require('../src/container/SetPassword');
var PayFail = require('../src/container/PayFail');
var OnePiece = require('../src/container/OnePiece');
var OnePieceProductDetails = require('../src/container/OnePieceProductDetails');
var OnePieceJoinDetail = require('../src/container/OnePieceJoinDetail');
var OnePieceOldActivities = require('../src/container/OnePieceOldActivities');
var OnePieceShow = require('../src/container/OnePieceShow');
var OnePieceBuyNow = require('../src/container/OnePieceBuyNow');
var OnePieceConfirmOrder = require('../src/container/OnePieceConfirmOrder');
var OnePieceJoinResult = require('../src/container/OnePieceJoinResult');
var OnePieceOldActivitiesHome = require('../src/container/OnePieceOldActivitiesHome');
var OrderDetails = require('../src/container/OrderDetails');
var OrderList = require('../src/container/OrderList');
var AcceptPrize = require('../src/container/AcceptPrize');
var PrizeList = require('../src/container/PrizeList');
var StockPKDetail = require('../src/container/StockPKDetail');
var AddBankCard = require('../src/container/AddBankCard');
var AddBankCardInfo = require('../src/container/AddBankCardInfo');


import {stockGameInit} from  '../src/redux/store/stockGameInit';
import {shoppingCartInit} from '../src/redux/store/shoppingCartInit';
import {loginInfoInit} from  '../src/redux/store/loginInfoInit';
import {stockGameDetail} from '../src/redux/store/stockGameDetailInit';
import {storageInit} from '../src/redux/store/storageInit';
import {accountInit} from '../src/redux/store/accountInit'
import {XTCoinsInit} from '../src/redux/store/XTCoinsInit';
import {rankInit} from '../src/redux/store/rankInit.js';
import {betListInit} from '../src/redux/store/betListInit';
import {awardInit} from '../src/redux/store/awardInit';
import {historyUrlsInit} from '../src/redux/store/historyUrlsInit';
import {shopInit} from '../src/redux/store/shopInit';
import {productInfoInit} from '../src/redux/store/productInfoInit';
import {addressInit} from '../src/redux/store/addressInit';
import {provincesInit} from '../src/redux/store/provincesInit';
import {citiesInit} from '../src/redux/store/citiesInit';
import {areasInit} from '../src/redux/store/areasInit';
import {orderInit} from '../src/redux/store/orderInit';
import {betRecordInit} from '../src/redux/store/betRecordInit';
import {WXInfoInit} from '../src/redux/store/WXInfoInit';
import {diamondListInit} from '../src/redux/store/diamondListInit';
import {payInit} from '../src/redux/store/payInit';
import {dialogInit} from '../src/redux/store/dialogInit';
import {betInfoInit} from '../src/redux/store/betInfoInit';
import {userInfoInit} from '../src/redux/store/userInfoInit';
import {activityInit} from '../src/redux/store/activityInit';
import {purchaseGameInit} from '../src/redux/store/purchaseGameInit';
import {bidOrderInit} from '../src/redux/store/bidOrderInit';
import {selfRankInit} from '../src/redux/store/selfRankInit';


import _h from '../src/Util/HB';
var {syncHistoryWithStore} = require('react-router-redux');

const store = Store(initState());
const history = syncHistoryWithStore(hashHistory, store);


var getRoutes = ()=>{
    return (
        <Router history={history}>
            <Route path="/" component={PreLoading}></Route>

            <Route path="/HomePage" component={HomePage}>
                <IndexRedirect to="/Guess"/>
                <Route path="/Guess" component={Guess}></Route>
                <Route path="/AskBar" component={AskBar}></Route>
                <Route path="/Discover" component={Discover}></Route>
                <Route path="/My" component={My}></Route>
            </Route>
            <Route path="/Shop" component={Shop}></Route>
            <Route path="/ProductDetails" component={ProductDetails}></Route>
            <Route path="/BuyDiamonds" component={BuyDiamonds}></Route>
            <Route path="/ShoppingCart" component={ShoppingCart}></Route>
            <Route path="/Register" component={Register}></Route>
            <Route path="/CheckCode" component={CheckCode}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/StockDetails" component={StockDetails}></Route>
            <Route path="/Bet" component={Bet}></Route>
            <Route path="/ExchangeXTCoins" component={ExchangeXTCoins}></Route>
            <Route path="/Pay" component={Pay}></Route>
            <Route path="/PaySuccess" component={PaySuccess}></Route>
            <Route path="/ConfirmOrder" component={ConfirmOrder}></Route>
            <Route path="/SelectAddress" component={SelectAddress}></Route>
            <Route path="/CreateAddress" component={CreateAddress}></Route>
            <Route path="/Provinces" component={Provinces}></Route>
            <Route path="/Cities" component={Cities}></Route>
            <Route path="/Areas" component={Areas}></Route>
            <Route path="/MyAsset" component={MyAsset}></Route>
            <Route path="/MyRecord" component={MyRecord}></Route>
            <Route path='/SetPassword' component={SetPassword}></Route>
            <Route path='/PayFail' component={PayFail}></Route>
            <Route path='/OnePiece' component={OnePiece}></Route>
            <Route path='/OnePieceProductDetails' component={OnePieceProductDetails}></Route>
            <Route path='/OnePieceJoinDetail' component={OnePieceJoinDetail}></Route>
            <Route path='/OnePieceOldActivities' component={OnePieceOldActivities}></Route>
            <Route path='/OnePieceShow' component={OnePieceShow}></Route>
            <Route path='/OnePieceBuyNow' component={OnePieceBuyNow}></Route>
            <Route path='/OnePieceConfirmOrder' component={OnePieceConfirmOrder}></Route>
            <Route path='/OnePieceJoinResult' component={OnePieceJoinResult}></Route>
            <Route path='/OnePieceOldActivitiesHome' component={OnePieceOldActivitiesHome}></Route>
            <Route path='/OrderDetails' component={OrderDetails}></Route>
            <Route path='/OrderList' component={OrderList}></Route>
            <Route path='/AcceptPrize' component={AcceptPrize}></Route>
            <Route path='/PrizeList/:id' component={PrizeList}></Route>
            <Route path='/StockPKDetail/:id' component={StockPKDetail}></Route>
            <Route path='/AddBankCard' component={AddBankCard}></Route>
            <Route path='/AddBankCardInfo' component={AddBankCardInfo}></Route>
        </Router>
)};

_h.ui.setBaseFontSize(750,100);


function initState(){
    return {
        stockGame:stockGameInit,
        stockGameDetail:stockGameDetail,
        shop:shopInit,
        diamonds:diamondListInit,
        storage:localStorage.storageInit?JSON.parse(localStorage.storageInit):storageInit,
        productInfo:productInfoInit,
        shoppingCart:shoppingCartInit,
        loginInfo:localStorage.loginInfoInit?JSON.parse(localStorage.loginInfoInit):loginInfoInit,
        showDialog:dialogInit,
        historyUrls:localStorage.historyUrlsInit?JSON.parse(localStorage.historyUrlsInit):historyUrlsInit,
        account:accountInit,
        XTCoins:XTCoinsInit,
        rank:rankInit,
        betList:betListInit,
        award:awardInit,
        address:addressInit,
        provinces:provincesInit,
        cities:citiesInit,
        areas:areasInit,
        order:localStorage.orderInit?JSON.parse(localStorage.orderInit):orderInit,
        betRecord:betRecordInit,
        WXInfo:WXInfoInit,
        pay:localStorage.payInit?JSON.parse(localStorage.payInit):payInit,
        betInfo:betInfoInit,
        userInfo:localStorage.userInfoInit?JSON.parse(localStorage.userInfoInit):userInfoInit,
        activity:activityInit,
        purchaseGame:purchaseGameInit,
        bidOrder:bidOrderInit,
        selfRank:selfRankInit
    }
}




ReactDom.render(
    <Provider store={store}>
        <div>
            {getRoutes()}
        </div>

    </Provider>,

    document.getElementById('root')
);
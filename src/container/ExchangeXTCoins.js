/**
 * Created by LDQ on 2016/9/28.
 */


var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/exchangeXTCoinsStyle.css');

import {loginInfoActions} from '../redux/actions/loginInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';
import {XTCoinsActions} from '../redux/actions/XTCoinsActions';
import {dialogActions} from '../redux/actions/dialogActions';

var ExchangeXTCoins = React.createClass({
    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
        this.props.historyUrlsActionKeys.pushUrl('/ExchangeXTCoins');
    },
    exchangeXTCoins:function(tradeWay){
        return ()=>{
            this.props.XTCoinsActionKeys.exchangeXTCoins(tradeWay);
        }
    },

    render: function () {
        var backUrl = this.props.historyUrls.last;
        let src = "/ExchangeXTCoins";
        if(!this.props.loginInfo.login){
            src = "/Login";
        }else if(!this.props.showDialog.showDialog){
            src = "/PaySuccess";
        }

        return (
            <div>
                <Header
                    historyUrls={this.props.historyUrls}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}>
                    <BackBtn
                        historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                        back={{text:'返回',src:'/nav_btn_back@2x.png',link:backUrl}}
                    />
                    <Title title={{text:'兑换喜腾币'}}></Title>
                </Header>
                <div className="buy_XTCoins po w">
                    <BuyXTCoins
                        accountActionKeys={this.props.accountActionKeys}
                        account={this.props.account}
                        XTCoins={this.props.XTCoins}
                        XTCoinsActionKeys={this.props.XTCoinsActionKeys}
                    />
                    <Link to={src} className="exchangeXTCoins tc f16 cfff" onClick={this.exchangeXTCoins(3)}>立即兑换</Link>
                </div>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="钻石不足"/>
                    <DialogBody content={"您的钻石余额不足，赶快去购买钻石吧！"}/>
                    <DialogFooter>
                        <DialogCancel showDialogActionKeys={this.props.showDialogActionKeys}/>
                        <DialogConfirm url={'/BuyDiamonds'} />
                    </DialogFooter>
                </DialogiOS>:''}
            </div>
        )
    }
});

var BuyXTCoins = React.createClass({
    render: function () {
        return (
            <div>
                <MyDiamonds
                    accountActionKeys={this.props.accountActionKeys}
                    account={this.props.account}
                />
                <PurchaseQuantity
                    XTCoins={this.props.XTCoins}
                    XTCoinsActionKeys={this.props.XTCoinsActionKeys}/>
            </div>
        )
    }
});

var MyDiamonds = React.createClass({
    componentWillMount:function(){
        this.props.accountActionKeys.getAccount();
    },
    render: function () {
        return (
            <div className="my_diamonds f14">
                <span className="c000 pl15">钻石余量：</span>
                <span className="cred">{this.props.account.diamondAmount}</span>
                <span className="c000">颗</span>
                <span>（钻石兑换喜腾币为1:12）</span>
            </div>
        )
    }
});

var  PurchaseQuantity = React.createClass({
    selectedBuyXTCoin:function(index){
        return ()=>{
            this.props.XTCoinsActionKeys.selectedBuyXTCoin(index);
        }
    },

    render: function () {
        var XTCoinNodes = this.props.XTCoins.XTCoinList.map((item,index)=>{

            return (
                <li className="XTCoin mt10 tc cblue" style={item.selected?{border:"1px solid #FF4242",color:"#FF4242"}:{}} key={index} onClick={this.selectedBuyXTCoin(index)}>
                    <p className="f16 pt10" >{item.count}</p>
                    <p className="pb10">喜腾币</p>
                </li>
            )
        });

        return (
            <div className="purchase_quantity">
                <p className="selected_title f16">选择套餐</p>
                <ul className="XICoin_box">
                    {XTCoinNodes}
                </ul>
                <p className="pay_diamonds f16">
                    <span>应付钻石：</span>
                    <span className="cred">{this.props.XTCoins.price}颗</span>
                </p>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        loginInfo:state.loginInfo,
        historyUrls:state.historyUrls,
        account:state.account,
        XTCoins:state.XTCoins,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        loginInfoActionKeys : bindActionCreators(loginInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        XTCoinsActionKeys : bindActionCreators(XTCoinsActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(ExchangeXTCoins);

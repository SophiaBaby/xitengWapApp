/**
 * Created by LDQ on 2016/9/21.
 */
var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/betStyle.css');

import {storageActions} from '../redux/actions/storageActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {betActions} from '../redux/actions/betActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {accountActions} from '../redux/actions/accountActions';
import {stockGameDetailActions} from '../redux/actions/stockGameDetailActions'
import _h from '../Util/HB';

var Bet = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Bet');
        // let urlList = [...this.props.historyUrls.urlList];
        // _h.url.setBrowserHistoryFromBefore(urlList,'/Bet');

        this.props.showDialogActionKeys.hideDialog();
        this.props.accountActionKeys.getAccount();

        this.props.betActionKeys.getOdds();
        this.props.stockGameDetailActionKeys.getStockDetail(this.props.storage.stockGameId);

    },
    bet:function(){
        return ()=>{
            let money = parseInt($('.J_betMoney').val());
            if(this.props.loginInfo.hasPhoneNum){
                this.props.betActionKeys.immediatelyBet(money);
            }

        }
    },
    render: function () {
        let url = (this.props.loginInfo.hasPhoneNum?"/Bet":"/Register");
        return (
            <div>
                <div className="bet_body po w">
                    <img src="src/images/cai3-light-@2x.png" alt="" className="bgLight po"/>
                    <BetHeader
                        storage={this.props.storage}
                        stockGameDetail={this.props.stockGameDetail}
                    />
                    <BetCenter
                        inputMoneyAction={this.props.betActionKeys}
                        account={this.props.account}
                    />
                    <Link to={url}>
                        <div className="betBtn po tc f16 w" onClick={this.bet()}></div>
                    </Link>

                </div>

                {this.props.showDialog.showDialog?<DialogiOS showDialog={this.props.showDialog}>
                    <DialogHeader title={this.props.showDialog.title}/>
                    <DialogBody content={this.props.showDialog.body}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={this.props.showDialog.cancel}/>
                        <DialogConfirm certain={this.props.showDialog.certain}/>
                    </DialogFooter>
                </DialogiOS>:''}
                <div className="bet_footer tc w">
                    <span>【当前参考】猜涨赔率：</span>
                    <span>{this.props.betInfo.upOdds}</span>
                    <span>猜跌赔率：</span>
                    <span>{this.props.betInfo.downOdds}</span>
                </div>
            </div>
        )
    }
});

var BetHeader = React.createClass({
    render: function () {
        return (
            <div className="bet_header pr f14 cfff mt50">
                <span>{this.props.stockGameDetail.detail.stockGameName}</span>
                <span className="pl15 pr15">{this.props.stockGameDetail.detail.stage}期</span>
                <span className={this.props.storage.guessType?"cgreen":"cred"}>{this.props.storage.guessType?"猜跌":"猜涨"}</span>
            </div>
        )
    }
});

var BetCenter = React.createClass({
    betQuickly:function(money){
        return ()=>{
            $('.J_betMoney').val(money);
        };

    },
    render: function () {
        return (
            <ul className="bet_center pr">
                <li className="input_money_box">
                    <p className="cfff">金额：</p>
                    <input type="number"
                           placeholder="请选择/输入金额"
                           className="J_betMoney input_money pl10 mr5"
                           ref="XTMoney"/>
                    <p className="cfff">喜腾币</p>
                </li>
                <li className="selected_box">
                    <div className="selected_money cfff tc" onClick={this.betQuickly(100)}>
                        <p className="f14">100</p>
                        <p>喜腾币</p>
                    </div>
                    <div className="selected_money cfff tc ml15" onClick={this.betQuickly(1000)}>
                        <p className="f14" >1000</p>
                        <p>喜腾币</p>
                    </div>
                    <div className="selected_money cfff tc ml15" onClick={this.betQuickly(10000)}>
                        <p className="f14">10000</p>
                        <p>喜腾币</p>
                    </div>
                </li>
                <li className="balance_box cfff ">
                    <span>余额：</span>
                    <span>{this.props.account.xtbTotalAmount}</span>
                    <Link to="/BuyDiamonds" className="fr cfff">获取喜腾币</Link>
                </li>
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        storage:state.storage,
        historyUrls:state.historyUrls,
        showDialog:state.showDialog,
        stockGameDetail:state.stockGameDetail,
        account:state.account,
        betInfo:state.betInfo,
        loginInfo:state.loginInfo
    }
}
function mapDispatchToProps(dispatch){

    return{
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        betActionKeys: bindActionCreators(betActions,dispatch),
        showDialogActionKeys: bindActionCreators(dialogActions,dispatch),
        accountActionKeys: bindActionCreators(accountActions,dispatch),
        stockGameDetailActionKeys: bindActionCreators(stockGameDetailActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(Bet);
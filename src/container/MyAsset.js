/**
 * Created by LDQ on 2016/10/26.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var $ = require('jquery');

require('../css/MyStyle.css');


import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {accountActions} from '../redux/actions/accountActions';

var MyAssert = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/MyAsset');
        this.props.accountActionKeys.getAccount();
    },
    render: function () {
        return (
            <div className="h po f5f5f5 w">
                <Myaccount account={this.props.account} />
                <div>
                    <EntranceList itemList={[{
                        name:'购买钻石',
                        url:"BuyDiamonds",
                        icon:'src/images/buy_diamonds_2.png'
                    },{
                        name:'购买商品',
                        url:"Shop",
                        icon:'src/images/shop_2.png'
                    }]}/>
                </div>
            </div>
        )
    }
});

var Myaccount = React.createClass({
    render: function () {
        return (
            <div>
                <div className="my_account_big_XTCoins tc">
                    <p>
                        <span className="f20 cred">{this.props.account.xtbTotalAmount}</span>
                        <span className="f14">喜腾币</span>
                    </p>
                </div>
                <ul className="my_account f14">
                    <li className="tc">
                        <span>{this.props.account.xtbProfitAmount}</span>
                        <span className="my_account_XTCoins f12">
                            <span>普通币</span>
                            <span className="cred">(全场通用)</span>
                        </span>
                    </li>
                    <li className="tc">
                        <span>{this.props.account.xtbCapitalAmount}</span>
                        <span className="my_account_color_coins f12">
                            <span>彩色币</span>
                            <span className="cred">(仅限投注)</span>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        account:state.account,
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys:bindActionCreators(accountActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(MyAssert);

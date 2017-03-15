/**
 * Created by LDQ on 2016/12/29.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/orderStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';
import {loginInfoActions} from '../redux/actions/loginInfoActions';

var OrderDetails = React.createClass({
    componentWillMount:function(){
        this.props.loginInfoActionKeys.wxLogin();
        this.props.historyUrlsActionKeys.pushUrl('/OrderDetails');
    },
    render: function () {
        return (
            <div>
                <OnePieceOrder />
            </div>
        )
    }
});

var OnePieceOrder = React.createClass({
    render: function () {
        return (
            <div>
                <div className="f5f5f5 w h" style={{position:"fixed"}}></div>
                <div className="pr">
                    <p className="order_title">
                        <span className="order_title_icon">夺宝订单</span>
                    </p>
                    <ul className="order_details_onePiece">
                        <li>
                            <Link to={{ pathname: "/OrderList", query: { bidOrderStatus: "waiting" } }} className="order_item_wait tc">
                                待揭晓
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/OrderList", query: { bidOrderStatus: "win" } }} className="order_item_win tc">
                                待领奖
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/OrderList", query: { bidOrderStatus: "finish" } }} className="order_item_finish tc">
                                待晒单
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        purchaseGame:state.purchaseGame,
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OrderDetails);
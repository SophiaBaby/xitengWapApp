/**
 * Created by LDQ on 2016/10/12.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/paySuccessStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import _h from '../Util/HB';

var PaySuccess = React.createClass({
    componentWillMount:function(){
        localStorage.clear();
    },
    componentDidMount:function(){
        let urlList = [...this.props.historyUrls.urlList];
        let markUrl = this.props.historyUrls.mark;
        _h.url.setBrowserHistoryFromBefore(urlList,markUrl);
    },
    render: function () {
        return (
            <div className="po w h f5f5f5">
                <div className="pay_success cblue tc f20 mt10">兑换成功</div>

                <ul className="fff pl15 pr15 mt10 f14">
                    <li>
                        <span>交易单号：</span>
                        <span>{this.props.order.tradeOrder.orderId}</span>
                    </li>
                    <li>
                        <span>支付金额：</span>
                        <span>{this.props.order.tradeOrder.realTotalFee / 100}元</span>
                    </li>
                    <li>
                        <span>支付方式：</span>
                        <span>微信支付</span>
                    </li>
                </ul>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        order:state.order
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(PaySuccess);
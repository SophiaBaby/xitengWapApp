/**
 * Created by LDQ on 2016/11/14.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');

require('../css/paySuccessStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import _h from '../Util/HB';

var PayFail = React.createClass({
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
                <div className="pay_success cred tc f20 mt10">
                    付款失败
                </div>
                <ul className="fff pl15 pr15 mt10 f14">
                    <li className="pay_order_result">
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
        historyUrls:state.historyUrls,
        order:state.order
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(PayFail);
/**
 * Created by LDQ on 2016/12/28.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceJoinStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';



var OnePieceJoinResult = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceJoinResult');
    },
    render: function () {
        let onePieceNodes = this.props.purchaseGame.order.bidRecords.map((item,index)=>{
            return (
                <span key={index} className="onePiece_join_result_purchaseCode">{item.purchaseCode}</span>
            )
        });
        return (
            <div>
                <div className="f5f5f5 w h" style={{position:"fixed",top:"0"}}></div>
                <div className="pr">
                    <div className="onePiece_join_result_header">
                        <ul className="onePiece_join_result">
                            <li className="tc onePiece_join_result_success_box">
                            <span className="onePiece_join_result_success">
                                参与成功
                            </span>
                            </li>
                            <li className="tc onePiece_join_result_wait">
                                请等待揭晓结果...
                            </li>
                        </ul>
                    </div>
                    <ul className="onePiece_join_result_order_info">
                        <li>订单号：{this.props.purchaseGame.order.id}</li>
                        <li>商品：{this.props.purchaseGame.order.productName}</li>
                        <li>期数：{this.props.purchaseGame.order.stage}</li>
                        <li>参与份数：{this.props.purchaseGame.order.purchaseGameCount}</li>
                        <li>夺宝号码：{onePieceNodes}</li>
                        <li>支付金额：{this.props.purchaseGame.order.price}</li>
                    </ul>
                    <Link to="/OnePiece" className="onePiece_confirm_btn tc">
                        继续夺宝
                    </Link>
                </div>
                </div>

        )
    }
});
function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        purchaseGame:state.purchaseGame
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceJoinResult);
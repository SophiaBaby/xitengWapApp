/**
 * Created by LDQ on 2016/12/28.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceConfirmOrderStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';

var OnePieceConfirmOrder = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceConfirmOrder');
    },

    joinOnePiece:function(){
        this.props.purchaseGameActionKeys.bid({bid:"bid"});
    },

    render: function () {
        return (
            <div>
                <div className="f5f5f5 w h" style={{position:"fixed",top:"0"}}></div>
                <div className="pr">
                    <ul className="onePiece_productInfo">
                        <li className="onePiece_productInfo_name">{this.props.purchaseGame.detail.productName}</li>
                        <li className="onePiece_productInfo_stage clearfix">
                            <span className="fl">期数：</span>
                            <span className="fl">{this.props.purchaseGame.detail.stage}</span>
                        </li>
                        <li>
                            <span>参与：</span>
                            <span className="onePiece_productInfo_money">
                            {this.props.purchaseGame.detail.priceOfOneBidInXtb} * {this.props.purchaseGame.order.purchaseGameCount}
                        </span>
                        </li>
                    </ul>
                    <div className="onePiece_productInfo_realpay tr">
                        <span>实付：</span>
                        <span className="onePiece_productInfo_money">{this.props.purchaseGame.detail.priceOfOneBidInXtb * this.props.purchaseGame.order.purchaseGameCount}</span>
                    </div>
                    <Link to="/OnePieceJoinResult" className="onePiece_confirm_btn tc" onClick={this.joinOnePiece}>
                        确认参与
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

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceConfirmOrder);
/**
 * Created by LDQ on 2016/12/29.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/orderListStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {bidOrderActions} from '../redux/actions/bidOrderActions';
import {storageActions} from '../redux/actions/storageActions';

var OrderList = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OrderList');
        let bidOrderStatus = _h.url.getHashKey('bidOrderStatus')||"";
        this.props.bidOrderActionKeys.getOrderList({list:"list"},bidOrderStatus,0);
    },
    setProductInfo:function(item){
        return()=>{
            this.props.storageActionKeys.setProductInfo(item);
        }
    },
    render: function () {
        let orderNodes = this.props.bidOrder.list.list.map((item,index)=>{
            let bidRecordNodes = item.bidRecords.map((code,i)=>{
                return (
                    <span className="bidRecordNodes" key={i}>
                        {code.purchaseCode}
                    </span>
                )
            });
            return (
                <li key={index} className="order_item">
                    <div className="order_item_top">
                        <div className="order_item_pic">
                            <img src={item.picUrl} alt="" className="w h"/>
                        </div>
                        <ul className="order_item_detal pr" style={item.bidOrderStatus == "win"?winLogo:{}}>
                            <li className="order_item_productName">
                                {item.productName}
                            </li>
                            <li className="clearfix">
                                <span className="fl">期数：</span>
                                <span className="fl">{item.stage}</span>
                            </li>
                            <li className="clearfix">
                                <span className="fl">参与分数：</span>
                                <span className="fl">{item.purchaseGameCount}</span>
                            </li>
                            <li className="clearfix">
                                <span className="order_item_code fl">夺宝号码：{bidRecordNodes}</span>
                                {item.bidRecords.length > 2?(<span className="fr">查看全部</span>):""}
                            </li>

                        </ul>
                    </div>
                    <p className="order_item_bottom tr">
                        {item.bidOrderStatus == "win"?(<Link to="/AcceptPrize" onClick={this.setProductInfo(item)}>去领奖</Link>):""}
                        {item.bidOrderStatus == "waiting"?(<span>等待揭晓</span>):""}
                        {item.bidOrderStatus == "finish"?(<span>待晒单</span>):""}
                    </p>
                </li>
            )
        });
        return (
            <div>
                <div className="f5f5f5 w h" style={{position:"fixed"}}></div>
                <ul className="pr">
                    {orderNodes}
                </ul>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        bidOrder:state.bidOrder,
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        bidOrderActionKeys:bindActionCreators(bidOrderActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OrderList);
const winLogo = {
    background:'url("src/images/fortune.png") no-repeat right center',
    backgroundSize:"0.8rem"
};
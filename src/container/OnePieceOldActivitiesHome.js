/**
 * Created by LDQ on 2016/12/29.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceProductOpenStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';

var OnePieceOldActivitiesHome = React.createClass({
    scrollToTheBottom:function(){
        let productId = _h.url.getHashKey('productId') || "";
        let status = _h.url.getHashKey('status') || "";
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.purchaseGame.openProducts.last){
                let pageNo = this.props.purchaseGame.products.pageNo + 1;
                this.props.purchaseGameActionKeys.getOpen(
                    {open:"open"},
                    pageNo,
                    productId,
                    status
                );
            }
        });
    },
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceOldActivitiesHome');
        let productId = _h.url.getHashKey('productId') || "";
        let status = _h.url.getHashKey('status') || "";
        this.props.purchaseGameActionKeys.getOpen(
            {open:"open"},
            0,
            productId,
            status
        );
    },
    componentDidMount:function(){
        this.scrollToTheBottom();
    },
    componentWillUnmount:function(){
        $(window).unbind('scroll');
    },
    render: function () {
        let userNodes = this.props.purchaseGame.openProducts.userList.map((item,index)=>{
            return (
                <li key={index} className="onePiece_open_home">
                    <div className="onePiece_open_home_box">
                        <div className="onePiece_open_product_pic">
                            <img src={item.productUrl} alt="" className="w"/>
                        </div>
                        <ul className="onePiece_open_product_detail">
                            <li className="onePiece_open_productName">
                                {item.productName}
                            </li>
                            <li className="clearfix">
                                <span className="fl">期数：</span>
                                <span className="fl">{item.stage}</span>
                            </li>
                            <li>
                                <span>获奖用户：</span>
                                <span className="onePiece_open_userName">{item.userName||"尚未开奖"}</span>
                            </li>
                            <li>
                                参与分数：{item.bidCount||"尚未开奖"}
                            </li>
                            <li className="clearfix">
                                <span className="fl">
                                    幸运号码：
                                </span>
                                <span className="onePiece_open_userName fl">
                                    {item.luckCode||"尚未开奖"}
                                </span>

                            </li>
                            <li>
                                揭晓时间：{item.finishTime}
                            </li>
                        </ul>
                    </div>
                </li>
            );
        });
        return (
            <div className="f5f5f5">
                <div className="f5f5f5 w h" style={{position:"fixed"}}></div>
                <ul className="pr">
                    {userNodes}
                </ul>
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
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceOldActivitiesHome);
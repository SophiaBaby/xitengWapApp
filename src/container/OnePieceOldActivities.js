/**
 * Created by LDQ on 2016/12/27.
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
import {storageActions} from '../redux/actions/storageActions';


var OnePieceOldActivities = React.createClass({

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
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceOldActivities');
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
                <li key={index} className="onePiece_open_userItem">
                    <p className="onePiece_open_userItem_title">
                        <span>期数：{item.stage}</span>
                        <span>揭晓时间：{item.finishTime}</span>
                    </p>
                    <div className="onePiece_open_userItem_detail">
                        <div className="onePiece_open_userItem_pic">
                            <img src={item.userIcon} alt="" className="w"/>
                        </div>
                        <ul className="onePiece_open_userItem_detail_text">
                            <li>
                                获奖用户：{item.userName}
                            </li>
                            <li>
                                （{item.area}IP：{item.ip}）
                            </li>
                            <li className="clearfix">
                                <span className="fl">幸运号码：</span>
                                <span className="fl">{item.luckCode}</span>
                            </li>
                            <li>
                                参与分数：{item.bidCount}
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
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        purchaseGameActionKeys:bindActionCreators(purchaseGameActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceOldActivities);
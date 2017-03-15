/**
 * Created by LDQ on 2016/12/28.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceShowStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {purchaseGameActions} from '../redux/actions/purchaseGameActions';


var OnePieceShow = React.createClass({
    scrollToTheBottom:function(){
        let productId = _h.url.getHashKey('productId') || "";
        let isAll = _h.url.getHashKey('isAll') || "no";
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.purchaseGame.openProducts.last){
                let pageNo = this.props.purchaseGame.products.pageNo + 1;
                this.props.purchaseGameActionKeys.getShowList(
                    pageNo,
                    productId,
                    isAll
                );
            }
        });
    },
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceOldActivities');
        let productId = _h.url.getHashKey('productId') || "";
        let isAll = _h.url.getHashKey('isAll') || "";
        this.props.purchaseGameActionKeys.getShowList(
            0,
            productId,
            isAll
        );
    },
    componentDidMount:function(){
        this.scrollToTheBottom();
    },
    componentWillUnmount:function(){
        $(window).unbind('scroll');
    },
    render: function () {
        let showNodes = this.props.purchaseGame.show.showList.map((item,index)=>{
            var picNodes = item.pictures.map((pic,i)=>{
                return (
                    <li className="onePiece_show_img_item" key={i}>
                        <img src={pic.head_img} alt="" className="w h"/>
                    </li>
                )
            });
            return (
                <div className="onePiece_show_item" key={index}>
                    <div className="onePiece_show_top_box">
                        <div className="onePiece_show_pic">
                            <img src={item.userIcon} alt="" className="w h"/>
                        </div>
                        <ul className="onePiece_show_productDetail">
                            <li className="onePiece_show_userName">
                                {item.userName}
                            </li>
                            <li>{item.time}</li>
                            <li>期数：{item.purchaseGameInfo.stage}</li>
                            <li>{item.purchaseGameInfo.productName}</li>
                        </ul>
                    </div>
                    <div className="onePiece_show_bottom_box">
                        <div>
                            {item.content}
                        </div>
                        <ul className="onePiece_show_img">
                            {picNodes}
                        </ul>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <div className="f5f5f5 w h" style={{position:"fixed"}}></div>
                <ul className="pr">
                    {showNodes}
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
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceShow);
/**
 * Created by LDQ on 2016/12/27.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');

require('../css/onePieceJoinStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';
import {bidOrderActions} from '../redux/actions/bidOrderActions';


var OnePieceJoinDetail = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/OnePieceJoinDetail');
        let purchaseGameId = this.props.storage.purchaseGameId;
        this.props.bidOrderActionKeys.getRecord(
            {record:"record"},
            purchaseGameId
        )
    },
    scrollToTheBottom:function(){
        let purchaseGameId = this.props.storage.purchaseGameId;
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.bidOrder.record.last){

                let pageNo = this.props.bidOrder.record.pageNo + 1;
                this.props.bidOrderActionKeys.getRecord(
                    {record:"record"},
                    purchaseGameId,
                    pageNo
                );
            }
        });
    },
    componentDidMount:function(){
        this.scrollToTheBottom();
    },
    componentWillUnmount:function(){
        $(window).unbind("scroll");
    },
    render: function () {
        let joinNodes = this.props.bidOrder.record.list.map((item,index)=>{
            return (
                <li key={index} className="onePiece_record_item">
                    <div className="onePiece_record_img">
                        <img src={item.userIcon} alt="" className="w h"/>
                    </div>
                    <ul className="onePiece_record_detail">
                        <li className="onePiece_record_detail_name" style={item.sex == "man"?man:woman}>
                            {item.userName}
                        </li>
                        <li className="onePiece_record_detail_time">
                            {item.createTime}
                        </li>
                        <li className="onePiece_record_detail_time">
                            参与份数：{item.bidCount}
                        </li>
                        <li className="onePiece_record_detail_time">
                            {item.area}{item.ip}
                        </li>
                    </ul>
                </li>
            );
        });
        return (
            <ul>
                {joinNodes}
            </ul>
        )
    }
});
function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        storage:state.storage,
        bidOrder:state.bidOrder
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        bidOrderActionKeys: bindActionCreators(bidOrderActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(OnePieceJoinDetail);
const man = {
};
const woman={};
/**
 * Created by LDQ on 2017/1/7.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var _h = require('../Util/HB');
var HeaderAddress = require('../components/HeaderAddress');

require('../css/accpetPrizeStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';
import {bidOrderActions} from '../redux/actions/bidOrderActions';

var AccpetPrize = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/AccpetPrize');
        this.props.historyUrlsActionKeys.mark('/AccpetPrize');
        this.props.addressActionKeys.getList();
    },
    acceptPrize:function(){

        this.props.bidOrderActionKeys.acceptPrize(
            {acceptPrize:"acceptPrize"},
            this.props.storage.productInfo.id
        )
    },
    render: function () {

        return (
            <div  className="f5f5f5 w h po">
                <HeaderAddress address={this.props.address}
                               areaActionKeys={this.props.areaActionKeys}
                               addressActionKeys={this.props.addressActionKeys}/>

                <AcceptPrizeProduct storage={this.props.storage}/>
                <Link to="/My" className="accept_prize_btn tc" onClick={this.acceptPrize}>
                    确认领奖
                </Link>
            </div>
        )
    }
});
var AcceptPrizeProduct = React.createClass({
    render: function () {
        return (
            <div className="accept_prize">
                <p className="accept_prize_title">幸运奖品</p>
                <div className="accept_prize_product">
                    <div className="accept_prize_product_pic">
                        <img src={this.props.storage.productInfo.picUrl} alt="" className="w"/>
                    </div>
                    <ul className="accept_prize_product_info">
                        <li className="accept_prize_product_title">
                            {this.props.storage.productInfo.productName}
                        </li>
                        <li className="clearfix">
                            <span className="fl">期数：</span>
                            <span>{this.props.storage.productInfo.stage}</span>
                        </li>
                        <li className="clearfix">
                            <span className="fl">参与份数：</span>
                            <span>{this.props.storage.productInfo.bidRecords.length}</span>
                        </li>
                        <li className="clearfix">
                            <span className="fl">幸运号：</span>
                            <span>{this.props.storage.productInfo.luckCode}</span>
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
        address:state.address,
        storage:state.storage

    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        areaActionKeys:bindActionCreators(areaActions,dispatch),
        bidOrderActionKeys:bindActionCreators(bidOrderActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(AccpetPrize);
/**
 * Created by liudq on 16/8/25.
 */
var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,Title } = require('../components/Header');
var $ = require('jquery');

require('../css/MyStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {userInfoActions} from '../redux/actions/userInfoActions';


var My = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/My');
        this.props.historyUrlsActionKeys.mark('/My');
        this.props.userInfoActionKeys.getUserInfo();
    },
    render: function () {
        return (
            <div>
                <div className="discover_body po f5f5f5 w">
                    <div className="w">
                        <div className="my_header">
                            <div className="my_header_icon tc m10">
                                <img src={this.props.userInfo.icon} alt="" className="w h"/>
                            </div>
                            <div className="my_info">
                                <p className="f14 cblue">{this.props.userInfo.cnName}</p>
                                <p className="f14">喜腾号：{this.props.userInfo.xtNumber}</p>
                            </div>
                        </div>
                    </div>
                    <EntranceList itemList={[{
                        name:'我的资产',
                        url:'/MyAsset',
                        icon:'src/images/me_icon_assets@2x.png'
                    },{
                        name:'投注记录',
                        url:'/MyRecord',
                        icon:'src/images/me_icon-_record@2x.png'
                    }]}/>
                    <EntranceList itemList={[{
                        name:'购物车',
                        url:'/ShoppingCart',
                        icon:'src/images/me_icon-_cart@2x.png'
                    },{
                        name:'订单',
                        url:'/OrderDetails',
                        icon:'src/images/me_icon-_order@2x.png'
                    }]}/>

                </div>
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        userInfo:state.userInfo

    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        userInfoActionKeys: bindActionCreators(userInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(My);
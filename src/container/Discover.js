/**
 * Created by LDQ on 2016/8/12.
 */


var React = require('react');
var EntranceList = require('./../components/EntranceList');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,Title } = require('../components/Header');
var $ = require('jquery');

require("../css/discoverStyle.css");

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';

var Discover = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Discover');
    },
    render: function () {
        return (
            <div>
                <div className="discover_body po f5f5f5 w">
                    {/*<EntranceList itemList={[{*/}
                        {/*name:'股神争霸',*/}
                        {/*url:'/Rank',*/}
                        {/*icon:'src/images/fing_icon_ranking-list@2x.png'*/}
                    {/*}]}/>*/}
                    <EntranceList itemList={[{
                        name:'购买钻石',
                        url:'/BuyDiamonds',
                        icon:'src/images/fing_icon_diamonds@2x.png'
                    },{
                        name:'兑换礼品',
                        url:'/Shop',
                        icon:'src/images/fing_icon_mall@2x.png'
                    },{
                        name:'0元夺宝',
                        url:'/OnePiece',
                        icon:'src/images/find_icon_o@2x.png'
                    }]}/>
                </div>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Discover);

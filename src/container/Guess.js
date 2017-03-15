/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var Carousel = require('../components/Carousel');
var StockMarketList = require('./StockMarketList');

require("../css/guessStyle.css");

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import {betListActions} from '../redux/actions/betListActions';
import {awardActions} from '../redux/actions/awardActions';
import {rankActions} from '../redux/actions/rankActions';
import {activityActions} from '../redux/actions/activityActions';
import _h from '../Util/HB';



var Guess = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Guess');
        this.props.activityActionKeys.getActivityList({path:"list"});
    },
    render: function () {

        let window_w = document.body.clientWidth;
        let totalDistance = window_w * this.props.activity.list.length;
        var carouselStyle = {
            bigBox:{
                width:window_w+"px",
                height:'2.8rem'
            },
            smBox:{
                width:totalDistance + "px"
            }
        };
        return (
            <div className="common_bg">
                <Carousel
                    pictures={this.props.activity.list}
                    carouselStyle={carouselStyle}
                    direction="slideLeft"
                    auto={true}
                />
                <StockMarketList />
                <BetList
                    betListActionKeys={this.props.betListActionKeys}
                    betList={this.props.betList}
                />
                <Rank
                    awardList={this.props.award.awardList}
                    awardActionKeys={this.props.awardActionKeys}
                    rank={this.props.rank}
                    rankActionKeys={this.props.rankActionKeys}
                />
            </div>
        )
    }
});


var BetList = React.createClass({
    componentWillMount:function(){
        this.props.betListActionKeys.getBetList();
    },
    timer:function(){
        let time = 140000;
        setInterval(()=>{
            this.props.betListActionKeys.getBetList();
        },time);
    },
    componentDidMount:function(){
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        let betNodes = this.props.betList.betList.map((item,index)=>{
            return (
                <li className="bet_user clearfix f14" key={index}>
                    <div className="bet_user_header fl">
                        <img src={item.userIconUrl} alt="" className="w h"/>
                    </div>
                    <div className="bet_user_name fl cfff">
                        <span>{item.userName}</span>
                    </div>
                    <div className="fl ">
                        <span className="bet_time">刚刚</span>
                    </div>
                    <div className="fr">
                        <span className="guess_bet_current_money">投注</span>
                        <span className="guess_xt_money cfff">{item.guessXitbAmount}</span>
                    </div>
                </li>
            )
        });

        return (
            <div className="bet_user_box">
                <ul className="roll_up">
                    {betNodes}
                </ul>
            </div>
        )
    }
});

var Rank = React.createClass({
    getInitialState: function() {
        //ZX默认跳转显示年排行的页面
        return {
            linkToStock: '/StockPKDetail/:3',
            linkToPro:'/PrizeList/:3'
        };
    },
    componentWillMount:function(){
        this.props.awardActionKeys.getAward(3);
        this.props.rankActionKeys.getRank();
    },
    cutRank:function(id,type){
        return ()=>{
            this.props.awardActionKeys.getAward(id);
            this.props.rankActionKeys.selected(id);
            this.props.rankActionKeys.getRank(0,type,3);
            //ZX改变跳转显示年排行的页面
            this.state.linkToStock =  '/StockPKDetail/:'+ id;
            this.state.linkToPro =  '/PrizeList/:'+ id;
        }
    },
    render: function () {
        let pic_src = this.props.awardList[0].productInfo.picUrl;
        let rankTypeNodes = this.props.rank.rankType.map((item,index)=>{
            return (
                <li className="J_ranktype fl cfff pl5 pr5"
                    style={item.selected?{color:"#FF4242"}:{}}
                    key={index}
                    onClick={this.cutRank(item.id,item.type)}>
                    <span>{item.title}排行</span>
                </li>
            )
        });
        let rankUserNodes = this.props.rank.rankList.map((item,index)=>{
            return (
                <li className="rank_user clearfix f14" key={index}>
                    <span className="cfff fl pl5 pr5">{index+1}</span>
                    <div className="rank_user_header cfff fl">
                        <img src={item.iconUrl} alt="" className="w"/>
                    </div>
                    <div className="rank_user_name pl10 fl cfff">
                        <span>{item.userName}</span>
                    </div>
                    <span className="fr rank_user_bet cfff guess_xt_money">
                        {item.bonusXtbAmount}
                    </span>
                </li>
            )
        });
        return (
            <div className="pk_box">
                <div className="cfff clearfix guess_stock_god">
                    <p className="fl guess_stock_god_title">股神争霸</p>
                    <ul className="fr clearfix guess_stock_god_classify">
                        {rankTypeNodes}
                    </ul>
                </div>
                <ul className="guess_rank_list">
                    <Link to={this.state.linkToStock}>
                        {rankUserNodes}
                    </Link>
                </ul>
                <div className="pk_pic ml15">
                    <Link to= {this.state.linkToPro}>
                        <img src={pic_src} alt="" className="prize_pic w"/>
                    </Link>
                </div>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        storage:state.storage,
        betList:state.betList,
        award:state.award,
        rank:state.rank,
        activity:state.activity
    };
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
        betListActionKeys:bindActionCreators(betListActions,dispatch),
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch),
        activityActionKeys:bindActionCreators(activityActions,dispatch)

    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Guess);

const upStyle={
    color:"#FF4242",
    background:'url("src/images/icon_arrow_up-@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const downStyle={
    color:"#02C56B",
    background:'url("src/images/icon_arrow_down@2x.png") no-repeat right 0.15rem',
    backgroundSize:"0.15rem",
};
const cred={
    color:"#FF4242"
};
const cgreen={
    color:"#02C56B"
};
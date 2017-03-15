/**
 * Created by zhangxin on 2/10 0010.
 */
import React,{Component}from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
import $ from 'jquery';


import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {rankActions} from '../redux/actions/rankActions';
import {awardActions} from '../redux/actions/awardActions';
import {selfRankActions} from '../redux/actions/selfRankActions';
import {loginInfoActions} from '../redux/actions/loginInfoActions';


require('../css/stockPKDetail.css');
require('../css/prizeList.css');
require('../Util/base.css');

class StockPKDetail extends Component{
    render() {
        return (
            <div>
                <RankList
                    awardType = {parseInt(this.props.params.id.substr(1))}
                    awardList={this.props.award.awardList}
                    awardActionKeys={this.props.awardActionKeys}
                    rank={this.props.rank}
                    rankActionKeys={this.props.rankActionKeys}
                    selfRankActionKeys = {this.props.selfRankActionKeys}
                    selfRank = {this.props.selfRank}
                    loginInfoActionKeys = {this.props.loginInfoActionKeys}
                />
            </div>
        )
    }
}

class RankList extends Component{
    constructor(props){
        super(props);
        this.state={
            linkTo : '/PrizeList/:' + this.props.awardType,
            page:0,
            rankItems:[],
            type:'currentYear'
        }
    }
    componentWillMount(){
        this.props.loginInfoActionKeys.phoneNumLogin("13503541435","123456")
        this.props.awardActionKeys.getAward(this.props.awardType);
        this.props.rankActionKeys.getRank(0,this.state.type,10);
        this.props.selfRankActionKeys.getSelfRank(this.state.type);
    }
    cutRank(id,type){
        return ()=>{
            this.setState({
                page:0,
                rankItems:[],
                type:type
            })
            this.props.awardActionKeys.getAward(id);
            this.props.rankActionKeys.selected(id);
            this.props.rankActionKeys.getRank(0,type,10);
            this.props.selfRankActionKeys.getSelfRank(type);
            //tab切换修改页面跳转所携带的参数
            this.state.linkTo = '/PrizeList/:'+ id;
            console.log(this.state.linkTo)
        }
    }
    loadMore(type){
        console.log($(document).scrollTop(),$(document).height(),$(window).height());
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            this.props.rankActionKeys.getRank(++this.state.page,this.state.type,10);
            console.log("加载",this.state.page,this.state.type);
        }
    }
    getRankItems(){
        let rankItems = this.props.rank.rankList;
        rankItems.forEach(ele => {
            this.state.rankItems.push(ele)
        })
    }
    championMask(index){
        if (index > 998){
            return "999+"
        }else {
            switch (index){
                case 0: return(
                    <img className="championPic" src="common_icon_champion-@2x.png" alt=""/>
                )
                case 1:return(
                    <img className="championPic" src="common_icon_runner-up@2x.png" alt=""/>
                )
                case 2:return(
                    <img className="championPic" src="common_icon_third@2x.png" alt=""/>
                )
                default : return(
                    index + 1
                )
            }
        }

    }
    render() {
        this.getRankItems();
        let pic_url = this.props.awardList[0].productInfo.picUrl;
        let data = this.props.selfRank;

        let linkTo = this.state.linkTo;
        let rankTypeNodes = this.props.rank.rankType.map((item,index)=>{
            return (
                <div className="rankType"
                    style={item.selected?{backgroundImage:"url('-ranking_btn_s@2x.png')"}:{}}
                    key={index}
                    onClick={this.cutRank(item.id,item.type)}>
                    <span>{item.title}排行</span>
                </div>
            )
        });
        let selfRank = (<ul className="clearfix dis_flex">
                <li className="userInfo rank clearfix tc">{this.championMask(data.ranking)}</li>
                <li className="userInfo portrait clearfix" style={userPic}>
                    <img src={data.iconUrl}alt="" className="w h"/>
                </li>
                <li className="userInfo nick clearfix">{data.userName}</li>
                <li style={{width:"0.5rem"}}></li>
                <li className="userInfo fortune clearfix fr tr">
                    <span>{data.bonusXtbAmount}</span>
                </li>
            </ul>)
        let rankList = this.state.rankItems.map((item,index) => {
            return (
                <li key={index} style={{borderBottom:"1px solid #eee"}}>
                    <ul className="clearfix dis_flex">
                        <li className="userInfo rank clearfix tc">{this.championMask(index)}</li>
                        <li className="userInfo portrait clearfix" style={userPic}>
                            <img src={item.iconUrl}alt="" className="w h"/></li>
                        <li className="userInfo nick clearfix" >{item.userName}</li>
                        <li style={{width:"0.5rem"}}></li>
                        <li className="userInfo fortune clearfix tr" >
                            <span>{item.bonusXtbAmount}</span>
                        </li>
                    </ul>
                </li>
            )
        })
        return (
            <div className="bodyBg">
                <div style={{display: "flex",margin:"0.25rem 0.4rem",justifyContent:"space-between"}}>
                    {rankTypeNodes}
                </div>
                <div style={{position:"relative", height: "3rem", margin:" 0 0.24rem", borderRadius: "0.1rem", overflow: "hidden"}}>
                    <Link to= {linkTo}>
                        <img src={pic_url} alt="" className="h w"/>
                        <span style={{position: "absolute",bottom: "0.5rem",right: "0.3rem",color:"#333"}}>更多</span>
                    </Link>
                </div>
                <ul onTouchEnd={this.loadMore.bind(this)} style={{margin: "0.3rem 0.24rem",borderRadius: "0.05rem",overflow: "hidden",background:"#fff"}}>
                    <li style={{borderBottom:"1px solid #eee"}}>{selfRank}</li>
                    {rankList}
                </ul>
            </div>
        )
    }
}

function mapStatetoProps(state){
    return {
        rank:state.rank,
        award:state.award,
        selfRank :state.selfRank
    };
}

function mapDispatchToProps(dispatch){
    return{
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch),
        selfRankActionKeys:bindActionCreators(selfRankActions,dispatch),
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockPKDetail);

const prizeState = {
    height:"1.1rem",
    fontSize:"0.3rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "0 0.25rem",
    lineHeight:"1.1rem",
    background:"#fff"
}
const userPic = {
    width: "0.8rem",
    height: "0.8rem",
    borderRadius: "0.03rem",
    overflow: "hidden",
    marginRight:"0.4rem"
}

/**
 * Created by zhangxin on 2/10 0010.
 */
import React,{Component}from 'react';
import { render } from 'react-dom'
import $ from 'jquery';
import {Router, Route, IndexRoute, Link, IndexLink, hashHistory} from 'react-router-redux';
import getRankListDetail from '../redux/actions/getRankListDetail';
import EntranceList from './../components/EntranceList';

require('../css/stockPKDetail.css');
require('../Util/base.css');


//排行类型
class RankType extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <ul className="clearfix">
                <li className="rankType clearfix" onClick={this.yearRankRender}>年度排行</li>
                <li className="rankType clearfix" onClick={this.monthRankRender}>本月排行</li>
                <li className="rankType clearfix" onClick={this.weekRankRender}>本周排行</li>
            </ul>
        )
    }
}
//排行列表
class RankList extends Component{
    constructor(props){
        super(props)
        this.state={
            url:"src/container/productList55.json",
        }
    }

    componentDidMount(){
        console.log("组建已经渲染完毕")
    }
    render(){
        return(
            <ul>
                <li>
                    <UserItem/>
                </li>
            </ul>
        )
    }
}
//排行列表内的用户信息
class UserItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            rank:"第一",
            portrait:"头像",
            nick:"欢欢喜喜",
            fortune:"2100"
        }
    }
    render(){
        return(
            <ul className="clearfix">
                <li className="userInfo rank clearfix">{this.state.rank}</li>
                <li className="userInfo portrait clearfix">{this.state.portrait}</li>
                <li className="userInfo nick clearfix">{this.state.nick}</li>
                <li className="userInfo fortune clearfix">{this.state.fortune}</li>
            </ul>
        )
    }
}


//排行列表的外壳
class RankBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            pic:"src/images/touzhu_record_bg.png"
        }
    }
    componentWillMount(){
        const data = JSON.stringify({
            accessInfo:{
                app_key:"xxxxxxxxx",
                access_token:"",
                phone_num:"15810157156",
                signature:"xxxxxxxxx"
            },
            size: 10,
            pageNo: 0,
            type:1
        })

        $.ajax({
            url: 'src/container/productList55.json',
            dataType: 'json',
            //data:data,
            method: 'GET',
            success: function(res) {
                console.log(res);
            }
        });
    }

    render(){
        let typeMask = null;
        if(this.props.data == "年排行"){
            typeMask =  <YearRank/>
        }else if(this.props.data == "月排行"){
            typeMask = <MonthRank/>
        }else if (this.props.data == "周排行"){
            typeMask = <WeekRank/>
        }
        return(
            <div>
                <div>
                    <EntranceList itemList={[{
                        name:'我的资产',
                        url:'/PrizeList',
                    }]}/>
                    {this.state.hi}
                    {typeMask}
                </div>
                <RankList/>
            </div>
        )
    }
}


class YearRank extends Component{
    constructor(props){
        super(props);
        this.state ={
            tempData : 'huhu'
        }
    }
    ComponentWillMount(){
        this.setState({
            tempData : getRankListDetail(1)
        });
    }
    render(){
        return(
            <div>
                年排行
                {this.state.tempData}
            </div>
        )
    }
}
class MonthRank extends Component{
    render(){
        return(
            <div>
                月排行
            </div>
        )
    }
}
class WeekRank extends Component{
    render(){
        return(
            <div>
                周排行
            </div>
        )
    }
}

//股神争霸页面
class StockPKDetail extends Component{
    constructor(props){
        super(props);
        this.yearRankRender = this.yearRankRender.bind(this);
        this.monthRankRender = this.monthRankRender.bind(this);
        this.weekRankRender = this.weekRankRender.bind(this);
        this.state = {
            data : "年排行ya "
        }
    }
    yearRankRender(e){
        this.setState({data :"年排行"})
    }
    monthRankRender(e){
        this.setState({data :"月排行"})
    }
    weekRankRender(e){
        this.setState({data :"周排行"})
    }
    render(){
        var data = this.state.data;
        return(
            <div>
                <ul className="clearfix">
                    <li className="rankType clearfix" onClick={this.yearRankRender}>年度排行</li>
                    <li className="rankType clearfix" onClick={this.monthRankRender}>本月排行</li>
                    <li className="rankType clearfix" onClick={this.weekRankRender}>本周排行</li>
                </ul>
                <RankBox data={this.state.data}/>
            </div>
        )
    }
}


module.exports = StockPKDetail;

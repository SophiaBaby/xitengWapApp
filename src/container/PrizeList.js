/**
* Created by zhangxin on 2/14 0014.
*/
import React,{Component}from 'react';
import { render } from 'react-dom';
import {awardActions} from '../redux/actions/awardActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

require('../css/prizeList.css');
require('../css/stockPKDetail.css')
require('../Util/base.css');


class BonusShow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="BonusShow">
                <p className="fFf">
                    <span className="fYellow">奖励说明：</span>
                    周排名前5名可获得大赛奖品，每周五16:00公布当周获奖名单；
                    月排名前20名可获得大赛奖品，当月最后一个交易日16:00公布当月获奖名单；
                    年排名前30名可获得大赛奖品，当年最后一个交易日16:00公布获奖名单.
                </p>
                <p className="fRed mt5">声明：所有产品活动与苹果公司（Apple Inc）无关</p>
            </div>
        )
    }
}

class PrizeList extends Component{
    render() {
        return (
            <div className="bodyBg">
                <BonusShow/>
                <PrizeItems
                    awardType = {parseInt(this.props.params.id.substr(1))}
                    awardList={this.props.award.awardList}
                    awardActionKeys={this.props.awardActionKeys}
                />
            </div>
        )
}
}

class PrizeItems extends Component{
    componentDidMount(){
        this.props.awardActionKeys.getAward(this.props.awardType);
    }
    render() {
    let PrizeItem = this.props.awardList.map((item,index)=>{
        return (
            <li style={{borderRadius:"0.03rem",margin:"0.3rem 0.24rem 0",overflow:"hidden"}} key={index}>
                <div style={{height:"3.3rem",borderBottom:'1px solid #eee',background:"#fff"}}>
                    <img src={item.productInfo.picUrl} alt="" className="w"/>
                </div>
                <p style={prizeState}>
                    <span style={{float:"left",marginRight:"0.05rem",color:"red"}}>{item.rankStr}:</span>
                    {item.name}
                </p>
            </li>
            )
    });
    return (
        <ul>
            {PrizeItem}
        </ul>
    )
}
}

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStatetoProps(state){
    return {
        award:state.award,
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch){
    return{
        awardActionKeys:bindActionCreators(awardActions,dispatch),

    }
}

//connect后面第二个括号是要添加prop的react组件，
// 第一个括号中的参数是用来改变该组件prop的方法，
// 第一个括号有两个参数;
// @param1 函数，返回一个对象，对象的键是该组件的prop属性，值是该prop的值；
// @param2 函数，返回一个对象，对象的键同样是prop的属性名，值是一个redux的dispatch，当这个prop属性被用于触发时，dispatch会改变redux中state的值。
module.exports = connect(mapStatetoProps,mapDispatchToProps)(PrizeList);

const prizeState = {
    height:"1.1rem",
    fontSize:"0.3rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "0 0.25rem",
    lineHeight:"1.1rem",
    background:"#fff"
}

/**
 * Created by LDQ on 2017/2/3.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

require("../css/guessStyle.css");

import {stockGameActions} from '../redux/actions/stockGameActions';
import {storageActions} from '../redux/actions/storageActions';
import _h from '../Util/HB';


var StockMarketList = React.createClass({
    timer:function(){
        const time = 60000;

        setInterval(()=>{
            this.props.stockGame.gameList.map((stockItem,index)=>{
                this.props.stockGameActionKeys.refresh(stockItem.stockGameId);
            });
        },time);
    },
    componentWillMount:function(){
        this.props.stockGameActionKeys.getGameList();
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        var stockMarketNodes = this.props.stockGame.gameList.map((gameItem,index)=>{
            return (
                <GameItem storageActionKeys={this.props.storageActionKeys} gameItem={gameItem} key={index}/>
            )
        });
        return (
            <div>
                <GameTime
                    gameTime={this.props.stockGame.gameTime}
                    stockGameActionKeys={this.props.stockGameActionKeys}
                    countDown={this.props.stockGame.countDown}
                    gameList={this.props.stockGame.gameList}
                />
                <ul className="guess_stock">
                    {stockMarketNodes}
                </ul>
            </div>
        )
    }
});

var GameTime = React.createClass({
    gameTimer:function(){
        setInterval(()=>{
            this.props.stockGameActionKeys.countDown(
                new Date(),
                this.props.gameTime.startTime,
                this.props.gameTime.endTime
            );
        },1000);
    },
    componentWillMount:function(){
        this.gameTimer();
    },
    componentWillUnmount:function(){
        clearInterval(this.gameTimer);
    },
    render: function () {

        return (
            <ul className="time_bg">
                <li className="tc pt10 cfff guess_next_stage_time" >
                    <span className="guess_next_stage">{this.props.gameList.length==0?"":this.props.gameList[0].stage}期</span>
                    <span>{this.props.gameTime.endMonth + 1}月{this.props.gameTime.endDate}日（周{_h.valid.parseDay(this.props.gameTime.endDay)}）</span>
                </li>
                <li className="cfff tc pt5">
                    <span className="count_down_icon">截止投注:{this.props.countDown.countDownTime}</span>
                </li>
            </ul>
        )
    }
});


var GameItem = React.createClass({
    setStockId:function(stockGameId){
        return ()=>{
            this.props.storageActionKeys.setStockGameId(stockGameId);
        }
    },
    setGuessType:function(guessType){
        return ()=>{
            this.props.storageActionKeys.setGuessType(guessType);
        }
    },
    render: function () {
        const gameItem = this.props.gameItem;
        return (
            <li className="game_item">
                <div className="tc">
                    <img src={gameItem.picUrl} className="tc stock_game_name_pic"></img>
                </div>
                <p className="guess_stock_fund tc">
                    <span className="f20 guess_fund" style={(gameItem.stockModel.chg>0)?upStyle:downStyle}>{gameItem.stockModel.currentPoint}</span>
                    <span className="guess_fund_details" style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.chg}</span>
                    <span className="guess_fund_details_rate" style={(gameItem.stockModel.chg>0)?cred:cgreen}>{gameItem.stockModel.chg>0?"+":""}{gameItem.stockModel.changeRate}%</span>
                </p>

                <Link to="/StockDetails" onClick={this.setStockId(gameItem.stockGameId)}>

                    <ul className="clearfix guessUpDown" >
                        <li className="fl tc ">
                            <p className="guess_icon_cow guess_bet_money tc">
                                <span className="guess_total_money">
                                    <img src="src/images/Home-red-flag@2x.png" alt="" className="guess_money_flag"/>
                                    <span className="guess_xt_money">{gameItem.guessUpXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                        <li className="fr tc">
                            <p className="guess_icon_bear guess_bet_money tc">
                                <span className="guess_total_money">
                                    <img src="src/images/Home-green-flag@2x.png" alt="" className="guess_money_flag"/>
                                    <span className="guess_xt_money">{gameItem.guessDownXtBAmount}</span>
                                </span>
                            </p>

                        </li>
                    </ul>
                </Link>
                <div className="guess_btn clearfix" onClick={this.setStockId(gameItem.stockGameId)}>
                    <Link to="/Bet" className="guess_guess_up_btn fl" onClick={this.setGuessType(0)}/>
                    <Link to="/Bet" className="guess_guess_down_btn fl" onClick={this.setGuessType(1)}/>
                </div>
            </li>
        )


    }
});


function mapStatetoProps(state){
    return {
        stockGame:state.stockGame,
        storage:state.storage,
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionKeys : bindActionCreators(stockGameActions,dispatch),
        storageActionKeys:bindActionCreators(storageActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockMarketList);

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
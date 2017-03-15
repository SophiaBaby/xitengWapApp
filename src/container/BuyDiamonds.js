/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');


require("../css/diamondsStyle.css");

import {accountActions} from '../redux/actions/accountActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {storageActions} from '../redux/actions/storageActions';
import {createTradeOrderActions} from '../redux/actions/createTradeOrderActions';
import {diamondsActions} from '../redux/actions/diamondsActions';

var BuyDiamonds = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/BuyDiamonds');
        this.props.diamondsActionKeys.selectedDiamonds(0);
        this.props.historyUrlsActionKeys.mark('/BuyDiamonds');
        console.log('BuyDiamonds-componentWillMount-',this.props.historyUrls);
    },
    render: function () {
        return (
            <div>
                <div className="pt15 pl15">
                    <span>一次购买每满1000钻石赠送100喜腾币</span>
                </div>

                <PruductItems
                    diamonds={this.props.diamonds}
                    createTradeOrderActionKeys={this.props.createTradeOrderActionKeys}
                    diamondsActionKeys={this.props.diamondsActionKeys}
                />
            </div>
        )
    }
});

var PruductItems = React.createClass({

    buyDiamonds:function(){

        this.props.createTradeOrderActionKeys.createTradeOrder(this.props.diamonds.amount);
    },
    selectedDiamonds:function(index){
        return ()=>{
            $('.J_customPrince').val("");
            this.props.diamondsActionKeys.clearSelected();
            this.props.diamondsActionKeys.selectedDiamonds(index);
        }
    },
    selectedCustom:function(){
        this.props.diamondsActionKeys.clearSelected();
    },
    inputPrice:function(){
        this.props.diamondsActionKeys.setAmount(parseInt($('.J_customPrince').val()));
    },
    render: function () {

        var diamondsNodes = this.props.diamonds.diamondList.map((item,index)=>{
            return(
                <li
                    className="diamond mr15 mt10 fl"
                    key={index}
                    onClick={this.selectedDiamonds(index)}
                    style={item.selected?diamonds_selected:{}}>
                    <p className="diamond_count f16 cred tc pr">{item.amount}颗</p>
                </li>
            )
        });
        return (
            <div>
                <ul className="diamonds_list ml15 clearfix">
                    {diamondsNodes}
                    <li className="diamond_bg mr15 mt10 fl" onClick={this.selectedCustom}>
                        <input
                            type="text"
                            placeholder="自定义数额"
                            className="tc input_diamonds cred J_customPrince"
                            onKeyUp={this.inputPrice}
                        />
                    </li>
                </ul>
                <div className="fr pr15">
                    <span className="f14">金额：</span>
                    <span>￥{this.props.diamonds.amount}</span>
                </div>
                <div className="tc buy_diamonds_btn" onClick={this.buyDiamonds}>
                    <Link to="/Pay" className="cfff f16">
                        立即购买
                    </Link>
                </div>
            </div>

        )
    }
});



function mapStatetoProps(state){
    return {
        account:state.account,
        historyUrls:state.historyUrls,
        diamonds:state.diamonds,
        storage:state.storage,
    }
}
function mapDispatchToProps(dispatch){

    return{
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        diamondsActionKeys : bindActionCreators(diamondsActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch),
        createTradeOrderActionKeys: bindActionCreators(createTradeOrderActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(BuyDiamonds);


const diamonds_selected = {
    border:"1px solid #FF4242"
};
/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var $ = require('jquery');
var { Header,BackBtn,Title } = require('../components/Header');
var _h = require('../Util/HB');

require('../css/shopStyle.css');

import {accountActions} from '../redux/actions/accountActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';


var Shop = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Shop');
        this.props.accountActionKeys.getAccount();
    },
    componentDidMount:function(){
        _h.ui.scrollToTheBottom(()=>{
            if(!this.props.shop.last){
                let pageNo = this.props.shop.pageNo + 1;
                let type = this.props.shop.type;
                let manner = {};
                for(let i = 0;i < type.length;i++){
                    if(type[i].selected){
                        manner = {mannerId:type[i].mannerId,index:i};
                        break;
                    }
                }
                this.props.shopActionKeys.getProductList(manner.mannerId,manner.index,pageNo);
            }
        });
    },
    render: function () {

        return (
            <div className="f5f5f5">
                <p className="shop_xtbTotalAmount pl15 f14 f5f5f">
                    <span>可兑换礼品金额：</span>
                    <span className="xt_money">{this.props.account.xtbTotalAmount||0}</span>
                </p>
                <PruductList
                    shop={this.props.shop}
                    shopActionKeys={this.props.shopActionKeys}
                    storageActionKeys={this.props.storageActionKeys}
                />
            </div>
        )
    }
});

var PruductList = React.createClass({
    componentWillMount:function(){
        this.props.shopActionKeys.getProductList();
    },
    setProductId:function(item){
        return ()=>{
            this.props.storageActionKeys.setProductId(item.productId);
        }
    },
    render:function(){
        let productNodes = this.props.shop.productList.map((item,index)=>{
            return (
                <li className="shop_product_item w fff mb10" key={index} onClick={this.setProductId(item)} >
                    <Link to="/ProductDetails" className="w">
                        <div className="shop_product_pic w tc fff tc">
                            <img src={item.picUrl} alt="商品图片" className="h"/>
                        </div>
                        <div className="shop_product_footer fff f14 pl15 pr15">
                            <p className="shop_product_name">{item.productName}</p>
                            <p className="shop_product_price cred red_XT_icon pl15">{item.price / 100}</p>
                        </div>
                    </Link>
                </li>
            )
        });

        return (
            <div>
                <ProductType
                    shopActionKeys={this.props.shopActionKeys}
                    shop={this.props.shop}
                />
                <ul className="shop_product_list">
                    {productNodes}
                </ul>
            </div>
        )
    }

});
var ProductType = React.createClass({
    cutType:function(mannerId,index){
        return ()=>{
            this.props.shopActionKeys.getProductList(mannerId,index);
        }
    },
    render: function () {
        let typeNodes = this.props.shop.type.map((item,index)=>{
            return (
                <li
                    key={index}
                    className="shop_type_item f16"
                    onClick={this.cutType(item.mannerId,index)}
                >
                    <span style={item.selected?cBlueStyle:{}}>
                        {item.title}</span>
                </li>
            )
        });
        return (
            <ul className="shop_type_list fff c16">
                {typeNodes}
            </ul>
        )
    }
});


function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        shop:state.shop,
        storage:state.storage,
        account:state.account
    }
}
function mapDispatchToProps(dispatch){
    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        accountActionKeys : bindActionCreators(accountActions,dispatch),
        shopActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Shop);

const cBlueStyle = {
    color:"#0A89FE"
};
/**
 * Created by LDQ on 2016/10/19.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

require('../css/selectAddressStyle.css');

import _h from '../Util/HB';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
var SelectAddress = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/SelectAddress');
        let urlList = [...this.props.historyUrls.urlList];
        _h.url.setBrowserHistoryFromBefore(urlList,"/SelectAddress");
        this.props.addressActionKeys.getList();
    },
    setNewAddress:function(item){
        return ()=>{
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        return (
            <div className="selected_address_body f5f5f5 po w">
                <div className="create_address_btn f16 pl15 clearfix" onClick={this.setNewAddress({})}>
                    <Link to="/CreateAddress" className="fl">
                        <span>+</span>
                        <span>新建收货地址</span>
                    </Link>
                    <div className="selected_address_save pr15 fr">
                        <Link to='/ConfirmOrder'>
                            保存选择
                        </Link>
                    </div>
                </div>
                <AddressList
                    address={this.props.address}
                    addressActionKeys={this.props.addressActionKeys}
                />
            </div>
        )
    }
});

var AddressList = React.createClass({
    checkedItem:function(item){
        return ()=>{
            this.props.addressActionKeys.checkedAddress(item);
        }
    },
    setNewAddress:function(item){
        return ()=>{
            this.props.addressActionKeys.setNewAddress(item);
        }
    },
    render: function () {
        let addressNodes = this.props.address.listAddress.map((item,index)=>{
            return(
                <li className="address_item w fff" key={index}>
                    <div className="address_item_select">
                        <input
                            type="radio"
                            name="addressList"
                            onChange={this.checkedItem(item)}
                        />
                    </div>
                    <div className="address_item_info">
                        <p className="address_userInfo f14 clearfix">
                            <span className="address_name fl">{item.recievName}</span>
                            <span className="address_phone_num fl">{item.phoneNum}</span>
                        </p>
                        <p>
                            {item.fullAddress}
                        </p>
                    </div>
                    <div className="address_item_edit tr" onClick={this.setNewAddress(item)}>
                        <Link to='/CreateAddress'>
                            编辑
                        </Link>

                    </div>
                </li>
            )

        });

        return (
            <ul className="mt10">
                {addressNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(SelectAddress);

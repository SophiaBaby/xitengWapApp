/**
 * Created by LDQ on 2017/1/8.
 */
var React = require('react');
var {Link} = require('react-router');
require('../css/currentAddressStyle.css');

var CurrentAddress = React.createClass({
    render: function () {
        return (
            <Link to="/SelectAddress">
                <ul className="current_address">
                    <li className="current_address_userInfo clearfix">
                        <div className="fl">
                            <span>收 货 人：</span>
                            <span className="f24">{this.props.address.currentAddress.recievName}</span>
                        </div>
                        <div className="fr">
                            <span className="f24">{this.props.address.currentAddress.phoneNum}</span>
                        </div>
                    </li>
                    <li className="current_address_receiveAddress clearfix">
                        <div className="fl">
                            <span>送货地址：</span>
                            <span className="f24">{this.props.address.currentAddress.fullAddress}</span>
                        </div>
                    </li>
                </ul>
            </Link>
        )
    }
});
module.exports = CurrentAddress;
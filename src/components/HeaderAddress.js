/**
 * Created by LDQ on 2017/1/8.
 */
var React = require('react');
var CurrentAddress = require('../components/CurrentAddress');
var CreateAddressBox = require('../components/CreateAddressBox');

var HeaderAddress = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.address.hasCurrentAddress ?
                    (<CurrentAddress address={this.props.address}/>):
                    (<CreateAddressBox address={this.props.address}
                                        areaActionKeys={this.props.areaActionKeys}
                                        addressActionKeys={this.props.addressActionKeys}/>)
                }
            </div>

        )
    }
});
module.exports = HeaderAddress;
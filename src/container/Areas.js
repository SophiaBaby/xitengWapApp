/**
 * Created by liudq on 2016/10/20.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');


require('../css/areaStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';

var Areas = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Areas');
    },
    render: function () {
        return (
            <div>
                <AreaList
                    areas={this.props.areas}
                    addressActionKeys={this.props.addressActionKeys}
                    historyUrls={this.props.historyUrls}
                />
            </div>
        )
    }
});

var AreaList = React.createClass({
    saveArea:function(item){
        return ()=>{
            this.props.addressActionKeys.setArea(item);
        }
    },
    render: function () {
        let markUrl = this.props.historyUrls.mark;
        let areaNodes = this.props.areas.list.map((item,index)=>{
            return (
                <li className="pl15" key={index} onClick={this.saveArea(item)}>
                    <Link to={markUrl}>{item.label}</Link>
                </li>
            )
        });
        return (
            <ul className="area_list">
                {areaNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address,
        areas:state.areas,
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        areaActionKeys:bindActionCreators(areaActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Areas);
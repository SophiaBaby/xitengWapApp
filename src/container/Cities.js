/**
 * Created by liudq on 2016/10/20.
 */
var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { Header,BackBtn,Title } = require('../components/Header');

require('../css/areaStyle.css');

import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {addressActions} from '../redux/actions/addressActions';
import {areaActions} from '../redux/actions/areaActions';

var Cities = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Cities');
    },
    render: function () {
        return (
            <div>
                {/*<Header*/}
                    {/*historyUrls={this.props.historyUrls}*/}
                    {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}>*/}
                    {/*<BackBtn*/}
                        {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}*/}
                        {/*back={{text:'返回',src:'/nav_btn_back@2x.png',link:"/Provinces"}}*/}
                    {/*/>*/}
                    {/*<Title title={{text:"选取城市"}} />*/}
                {/*</Header>*/}
                <CityList
                    cities={this.props.cities}
                    areaActionKeys={this.props.areaActionKeys}
                    addressActionKeys={this.props.addressActionKeys}
                />
            </div>
        )
    }
});

var CityList = React.createClass({
    saveCity:function(item){
        return ()=>{
            this.props.addressActionKeys.setCity(item);
            this.props.areaActionKeys.getArea({area:"cities"},2,{parentAreaId:item.id});
        }
    },
    render: function () {
        let cityNodes = this.props.cities.list.map((item,index)=>{
            return (
                <li className="pl15" key={index} onClick={this.saveCity(item)}>
                    <Link to="/Areas">{item.label}</Link>
                </li>
            )
        });
        return (
            <ul className="area_list">
                {cityNodes}
            </ul>
        )
    }
});

function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        address:state.address,
        cities:state.cities,
    }
}
function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        addressActionKeys:bindActionCreators(addressActions,dispatch),
        areaActionKeys:bindActionCreators(areaActions,dispatch),
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Cities);
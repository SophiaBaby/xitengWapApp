/**
 * Created by LDQ on 2016/12/19.
 */

var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import {loginInfoActions} from '../redux/actions/loginInfoActions';
var {Link} = require('react-router');
import _h from '../Util/HB';
import {picUrl} from '../Util/xitengBaseConfig';


var PreLoading = React.createClass({

    componentDidMount:function(){
        localStorage.clear();
        this.props.loginInfoActionKeys.wxLogin();
    },
    componentWillReceiveProps:function(){

        if(this.props.loginInfo.loginData){
            _h.load([_h.loading.picLoad(picUrl,"src/images")],function(){
               window.location.hash = "#/HomePage";
            });
        }

    },
    render: function () {
        return (
            <div className="tc">
                正在加在喜腾...请稍候
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        loginInfo:state.loginInfo,
        pay:state.pay
    };
}

function mapDispatchToProps(dispatch){

    return{
        loginInfoActionKeys:bindActionCreators(loginInfoActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(PreLoading);


/**
 * Created by LDQ on 2016/8/30.
 */
var React = require('react');
var $ = require('jquery');
var {Header,BackBtn,Title} = require('../components/Header');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var {Link} = require('react-router');
var { connect } = require('react-redux');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');


require('../css/registerStyle.css');

import {loginInfoActions} from '../redux/actions/loginInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {dialogActions} from '../redux/actions/dialogActions';

var CheckCode = React.createClass({

    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/CheckCode');
        this.props.showDialogActionKeys.hideDialog();
        let timer = parseInt(this.props.loginInfo.timer);
        let initTime = 60;
        //  如果在倒计时 且等于初始值 则立即发送验证码 并开始倒计时
        if(timer == initTime){
            this.props.loginInfoActionKeys.getCheckCode();
            this.props.loginInfoActionKeys.startTimer(timer);
        }
    },
    getCheckCode:function(){
        if(isNaN(parseInt(this.props.loginInfo.timer))){
            this.props.loginInfoActionKeys.getCheckCode();
            this.props.loginInfoActionKeys.startTimer(60);
        }
    },
    checkCheckCode:function(){
        if(this.refs.checkCode.value !== this.props.loginInfo.checkCode){
            this.props.showDialogActionKeys.showDialog();
        }
    },
    render: function () {
        return (
            <div>
                <div className="tc f16 mt10">短信验证码已发送至你的手机</div>
                <div className="tc f16">请填写验证码</div>
                <ul className="mt30">
                    <li className="register_list">
                        <span>手机号</span>
                        <span className="pl15">{this.props.loginInfo.phoneNum}</span>
                    </li>
                    <li className="register_list">
                        <span>验证码</span>
                        <input
                            className="register_input_none pl15 J_myCheckCode"
                            type="text"
                            ref="checkCode"
                            onChange={this.inputCheckCode}/>
                        <div className="register_send_checkcode pl15" onClick={this.getCheckCode}>
                            <span>{this.props.loginInfo.timer}</span>
                        </div>
                    </li>
                </ul>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title={"验证码错误"}/>
                    <DialogBody content={"手机验证码错误"}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:"/Register",text:"取消"}}/>
                    </DialogFooter>
                </DialogiOS>:''}
                <Link to={this.props.showDialog.showDialog?"/CheckCode":"/SetPassword"} className="next_btn tc cfff f16" onClick={this.checkCheckCode}>
                    <span className="cfff">下一步</span>
                </Link>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        loginInfo:state.loginInfo,
        historyUrls:state.historyUrls,
        showDialog:state.showDialog
    }
}
function mapDispatchToProps(dispatch){

    return{
        loginInfoActionKeys : bindActionCreators(loginInfoActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(CheckCode);
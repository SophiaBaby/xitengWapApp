/**
 * Created by LDQ on 2016/8/24.
 */



const React = require('react');
const {Link} = require('react-router');
const {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');
const _h = require('../../src/Util/HB');
const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

require('../css/registerStyle.css');

import {loginInfoActions} from '../redux/actions/loginInfoActions';
import {dialogActions} from '../redux/actions/dialogActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {userInfoActions} from '../redux/actions/userInfoActions';

const Register = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/Register');
        this.props.userInfoActionKeys.getUserInfo();
    },

    inputNum:function(){
        let num = _h.valid.trimAllBlank(this.refs.num.value + "");
        this.props.loginInfoActionKeys.setPhoneNum(num);

    },
    componentDidMount:function(){
        this.props.showDialogActionKeys.hideDialog();
    },
    render: function () {
        return (
            <div>
                {this.props.loginInfo.findPassword?<div className="tc f16 mt10">请输入注册的手机号</div>:
                <div className="register_user_header tc">
                    <img src={this.props.userInfo.icon} alt="" className="h"/>
                </div>}

                <div className="tc mt10">{this.props.userInfo.userName}</div>
                <ul className="mt30">
                    <li className="register_list">
                        <span>国家/地区</span>
                        <span className="pl15">中国</span>
                    </li>
                    <li className="register_list">
                        <span>+86 |</span>
                        <input
                            type="text"
                            placeholder="请输入电话号码"
                            className="register_input_none h pl15"
                            ref="num"
                            onChange={this.inputNum}
                            value={this.props.loginInfo.phoneNum}
                        />
                    </li>
                </ul>
                <RegisterBtn showDialogActionKeys={this.props.showDialogActionKeys} />
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="确认手机号码"/>
                    <DialogBody content="我们将发送验证码到这个手机号："/>
                    <DialogBody content={this.refs.num.value}/>
                    <DialogFooter>
                        <DialogConfirm certain={{url:"/CheckCode",text:"确认"}} />
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:"/Register",text:"取消"}}/>
                    </DialogFooter>
                </DialogiOS>:''}

            </div>
        )
    }
});
const RegisterBtn = React.createClass({
    showDialog:function(){
        this.props.showDialogActionKeys.showDialog();
    },
    render: function () {
        return (
            <div className="login_btn cfff tc f20" onClick={this.showDialog}>
                <span>下一步</span>
            </div>
        )
    }
});


function mapStatetoProps(state){
    return {
        loginInfo:state.loginInfo,
        showDialog:state.showDialog,
        historyUrls:state.historyUrls,
        userInfo:state.userInfo
    }
}
function mapDispatchToProps(dispatch){

    return{
        loginInfoActionKeys : bindActionCreators(loginInfoActions,dispatch),
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Register);

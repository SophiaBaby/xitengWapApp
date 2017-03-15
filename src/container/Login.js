/**
 * Created by LDQ on 2016/8/24.
 */
var React = require('react');
var $ = require('jquery');
var { Header,BackBtn,Title } = require('../components/Header');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var { Link } = require('react-router');
var { DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel } = require('../components/DialogiOS');

import _h from '../Util/HB';
require('../css/loginStyle.css');

import {userInfoActions} from '../redux/actions/userInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {dialogActions} from '../redux/actions/dialogActions';

var Login = React.createClass({
    componentWillMount:function(){
        this.props.showDialogActionKeys.hideDialog();
        let code = _h.url.getSearchKey('code')||_h.url.getSearchKey('code');
        if(code){
            this.props.userInfoActionKeys.wxLogin(code);
        }

        //  在这里设置成true 防止重置密码时 又想起密码回退
        this.props.userInfoActionKeys.findPassword(false);
        this.props.historyUrlsActionKeys.pushUrl('/Login');
    },
    componentWillReceiveProps:function(nextProps){

        if(nextProps.userInfo.logIn){
            var markUrl = this.props.historyUrls.mark;
            _h.url.setBrowserHistoryFromBefore([...this.props.historyUrls.urlList],'/Login');
            var url = "http://www.xiteng.com/xitenggame/xitengWapApp/index.html#"+markUrl;
            this.props.historyUrlsActionKeys.saveStateGo(url);

        }else if(nextProps.userInfo.access_token_secret && !nextProps.userInfo.logIn){
            console.log("登录成功去绑定手机号");
            this.props.historyUrlsActionKeys.saveStateGo("http://www.xiteng.com/xitenggame/xitengWapApp/index.html#/Register");

        }
    },
    findPassword:function(){
        this.props.userInfoActionKeys.findPassword(true);
    },
    render: function () {
        // var backUrl = this.props.historyUrls.last;
        return (
            <div>
                {/*<Header*/}
                    {/*historyUrls={this.props.historyUrls}*/}
                    {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}>*/}
                    {/*<BackBtn*/}
                        {/*historyUrlsActionKeys={this.props.historyUrlsActionKeys}*/}
                        {/*back={{text:'取消',src:'/nav_btn_back@2x.png',link:backUrl}}*/}
                    {/*/>*/}
                {/*</Header>*/}
                <div className="login_logo tc"></div>

                <LoginInput />
                <LoginBtn userInfoActionKeys={this.props.userInfoActionKeys}/>
                <Link to="/Register" className="tc mt5" onClick={this.findPassword}>找回密码</Link>

                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="账号或密码错误"/>
                    <DialogBody content={"请检查用户名密码"}/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{url:"/Register",text:"取消"}}
                        />
                    </DialogFooter>
                </DialogiOS>:''}
                <WxBtn
                    userInfoActionKeys={this.props.userInfoActionKeys}
                    historyUrlsActionKeys={this.props.historyUrlsActionKeys}
                    historyUrls={this.props.historyUrls}
                />

            </div>

        )
    }
});

var LoginInput = React.createClass({
    render: function () {
        return (
            <ul className="login_input ml15 mr15 f16">
                <li>
                    <span className="pr30">帐号</span>
                    <input type="text" placeholder="请输入绑定的手机号" className="login_phone_num f16 J_phoneNum"/>
                </li>
                <li>
                    <span className="pr30">密码</span>
                    <input type="password" placeholder="请输入密码" className="login_password f16 J_password"/>
                </li>
            </ul>
        )
    }
});

var LoginBtn = React.createClass({
    login:function(){
        this.props.userInfoActionKeys.phoneNumLogin($('.J_phoneNum').val(),$('.J_password').val());
    },
    render: function () {
        return (
            <div className="login_btn cfff tc f20" onClick={this.login}>
                <span>登录</span>
            </div>
        )
    }
});


var WxBtn = React.createClass({
    logIn:function(){
        let code = _h.url.getHashKey('code');
        if(!code){
            this.props.userInfoActionKeys.wxLogin();
        }
    },

    render: function () {
        return (
            <div className="cblue f16 tc login_wx w" onClick={this.logIn}>
                <span className="login_wx_btn">使用微信注册/登录</span>
            </div>
        )
    }
});

function mapStatetoProps(state){
    return {
        userInfo:state.userInfo,
        historyUrls:state.historyUrls,
        WXInfo:state.WXInfo,
        showDialog:state.showDialog,
        state:state
    }
}
function mapDispatchToProps(dispatch){

    return{
        userInfoActionKeys : bindActionCreators(userInfoActions,dispatch),
        showDialogActionKeys:bindActionCreators(dialogActions,dispatch),
        historyUrlsActionKeys : bindActionCreators(historyUrlsActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(Login);

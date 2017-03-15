/**
 * Created by LDQ on 2016/11/10.
 */

var React = require('react');
var $ = require('jquery');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');

require('../css/registerStyle.css');

import {loginInfoActions} from '../redux/actions/loginInfoActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';
import {dialogActions} from '../redux/actions/dialogActions';


var SetPassword = React.createClass({
    componentWillMount:function(){
        this.props.historyUrlsActionKeys.pushUrl('/SetPassword');

    },
    inputPassWord:function(){

        let password = this.refs.password.value;

        if(password.length > 5){

            if(this.props.loginInfo.findPassword){
                this.props.loginInfoActionKeys.resetPassword(password);
            }else{
                this.props.loginInfoActionKeys.setPassword(password);
            }

        }else{
            this.props.showDialogActionKeys.showDialog();
        }
    },
    render: function () {
        // var backUrl = this.props.historyUrls.last;
        let markUrl = this.props.historyUrls.mark;
        return (
            <div>
                <div className="tc f16 mt10">设置密码</div>
                <div className="register_list">
                    <span>密码</span>
                    <input
                        type="password"
                        placeholder="请填写6位以上密码"
                        className="register_input_none pl15 J_password"
                        ref="password"
                    />
                </div>
                {this.props.showDialog.showDialog?<DialogiOS >
                    <DialogHeader title="验证码错误"/>
                    <DialogBody content="手机验证码错误"/>
                    <DialogFooter>
                        <DialogCancel
                            showDialogActionKeys={this.props.showDialogActionKeys}
                            cancel={{text:"重新输入",url:"/SetPassword"}}
                        />
                    </DialogFooter>
                </DialogiOS>:''}
                <div className="next_btn tc cfff f16" onClick={this.inputPassWord}>
                    <Link to="/bet">
                        <span className="cfff">确定</span>
                    </Link>
                </div>
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

module.exports = connect(mapStatetoProps,mapDispatchToProps)(SetPassword);
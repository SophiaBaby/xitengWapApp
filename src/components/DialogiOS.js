/**
 * Created by LDQ on 2016/8/29.
 */
var React = require('react');
var {Link} = require('react-router');
require('../css/dialogiOSStyle.css');

var DialogiOS = React.createClass({

    render: function () {

        return (
            <div className="dialog_big_box w h">
                <div className="dialog_body">
                    {this.props.children}
                </div>
                <div className="dialog_mask w h"></div>
            </div>

        )
    }
});
var DialogHeader = React.createClass({
    render:function() {
        return (
            <div className="tc f14 pt15 dialog_header">
                {this.props.title}
            </div>
        )
    }
});

var DialogBody = React.createClass({
    render:function() {
        return (
            <div className="tc f14 pb10 dailog_content">
                {this.props.content}
            </div>
        )
    }
});

var DialogFooter = React.createClass({
    render:function() {
        return (
            <div className="dialog_footer">
                {this.props.children}
            </div>
        )
    }
});
var DialogConfirm = React.createClass({

    render:function() {
        return (
            <div className="dialog_btn">
                <Link to={this.props.certain.url} className="tc f14 dialog_btn_color">
                    <span>{this.props.certain.text}</span>
                </Link>
            </div>
        )
    }
});
var DialogCancel = React.createClass({
    hideDialog:function(){
        this.props.showDialogActionKeys.hideDialog();
    },
    render:function() {
        return (
            <div className="dialog_btn tc f14 dialog_btn_color" onClick={this.hideDialog}>
                <Link to={this.props.cancel.url}>
                    <span className="dialog_btn_color">{this.props.cancel.text}</span>
                </Link>

            </div>
        )
    }
});

module.exports = {
    DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel
};
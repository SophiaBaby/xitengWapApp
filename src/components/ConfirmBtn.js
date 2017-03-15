/**
 * Created by LDQ on 2016/8/29.
 */
/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var {Link} = require('react-router');


var ConfirmBtn = React.createClass({
    popHistory:function(){
        this.props.historyUrlsActionKeys.popUrl();
    },
    render: function () {
        return (
            <div style={confirmBtnStyle} className="tc" >
                <Link to={this.props.confirm.link} onClick={this.popHistory}>`
                    {this.props.confirm.text}
                </Link>
            </div>
        )
    }
});


const confirmBtnStyle = {
    height:"44px",
    lineHeight:"44px",
    margin:"30px 15px"
};
module.exports = ConfirmBtn;


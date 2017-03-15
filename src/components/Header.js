/**
 * Created by LDQ on 2016/8/26.
 */
var React = require('react');
var {Link} = require('react-router');

var Header = React.createClass({

    render:function(){

        return (
            <ul style={headerStyle}>
                {this.props.children}
            </ul>
        )
    }
});
var BackBtn = React.createClass({
    componentWillMount:function(){
        if(this.props.back.src){
            backStyle.backgroundImage="url("+this.props.back.src+")";
            backStyle.paddingLeft="30px";
        }else{
            backStyle.paddingLeft = "15px";
        }
    },
    backTo:function(){
        return ()=>{
            this.props.historyUrlsActionKeys.popUrl()
        }
    },
    render: function () {
        return (
            <li style={backStyle}>
                <Link to={this.props.back.link} onClick={this.backTo()}>
                    <span style={backTextStyle}>{this.props.back.text}</span>

                </Link>
            </li>
        )
    }
});
var Title = React.createClass({
    render: function () {
        return (
            <li style={titleStyle} className="tc f16 po w">{this.props.title.text}</li>
        )
    }
});


const headerStyle = {
    display:"flex",
    justifyContent:"space-between",
    height:'44px',
    lineHeight:'44px',
    fontSize:'14px',
    background:"#0A89FE"
};
const backStyle = {
    color:"#FFF",
    backgroundSize:"10px",
    backgroundRepeat:'no-repeat',
    backgroundPositionX:"15px",
    backgroundPositionY:'center',
    zIndex:'1'
};
const backTextStyle = {
    color:'#FFF'
};
var titleStyle = {
    // marginLeft:'-30px',
    color:'#FFF'
};
module.exports = {Header,BackBtn,Title};
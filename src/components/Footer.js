/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var {Link} = require('react-router');
require('../css/footerStyle.css');

var Footer = React.createClass({
    getInitialState:function(){
        return {
            footerData:this.props.footerData
        }
    },
    componentWillMount:function(){
        let pathName = this.props.pathName;
        let footerData = this.props.footerData;
        for(let i = 0;i < footerData.length; i++){
            if(footerData[i].url == pathName){
                footerData[i].isChecked = true;
            }

        }

        this.setState(footerData);
    },
    cutTag:function(i){
        return ()=>{
            let index = i;
            let footerData = this.state.footerData;
            for(let i = 0;i < footerData.length; i++){
                footerData[i].isChecked = false;
                footerData[index].isChecked = true;
            }
            this.setState(footerData);
        }
    },
    render: function () {
        var footerNodes = this.state.footerData.map((footerItem,index) => {
            return (
                <Link to={footerItem.url} className="fl footer_item tc" key={index} onClick={this.cutTag(index)}>
                    <div className="footer_pic_box">
                        <img src={footerItem.isChecked?footerItem.checked:footerItem.unchecked} alt="" className="footer_pic"/>
                        <span style={footerItem.isChecked?{color:"#4964ef"}:{color:"#a4a3a3"}}>{footerItem.name}</span>
                    </div>
                </Link>
            )
        });

        return (
            <div className="w main_footer fff">
                {footerNodes}
            </div>
        )
    }
});



module.exports = Footer;


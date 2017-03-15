/**
 * Created by LDQ on 2016/8/6.
 */
var React = require('react');
var Footer = require('../components/Footer');

var HomePage = React.createClass({
    componentWillMount:function(){

    },
    render: function () {
        return (
            <div>
                {this.props.children}
                <Footer footerData={[
                    {name:'喜腾',url:'/Guess',checked:"src/images/tab_xiteng@2x.png",unchecked:"src/images/tab_xiteng_s@2x.png",isChecked:false},
                    {name:'发现',url:'/Discover',checked:"src/images/tab_faxian@2x.png",unchecked:"src/images/tab_faxian_s@2x.png",isChecked:false},
                    {name:'我',url:'/My',checked:"src/images/tab_me@2x.png",unchecked:"src/images/tab_me_s@2x.png",isChecked:false}
                    ]}
                    pathName={this.props.location.pathname}
                />
            </div>
        )
    }
});


module.exports = HomePage;

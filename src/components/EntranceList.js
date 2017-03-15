/**
 * Created by LDQ on 2016/8/13.
 */

var React = require('react');
var {Link} = require('react-router');

require("../css/entranceListStyle.css");

var EntranceList = React.createClass({

    render:function(){
        var listNodes = this.props.itemList.map((item,index)=>{
            return (
                <li key={index} className="entrance_list">
                    <Link to={item.url}>
                        <span className="entrance_name" style={entranceBgStyle(item.icon)}>{item.name}</span>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="entrance f16">
                {listNodes}
            </ul>
        )
    },
});

module.exports = EntranceList;

const entranceBgStyle = function(icon){
    return {
        background:'url('+icon+') no-repeat 15px center',
        backgroundSize:"20px"
    }
};
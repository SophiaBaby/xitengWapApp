
/**
 * Created by LDQ on 2016/8/8.
 */
var React = require('react');
var {Link} = require('react-router');


var AskBar = React.createClass({
    render: function () {
        return (
            <Link to='/Register'>我是问吧</Link>
        )
    }
});
module.exports = AskBar;

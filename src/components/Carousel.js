/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');
require('../css/carousel.css');


var React = require('react');
var $ = require('jquery');
require('../css/carousel.css');


var Carousel = React.createClass({

    timer:function(){
        var x = 0;
        var slideX = parseFloat(this.props.carouselStyle.bigBox.width);
        setInterval(()=>{
            x -= slideX;
            if(-x == parseFloat(this.state.smBox.width)){
                x = 0;
            }
            this.state.smBox.transform="translate3d("+x+"px, 0px, 0px)";
            this.setState({
                smBox:this.state.smBox
            })
        },5000);
    },
    getInitialState:function(){
        return {
            smBox:carouselStyleRow
        }
    },
    componentWillReceiveProps:function(nextProps){
        if(this.props.direction == "slideLeft" || this.props.direction == "slideRight"){
            var smBox = Object.assign({},nextProps.carouselStyle.smBox,carouselStyleRow);
        }
        this.setState({
            smBox:smBox
        });
    },

    componentDidMount:function () {
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {

        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <li className="carousel_item" key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div className="carousel_box pr tc" style={this.props.carouselStyle.bigBox}>
                <ul style={this.state.smBox}>
                    {imgNodes}
                </ul>
            </div>
        )
    }
});


module.exports = Carousel;
var carouselStyleRow = {
    display:"flex",
    flexDirection:"row",
    transitionDuration: "300ms",
    transform: "translate3d(0px, 0px, 0px)"
};
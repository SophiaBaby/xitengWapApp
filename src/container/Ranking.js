/**
 * Created by LDQ on 2016/12/13.
 */
var React = require('react');
var {Link} = require('react-router');
var {Header,BackBtn,Title} = require('../components/Header');
var {DialogiOS,DialogHeader,DialogBody,DialogFooter,DialogConfirm,DialogCancel} = require('../components/DialogiOS');
var _h = require('../../src/Util/HB');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

require("../css/awardStyle.css");

import {awardActions} from '../redux/actions/awardActions';
import {rankActions} from '../redux/actions/rankActions';
import {historyUrlsActions} from '../redux/actions/historyUrlsActions';


var AwardList = React.createClass({
    componentWillMount:function(){
        this.props.awardActionKeys.getAward(this.props.award.awardType);
    },
    render: function () {
        let awardNodes = this.props.award.awardList.map((item,index)=>{
           return (
               <li key={index} className="award_item">
                   <img src={item.picUrl} alt={item.name} className="w"/>
                   <div>
                       <span></span>
                   </div>
               </li>
           ) 
        });
        return (
            <div>
                
                
            </div>
        )
    }
});



function mapStatetoProps(state){
    return {
        historyUrls:state.historyUrls,
        award:state.award,
        rank:state.rank
    }
}

function mapDispatchToProps(dispatch){

    return{
        historyUrlsActionKeys: bindActionCreators(historyUrlsActions,dispatch),
        awardActionKeys:bindActionCreators(awardActions,dispatch),
        rankActionKeys:bindActionCreators(rankActions,dispatch)
    }
}

module.exports = connect(mapStatetoProps,mapDispatchToProps)(AwardList);
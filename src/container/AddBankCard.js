/**
 * Created by zhangxin on 3/9 0009.
 */
import React,{Component}from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
require('../css/addBankCard.css');

class AddBankCard extends Component{
    render(){
        return(
            <div className="addBankCard">
                <div className="addBankCard_entry">
                    <Link to="/AddBankCardInfo">
                        <p className="tc">+添加银行卡</p>
                    </Link>
                </div>
            </div>
        )
    }
}

module.exports = AddBankCard;

























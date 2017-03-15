/**
 * Created by zhangxin on 3/9 0009.
 */
import React,{Component}from 'react';
import { render } from 'react-dom';
require('../css/addBankCardInfo.css');

class AddBankCardInfo extends Component{
    render(){
        return(
            <div className="addBankCardInfo">
                <ul className="bFF mt20">
                    <li className="borderB_line infoInput">
                        <label htmlFor="name">持卡人：</label>
                        <input type="text" id="name" placeholder="请填写持卡人姓名"/>
                    </li>
                    <li className="borderB_line infoInput">
                        <label htmlFor="cardId">卡号：</label>
                        <input type="text" id="cardId" placeholder="请填写银行卡卡号"/>
                    </li>
                    <li className="borderB_line infoInput">
                        <label htmlFor="bankType">银行账户：</label>
                        <input type="text" id="bankType" placeholder="请选择银行"/>
                    </li>
                    <li className="borderB_line infoInput">
                        <label htmlFor="bankName">开户支行：</label>
                        <input type="text" id="bankName" placeholder="请填写开户支行名称"/>
                    </li>
                </ul>
                <div className="nextBtn tc">
                    下一步
                </div>
                {/*<div className="videoBox">*/}
                    {/*<video style={{width:"100%"}}*/}
                           {/*src="http://us.sinaimg.cn/004nF540jx075fFKqhR501040100bYCS0k01.mp4?label=mp4_hd&Expires=1489119971&ssig=6lRIUpqMYA&KID=unistore,video"*/}
                           {/*controls="controls">*/}
                    {/*</video>*/}
                {/*</div>*/}
            </div>

        )
    }
}

module.exports = AddBankCardInfo;

















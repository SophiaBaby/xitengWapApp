/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.isEmpty
 *  HB.resource
 *      HB.resource.query()
 *      HB.resource.save()
 *  HB.valid
 *      HB.valid.toPhoneNum
 *  HB.ui
 *      HB.ui.scrollToTheBottom
 *  HB.url
 *      HB.url.getBaseUrl
 *      HB.url.getKey
 *      HB.url.history
 *  HB.save
 *      HB.save.storage
 */

var $ = require('jquery');

window.HB = window.HB || {};

HB.obj = (function(){

    //  判断obj1中是否有obj2中的所有属性
    var toEquals = function(obj1,obj2){
        var flag = true;
        for(var prop in obj2){

            if(obj1[prop] != obj2[prop]){
                flag = false;
                break;
            }
        }
        return flag;

    };

    //  用途：是否为空对象
    var isEmpty = function(obj){
        if(typeof obj == "object"){
            var proparr = [];

            for(var prop in obj){
                proparr.push(prop);
            }

            if(proparr.length == 0){
                return true;
            }else{
                return false;
            }
        }else{
            if(obj == ''){
                return true;
            }else{
                return false;
            }
        }

    };

    return {
        toEquals:toEquals,
        isEmpty:isEmpty
    }

})();



HB.ajax = (function(){
    /*
    *   第一个参数:url模板字符串类型，其中可以出现占位符，占位符要以“:”为前缀
    *   比如：'/productList/:type';
    *
    *
    *
    *
    * */
    class Resource{
        constructor(templateUrl){

            //  分割字符串
            this.templateUrlArr = templateUrl.split('/');
        }

        //  实际上这个方法并不想暴露出来
        getRealUrl(entity_obj){
            this.templateUrlArr.map((item,i)=>{
                if(item[0] === ":"){
                    this.replaceItem(entity_obj,item,i)
                }
            });
            return this.templateUrlArr.join('/');
        }
        //  实际上这个方法并不想暴露出来
        replaceItem(entity_obj,item,index){
            for(let prop in entity_obj){
                if(prop === item.slice(1)){
                    this.templateUrlArr[index] = entity_obj[prop];
                }else{
                    entity_obj = "";
                }
            }
        }
        //  实际上这个方法并不想暴露出来
        ajax(type,url,data,bool){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    type:type,
                    url:"/xitenggamejar"+url,
                    data:data,
                    contentType:'application/json; charset=utf-8',
                    async:bool
                }).done(resolve).fail(reject);

            });
        }

        query(entity_obj,bool=true){

            let url = this.getRealUrl(entity_obj);
            console.log(url);
            let type = 'GET';
            var data = "";
            return this.ajax(type,url,data,bool);
        }


        save(entity_obj,data,bool=true){
            let url = this.getRealUrl(entity_obj);
            let type = 'POST';
            return this.ajax(type,url,JSON.stringify(data),bool);
        }
    }

    return {
        resource:function(templateUrl){
            return new Resource(templateUrl);
        }
    }
})();
HB.valid = (function(){
    /*
    *   用途：按一定规则分割字符串
    *   第1个参数是分割哪个字符串 比如：18801233565
    *   第2个参数是每隔多少个字符分割 比如：18801233565 分成 188 0123 3565 就传[3,4,4]
    *   第3个参数是用什么来分割 比如：18801233565 分成 188-0123-3565 就传'-'
    * */

    function validNum(num,arr,str){
        var newPhoneNum = [];
        arr.map((item,i)=>{
            var newNum = num.slice(0,item);
            num = num.substr(item);
            newPhoneNum.push(newNum);
        });
        return newPhoneNum.join(str).trim();
    }

    //  用途：将字符串中所有空格删除
    function trimAllBlank(str){
        return str.replace(/\s/g, "");
    }

    //  用途：将数字转换成字符串
    function parseString(i){
        return i+"";
    }

    //  用途：将字符串转换为数组
    function parseArr(str){
        return str.split('');
    }

    //  用途：将阿拉伯数子转换为汉字
    function parseChinese(number){
        let chinese = ['零','一','二','三','四','五','六','日','八','九'];
        let arrNumber = parseArr(parseString(number));
        let chineseNumber = "";

        return arrNumber.map((item,index)=>{
            chineseNumber += chinese[item];
            return chineseNumber;
        });
    }

    //  将星期几转换成汉字的
    function parseDay(day){
        let myDay = day;
        if(day == 0){
            myDay = 7;
        }
        return parseChinese(myDay);

    }
    return {
        validNum:validNum,
        trimAllBlank:trimAllBlank,
        parseString:parseString,
        parseArr:parseArr,
        parseChinese:parseChinese,
        parseDay:parseDay
    }

})();

HB.ui = (function(){

    var scrollToTheBottom = function(func){
        $(window).bind("scroll",function(){
            var $_scrollTop = $(this).scrollTop();
            var $_scrollHeight = $(document).height();
            var $_windowHeight = $(this).height();
            if($_scrollTop + $_windowHeight == $_scrollHeight){
                func();
            }
        });
    };

    const setBaseFontSize = function(designWidth,rem2px){
        var d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        d.remove();
        document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
        var st = document.createElement('style');
        var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
        var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
        st.innerHTML = portrait + landscape;
        head.appendChild(st);
        return defaultFontSize
    };

    return {
        scrollToTheBottom:scrollToTheBottom,
        setBaseFontSize:setBaseFontSize
    }
})();

HB.url = (function(){

    var getBaseUrl = function(){
        var host = window.location.host;
        var contextPath = document.location.pathname;
        var index = contextPath.substr(1).indexOf("/");
        contextPath = contextPath.substr(0, index + 1);
        var url = "http://" + host + contextPath;

        return url;
    };

    var getSearchKey = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };

    var getHashKey = function(name){
        var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.hash.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    //  从哪个URL之前的所有URL都要 （之后的不要）第二个参数就是来标记从哪开始之后的URL都不要（包括第二个参数在内）
    var setBrowserHistoryFromBefore = function(urls,url){
        let urlIndex = urls.indexOf(url);
        let last = urlIndex + 1;
        urls.splice(last);
        for(let i = 0;i < urls.length;i++){
            var setUrl = "#" + urls[i];
            history.pushState({},"", setUrl);
        }
    };

    return {
        getBaseUrl:getBaseUrl,
        getSearchKey:getSearchKey,
        getHashKey:getHashKey,
        setBrowserHistoryFromBefore:setBrowserHistoryFromBefore
    }
})();

HB.save = (function(){

    const setStorage = function(obj){
        for(let prop in obj){
            localStorage[prop] = JSON.stringify(obj[prop]);
        }
    };


    return {
        setStorage:setStorage,
    }
})();

HB.loading = (function(){
    var picLoad = function(picArr,baseUrl=""){
        let successCounter = 0;
        let isSuccess = false;
        for(let i = 0;i < picArr.length;i++){
            var url = baseUrl + picArr[i];
            $.ajax({
                type:'GET',
                url:url,
                async:false
            }).done(function(){
                console.log("加在成功");
                successCounter ++;
            });
        }
        if(successCounter == picArr.length){
            isSuccess = true;
        }
        return isSuccess;
    };

    return {
        picLoad:picLoad
    }
})();
HB.load = function(arr,func){
    for(let i = 0;i < arr.length;i++){
        if(arr[i] == false){
            alert("未连接到网络 请重新尝试");
            return false;
        }
    }
    func();
};

module.exports = HB;
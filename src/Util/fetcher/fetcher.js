/**
 * Created by Thoughtworks on 16/8/6.
 */

var $ = require('jquery')

export default (url)=>{
    return new Promise((resolve, reject)=>{
        $.get(url)
            .done(resolve)
            .fail(reject);
    });
}



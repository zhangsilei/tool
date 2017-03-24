/*************************************************************
 *
 * 本地存储模块
 * 
 *************************************************************/

'use strict';

var storage = {
    /**
     * 读取Cookie
     * @param  {String} cname Cookie的key
     * @return {String} Cookie的value
     */
    getCookie: function(cname) {
        var cvalue = "",
            cookies = document.cookie;
        if (cookies.length > 0) {
            var search = cname + "=",
                start = cookies.indexOf(search);
            if (start != -1) {
                start += search.length;
                var end = cookies.indexOf(";", start);
                if (end == -1) {
                    end = cookies.length;
                }
                cvalue = unescape(cookies.substring(start, end));
            }
        }
        return cvalue;
    },
    /**
     * 写入Cookie   
     * @param {String} cname  Cookie的key
     * @param {String} cvalue Cookie的value
     * @param {String} days   Cookie的存活天数
     */
    setCookie: function(cname, cvalue, days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        var exdate = "; expires=" + date.toGMTString();
        document.cookie = cname + "=" + escape(cvalue) + exdate;
    }
}

module.exports = {
    getCookie: storage.getCookie,
    setCookie: storage.setCookie
};
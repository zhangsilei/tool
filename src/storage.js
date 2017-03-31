/*************************************************************
 *
 * 本地存储模块
 * 
 *************************************************************/

'use strict';

var ls = window.localStorage;

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
    },

    /**
     * 获取本地存储中对应的值
     * @param  {String} key 本地数据的key
     * @return {String}     本地数据的value
     */
    getStorage: function(key) {
        var val = '';
        _checkStorageSupport(function() {
            val = ls.getItem(key);
        });
        return val;
    },

    /**
     * 设置本地存储数据
     * @param {String} key 本地数据的key
     * @param {String} val 本地数据的value   
     */
    setStorage: function(key, val) {
        _checkStorageSupport(function() {
            ls.setItem(key, val);
        });
    },

    /**
     * 移除指定的本地数据
     * @param  {String} key 本地数据的key
     */
    removeStorage: function(key) {
        _checkStorageSupport(function() {
            ls.removeItem(key);
        });
    },

    /**
     * 清除本地存储的所有数据      
     */
    clearStorage: function() {
        _checkStorageSupport(function() {
            ls.clear();
        });
    }
}

/**
 * 监测浏览器是否支持localStorage
 * @param  {Function} func 普通方法
 */
function _checkStorageSupport(func) {
    if (!ls) {
        alert('浏览器不支持localStorage！或者开启了隐私模式！');
    } else {
        func();
    }
}

module.exports = {
    getCookie: storage.getCookie,
    setCookie: storage.setCookie,
    getStorage: storage.getStorage,
    setStorage: storage.setStorage,
    removeStorage: storage.removeStorage,
    clearStorage: storage.clearStorage
};
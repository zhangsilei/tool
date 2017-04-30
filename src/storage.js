/**
 * @module 本地存储－Storage
 * @description 该模块提供了本地存储相关api
 */

'use strict';

var ls = window.localStorage;

var storage = {
    /**
     * @function getCookie
     * @param  {String} cname Cookie的key
     * @return {String} Cookie的value
     * @description 读取Cookie
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
     * @function setCookie
     * @param {String} cname  Cookie的key
     * @param {String} cvalue Cookie的value
     * @param {String} days   Cookie的存活天数
     * @description 写入Cookie
     */
    setCookie: function(cname, cvalue, days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        var exdate = "; expires=" + date.toGMTString();
        document.cookie = cname + "=" + escape(cvalue) + exdate;
    },

    /**
     * @function getStorage
     * @param  {String} key 本地数据的key
     * @return {String}     本地数据的value
     * @description 获取本地存储中对应的值
     */
    getStorage: function(key) {
        var val = '';
        _checkStorageSupport(function() {
            val = ls.getItem(key);
        });
        return val;
    },

    /**
     * @function setStorage
     * @param {String} key 本地数据的key
     * @param {String} val 本地数据的value   
     * @description 设置本地存储数据
     */
    setStorage: function(key, val) {
        _checkStorageSupport(function() {
            ls.setItem(key, val);
        });
    },

    /**
     * @function removeStorage
     * @param  {String} key 本地数据的key
     * @description 移除指定的本地数据
     */
    removeStorage: function(key) {
        _checkStorageSupport(function() {
            ls.removeItem(key);
        });
    },

    /**
     * @function clearStorage
     * @description 清除本地存储的所有数据      
     */
    clearStorage: function() {
        _checkStorageSupport(function() {
            ls.clear();
        });
    }
}

/***
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
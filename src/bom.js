/**
 * @module 浏览器-Bom
 * @description 该模块提供了浏览器交互相关api
 */

'use strict';

var bom = {
    /**
     * @function browserVersion
     * @return {Object} 终端类型：trident = IE内核; presto = opera内核; webKit = 苹果、谷歌内核;
     *                      gecko = 火狐内核; mobile = 移动终端; ios = ios终端; 
     *                      android = android终端或者uc浏览器; iPhone = iPhone或者QQHD浏览器; 
     *                      iPad = iPad终端; webApp = web应用程序; wechat = 微信; alipay = 支付宝;
     * @description 判断终端的类型
     * @example
     * $.browserVersion.trident => ture/false
     */
    browser: function() {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
            wechat: !!u.match(/MicroMessenger/i), // 是否微信打开
            alipay: !!u.match(/AliApp/i) // 是否支付宝打开
        };
    },

    /**
     * @function getQueryString
     * @param {String} name URL后缀的参数名
     * @return {String} 对应的值
     * @description 获取请求url的参数
     * @example
     * https://www.baidu.com?name=test
     * $.getQueryString('name') => 'test'
     */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]);
        // return null;
        if (r != null) return r[2];
        return null;
    }
}

module.exports = {
    browserVersion: bom.browser,
    getQueryString: bom.getQueryString
}
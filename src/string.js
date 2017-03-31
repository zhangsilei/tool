/*************************************************************
 *
 * 字符串处理模块
 * 
 *************************************************************/

'use strict';

var string = {
    /**
     * 过滤空格 added
     * @param  {String} str 要过滤的字符串
     * @return {String}     过滤后的字符串
     */
    trim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

module.exports = {
    trim: string.trim
}
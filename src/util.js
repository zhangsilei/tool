/**
 * 增加常用业务工具方法，以提高通用业务的开发效率。
 *
 * @module 工具方法
 */

'use strict';

/**
 * 该模块提供了常用的工具方法，如数据校验、日期格式化等，直接通过命名空间调用即可：eg: $.trim(str);
 * 
 * @class Util
 */

(function() {
	var validate = {
		/**
		 * @function input
		 * @param  {String} str 需要校验的字符串
		 * @return {Boolean}    
		 * @description 是否满足：只有中文、数字、字母和下划线，且位置不限。
		 * @example $.validate.input(str)
		 */
		input: function(str) {
			return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str);
		},

		/**
		 * @function mobile
		 * @param  {String} str 需要校验的字符串
		 * @return {Boolean}    
		 * @description 是否为手机号
		 * @example $.validata.mobile(str);
		 */
		mobile: function(str) {
			return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
		},

		/**
		 * @function code
		 * @param  {String} str   需要校验的字符串
		 * @param  {Number} [num] 验证码的个数，默认四位数
		 * @return {Boolean}      
		 * @description 是否为数字验证码
		 * @example $.validata.code(str, [num]);
		 */
		code: function(str, num) {
			if (num && typeof num == 'number') {
				return new RegExp('^\\d{' + num + '}$').test(str);
			} else {
				return /^\d{4}$/.test(str);
			}
		},

		/**
		 * @function email
		 * @param  {String} str 需要校验的字符串
		 * @return {Boolean}    
		 * @description 是否为邮箱
		 * @example $.validata.email(str);
		 */
		email: function(str) {
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
		}
	}

	/**
	 * @function trim
	 * @param  {String} str 要过滤的字符串
	 * @return {String}     过滤后的字符串
	 * @description 过滤空串
	 * @example $.trim(str);
	 */
	function trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	/**
	 * @function dateFormat
	 * @param  {String} format  时间格式：年=yyyy，月=MM，日=dd，时=HH，分=mm，秒=ss
	 * @param  {Number} [timestamp] 时间戳，默认当前时间
	 * @return {String} 格式化后的时间字符串
	 * @description 时间格式化，format可以随意组合。eg: yyyy-MM-dd HH:mm:ss => 2017-01-01 13:13:13
	 * @example $.dateFormat(format, [timestamp]);
	 */
	function dateFormat(format, timestamp) {
		if (format && typeof format == 'string') {
			var date = timestamp && typeof timestamp == 'number' ? new Date(timestamp) : new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				min = date.getMinutes(),
				sec = date.getSeconds();
			if (format.match(/y{4}/g)) { // 年
				format = format.replace(/y{4}/g, year);
			}
			if (format.match(/M{2}/g)) { // 月
				format = format.replace(/M{2}/g, month < 10 ? '0' + month : month);
			}
			if (format.match(/d{2}/g)) { // 日
				format = format.replace(/d{2}/g, day < 10 ? '0' + day : day);
			}
			if (format.match(/H{2}/g)) { // 时
				format = format.replace(/H{2}/g, hour < 10 ? '0' + hour : hour);
			}
			if (format.match(/m{2}/g)) { // 分
				format = format.replace(/m{2}/g, min < 10 ? '0' + min : min);
			}
			if (format.match(/s{2}/g)) { // 秒
				format = format.replace(/s{2}/g, sec < 10 ? '0' + sec : sec);
			}
		}
		return format;
	}

	module.exports = {
		dateFormat: dateFormat,
		validate: validate,
		trim: trim
	};
})()
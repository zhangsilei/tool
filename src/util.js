/*************************************************************
 *
 * 工具方法模块
 * 
 *************************************************************/

'use strict';

/**
 * 时间格式化 added
 * @param  {String} format  时间格式：年=yyyy，月=MM，日=dd，时=HH，分=mm，秒=ss
 * @param  {number} [timestamp] 时间戳，默认当前时间
 * @return {String} 格式化后的时间字符串
 * @description format可以随意组合，例如：2017-01-01 13:13:13 => yyyy-MM-dd HH:mm:ss
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

/**
 * 数据校验，验证数据的合法性  added
 * @return {Boolean} 是否合法
 */
var validate = {
	input: function(str) { // 输入框
		return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str); // 只有中文、数字、字母和下划线，且位置不限
	},
	mobile: function(str) { // 手机号
		return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
	},
	code: function(str, num) { // 数字验证码，默认四位数 
		if (num && typeof num == 'number') {
			return new RegExp('^\\d{' + num + '}$').test(str);
		} else {
			return /^\d{4}$/.test(str);
		}
	},
	email: function(str) { // 邮箱
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
	}
}

module.exports = {
	dateFormat: dateFormat,
	validate: validate
};
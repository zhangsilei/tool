/*************************************************************
 *
 * 工具方法模块
 * 
 *************************************************************/

/**
 * 过滤空格
 * @param  {String} str 要过滤的字符串
 * @return {String}     过滤后的字符串
 */
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 时间格式化
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
 * 获取请求url的参数
 * @param {String} name URL后缀的参数名
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	// if (r != null) return unescape(r[2]);
	// return null;
	if (r != null) return r[2];
	return null;
}

/**
 * 数据校验，验证数据的合法性
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

/**
 * 判断终端的类型
 * @return {boolean} 选定终端类型的布尔值
 * @description 调用方式：browser.versions.webKit
 */
var browser = {
	versions: function() {
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
			wechat: u.match(/MicroMessenger/i), // 是否微信打开
			alipay: u.match(/AliApp/i) // 是否支付宝打开
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

module.exports = {
	trim: trim,
	dateFormat: dateFormat,
	getQueryString: getQueryString,
	validate: validate,
	browserVersion: browser.versions
};
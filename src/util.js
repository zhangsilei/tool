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
 * @param  {String} dateType  时间格式：年=yyyy，月=MM，日=dd，时=HH，分=mm，秒=ss
 * @param  {number} [timestamp] 时间戳，默认当前时间
 * @return {String} 格式化后的时间字符串
 * @description dateType可以随意组合，例如：2017-01-01 13:13:13 => yyyy-MM-dd HH:mm:ss
 */
function dateFormat(dateType, timestamp) {
	if (dateType && typeof dateType == 'string') {
		if (dateType.match(/y{4}/g)) { // 年

		}
		if (dateType.match(/M{2}/g)) { // 月

		}
		if (dateType.match(/d{2}/g)) { // 日

		}
		if (dateType.match(/H{2}/g)) { // 时

		}
		if (dateType.match(/m{2}/g)) { // 分

		}
		if (dateType.match(/s{2}/g)) { // 秒

		}
		// if (timestamp && typeof timestamp == 'number') {

		// }
	}
}

module.exports.trim = trim;
module.exports.dateFormat = dateFormat;
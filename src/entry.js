// tool.js是个关注DOM的框架，不过度封装，旨在提高性能效率
// 模块间可以相互调用，以提高效率，但这样的话就要保证每个模块的正确性。
// 写完before就先写那些好封装的方法如：attr，text。。
// 框架和原生js的分离 
// module：DOM、CSS、AJAX、Attribute、Event 
// 原生js获取兄弟节点，滚动分页

/*************************************************************
 *
 * 打包入口文件，负责各个模块间的整合。
 * 
 *************************************************************/
;
(function() {
	var dom = require('./dom');
	var util = require('./util');
	var storage = require('./storage');
	// 选择器
	window.$ = dom.ele;
	// 工具方法
	window.$.trim = util.trim;
	window.$.dateFormat = util.dateFormat;
	window.$.getQueryString = util.getQueryString;
	window.$.validate = util.validate;
	window.$.browserVersion = util.browserVersion;
	// 本地存储
	window.$.getCookie = storage.getCookie;
	window.$.setCookie = storage.setCookie;
})();
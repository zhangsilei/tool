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
	var dom = require('./dom'),
		util = require('./util'),
		ToolElement = dom.ToolElement;
	// 将选择器挂载到全局变量$下
	window.$ = dom.ele;
	// 将工具方法挂载到全局变量$下
	window.$.trim = util.trim;
	window.$.dateFormat = util.dateFormat;

	// 创建tool对象，并挂载到全局下
	// window.tool = {
	// 	ele: dom.ele, // 注册DOM选择器  
	// 	trim: util.trim // 注册工具模块
	// }
})();
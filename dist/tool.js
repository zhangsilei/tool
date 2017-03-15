/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
		var date = timestamp && typeof timestamp == 'number' ? new Date(timestamp) : new Date(),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
		if (dateType.match(/y{4}/g)) { // 年
			dateType = dateType.replace(/y{4}/g, year);
		}
		if (dateType.match(/M{2}/g)) { // 月
			dateType = dateType.replace(/M{2}/g, month < 10 ? '0' + month : month);
		}
		if (dateType.match(/d{2}/g)) { // 日
			dateType = dateType.replace(/d{2}/g, day < 10 ? '0' + day : day);
		}
		if (dateType.match(/H{2}/g)) { // 时
			dateType = dateType.replace(/H{2}/g, hour < 10 ? '0' + hour : hour);
		}
		if (dateType.match(/m{2}/g)) { // 分
			dateType = dateType.replace(/m{2}/g, min < 10 ? '0' + min : min);
		}
		if (dateType.match(/s{2}/g)) { // 秒
			dateType = dateType.replace(/s{2}/g, sec < 10 ? '0' + sec : sec);
		}
	}
	return dateType;
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
			webApp: u.indexOf('Safari') == -1 //是否web应用程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

module.exports.trim = trim;
module.exports.dateFormat = dateFormat;
module.exports.getQueryString = getQueryString;
module.exports.validate = validate;
module.exports.browserVersion = browser.versions;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************
 *
 * 节点选择器，tool.js的入口方法
 * 该方法关注DOM查询，并将查询到的结果包装成tool对象并返回。
 * 
 ***********************************************************/

var util = __webpack_require__(0);

// 所有html标签    
var htmlTagNames = [
    'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio',
    'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command',
    'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt',
    'em', 'embed',
    'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins',
    'kbd', 'keygen',
    'label', 'legend', 'li', 'link',
    'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter',
    'nav', 'noframes', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output',
    'p', 'param', 'pre', 'progress',
    'q',
    'rp', 'rt', 'ruby',
    's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup',
    'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt',
    'u', 'ul',
    'var', 'video',
    'wbr'
];

/**
 * 节点查询
 * @param  {String} eleKey 可查询的key包括：id/class/name/tag
 * @return {ToolElement}   包装了属性和方法的tool对象    
 */
function ele(eleKey) {
    /**
     * 遍历查询节点   
     * @param  {String} queryKey  根据哪种方式查询节点：class/name/tag
     * @return {ToolElement}  tool对象    
     * @description 目前查询器的效率低于jQuery3~4倍左右(10w级的节点数查询)，暂时无优化思路。。瓶颈。。   
     */
    function _traverse(queryKey) {
        var allEles = document.getElementsByTagName('*'),
            elesArr = [];
        for (var i = 0, len = allEles.length; i < len; i++) {
            var temp = allEles[i];
            if (queryKey == 'class' || queryKey == 'name') {
                var attrValue = temp.getAttribute(queryKey);
                if (attrValue) {
                    if (String(attrValue).indexOf(eleKeySub) != -1) {
                        elesArr[elesArr.length] = temp;
                    }
                }
            } else if (queryKey == 'tag') {
                if (temp.nodeName == eleKey.toUpperCase()) {
                    elesArr[elesArr.length] = temp;
                }
            }
        }
        return _pack(elesArr);
    }
    if (eleKey && typeof eleKey == 'string') {
        if (util.trim(eleKey)) { // 选择器
            var eleKeySub = eleKey.slice(1),
                sign = eleKey[0];

            if (sign == '#') { // id

                var result = document.getElementById(eleKeySub);
                return result ? _pack([result]) : null;

            } else if (sign == '.') { //class 

                return _traverse('class');

            } else if (sign == '~') { // name

                return _traverse('name');

            } else { // tag 

                return _traverse('tag');

            }
        } else { // 节点
            return null;
        }
    } else if (eleKey && typeof eleKey == 'object') {
        return _pack(eleKey);
    }
}


/*************************************************************
 *
 * dom.js内部公共方法，只在dom.js内使用。
 * 
 *************************************************************/

/**
 * 将原生节点封装成ToolElement
 * @param  {Array} nodes 原生节点集，可以为空数组。
 * @return {ToolElement} tool对象
 */
function _pack(nodes) {
    if (typeof nodes == 'object' && nodes instanceof Array) {
        return new ToolElement(nodes);
    } else {
        console.warn('_pack()方法入参必须为数组');
    }
}

/**
 * 插入节点
 * @param {Element} parent 当前节点的原生父节点
 * @param  {String}  str    新节点名称
 * @param  {Element}  ele    新元素添加在该元素前  
 */
function _insertBefore(parent, str, ele) {
    parent.insertBefore(document.createTextNode(str), ele);
}

/**
 * 追加节点
 * @param  {Element} parent 当前节点的原生父节点
 * @param  {String} str    新节点的名称
 */
function _appendChild(parent, str) {
    parent.appendChild(document.createTextNode(str));
}

/**
 * 获得/设置节点的html/text 
 * @param  {String} type 操作类型：html：操作元素的html，text：操作元素的text
 * @param  {String} str  要设置的内容值
 * @param  {Array} nodes 原生节点集
 * @return {Array/ToolElement}      get操作时返回字符串数组，set时返回tool对象
 */
function _htmlAndText(type, str, nodes) {
    var result = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (!str && str != '') {
            result[result.length] = type == 'html' ? nodes[i].innerHTML : nodes[i].innerText;
        } else {
            type == 'html' ? nodes[i].innerHTML = str : nodes[i].innerText = str;
            result.push(nodes[i]);
        }
    }
    return (typeof result[0] == 'object') ? _pack(result) : result; // 是节点才包装成对象 
}

/**
 * 在当前节点的前/后插入新的内容
 * @param  {String} type 操作类型：before：在之前插入，after：在之后插入
 * @param  {String} str  要插入的内容
 * @param  {Element} node 原生节点
 * @return {ToolElement}      tool对象
 */
function _beforeAndAfter(type, str, node) {
    var parent = node.parentNode,
        charStart = -1,
        charEnd = -1,
        nextNode = _pack([node]).next();
    if (!str && typeof str == 'undefined') {
        return;
    } else {
        if (util.trim(str) == '') {
            return;
        } else {
            if (str.indexOf('<') != -1 && str.indexOf('>') != -1) { // str is a text
                for (var i = 0, len = str.length; i < len; i++) {
                    var tempChar = str[i];
                    if (tempChar == '<') {
                        // create newText    
                        type == 'before' ? _insertBefore(parent, str.slice(0, i), node) : !nextNode ? _appendChild(parent, str.slice(0, i)) : _insertBefore(parent, str.slice(0, i), nextNode.node[0]);
                        charStart = i;
                    } else if (tempChar == '>') {
                        charEnd = i;
                        // create newNode        
                        var tagName = str.slice(charStart + 1, charEnd),
                            tagEnd = str.indexOf('</' + tagName + '>'),
                            newNode = document.createElement(tagName);
                        newNode.innerHTML = str.slice(charEnd + 1, tagEnd);
                        type == 'before' ? parent.insertBefore(newNode, node) : !nextNode ? parent.appendChild(newNode) : parent.insertBefore(newNode, nextNode.node[0]);
                        // reset str
                        str = str.slice(tagEnd + tagName.length + 3, str.length);
                        i = 0;
                        len = str.length;
                        // create last newText    
                        if (str.indexOf('<') == -1) {
                            type == 'before' ? _insertBefore(parent, str, node) : !nextNode ? _appendChild(parent, str) : _insertBefore(parent, str, nextNode.node[0]);
                        }
                    }
                }
            } else { // str has tag
                type == 'before' ? _insertBefore(parent, str, node) : !nextNode ? _appendChild(parent, str) : _insertBefore(parent, str, nextNode.node[0]);
            }
        }
    }
}

function _prevAndNext(type, nodes) {
    var result = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];
        while (node = type == 'prev' ? node.previousSibling : node.nextSibling) {
            if (node.nodeType == 1) {
                result.push(node);
                break;
            }
        }
    }
    return _pack(result);
}

/*************************************************************
 *
 * ToolElement节点对象封装 
 * 
 *************************************************************/

/**
 * ToolElement节点对象封装 
 * @param {Array} nodes 原生节点集，可以为空数组。
 * @description 所有的属性和方法都写在这里面，构造的时候只需传入选择器拿到的原生节点集。
 *              若想获取原生节点集，只需toolElement.node即可。
 *              若想获取某个原生节点，只需toolElement.get(ind)即可。
 * @return {ToolElement} tool对象
 */
function ToolElement(nodes) {
    // 原生节点集，可以为空数组。
    this.node = nodes;

    /************************************************************
     * 节点相关操作
     ***********************************************************/

    // 根据索引获取原生节点
    this.get = function(ind) {
        return nodes[ind];
    };

    this.each = function(cb) {
        var nodes = this.node;
        for (var i = 0, len = nodes.length; i < len; i++) {
            cb.call(nodes[i], i, nodes[i]);
        }
    };

    // 获取上一个节点
    this.prev = function() {
        return _prevAndNext('prev', nodes);
    };

    // 获取下一个节点
    this.next = function() {
        return _prevAndNext('next', nodes);
    };

    // 获取指定节点
    this.eq = function(ind) {
        return _pack([nodes[ind]]);
    };

    // 删除当前节点 
    this.remove = function() {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            node.parentNode.removeChild(node);
        }
    };

    // 清空当前节点
    this.empty = function() {
        return this.html('');
    };

    /**
     * 在当前节点之前插入内容，支持生成自定义标签
     * @param {String} 插入的内容
     * @return {ToolElement} ToolElement对象
     */
    this.before = function(str) {
        this.each(function(ind, node) {
            _beforeAndAfter('before', str, node);
        });
        return _pack(nodes);
    };

    /**
     * 在当前节点之后插入内容，支持生成自定义标签
     * @param  {String} str 插入的内容   
     * @return {ToolElement}     ToolElement对象 
     */
    this.after = function(str) {
        this.each(function(ind, node) {
            _beforeAndAfter('after', str, node);
        });
        return _pack(nodes);
    };

    /**
     * 获取/修改当前节点的html
     * @param  {String} [str] 要修改成的html
     */
    this.html = function(str) {
        return _htmlAndText('html', str, nodes);
    };

    /**
     * 获取/修改当前节点text
     * @param  {String} [str] 要修改成的text
     */
    this.text = function(str) {
        return _htmlAndText('text', str, nodes);
    };

    /************************************************************
     * 属性相关操作
     ***********************************************************/

    this.attr = function() {

    };
}

module.exports.ele = ele;
module.exports.ToolElement = ToolElement;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*************************************************************
 *
 * 本地存储模块
 * 
 *************************************************************/

var storage = {
    /**
     * 读取Cookie
     * @param  {String} cname Cookie的key
     * @return {String} Cookie的value
     */
    getCookie: function(cname) {
        var cvalue = "",
            cookies = document.cookie;
        if (cookies.length > 0) { // 有cookie
            var search = cname + "=",
                start = cookies.indexOf(search);
            if (start != -1) { // 有名字为cname的cookie
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
    }
}

module.exports.getCookie = storage.getCookie;
module.exports.setCookie = storage.setCookie;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
	var dom = __webpack_require__(1);
	var util = __webpack_require__(0);
	var storage = __webpack_require__(2);
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

/***/ })
/******/ ]);
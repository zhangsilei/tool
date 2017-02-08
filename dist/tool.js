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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/************************************************************
 *
 * 节点选择器，tool.js的入口方法
 * 该方法关注DOM查询，并将查询到的结果包装成tool对象并返回。
 * 
 ***********************************************************/

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
     * @return {ToolElement/ToolElements}  tool对象    
     * @description 目前查询器的效率低于jQuery3~4倍左右(10w级的节点数查询)，暂时无优化思路。。瓶颈。。   
     */
    function traverse(queryKey) {
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
        return pack(elesArr);
    }

    if (eleKey) {
        var eleKeySub = eleKey.slice(1),
            sign = eleKey[0];

        if (sign == '#') { // id

            var result = document.getElementById(eleKeySub);
            return result ? pack([result]) : null;

        } else if (sign == '.') { //class 

            return traverse('class');

        } else if (sign == '~') { // name

            return traverse('name');

        } else { // tag 

            return traverse('tag');

        }
    } else {
        return null;
    }
}


/*************************************************************
 *
 * dom.js内部公共方法，只在dom.js内使用。
 * 
 *************************************************************/

/**
 * 将原生节点封装成ToolElement
 * @param  {Element} node 原生节点
 * @return {ToolElement}      ToolElement对象
 */
function pack(nodes) {
    // console.log(nodes)
    // var toolElements = [];
    // for (var i = 0, len = nodes.length; i < len; i++) {
    //     toolElements.push(nodes[i]);
    // }
    return new ToolElement(nodes);
    // return new ToolElement(toolElements);
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
function htmlAndText(type, str, nodes) {
    var result = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (!str && str != '') {
            result[result.length] = type == 'html' ? nodes[i].innerHTML : nodes[i].innerText;
        } else {
            type == 'html' ? nodes[i].innerHTML = str : nodes[i].innerText = str;
            result.push(nodes[i]);
        }
    }
    return (typeof result[0] == 'object') ? pack(result) : result; // 是节点才包装成对象 
}

/**
 * 在当前节点的前/后插入新的内容
 * @param  {String} type 操作类型：before：在之前插入，after：在之后插入
 * @param  {String} str  要插入的内容
 * @param  {Element} node 原生节点
 * @return {ToolElement}      tool对象
 */
function beforeAndAfter(type, str, node) {
    var parent = node.parentNode,
        charStart = -1,
        charEnd = -1,
        nextNode = pack([node]).next();
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

function prevAndNext(type, nodes) {
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
    return pack(result);
}

/*************************************************************
 *
 * toolElement节点
 * 
 *************************************************************/

/**
 * tool对象封装 
 * @param {Array} nodes 原生节点集
 * @description 所有的属性和方法都写在这里面，构造的时候只需传入选择器拿到的原生节点集。
 *              若想获取原生节点集，只需toolElement.node即可。
 * @return {ToolElement} 将传入的节点数组包装成对象返回
 */
function ToolElement(nodes) {
    this.node = nodes;

    //////////////// 遍历节点 ////////////////  

    this.each = function(nodes, callback) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            callback(nodes[i]);
        }
    };

    //////////////// 获取节点 ////////////////  

    // 获取上一个节点
    this.prev = function() {
        return prevAndNext('prev', nodes);
    };

    // 获取下一个节点
    this.next = function() {
        return prevAndNext('next', nodes);
    };

    // 获取指定节点
    this.eq = function() {

    };

    //////////////// 删除节点 //////////////// 

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

    //////////////// 增加节点 ////////////////

    /**
     * 在当前节点之前插入内容，支持生成自定义标签
     * @param {String} 插入的内容
     * @return {ToolElement} ToolElement对象
     */
    this.before = function(str) {
        this.each(nodes, function(node) {
            beforeAndAfter('before', str, node);
        });
        return pack(nodes);
    };

    /**
     * 在当前节点之后插入内容，支持生成自定义标签
     * @param  {String} str 插入的内容   
     * @return {ToolElement}     ToolElement对象 
     */
    this.after = function(str) {
        this.each(nodes, function(node) {
            beforeAndAfter('after', str, node);
        });
        return pack(nodes);
    };

    //////////////// 修改节点 ////////////////
    /**
     * 获取/修改当前节点的html
     * @param  {String} [str] 要修改成的html
     */
    this.html = function(str) {
        return htmlAndText('html', str, nodes);
    };

    /**
     * 获取/修改当前节点text
     * @param  {String} [str] 要修改成的text
     */
    this.text = function(str) {
        return htmlAndText('text', str, nodes);
    };
}

function ToolElements(toolEles) {
    // this.
}

module.exports.ele = ele;

/***/ }),
/* 1 */
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

module.exports.trim = trim;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// tool.js是个关注DOM的框架，不过度封装，旨在提高性能效率
// 模块间可以相互调用，以提高效率，但这样的话就要保证每个模块的正确性。
// 写完before就先写那些好封装的方法如：attr，text。。
// 框架和原生js的分离 
// module：DOM、CSS、AJAX、Attribute、Event 
// 原生js获取兄弟节点，滚动分页

/*************************************************************
 *
 * 打包入口文件
 * 
 *************************************************************/
(function() {
	var dom = __webpack_require__(0),
		util = __webpack_require__(1);

	// 创建tool对象，并挂载到全局下
	window.tool = {
		ele: dom.ele, // 注册DOM选择器  
		trim: util.trim // 注册工具模块
	}
})();

/***/ })
/******/ ]);
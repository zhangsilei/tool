// tool.js是个关注DOM的框架，不过度封装，旨在提高性能效率
// 模块间可以相互调用，以提高效率，但这样的话就要保证每个模块的正确性。
// 写完before就先写那些好封装的方法如：attr，text。。
// 框架和原生js的分离 
// module：DOM、CSS、AJAX、Attribute、Event 

// 原生js获取兄弟节点，滚动分页

(function() {

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
	 * tool对象封装 
	 * @param {Element} node 原生节点
	 * @description 所有的属性和方法都写在这里面，构造的时候只需传入当前原生节点。
	 *              若想获取原生节点，只需toolElement.node即可。
	 */
	function ToolElement(node) {
		this.node = node;

		//////////////// 获取节点 ////////////////  

		// 获取上一个节点
		this.prev = function() {
			var result;
			while (node = node.previousSibling) {
				result = (node.nodeType == 1) ? pack(node) : null;
			}
			return result;
		};

		// 获取下一个节点
		this.next = function() {
			var result;
			while (node = node.nextSibling) {
				result = (node.nodeType == 1) ? pack(node) : null;
			}
			return result;
		};

		//////////////// 删除节点 //////////////// 

		// 删除当前节点 
		this.remove = function() {
			node.parentNode.removeChild(node);
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
			return beforeAndAfter('before', str, node);
		};

		/**
		 * 在当前节点之后插入内容，支持生成自定义标签
		 * @param  {String} str 插入的内容   
		 * @return {ToolElement}     ToolElement对象 
		 */
		this.after = function(str) {
			return beforeAndAfter('after', str, node);
		};

		//////////////// 修改节点 ////////////////

		/**
		 * 获取/修改当前节点的html
		 * @param  {String} str [可选，要修改的html]
		 */
		this.html = function(str) {
			return htmlAndText('html', str, node);
		};

		/**
		 * 获取/修改当前节点text
		 * @param  {String} str [可选，要修改的text]
		 */
		this.text = function(str) {
			return htmlAndText('text', str, node);
		};

		function attr(str) {

		}
	}

	/************************************************************
	 *
	 * 节点选择器，tool.js的入口方法
	 * 该方法关注DOM查询，并将查询到的结果包装成tool对象并返回。
	 * 
	 ***********************************************************/

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
		 */
		function traverse(queryKey) {
			var allEles = document.getElementsByTagName('*'),
				elesArr = [];
			for (var i = 0, len = allEles.length; i < len; i++) {
				var temp = allEles[i];
				if (queryKey == 'class' || queryKey == 'name') {
					// if (new String(temp.getAttribute(queryKey)).indexOf(eleKeySub) != -1) {
					// 	elesArr.push(temp);
					// }
					var attrValue = temp.getAttribute(queryKey);
					if (attrValue) {
						if (String(attrValue).indexOf(eleKeySub) != -1) {
							elesArr[elesArr.length] = temp;
						}
					}
				} else if (queryKey == 'tag') {
					// if (temp.nodeName.toUpperCase().indexOf(eleKey.toUpperCase()) != -1) { 
					// 	elesArr.push(temp);
					// }
				}
			}
			for (var i = 0, len = elesArr.length; i < len; i++) {
				elesArr[i] = pack(elesArr[i]);
			}
			return elesArr;
		}

		if (eleKey != '' && eleKey != null) {
			var eleKeySub = eleKey.slice(1);

			if (eleKey.indexOf('#') != -1) { // id

				var result = document.getElementById(eleKeySub);
				return result ? pack(result) : null;

			} else if (eleKey.indexOf('.') != -1) { //class	

				return traverse('class');

			} else if (eleKey.indexOf('~') != -1) { // name

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

	// 创建tool对象，并挂载到全局下
	window.tool = {};
	tool.ele = ele; // 注册DOM选择器 
	tool.trim = trim; // 注册工具模块

	/*************************************************************
	 *
	 * tool.js内部公共方法，只在tool.js内使用。
	 * 
	 *************************************************************/

	/**
	 * 将原生节点封装成ToolElement
	 * @param  {Element} node 原生节点
	 * @return {ToolElement}      ToolElement对象
	 */
	function pack(node) {
		return new ToolElement(node);
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
	 * @param  {Element} node 原生节点
	 * @return {String/ToolElement}      get操作时返回字符串，set时返回tool对象
	 */
	function htmlAndText(type, str, node) {
		if (!str && str != '') {
			return type == 'html' ? node.innerHTML : node.innerText;
		} else {
			type == 'html' ? node.innerHTML = str : node.innerText = str;
			return pack(node);
		}
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
			nextNode = pack(node).next();
		for (var i = 0, len = str.length; i < len; i++) {
			var tempChar = str[i];
			if (tempChar == '<') {
				// create newText  
				type == 'before' ? _insertBefore(parent, str.slice(0, i), node) : !nextNode ? _appendChild(parent, str.slice(0, i)) : _insertBefore(parent, str.slice(0, i), nextNode.node);
				charStart = i;
			}
			if (tempChar == '>') {
				charEnd = i;
				// create newNode        
				var tagName = str.slice(charStart + 1, charEnd),
					tagEnd = str.indexOf('</' + tagName + '>'),
					newNode = document.createElement(tagName);
				newNode.innerHTML = str.slice(charEnd + 1, tagEnd);
				type == 'before' ? parent.insertBefore(newNode, node) : !nextNode ? parent.appendChild(newNode) : parent.insertBefore(newNode, nextNode.node);
				// reset str
				str = str.slice(tagEnd + tagName.length + 3, str.length);
				i = 0;
				len = str.length;
				// create last newText    
				if (str.indexOf('<') == -1) {
					type == 'before' ? _insertBefore(parent, str, node) : !nextNode ? _appendChild(parent, str) : _insertBefore(parent, str, nextNode.node);
				}
			}
		}
		return pack(node);
	}

})();
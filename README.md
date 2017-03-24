## tool.js Beta

### Beta版本说明：

    暂未经过严谨测试，目前处于开发版，会不定期更新。

### 一、说明

#### 简介：

1. tool.js是一个关注JavaScript工具方法的框架，与其说是框架不如说是个类库。里面集成了很多通用的工具函数，比如storage、dateFormat、validate等，方便调用，让开发人员更专注业务逻辑的编写。tool.js本身支持DOM选择器以及常用的DOM处理方法，调用方式同jQuery，所有DOM相关的api皆与jQuery相同，减少学习成本。如果你用过jQuery，保证两分钟就上手。tool.js的命名空间也是`$`，如果你已经引入了jQuery，会自动转为`tool`。

2. 兼容性：暂未测试

3. 目前支持的api如下：  

    **DOM选择器** (以下所说的节点都是经过封装的toolElement，非原生)：  
    - `$(str) => str: '.class', '#id' , 'tag' , '~name'` 获取节点 (多加了name属性) 
    - `prev()` 获取上个节点
    - `next()` 获取下个节点
    - `eq(i) => i: 索引值` 获取指定节点
    - `get(i) => i: 索引值` 获取指定原生节点
    - `node` 这是个属性，直接调用，获取当前toolElements的所有原生节点  
      
    **DOM处理**：  
    - `remove()` 移除当前节点
    - `empty()` 清空当前节点
    - `before(str) => str: html字符串` 在当前节点前插入新节点
    - `after(str) => str: html字符串` 在当前节点后插入新节点
    - `html([str]) => str: html字符串` 获取/设置当前节点html
    - `text([str]) => str: 字符串` 获取/设置当前节点文本内容
     
    **本地存储**：  
  	- `getCookie(key) => key: cookie的键` 获取cookie  
  	- `setCookie(key, val, expires) => key: 键 , val: 值 , expires: 存活时间` 设置cookie
  	**日期**：  
  	- `dateFormat(format, timestamp) => format: 格式字符串 , timestamp: 时间戳` 格式化日期 (yyyy＝年，MM＝月，dd＝日，HH＝时，mm＝分，ss＝秒)  
  	**字符串**：
  	- `trim(str) => str: 字符串` 去空格
  	**浏览器**：
  	- `getQueryString(name) => name: 参数名` 获取地址栏参数
  	- `browserVersion.name => name: trident=IE内核 , presto=opera内核 , webKit=苹果、谷歌内核 , gecko=火狐内核 , mobile=移动终端 , ios=ios终端 , android=android终端或者uc浏览器 , iPhone=iPhone或者QQHD浏览器 , iPad=iPad终端 , webApp=web应用程序 , wechat=微信 , alipay=支付宝 ` 判断终端类型
  	**数据校验**：
  	- `validate.name => name: input=只有中文、数字、字母和下划线，且位置不限 , mobile=手机号 , code(n)=n位数字验证码 , email=邮箱`

### 二、使用说明

1. 获取 tool.js：[直接下载](https://github.com/DreamOn324/tool/archive/v0.1.zip)

2. 引入 tool.js  
    ```
    <script src="/path/tool.js"></script>  
    或  
    <script src="/path/tool.min.js"></script>
    ```    
    
3. 当已经引入jQuery时，使用tool代替$命名空间
    
    
    
    
      
      
      
      

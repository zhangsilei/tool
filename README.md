## tool.js Beta

### Beta版本说明：

    暂未经过严谨测试，目前处于开发版，会不定期更新。

### 一、说明

#### 简介：

1. tool.js是一个关注JavaScript工具方法的框架，与其说是框架不如说是个类库。里面集成了很多通用的工具函数，比如storage、dateFormat、validate等，方便调用，让开发人员更专注业务逻辑的编写。tool.js本身支持DOM选择器以及常用的DOM处理方法，调用方式同jQuery，所有DOM相关的api皆与jQuery相同，减少学习成本。如果你用过jQuery，保证两分钟就上手。tool.js的命名空间也是`$`，如果你已经引入了jQuery，会自动转为`tool`。

2. 兼容性：暂未测试

3. 目前支持的模块如下：  

    **DOM**：dom选择器、dom节点处理。
    	
    **本地存储**：cookie、localStorage增删改查操作。
    
    **浏览器**：ua判断、地址栏相关操作。
    
    **数组加强**：添加常用数组方法。
    
    **工具**：数据校验、去空格、日期格式化。
    
4. 详细的api文档[戳我](https://github.com/DreamOn324/tool/out/index.html)
### 二、使用说明

1. 获取 tool.js：[直接下载](https://github.com/DreamOn324/tool/archive/v0.1.zip)

2. 引入 tool.js  
    ```
    <script src="/path/tool.js"></script>  
    或  
    <script src="/path/tool.min.js"></script>
    ```    
    
3. 当已经引入jQuery时，使用tool代替$命名空间
    
    
    
    
      
      
      
      

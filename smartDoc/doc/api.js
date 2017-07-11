YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Array",
        "BOM",
        "DOM",
        "Storage",
        "Util"
    ],
    "modules": [
        "API 增强",
        "工具方法"
    ],
    "allModules": [
        {
            "displayName": "API 增强",
            "name": "API 增强",
            "description": "增加常用方法挂载到JS原型链上，以拓展原生JS功能。",
            "classes": [
                {
                    "name": "Array"
                },
                {
                    "name": "Storage"
                }
            ]
        },
        {
            "displayName": "工具方法",
            "name": "工具方法",
            "description": "增加常用业务工具方法，以提高通用业务的开发效率。",
            "classes": [
                {
                    "name": "BOM"
                },
                {
                    "name": "DOM"
                },
                {
                    "name": "Util"
                }
            ]
        }
    ]
} };
});
/*************************************************************
 *
 * 测试中的方法、类、对象都会放在这里面，并且不对外露出
 * 可以在控制台查看，相当于一个测试中的环境。
 * @description 暂时不引入单元测试框架，先手动测试，有问题的直接不露出
 * 
 * demo: // 添加测试中的方法
    test.init([{
        targetObj: 'Array',
        funcName: 'removeDuplicate'
    }]);

 *************************************************************/

'use strict';

(function(w) {
    var test = {
        queue: [], // 测试队列

        init: function(obj) {
            this.pushQueue(obj);
            console.log(w.test);
        },

        pushQueue: function(obj) {
            if (!w.test) {
                w.test = this;
            }
            this.queue.push(obj);
        },

        deleteUnit: function(obj) {
            var targetObj = obj.targetObj,
                funcName = obj.funcName;
            switch (targetObj.toLowerCase()) {
                case 'array':
                    delete Array.prototype[funcName];
                    break;
                default:
                    break;
            }
        }
    }

    module.exports = test;
})(window);
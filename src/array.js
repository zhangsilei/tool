/*************************************************************
 *
 * 数组处理模块
 * 为了考虑调用方便和代码整洁性，会在原生JavaScript上修改原型链
 * 
 *************************************************************/

'use strict';

var string = require('./string');

var array = {
    init: function() {
        this.addPrototype();
    },

    /**
     * 向Array原型链中添加新方法
     */
    addPrototype: function() {
        /**
         * 删除并返回数组的指定位置元素
         * 该方法直接改变原数组
         * @param  {Number} ind 数组元素索引
         * @return {any}        被删除的数组元素
         */
        Array.prototype.deleteOf = function(ind) {
            var deleted = this[ind];
            this.splice(ind, 1);
            return deleted;
        };

        /**
         * 删除并返数组的指定值元素
         * 该方法直接改变原数组
         * @param  {any}    val   数组元素的值
         * @param  {Number} [num] 删除的元素个数，默认全部删除
         * @return {any}          被删除的数组元素
         */
        Array.prototype.deleteVal = function(val, num) {
            var count = 0,
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (count < num) {
                    if (temp == val) {
                        if (i == len - 1) {
                            return this.deleteOf(i);
                        } else {
                            this.deleteOf(i);
                            count++;
                            continue;
                        }
                    }
                }
            }
        };

        /**
         * 向数组中的指定位置插入元素，并返回新的长度
         * 该方法直接改变原数组
         * @param {Number} ind 索引值
         * @param {Number} val 元素值
         * @return {Number} 新数组长度
         */
        Array.prototype.pushOf = function(ind, val) {
            this.splice(ind, 0, val).length;
            return this.length;
        };

        /**
         * 替换数组中指定值的元素，并返回新数组
         * 该方法不会改变原数组
         * @param  {any}    val    本元素值 
         * @param  {any}    newVal 新元素值
         * @param  {Number} [num]  替换的元素个数，默认替换全部
         */
        Array.prototype.replace = function(val, newVal, num) {
            var result = [],
                count = 0,
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (count < num) {
                    if (temp == val) {
                        result.push(newVal);
                        count++;
                        continue;
                    }
                }
                result.push(temp);
            }
            return result;
        };

        /**
         * 数组去重，并返回新数组
         * 该方法不改变原数组
         * @param  {Number} ind   从第几个重复元素开始删除
         * @param  {Number} [num] 删除的元素数量，默认全部删除
         */
        Array.prototype.removeDuplicate = function(ind, num) {
            var obj = {},
                count = 0,
                indexs = [],
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (!obj[temp]) {
                    obj[temp] = i;
                } else {
                    indexs.push(obj[temp]);
                    indexs.push(i);
                }
            }
            for (var j = 0, len = indexs.length; j < len; j++) {
                if (count < num) {
                    this.deleteOf(indexs[j] - count);
                    count++;
                }
            }
        };

        /**
         * 数组去空串，并返回新数组 
         * 该方法不会改变原数组
         * @param  {Number} [num] 删除的空串数量
         * @return {Array}        新数组
         */
        Array.prototype.trim = function(num) {
            return _trim(num, '', this);
        };

        /**
         * 数组去null值，并返回新数组 
         * 该方法不会改变原数组
         * @param  {Number} [num] 删除的空串数量
         * @return {Array}        新数组
         */
        Array.prototype.removeNull = function(num) {
            return _trim(num, null, this);
        };
    }
}

/**
 * 数组去空串/null值，并返回新数组 
 * 该方法不会改变原数组
 * @param  {Number} [num] 删除的空串数量
 * @return {Array}        新数组
 */
function _trim(num, str, that) {
    var count = 0, // 去除的空串数
        result = [],
        num = num || that.length;
    for (var i = 0, len = that.length; i < len; i++) {
        var temp = that[i],
            val = str == null ? str : string.trim(str);
        console.log(val)
        if (val != str) {
            result.push(temp);
        } else {
            if (count < num) {
                count++;
            } else {
                result.push(temp);
            }
        }
    }
    return result;
}

array.init();

module.exports.array = array;
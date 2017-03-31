/*************************************************************
 *
 * 数组处理模块
 * 为了考虑调用方便和代码整洁性，会在原生JavaScript上修改原型链
 * 
 *************************************************************/

'use strict';

var array = {
    init: function() {
        this.resetPrototype();
    },

    /**
     * 向Array原型链中添加新方法
     */
    resetPrototype: function() {
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
         * @param  {any} val 数组元素的值
         * @return {any}     被删除的数组元素
         */
        Array.prototype.deleteVal = function(val) {
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (temp == val) {
                    return this.deleteOf(i);
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
        Array.prototype.addOf = function(ind, val) {
            this.splice(ind, 0, val).length;
            return this.length;
        };

        /**
         * 替换数组中指定值的元素， 并返回新数组
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
                    result.push(temp == val ? newVal : temp);
                } else {
                    result.push(temp);
                }
                count++;
            }
            return result;
        };

        /**
         * 数组去重
         * @param  {Number} ind 从第几个重复元素开始删除
         * @param  {Number} num 删除的元素数量
         */
        Array.prototype.removeRepeat = function(ind, num) {
            var i = 0,
                j = 0,
                len = this.length;
            for (; i < len; i++) {
                for (; j < len; j++) {
                    if (this[j] == this[i]) {

                    }
                }
            }
        };

        // 去空
    }
}

array.init();

module.exports.array = array;
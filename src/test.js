'use strict';

var test = {
    queue: [],
    init: function(objs) {
        for (var i = 0, len = objs.length; i < len; i++) {
            var temp = objs[i];
            this.pushInQueue(temp);
        }
    },
    pushInQueue: function(obj) {
        var targetObj = obj.targetObj,
            funcName = obj.funcName;

    },
    deleteUnit: function(obj) {
        var targetObj = obj.targetObj,
            funcName = obj.funcName;
        switch (targetObj.toLowerCase()) {
            case 'array':
                delete Array.prototype[funcName];
                break;
        }
    }
}

module.exports = test;
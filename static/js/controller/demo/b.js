define(function(require, exports, module) {
    // 引入jquery
    var a = require('./a');

    //return 写法
    // return function(a,b){
    //     return a-b;
    // };

    exports.minus = function(a,b){
        console.log(a-b);
    };

    exports.go = a.add;

});


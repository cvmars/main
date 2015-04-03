define(function(require, exports, module) {

    // 引入jquery
    // var $ = require('jquery');

    //引入a.js
    var a = require('./a');   //相对路径

    //引入b.js
    var b = require('./b');   //相对路径不可写成 require('b');

    //引入c.js
    // var c = require('../demo01/c');  //引入非同级目录

    // //引入d.js
    // var d = require('../demo01/d');   //引入非同级目录

    // var e = require('/static/js/controller/demo/a');   //绝对路径，跟服务器配置相关

    // e.add(1000,2);  //1002

    a.add(10,2);   //12

    b.minus(10,2);   //8

    b.go(100,100);  //200  b中包含a.js

    // c();

    // d();




});

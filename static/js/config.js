// var baseUrl = 'http://static.feiniu.com/static/js-build';
// var version = 20141219;
//if (location.host.indexOf('dev') == 0) {
//     //线上开发
//     baseUrl = 'http://dev.static.feiniu.com/static/js';
//     version = new Date().getTime();
// } else if(location.host.indexOf('preview') == 0) {
//     //预发
//     baseUrl = 'http://preview.static.feiniu.com/static/js-build';
// }

var host = location.host;

// var basePath = "http://static.feiniu.com/static/js/";

// seajs 的简单配置
seajs.config({

  base: typeof(basePath) === "undefined" ?("http://"+host+"/static/js/"):basePath,

  alias: {

    "jquery": "lib/jquery/1.11.1/jquery-1.11.1.js",   //set jquery 类库别名

    "dialog":"widget/dialog-min.js",                  //set dialog 插件库别名

    "dialogPlus":"widget/dialog-plus.js",             //set dialog 插件库别名

    "cookie":"lib/cookie/cookie.js",                  //set cookie 别名

    "url":"lib/url.js",                                    //set url别名

    "template":"lib/template/template.js",                      //set template.js别名

    "draggable":"lib/jquery/jq_custom/1.10.4/jquery-ui-1.10.4.custom.min.js"

  }

});
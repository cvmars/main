/*
。                   _ooOoo_
。                  o8888888o
。                  88" . "88
。                  (| -_- |)
。                  O\  =  /O
。               ____/`---'\____
。             .'  \\|     |//  `.
。            /  \\|||  :  |||//  \
。           /  _||||| -:- |||||-  \
。           |   | \\\  -  /// |   |
。           | \_|  ''\---/''  |   |
。           \  .-\__  `-`  ___/-. /
。         ___`. .'  /--.--\  `. . __
。      ."" '<  `.___\_<|>_/___.'  >'"".
。     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
。     \  \ `-.   \_ __\ /__ _/   .-` /  /
。======`-.____`-.___\_____/___.-`____.-'======
。                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
。         佛祖保佑       永无BUG
*/

/*
 *  @name common.js 几乎所有页面都会依赖的公共方法库
 *  @Copyright feiniu         //版权声明
 *  @Designed @joker.ye       //制作人
 *  @date 2014-12-08           //制作时间
 *  @update 2014-12-08        //最后更新时间
 */

define(function(require, exports, module) {

    // 引入jquery
    var $ = require('jquery');

    //cookie操作
    //jquery $.cookie

    //url 操作
    $.url = require('url');

    //模版引擎操作
    $.tpl = require('template');

    /*
     * @description 加载公共模块函数
     * @param url 异步加载接口地址或者文件路径
     * @param container html容器ID
     * @param replace 是否替换 （true/false）
     * @param init  初始化回调函数 fucntion(){}
     * @param params 参数
     * @date 2014-12-16
     * @update 2014-12-16
     */
    $.loadBlock = function(url, container, replace, init, params) {

        if (!replace) {
            $.get(url, function(data) {
                $("#" + container).append(data, function() {
                    if (typeof init == 'function') {
                        init(params);
                    }
                });
            });
        } else {
            $("#" + container).load(url, function() {
                if (typeof init == 'function') {
                    init(params);
                }
            });
        }

    };

    /*
     * @description 合并两个对象
     * @date 2014-12-16
     * @update 2014-12-16
     */

    $.mix = function() {
        var re = {};
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            for (var p in o) {
                if (p in re) {
                    if (o[p] != undefined) {
                        re[p] = o[p];
                    }
                } else {
                    re[p] = o[p];
                }
            }
        }
        return re;
    };

    /*
     * @description 获取指定url参数
     * @param name : http://www.feiniu.com?app=desktop  =>$.getUrlParam("app")  return "desktop";
     */
    $.getUrlParam = function(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return decodeURIComponent(r[2]);

        return null;

    };

    //批量打印log
    $.log = function() {
        //window._debug_ &&
        if (typeof console == 'object' && console.log) {
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        }
    };

    //ajax 二次封装
    $.xsr = function() {
        var headers = {
            //withCredentials : true
        };
        var timeout = 10000;
        switch (arguments.length) {
            case 1:
                //一个参数的时候
                var mixedRequest = arguments[0];
                if (typeof mixedRequest == 'string') {
                    $.get(mixedRequest);
                } else if (typeof mixedRequest == 'object') {
                    $.ajax({
                        url: mixedRequest.url,
                        type: mixedRequest.method,
                        timeout: mixedRequest.timeout || timeout,
                        dataType: mixedRequest.dataType || 'json',
                        success: mixedRequest.success,
                        error: mixedRequest.error
                    });
                } else {
                    //
                }
                break;
            case 2:
                //两个参数的时候, 第2个参数一定是回到方法
                var mixedRequest = arguments[0],
                    callback = arguments[1];
                if (typeof mixedRequest == 'string' && typeof callback == 'function') {
                    //get请求
                    $.ajax({
                        url: mixedRequest,
                        type: 'get',
                        timeout: timeout,
                        dataType: 'json',
                        success: callback,
                        error: function(xhr, type, error) {
                            callback({
                                errorCode: type.toUpperCase()
                            });
                        }
                    });
                } else if (typeof mixedRequest == 'object' && typeof callback == 'function') {
                    switch (mixedRequest.method) {
                        case 'jsonp':
                            $.ajax({
                                type: 'get',
                                dataType: mixedRequest.dataType || 'jsonp',
                                url: mixedRequest.url,
                                headers: mixedRequest.headers || headers,
                                timeout: mixedRequest.timeout || timeout,
                                success: callback,
                                error: function(xhr, type, error) {
                                    callback({
                                        errorCode: type.toUpperCase()
                                    });
                                }
                            });
                            break;
                        case 'iframePost':
                            //$.iframePost.apply(this, arguments);
                            break;
                        case 'script':
                            var scriptDom = document.createElement('script');
                            document.body.appendChild(scriptDom);
                            var _timeout = setTimeout(function() {
                                document.body.removeChild(scriptDom);
                            }, 10000);
                            scriptDom.onload = function() {
                                clearTimeout(_timeout);
                                try {
                                    callback();
                                } catch (e) {

                                } finally {
                                    document.body.removeChild(scriptDom);
                                }
                            };
                            scriptDom.src = mixedRequest.url;
                            break;
                        default:
                            if (mixedRequest.urlEncodeCharset) {
                                headers['urlEncodeCharset'] = mixedRequest.urlEncodeCharset;
                            }
                            if (mixedRequest.method == 'get') {
                                $.ajax({
                                    type: 'get',
                                    url: mixedRequest.url,
                                    headers: mixedRequest.headers || headers,
                                    timeout: mixedRequest.timeout || timeout,
                                    dataType: mixedRequest.dataType || 'json',
                                    success: callback,
                                    error: function(xhr, type, error) {
                                        callback({
                                            errorCode: type.toUpperCase()
                                        });
                                    },
                                    withCredentials: mixedRequest.cookie == false ? false : true
                                });
                            } else {
                                $.ajax({
                                    url: mixedRequest.url,
                                    type: 'post',
                                    data: mixedRequest.postData,
                                    headers: mixedRequest.headers || headers,
                                    timeout: mixedRequest.timeout || timeout,
                                    dataType: mixedRequest.dataType || 'json',
                                    success: callback,
                                    error: function(xhr, type, error) {
                                        callback({
                                            errorCode: type.toUpperCase()
                                        });
                                    },
                                    withCredentials: mixedRequest.cookie == false ? false : true
                                });
                            }
                    }

                } else {
                    //
                }
                break;
            default:
                //三个参数的时候

        }

    };


});

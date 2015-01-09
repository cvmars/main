/*
 *  @name demo  api配置介绍
 *  @Copyright feiniu         //版权声明
 *  @Designed @joker.ye       //制作人
 *  @date 2014-9-10           //制作时间
 *  @update 2014-12-08        //最后更新时间
 */
define(function(require, exports, module) {

    return {
        /**
         接口用途key如add:{//请求接口添加数据
                url : '接口地址',
                isOnlyData: 1, //表示post请求只有一个data参数，参数值是json字符串
                post : { post参数配置，如则配，无则不配置该key
                    post参数明 : '参数值，其中?表示一定要做替换的',
                    cityCode : '?',
                    body: '?'
                },
                get: {get参数配置，类似post

                },
                body:{
                    deviceId:'?',
                    osType:2,
                    osVersionNo : '?',
                    appVersionNo:'?'
                },
                method:'get请求方法配置，不配则智能判断'
            },
         */
            getData: {
                url: 'http://local.m.feiniu.com/tjson.php',
                get:{
                    apiVersion : 't-1.0',
                    cityCode: '?',
                    a: 'aaa',
                    b: '?'
                }
            }

    }
});
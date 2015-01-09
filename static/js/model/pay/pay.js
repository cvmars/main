define('model/pay/pay',['lib/common', 'api/pay'], function($, apiPay) {

    /**
     * 支付模型
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'), body:{}};
        return bizObj;
    }

    /**
     * 获取支付回调信息
     * @param dataInfo = {body:{pay_code:11}}
     * @param callback
     */
    function getPayCallback(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPay.getPayCallback, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取支付平台列表
     * @param dataInfo = {body:{orderId:xxx,action:xxx}}
     * @param callback
     */
    function getPaymentList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPay.getPaymentList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 支付宝支付
     */
    function paycode_11(dataInfo, callback) {
        var bizDataObj = {
            body:{
                orderId:''
            },
            token:$.cookie.getH5('token')

        }
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
       var _urlObj = $.makeUrl(apiPay.paycode_11, {data:JSON.stringify(bizDataObj)});
        var _url = _urlObj.url;
       // $.log(_url);return;
        location.href = _url;
    }

    /**
     * 通用页面请求方法
     * @param wayName
     * @param dataInfo
     * @param callback
     */
    function ge(wayName,dataInfo, callback){
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPay[wayName], bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    return {
        getPayCallback : getPayCallback,
        getPaymentList : getPaymentList,
        paycode_11     : paycode_11,
        ge             :ge
    }
});
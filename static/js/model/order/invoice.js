define('model/order/invoice',['lib/common', 'api/invoice'], function($, api) {
    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'),
            body:
            {
                invoiceType:1
            }
        };
        return bizObj;
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
        $.xsr($.makeUrl(api[wayName], bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    return {
        ge : ge
    }

});

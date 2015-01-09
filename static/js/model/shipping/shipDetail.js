define('model/shipping/shipDetail',['lib/common', 'api/order'], function($, apiOrder) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'),
            body:
            {
                orderId: ''
            }
        };
        return bizObj;
    }

    /**
     * 获取出货详情
     * @param dataInfo
     * @param callback
     */
    function getShipDetail(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.getShipDetail, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    return {
        getShipDetail: getShipDetail
    }
});
define('model/flow',['lib/common', 'api/flow'], function($, apiFlow) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {
            token: $.cookie.getH5('token'),
            body: {
                cart_total_no_fee: '',
                pointType: 1,
                isSeperate: 0
            }
        };
        return bizObj;
    }

    /**
     * 获取优惠卡券
     * @param dataInfo
     * @param callback
     */
    function getPointList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiFlow.getPointList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    return {
        getPointList: getPointList
    }
});
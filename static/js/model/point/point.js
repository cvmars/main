define('model/point/point',['lib/common', 'api/point'], function($, apiPoint) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getPointListObj() {
        var pointListObj = {
            token: $.cookie.getH5('token'),
            body: {
                pointType:'1',
                vcs_status: '0',
                onePageSize: 10,
                pageIndex: 1
            }
        };
        return pointListObj;
    }

    /**
     * 获取抵用券/购物卡/购物金/优惠券列表
     * @param dataInfo
     * @param callback
     */
    function getPointList(dataInfo, callback) {
        var pointListObj = getPointListObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(pointListObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPoint.getPointDetail, pointListObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    function getExchangePointObj() {
        var exchangePointObj = {
            token: $.cookie.getH5('token'),
            body: {
                pointType:'',
                code: '',
                card_num: '',
                captcha: ''
            }
        };
        return exchangePointObj;
    }

    /**
     * 兑换抵用券/购物卡/购物金/优惠券
     * @param dataInfo
     * @param callback
     */
    function exchangePoint(dataInfo, callback) {
        var exchangePointObj = getExchangePointObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(exchangePointObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPoint.exchangePoint, exchangePointObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    function getPointHistoryObj() {
        var pointHistoryObj = {
            token: $.cookie.getH5('token'),
            body: {
                pointId:'',
                onePageSize: '',
                pageIndex: ''
            }
        };
        return pointHistoryObj;
    }

    /**
     * 抵用券/购物卡 使用记录
     * @param dataInfo
     * @param callback
     */
    function getPointHistory(dataInfo, callback) {
        var pointHistoryObj = getPointHistoryObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(pointHistoryObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPoint.getPointHistory, pointHistoryObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    function getVoucherListObj() {
        var voucherListObj = {
            token: $.cookie.getH5('token'),
            body: {
                pointId:'',
                vtype: '',
                onePageSize: '',
                pageIndex: ''
            }
        };
        return voucherListObj;
    }
    /**
     * 可领取优惠券列表
     * @param dataInfo
     * @param callback
     */
    function getVoucherList(dataInfo, callback) {
        var voucherListObj = getVoucherListObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(voucherListObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPoint.getVoucherList, voucherListObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    function getVoucherItemObj() {
        var voucherItemObj = {
            token: $.cookie.getH5('token'),
            body: {

            }
        };
        return voucherItemObj;
    }
    /**
     * 根据优惠券号获取适用商品列表
     * @param dataInfo
     * @param callback
     */
    function getVoucherItem(dataInfo, callback) {
        var voucherItemObj = getVoucherItemObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(voucherItemObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiPoint.getVoucherItem, voucherItemObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    return {
        getPointList: getPointList,
        exchangePoint: exchangePoint,
        getPointHistory: getPointHistory,
        getVoucherList: getVoucherList,
        getVoucherItem: getVoucherItem
    }
});
define('model/salesReturn', ['lib/common', 'api/salesReturn'], function($, apiSalesReturn) {

    /**
     * 获取退货商品列表
     * @param dataInfo
     * @param callback
     */
    function getReturnItemsList(dataInfo, callback) {
        var bizDataObj = {
			token: $.cookie.getH5('token'),
            body: {}
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiSalesReturn.returnItemsList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }
	
	
	/**
     * 确认退货
     * @param dataInfo
     * @param callback
     */
    function returnItemsSure(dataInfo, callback) {
        var bizDataObj = {
			token: $.cookie.getH5('token'),
            body: {}
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiSalesReturn.confirmReturn, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }
	
	
	/**
     * 获取银行列表
     * @param dataInfo
     * @param callback
     */
    function getBankList(dataInfo, callback) {
		
		var bizDataObj = {
            token: $.cookie.getH5('token'),
            body: {}
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }

        $.xsr($.makeUrl(apiSalesReturn.getBankList, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取退货详情
     * @param dataInfo
     * @param callback
     */
    function getReturnDetail(dataInfo, callback) {
        var bizDataObj = {
            token: $.cookie.getH5('token'),
            body: {
                orderId: '',
                returnId: ''
            }
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiSalesReturn.getReturnDetail, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    /**
     * 退货完成
     * @param dataInfo
     * @param callback
     */
    function getReturnProductList(dataInfo, callback) {
        var bizDataObj = {
            token: $.cookie.getH5('token'),
            body: {}
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiSalesReturn.getReturnProductList, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {
                throw e;
            }
        });
    }

    return {
        getReturnItemsList: getReturnItemsList,
        getReturnDetail: getReturnDetail,
		returnItemsSure: returnItemsSure,
		getBankList: getBankList,
        getReturnProductList: getReturnProductList
    }

});

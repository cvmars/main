define('model/order',['lib/common', 'api/order'], function($, apiOrder) {
    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'),
            body:
            {
                onePageSize: 10,
                pageIndex: 1,
                orderType: 1
            }
        };
        return bizObj;
    }

    /**
     * 生成订单
     * @param dataInfo
     * @param callback
     */
    function createOrder(dataInfo, callback) {
        var bizDataObj = {
            token: $.cookie.getH5('token'),
            body:{
                cityCode: '', // 省/市Id
                action: 1, // 1：生成 2：取消  3：更改支付方式
                orderId: '', // 订单Id（更改支付方式有效）
                pay_code: '', // 6：货到付款 11：支付宝 14：现金券 19：购物金支付 20：优惠券支付
                consigee: '', // 收货人地址
                pointId: '', // 抵用券ID
                isCouponUsed: 0, // 1：使用抵用券  0：不使用
                isCardUsed: 0, // 1：使用飞牛卡    0：不使用
                invoiceType: 0, // 0：不索取发票   1：个人  2：公司
                invoiceTitle: '', // 发票抬头
                isSeperate: 1, // 1：独立结算（预购/闪购）  0：合并结算
                osType: 3, // 系统类型  1：Android  2：iOS  3：触屏
                is_sensitive: '', // 1：有敏感商品  0：无敏感商品
                ticket: '', // 优惠券编号
                pcash: '', // 购物金编号
                has_captcha: 0, // 是否有验证码 1 需要验证码，0 不需要验证码
                captcha: '' // 验证码
            }
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.adminOrder, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取定单列表
     * @param dataInfo
     * @param callback
     */
    function getOrderList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.orderList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取定单详情
     * @param dataInfo
     * @param callback
     */
    function getOrderDetail(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.orderDetail, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取退货单详情
     * @param dataInfo
     * @param callback
     */
    function getReturnDetail(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.returnDetail, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 获取订单概要
     * @param dataInfo
     * @param callback {Function}
     */
    function getOrderSummary(dataInfo, callback) {
        var bizDataObj = {
            token: $.cookie.getH5('token'),
            body: {}
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.getOrderSummary, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 订单简单信息
     * @param dataInfo
     * @param callback {Function}
     */
    function getReturnAdminOrder(dataInfo, callback) {
        var bizDataObj = {
            token: $.cookie.getH5('token'),
            body: {
                orderId:''
            }
        };
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiOrder.getReturnAdminOrder, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
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
        $.xsr($.makeUrl(apiOrder[wayName], bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    return {
        createOrder         : createOrder,
        getOrderList        : getOrderList,
        getOrderDetail      : getOrderDetail,
        getReturnDetail     : getReturnDetail,
        getOrderSummary     : getOrderSummary,
        getReturnAdminOrder : getReturnAdminOrder,
        ge                  : ge
    }

});

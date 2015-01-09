define('model/address',['lib/common', 'api/address'], function($, apiAddress) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'),body:{}  };
        return bizObj;
    }

    /**
     * 获取地址列表
     * @param callback
     */
    function getAddrList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiAddress.getAddrList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }

    /**
     * 增加收货地址
     * @param dataInfo = {body:{addr:{
     *
                addrId: '全球唯一識別碼',
                name: '收貨人姓名',
                province: '省份',
                city: '縣市',
                zip: '郵遞區號',
                area: '鄉鎮市區',
                addr: '地址',
                tel: '市話',
                cellPhone: '手機',
                cityCode: '购物车判断是否与所在城市一致'
     *                              }}}
     * @param callback
     */
    function addAddress(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiAddress.adminAddr, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {
                throw e;
            }
        });
    }

    /**
     * 删除地址
     * @param dataInfo
     * @param callback
     */
    function delAddress(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiAddress.adminAddr, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {
                throw e;
            }
        });
    }

    /**
     * 修改收货地址
     * @param dataInfo = {body:{addr:{
     *
                addrId: '全球唯一識別碼',
                name: '收貨人姓名',
                province: '省份',
                city: '縣市',
                zip: '郵遞區號',
                area: '鄉鎮市區',
                addr: '地址',
                tel: '市話',
                cellPhone: '手機',
                cityCode: '购物车判断是否与所在城市一致'
     *                              }}}
     * @param callback
     */
    function editAddress(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiAddress.adminAddr, bizDataObj), function(res) {
            try {
                callback && callback(res);
            } catch (e) {
                throw e;
            }
        });
    }

    return {
        getAddrList: getAddrList,
        addAddress:addAddress,
        delAddress: delAddress,
        editAddress: editAddress
    }
});
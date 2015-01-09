define('model/area',['lib/common', 'api/area'], function($, apiArea) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {
            token: $.cookie.getH5('token'),
            cityCode:$.cookie.getH5('siteid'),
            body: {
                versionNo: '1',
                code: '0',
                downLevel: 3
            }
        };
        return bizObj;
    }

    /**
     * 获取城市列表
     * @param dataInfo
     * @param callback
     */
    function getCityList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiArea.getCityList, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    return {
        getCityList: getCityList
    }
});
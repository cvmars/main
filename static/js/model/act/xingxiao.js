define('model/act/xingxiao',['lib/common', 'api/act'], function($, apiAct) {

    /**
     * 领域对象，传递给服务器的数据  行销活动页接口
     */
    function getBizObj() {
        var bizObj = {token:$.cookie.getH5('token'),cityCode:$.cookie.getH5('siteid'),body:{}  };
        return bizObj;
    }

    /**
     * 获取行销活动页数据
     * @param callback
     */
    function getXingxiaoList(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }
        $.xsr($.makeUrl(apiAct.xingxiao, bizDataObj), function(res) {
            try {

                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }




    return {
        getXingxiaoList: getXingxiaoList,
        getBizObj:getBizObj
    }
});
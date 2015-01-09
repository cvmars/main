define('model/category',['lib/common', 'api/category'], function($, apiCategory) {

    /**
     * 领域对象，传递给服务器的数据
     */
    function getBizObj() {
        var bizObj = {
            token:$.cookie.getH5('token'),
            cityCode:$.cookie.getH5('siteid'),
            body:{versionNo:'1'}
        };
        return bizObj;
    }

    /**
     * 获取商品分类列表
     * @param dataInfo
     * @param callback
     */
    function getCategory(dataInfo, callback) {
        var bizDataObj = getBizObj();
        var dataInfo = dataInfo || {};
        var _supportLocal = false;
        if(dataInfo.cityCode && typeof dataInfo.cityCode !='undefined') {
            bizDataObj.cityCode = dataInfo.cityCode;
        }
        if(dataInfo.body) {
            $.merge(bizDataObj.body, dataInfo.body);
        }

        $.xsr($.makeUrl(apiCategory.getCategory, bizDataObj), function(res) {
            try {
                if (typeof res=='object' && res.errorCode == 2001) {
                    //token 过期
                    $.modelToken.delToken();
                }
                callback && callback(res);
            } catch (e) {

                throw e;
            }
        });
    }


    return {
        getCategory: getCategory
    }
});
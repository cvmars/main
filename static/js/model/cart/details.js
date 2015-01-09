define('model/cart/details', ['lib/common', 'api/cart'],
	function($, api) {
		function getBizObj() {
	        var bizObj = {
	        	token:$.cookie.getH5('token'),
	            body:
	            {
	            	cityCode: $.cookie.getH5('siteid'),
	                action: 4
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
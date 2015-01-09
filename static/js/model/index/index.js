define('model/index/index', ['lib/common', 'api/index', 'config/url'],
	function($, apiIndex, configUrl) {
		function GetHomePageObj() {
			var bizGetHomePageData = {
				token: $.cookie.getH5('token'),
				body: {
					cityCode: ''
				}
			};
			return bizGetHomePageData;
		}

		function GetHomePage(dataInfo, callback) {
			var bizDataObj = GetHomePageObj();
			var dataInfo = dataInfo || {};
			if (dataInfo.body) {
				$.merge(bizDataObj.body, dataInfo.body);
			};
			$.xsr($.makeUrl(apiIndex.GetHomePage, bizDataObj), function(res) {
				try {
                    if (typeof res=='object' && res.errorCode == 2001) {
                        //token 过期
                        $.modelToken.delToken();
                    }
					callback && callback(res);
				} catch (e) {
					//TODO handle the exception
					throw e;
				}
			});
		}
		return {
			GetHomePage: GetHomePage
		}
	})
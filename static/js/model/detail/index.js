define('model/detail/index', ['lib/common', 'api/detail', 'config/url'],
		function($, apiDetail, configUrl) {
			//获得商品详情
			function GetMerchandiseObj() {
					var bizGetMerchandiseData = {
						token: $.cookie.getH5('token'),
						cityCode:$.cookie.getH5('siteid'),
						body: {
							cityCode: '',
							sm_seq: ''
						}
					};
					return bizGetMerchandiseData;
				}
				//获得商品详情

			function GetMerchandise(dataInfo, callback) {
					var bizGetMerchandiseData = GetMerchandiseObj();
					var dataInfo = dataInfo || {};
					if (dataInfo.body) {
						$.merge(bizGetMerchandiseData.body, dataInfo.body);
					};
					$.xsr($.makeUrl(apiDetail.GetMerchandise, bizGetMerchandiseData), function(res) {
						try {
							callback && callback(res);
						} catch (e) {
							//TODO handle the exception
							throw e;
						}
					});
				}
				//获得限购量

			function GetLimitObj() {
				var bizGetLimitObjData = {
					token: $.cookie.getH5('token'),
					body: {
						shopcartItem: {
							main: {
								sm_seq: '',
								is_orgi_item: '',
								qty: ''
							}
						}
					}

				};
				return bizGetLimitObjData;
			}

			function GetLimit(dataInfo, callback) {
				var bizGetLimitData = GetLimitObj();
				var dataInfo = dataInfo || {};
				if (dataInfo.body) {
					$.merge(bizGetLimitData.body, dataInfo.body);
				};
				$.xsr($.makeUrl(apiDetail.GetLimit, bizGetLimitData), function(res) {
					try {
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}
			return {
				GetMerchandise: GetMerchandise,
				GetLimit:GetLimit
			}
		}) //define
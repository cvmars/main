define('model/list/index', ['lib/common', 'api/list', 'config/url'],
		function($, apiList, configUrl) {
			/*
			 * 获取分类卖场列表
			 */
			function GetSMbyCategoryObj() {
				var bizGetSMbyCategoryData = {
					token: $.cookie.getH5('token'),
					body: {
						cityCode: '',
						si_seq: '',
						filters: '',
						is_attribute: '',
						get_all_attribute:'',
						sortType: '',
						sortOrder: '',
						search_price: '',
						onePageSize: '',
						pageIndex: ''
					}
				};
				return bizGetSMbyCategoryData;
			}

			function GetSMbyCategory(dataInfo, callback) {
					var bizDataObj = GetSMbyCategoryObj();
					var dataInfo = dataInfo || {};
					if (dataInfo.body) {
						$.merge(bizDataObj.body, dataInfo.body);
					};
					$.xsr($.makeUrl(apiList.GetSMbyCategory, bizDataObj), function(res) {
						try {
							callback && callback(res);
						} catch (e) {
							//TODO handle the exception
							throw e;
						}
					});
				}
			
				/*
				 * 关键字搜索卖场列表
				 */

			function GetSMbyKeyObj() {
				var bizGetSMbyKeyData = {
					token: $.cookie.getH5('token'),
					body: {
						cityCode: '',
						keywords: '',
						filters: '',
						cate: '',
						is_attribute: '',
						get_all_attribute:'',
						is_category: '',
						sortType: '',
						sortOrder: '',
						search_price: '',
						onePageSize: '',
						pageIndex: ''
					}
				};
				return bizGetSMbyKeyData;
			}
			function GetSMbyKey(dataInfo, callback) {
				var bizDataObj = GetSMbyKeyObj();
				var dataInfo = dataInfo || {};
				if (dataInfo.body) {
					$.merge(bizDataObj.body, dataInfo.body);
				};
				$.xsr($.makeUrl(apiList.GetSMbyKey, bizDataObj), function(res) {
					try {
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}
			return {
				GetSMbyCategory: GetSMbyCategory,
				GetSMbyKey:GetSMbyKey
			}
		}) //require
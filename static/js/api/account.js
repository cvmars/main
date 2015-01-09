/*
 *  @name 我的账户api明细
 *  @Copyright feiniu         //版权声明
 *  @Designed @joker.ye       //制作人
 *  @date 2014-9-10           //制作时间
 *  @update 2014-12-08        //最后更新时间
 */
define(function(require, exports, module) {

	return {
		login: {
			url:'misc/Login',
			isOnlyData: 1,
			post: {
				apiVersion : 't-1.0',
                cityCode: '?',
				token: '?',
				body: '??'
			},
			body: {
				username: '?',
				password: '?',
				captcha: '',
				osType: configUrl.osType
			}
		}

	}

});
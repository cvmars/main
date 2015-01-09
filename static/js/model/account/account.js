define('model/account/account', ['lib/common', 'api/account', 'config/url'],
	function($, apiAccount, configUrl) {

		//服务器接口
		//var apiObj = apiAccount.getToken;
		/**
		 * 领域对象，传递给服务器的数据
		 */


		/**
		 * @param dataInfo
		 * @param callback 回调方法
		 */
		function getBizRegisterObj() {
			var bizRegisterObj = {
				token: $.cookie.getH5('token'),
				cityCode:$.cookie.getH5('siteid'),
				body: {
					username: '',
					password: '',
					captcha: '',
					osType: configUrl.osType
				}
			};
			$.log("城市编号："+$.cookie.getH5('siteid'));
			return bizRegisterObj;
		}

		function register(dataInfo, callback) {
				if (dataInfo.body) {
					var bizRegisterObj = getBizRegisterObj();
					$.merge(bizRegisterObj.body, dataInfo.body);
				}

				$.xsr($.makeUrl(apiAccount.register, bizRegisterObj), function(res) {
					try {
						if (res.errorCode == 0) { //注册成功
							var token = res.body.token;
							$.modelToken.setToken(token);
							//本地设置登录状态
							$.cookie.addH5('islogin', '1', '/', 86400 * 365, configUrl.cookieDomain);
						}
						callback && callback(res);
					} catch (e) {

						throw e;
					}
				});

			}
			/**
			 * 获取验证码
			 * @param dataInfo
			 * @param callback
			 */

		function getBizCaptchaObj() {
			var bizCaptchaObj = {
				token: $.cookie.getH5('token'),
				body: {
					username: '',
					action: ''
				}
			};
			return bizCaptchaObj;
		}

		function getCaptcha(dataInfo, callback) {
			if (dataInfo.body) {
				var bizCaptchaObj = getBizCaptchaObj();
				$.merge(bizCaptchaObj.body, dataInfo.body);
			}
			$.xsr($.makeUrl(apiAccount.getCaptcha, bizCaptchaObj), function(res) {
				try {
					callback && callback(res);
				} catch (e) {

					throw e;
				}
			});

		}


		function getLoginDataObj() {
			var loginDataObj = {
				token: $.cookie.getH5('token'),
				cityCode:$.cookie.getH5('siteid'),
				body: {
					username: '',
					password: '',
					captcha: ''
				}
			};

			return loginDataObj;
		}


		function login(dataInfo, callback) {
				if (dataInfo.body) {
					var loginDataObj = getLoginDataObj();

					$.merge(loginDataObj.body, dataInfo.body);
				}
				$.xsr($.makeUrl(apiAccount.login, loginDataObj), function(res) {
					try {
						if (res.errorCode == 0) { //登录成功
							var token = res.body.token;
							$.modelToken.setToken(token);
							//本地设置登录状态
							$.cookie.addH5('islogin', '1', '/', 86400 * 365, configUrl.cookieDomain);
						} else if (res.errorCode == 2001) {
                            //token 过期
                            $.modelToken.delToken();
                        }
                        callback && callback(res);
					} catch (e) {
						throw e;
					}
				});

	    }
        //退出登录
        function logout(dataInfo, callback) {
            var logoutInfo = {
                                token: $.cookie.getH5('token'),
                                	cityCode:$.cookie.getH5('siteid'),
                                body: {
                                    username: '',
                                    password: '',
                                    captcha: ''
                                }
                                };
            if (dataInfo.body) {
                $.merge(logoutInfo.body, dataInfo.body);
            }
            $.xsr($.makeUrl(apiAccount.login, logoutInfo), function(res) {
                try {
                    if (res.errorCode == 0) { //退出登录成功
                        var token = res.body.token;
                        $.modelToken.setToken(token);
                    }
                    $.cookie.addH5('islogin', 0, '/', 86400 * 365, configUrl.cookieDomain);
                    callback && callback(res);

                } catch (e) {
                    throw e;
                }
            });

        }
			//校验验证码

		function getValidateCaptchaObj() {

			var ValidateCaptchaObj = {
				token: $.cookie.getH5('token'),
					cityCode:$.cookie.getH5('siteid'),
				body: {
					username: '',
					captcha: ''
				}
			};
			return ValidateCaptchaObj;
		}

		function ValidateCaptcha(dataInfo, callback) {
				if (dataInfo.body) {
					var ValidateCaptchaObj = getValidateCaptchaObj();
					$.merge(ValidateCaptchaObj.body, dataInfo.body);
				}
				$.xsr($.makeUrl(apiAccount.ValidateCaptcha, ValidateCaptchaObj), function(res) {
					try {
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}
			//重置密码

		function getResetPsdDataObj() {
			var resetPsdDataObj = {
				token: $.cookie.getH5('token'),
					cityCode:$.cookie.getH5('siteid'),
				body: {
					username: '',
					password: '',
					newPassword: '',
					captcha: ''
				}
			};
			return resetPsdDataObj;
		}

		function ResetPassword(dataInfo, callback) {
			if (dataInfo.body) {
				var resetPsdDataObj = getResetPsdDataObj();
				$.merge(resetPsdDataObj.body, dataInfo.body);
			}
			$.xsr($.makeUrl(apiAccount.ResetPassword, resetPsdDataObj), function(res) {
				try {
					if (res.errorCode == 0) { //登录成功
				
					}
					callback && callback(res);
				} catch (e) {
					throw e;
				}
			});

		}

		function CheckUserDataObj() {
			var bizCheckUseDataObj = {
				token: $.cookie.getH5('token'),
				body: {
					username: '',
					osType: '',
					captcha: ''
				}
			};
			return bizCheckUseDataObj;
		}

		function CheckUser(dataInfo, callback) {
			if (dataInfo.body) {
				var bizCheckUseDataObj = CheckUserDataObj();
				$.merge(bizCheckUseDataObj.body, dataInfo.body);
			}
			$.xsr($.makeUrl(apiAccount.CheckUser, bizCheckUseDataObj), function(res) {
				try {
					callback && callback(res);
				} catch (e) {
					//TODO handle the exception
					throw e;
				}
			});
		}
        //qq登录
        function qqLogin(dataInfo, callback) {
            var qqloginDataObj = {
                token: $.cookie.getH5('token'),
                body: {
                    url: ''
                }
            };
            if (dataInfo.body) {
                $.merge(qqloginDataObj.body, dataInfo.body);
            }
            $.xsr($.makeUrl(apiAccount.qqLogin, qqloginDataObj), function(res) {
                try {
                    $.log(decodeURIComponent(res.body.qq_url));
                    callback && callback(res);
                } catch (e) {
                    throw e;
                }
            });

        }

        function getPointRemainObj() {
            var pointRemainObj = {
                token: $.cookie.getH5('token'),
                body: {

                }
            };
            return pointRemainObj;
        }
        // 获取用户名、点数余额（抵用券+飞牛卡）
        function getPointRemain(dataInfo, callback) {
            var pointRemainObj = getPointRemainObj();
            if (dataInfo.body) {
                $.merge(pointRemainObj.body, dataInfo.body);
            }
            $.xsr($.makeUrl(apiAccount.getPointRemain, pointRemainObj), function(res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

		return {
			register: register,
			login: login,
            logout: logout,
			getCaptcha: getCaptcha,
			getBizRegisterObj: function() {
				return getBizRegisterObj();
			},
			ValidateCaptcha: ValidateCaptcha,
			ResetPassword: ResetPassword,
			CheckUser: CheckUser,
            qqLogin:qqLogin,
            getPointRemain: getPointRemain
		}

	});
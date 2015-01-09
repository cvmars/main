define('model/cart', ['lib/common', 'api/cart'],
	function($, apiCart) {
		//加入购物车默认结构
		var _initAddObj = {
				//主商品信息: sm_seq 卖场编号, is_orgi_item是否原生卖场(0否非一般商品以外的商品；1是即一般商品), qty 数量
				main: {
					sm_seq: "",
					is_orgi_item: "",
					qty: ""
				},
				//规格   sm_seq 卖场编号 itno 商品Id  qty 数量 is_itno_main 是否为主商品 [{sm_seq:"",itno:"",qty:"",is_itno_main:""}]
				productMain: "",
				//组合商品  sm_seq 卖场编号   itno 商品Id  qty 数量  is_itno_main 是否为主商品[{sm_seq:"",itno:"",qty:"",is_itno_main:""}]
				productCombo: "",
				//加购品   sm_seq 卖场编号  itno 商品Id  qty 数量 is_itno_main 是否为主商品 [{sm_seq:"",itno:"",qty:"",is_itno_main:""}]
				suggested: "",
				//0 非预购 1 预购 默认为0
				isPreProduct: 0

			}
			//修改
		var _initEditAction = {
				
				//行号
				rowid: "",
				//数量
				qty: "",
				//action等于2时必填， 1：数量的修改，2：选中的修改（默认1）
				type:"1",
				//是否勾选，1：勾选，0：不勾选
				isCheck:""

			}
	
			//删除
		var _initDeleteAction = {
				//行号
				rowid: ""
			}
		//查询
		var _initQueryAction = {
				action:"",
				//行号
				rowid: "",
				//城市编号
				cityCode:""
			}
		//添加购物车构造结构
		function addShopcartObj() {
				var AddShopcartData = {
					token: $.cookie.getH5('token'),
					cityCode: $.cookie.getH5('siteid'),
					body: {
						isGet: '', //1: 返回购物车讯息 0: 不返回isSeperate =1 时才有效
						cityCode: $.cookie.getH5('siteid'), //省/市Id
						action: '', //1：添加2：修改3：删除4：一般查询5：数量6：清空7：结算查询(类型4+查询是否有可用的优惠卡券
						shopcartItem: '', //购物车项（添加有效）,主卖场信息main + 规格品信息productMain + 加购品suggested
						iSeperate: '0'//1：独立结算（预购/闪购）0：合并结算
					}
				};
				return AddShopcartData;
			}
		//添加购物车构造结构
		function oprationShopcartObj() {
				var OprationShopcartData = {
					token: $.cookie.getH5('token'),
					cityCode: $.cookie.getH5('siteid'),
					body: {
						isGet: '', //1: 返回购物车讯息 0: 不返回isSeperate =1 时才有效
						cityCode: $.cookie.getH5('siteid'), //省/市Id
						action: '', //1：添加2：修改3：删除4：一般查询5：数量6：清空7：结算查询(类型4+查询是否有可用的优惠卡券
						rowid: "",
						isSeperate: '0',//1：独立结算（预购/闪购）0：合并结算
						qty: '',//数量（修改有效）
						type:"1",
						isCheck:""

					}
				};
				return OprationShopcartData;
			}
			//购物车构造结构
		function AdminShopcartObj() {
				var AdminShopcartData = {
					token: $.cookie.getH5('token'),
					cityCode: $.cookie.getH5('siteid'),
					body: {
						isGet: '', //1: 返回购物车讯息 0: 不返回isSeperate =1 时才有效
						cityCode: "", //省/市Id
						action: '', //1：添加2：修改3：删除4：一般查询5：数量6：清空7：结算查询(类型4+查询是否有可用的优惠卡券
						shopcartItem: '', //购物车项（添加有效）,主卖场信息main + 规格品信息productMain + 加购品suggested
						rowid: '', //行ID（修改/删除有效）
						qty: '', //数量（修改有效）
						pointId: '', //抵用券ID
						isCouponUsed: '', //1：使用抵用券0：不使用
						isCardUsed: '', //1：使用飞牛卡0：不使用
						isSeperate: '0', //1：独立结算（预购/闪购）0：合并结算
						ticket: '', //优惠卡券编号
						pcash: '', //购物金编号
						goods_total: '', //商品总额（折扣之前不包括运费的总额
						requestVer: '' //1: 只返回抵用券和购物卡2: 全不能用的卡券都需要返回
					}
				};
				return AdminShopcartData;
			}
		//购物车接口方法 -- 填写订单页中会调用
		function getShopingCart(dataInfo, callback) {
			var bizDataObj = AdminShopcartObj();
            var dataInfo = dataInfo || {};
            if(dataInfo.cityCode) {
                bizDataObj.cityCode = dataInfo.cityCode;
            }
			if (dataInfo.body) {
				$.merge(bizDataObj.body, dataInfo.body);
			};
			$.xsr($.makeUrl(apiCart.AdminShopcart, bizDataObj), function(res) {
				try {

					callback && callback(res);
				} catch (e) {
					//TODO handle the exception
					throw e;
				}
			});
		}

		//添加购物车方法
		function AddShoppingCart(dataInfo, callback) {
			var bizDataObj = AdminShopcartObj();
				var shopCart = {
					body: {
						isGet: '',
						action: '1',
						shopcartItem: dataInfo,
						isSeperate: ''
					}
				};
				//是预购
				if (dataInfo.isPreProduct == 1) {
					shopCart.body.isGet = 0;
					shopCart.body.isSeperate = 1;
				} else {
					shopCart.body.isGet = 1;
					shopCart.body.isSeperate = 0;
				}
				var shopCart = shopCart || {};
				if (shopCart.body) {
					$.merge(bizDataObj.body, shopCart.body);
				};
				$.log("mode传入值"+bizDataObj);
				$.log(bizDataObj);
				$.xsr($.makeUrl(apiCart.AdminShopcart, bizDataObj), function(res) {
					try {
						if (dataInfo.isPreProduct) {
							return	$.url.redirect($.url.getTouchBaseUrl() + 'order/index.html?ci={action:7,isSeperate:1}');
							
						}
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}
			//非添加购物车之外的操作

		function oprationShoppingCart(dataInfo, callback) {
			var cityCode;
			if(dataInfo.action==7)
			{
				cityCode=dataInfo.cityCode;
			}
			else
			{
				cityCode=$.cookie.getH5('siteid');
			}
				var bizDataObj = oprationShopcartObj();
				bizDataObj.cityCode=cityCode;
				var shopCart = {	
					body: {
						isGet: '1',
						action: dataInfo.action,
						rowid: dataInfo.rowid,
						qty: dataInfo.qty,
						type:dataInfo.type,
						//是否勾选，1：勾选，0：不勾选
						isCheck:dataInfo.isCheck,
						isSeperate:0,
						cityCode:cityCode

					}
				};
				if (dataInfo.isPreProduct == 1) {
					shopCart.body.isSeperate = 1;
				} else {
					shopCart.body.isSeperate = 0;
				}
				var shopCart = shopCart || {};
				if (shopCart.body) {
					$.merge(bizDataObj.body, shopCart.body);
				};
				$.xsr($.makeUrl(apiCart.OperationShopcart, bizDataObj), function(res) {
					try {
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}
		//添加购物车
		function addCart(dataInfo, callback) {
			var bizDataObj = addShopcartObj();
				var shopCart = {
					body: {
						isGet: '',
						action: '1',
						shopcartItem: dataInfo,
						isSeperate: ''
					}
				};
				//是预购
				$.log("dataInfo.isPreProduct2:"+dataInfo.isPreProduct)
			
				if (dataInfo.isPreProduct == 1) {
					shopCart.body.isGet = 0;
					shopCart.body.isSeperate = 1;
				} else {
					shopCart.body.isGet = 1;
					shopCart.body.isSeperate = 0;
				}
				var shopCart = shopCart || {};
				if (shopCart.body) {
					$.merge(bizDataObj.body, shopCart.body);
				};
				$.xsr($.makeUrl(apiCart.AdminShopcart, bizDataObj), function(res) {
					try {
						if (dataInfo.isPreProduct) {
							$.redirect($.url.getTouchBaseUrl() + 'order/index.html?ci={action:7,isSeperate:1}');
						}
						callback && callback(res);
					} catch (e) {
						//TODO handle the exception
						throw e;
					}
				});
			}

        //修改购物车
        function editCart(dataInfo, callback) {
            dataInfo.action=2;
            oprationShoppingCart(dataInfo,callback);

        }

        function delCart(dataInfo, callback) {
 			dataInfo.action=2;
            oprationShoppingCart(dataInfo,callback);
        }
	
		function queryCart(dataInfo, callback) {
			
            oprationShoppingCart(dataInfo,callback);
	
	        }
		return {
			AddShoppingCart: AddShoppingCart,
            getShopingCart: getShopingCart, //拉取所有购物车信息
            addCart:addCart,
            delCart:delCart,
            editCart:editCart,
            queryCart:queryCart,
            //添加
            initAddObj : function(){
               return _initAddObj;
            },
            //编辑
			initEditAction:function() {
                return _initEditAction;
           },
            //删除
			initDeleteAction:function() {
                return _initDeleteAction;
           },
            //查询
			initQueryAction:function() {
                return _initQueryAction;
           }
		}
	});
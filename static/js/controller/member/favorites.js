define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    //定义user对象
    var fav = {

        text: {

            select_goods: "请选择商品",

            delete_goods: "请选择要删除的商品或店铺"

        },

        delType: false, //false=>点击的是批量删除  true=>单体删除

        init: function() {

            //Tab效果
            fav.tab();

            //add 购物车
            fav.bindEvent();

            //点击document隐藏弹层
            fav.cancel();

        },

        tab: function() {

            var $nav = $(".ui-tab-nav"),

                cName = "active",

                content = ".ui-tab-content",

                panel = ".ui-panel";

            $nav.on('click', "li", function(event) {

                var $this = $(this),

                    index = $this.index();

                $this.addClass(cName).siblings().removeClass(cName);

                $this.parent().siblings(content).find(panel).eq(index).show().siblings().hide();

            });

        },

        bindEvent: function() {

            var that = this,

                $container = $(".operating"),

                $favList = $("#favList"),

                $shopFavorites = $("#shopFavorites"),

                _that = null;

            //*********************************事件绑定 start***********************************//

            //****收藏商品操作***//

            //批量加入购物车
            $container.on("click", ".btn_add", addMulCart);

            //单独加入购物车
            $favList.on("click", ".btn_add", addSingleCart);

            //批量时提示框
            $container.on("click", ".btn_delete", deleteFav);

            //单删时提示框
            $favList.on("click", ".btn_delete", deleteSingleFav);

            //确认删除
            $("#rightUiPop .del_ok").on("click", function() {

                deleteOk();

            });

            //点击全选
            $(".favorites_list .J_select_all > input").on("click", clickTableSelectAll);

            //全选联动
            $("#favList .J_goodsfav_cb").on("click", clickSelectLink);


            //*********店铺收藏操作**********//

            //批量时提示框
            $(".deleteSelect").on("click", deleteFavShop);

            //单删时提示框
            $shopFavorites.on("click", ".deleteSingle", deleteSingleFavShop);

            //确认单删
            $("#rightUiPop .del_ok").on("click", function() {

                deleteShopOk();

            });

            //点击全选
            $("#shopCollection .J_select_all input").on("click", clickTableSelectAllShop);

            //全选联动
            $("#shopFavorites .J_goodsfav_cb").on("click", clickSelectLinkShop);


            //取消单删
            $("#rightUiPop .cancel").on("click", deleteSingleFavFalse);

            //*********************************事件绑定 end***********************************//

            //*********************************函数 start***********************************//

            //批量加入购物车函数
            function addMulCart(e) {

                var oEvent = e || window.event,

                    $this = $(this).offset();

                //checkSelectedGoods return true->表示有选择 false->无选择
                if (checkSelectedGoods()) {

                    alert("调用购车api");

                } else {

                    $("#leftUiPop").find(".ui_poptip_content").html(that.text.select_goods);

                    CheckHeight("#leftUiPop", $this, 83, 37, 83, -93);

                }

                oEvent.stopPropagation(); //阻止冒泡

            }

            //单独加入购物车函数
            function addSingleCart() {

                var $this = $(this);

                $this.closest("ul").find(".J_goodsfav_cb").prop("checked");

                alert("调用购车api");

            }

            //批量删除收藏商品 提示框 函数
            function deleteFav(e) {

                var oEvent = e || window.event,

                    $this = $(this).offset();

                _that = $(this);

                //checkSelectedGoods return true->表示有选择 false->无选择
                if (checkSelectedGoods()) {

                    CheckHeight("#rightUiPop", $this, 130, 42, 130, -88);

                    //false -》批量删除
                    that.delType = false;

                } else {

                    $("#leftUiPop").find(".ui_poptip_content").html(that.text.delete_goods);

                    CheckHeight("#leftUiPop", $this, 155, 42, 155, -78);

                }

                oEvent.stopPropagation(); //阻止冒泡

            }

            //单独删除收藏商品提示框函数
            function deleteSingleFav(e) {

                var oEvent = e || window.event,

                    $this = $(this).offset();

                _that = $(this);

                CheckHeight("#rightUiPop", $this, 120, 32, 120, -98);

                that.delType = true;

                oEvent.stopPropagation(); //阻止冒泡

            }

            //确定删除收藏商品 0->dan  其他多删
            function deleteOk() {

                var type = _that.attr("data-attr");

                if (type === "0") {

                    $(_that).closest("ul").remove();

                    toggleContentGoods();

                } else {

                    $(_that).parents(".ui-panel").find(".J_goodsfav_cb:checked").parents("ul").remove();

                    toggleContentGoods();

                }

            }

            //取消删除收藏商品
            function deleteSingleFavFalse() {

                $(this).closest(".ui_poptip").hide();

            }

            //全选按钮点击事件
            function clickTableSelectAll(e) {

                var $this = $(this),

                    isChecked = $this.prop("checked");

                $("#favList .J_goodsfav_cb").prop("checked", isChecked);

                $(".favorites_list").find(".J_select_all input").prop("checked", isChecked);

            }

            //全选联动
            function clickSelectLink() {

                var oCheckbox = $("#favList .J_goodsfav_cb");

                $(".J_select_all > input").prop("checked", oCheckbox.length == oCheckbox.filter(":checked").length);

            }

            //判断是否有选中商品
            function checkSelectedGoods() {

                var oCheckbox = $("#favList .J_goodsfav_cb:checked");

                return (oCheckbox.length == 0) ? false : true;

            }

            //判断收藏商品数量
            function checkSelectedGoodsNum() {

                var oCheckbox = $("#favList ul");

                return (oCheckbox.length == 0) ? false : true;

            }

            //店铺收藏 -- 批量删除收藏商品 提示框 函数
            function deleteFavShop(e) {

                var oEvent = e || window.event,

                    $this = $(this).offset();

                _that = $(this);

                //checkSelectedGoods return true->表示有选择 false->无选择
                if (checkSelectedShop()) {

                    CheckHeight("#rightUiPop", $this, 130, 42, 130, -88);

                    that.delType = false;

                } else {

                    $("#leftUiPop").find(".ui_poptip_content").html(that.text.delete_goods);

                    CheckHeight("#leftUiPop", $this, 155, 42, 155, -88);

                }

                oEvent.stopPropagation(); //阻止冒泡

            }

            //单独删除收藏商品提示框函数
            function deleteSingleFavShop(e) {

                var oEvent = e || window.event,

                    $this = $(this).offset();

                _that = $(this);

                that.delType = true;

                CheckHeight("#rightUiPop", $this, 120, 32, 120, -98);

                oEvent.stopPropagation(); //阻止冒泡

            }

            //确定删除收藏店铺
            function deleteShopOk() {

                var type = _that.attr("data-attr");

                if (type === "0") {

                    $(_that).parents(".shop_item").remove();

                    toggleContentShop();

                } else {

                    $(_that).parents(".ui-panel").find(".J_goodsfav_cb:checked").parents(".shop_item").remove();

                    toggleContentShop();

                }

            }

            //收藏商品 -- 单删时判断是否显示  无收藏
            function toggleContentGoods() {

                if (!checkSelectedGoodsNum()) {

                    $(".favorites_list").hide();

                    $(".no_favorites").show();

                }

                $("#rightUiPop").hide();

            }

            //店铺收藏--全选按钮点击事件
            function clickTableSelectAllShop(e) {

                var $this = $(this),

                    isChecked = $this.prop("checked");

                $("#shopFavorites .J_goodsfav_cb").prop("checked", isChecked);

                $("#shopCollection").find(".J_select_all input").prop("checked", isChecked);

            }

            //店铺收藏 -- 全选联动
            function clickSelectLinkShop() {

                var oCheckbox = $("#shopFavorites .J_goodsfav_cb");

                $(".J_select_all > input").prop("checked", oCheckbox.length == oCheckbox.filter(":checked").length);

            }

            //判断是否有选中店铺
            function checkSelectedShop() {

                var oCheckbox = $("#shopFavorites .J_goodsfav_cb:checked");

                return (oCheckbox.length == 0) ? false : true;

            }

            //判断收藏店铺数量
            function checkSelectedShopNum() {

                var oCheckbox = $("#shopFavorites .shop_item");

                return (oCheckbox.length == 0) ? false : true;

            }

            //提示框显示位置函数

            function CheckHeight(id, $this, a, b, c, d) {

                var clientH = $(window).height(),

                    diff = clientH - $this.top + $(document).scrollTop(), //可以屏幕与点击位置高度差

                    h = $("#rightUiPop").height() + 30; //弹层的高度

                $(id).find(".ui_poptip_arrow").removeClass("poptip_down poptip_up");

                if (diff >= h) {

                    //弹层在下箭头向上
                    $(id).find(".ui_poptip_arrow").addClass("poptip_up");

                    $(id).css({

                        "left": $this.left - a + "px",

                        "top": $this.top + b + "px"

                    }).show();


                } else {

                    //弹层在上箭头向下
                    $(id).find(".ui_poptip_arrow").addClass("poptip_down");

                    $(id).css({

                        "left": $this.left - c + "px",

                        "top": $this.top + d + "px"

                    }).show();

                }
            }

            //收藏店铺 --单删时判断是否显示  无收藏
            function toggleContentShop() {

                if (!checkSelectedShopNum()) {

                    $("#shopCollection").children(".favorites_shop").hide();

                    $("#shopCollection").children(".no_favorites").show();

                }

                $("#rightUiPop").hide();

            }

            //*********************************函数 end***********************************//

        },

        cancel: function() {

            //点击其他区域取消显示选项卡
            $("html,body").on("click", function() {

                $(".ui_poptip").hide();

            });

            $(".ui_poptip").on("click", function(e) {

                e.stopPropagation(); //阻止冒泡

            });

        }

    };

    //把user对象传到外部
    exports.init = fav.init;

});
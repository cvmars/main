define(function(require, exports, module) {
    // 引入jquery
    var $ = require('jquery');

    //引入atrDialog
    var dialog = require('dialogPlus');

    //debugger;

    var detail = {

        regular: {

            pint: /^[0-9]\d*$/

        },

        init: function() {

            this.bindEvent(); //加入购物车

            this.normSelect(); //规格选择

            this.nowTopActive();

        },

        bindEvent: function() {

            //-------------------------事件绑定-----------------------------//

            //加入购物车
            $("body").on('click', '#addCart', addCart);

            //领取优惠卷

            $("body").on('click', '#addCoupon', addCoupon);


            //添加到收藏夹
            $('#collectLink').on('click', collect);

            //到货通知订阅
            $('#togoods').on('click', toGoods);

            //到货通知订阅成功
            $("body").on('click', '#togoodsSubmit', goGoodsEnd)

            //降价通知
            $('body').on('click', "#toprice", toPrice);

            //降价通知订阅成功
            $("body").on('click', '#topriceSubmit', toPriceEnd);

            //tab选项卡
            $('.tab-inner').on('click', '.tab-toggle', tab);

            //
            //$('#tabInner').on('click', 'a', tabGoTop);

            //满增&领卷点击展开
            $('#productNorm').on('click', ".J_rush_click", rushClick);

            $("#productNorm").on("click", ".number a", addOrMinus);

            $("#productNorm").on('change', '.number input', changeCount);

            //倒计时初始化
            saleCountTime();

            //
            $(".aside-list").on("click", "a", goNav);

            //-------------------------callback函数体-----------------------------//


            /* 左右单击改变商品数量*/
            function addOrMinus(e) {
                var $this = $(e.currentTarget),
                    $ul = $this.parents(".number"),
                    $input = $this.siblings("input"),
                    maxnum = parseInt($("#numLast").attr("data-maxnum")),
                    value = parseInt($input.val()) + parseInt($this.attr("data-carnum"));

                //此处最大最小值需要根据具体业务逻辑设定
                if (value > 0 && value <= 99) {

                    $input.val(value);

                    if (value == 1) {

                        $ul.find('a:eq(0)').addClass("mins no-mins");

                    } else if (value == 99) {

                        $ul.find('a:eq(1)').addClass("add no-mins");

                    } else {

                        $ul.find('a').removeClass("no-mins");
                    }

                    $ul.next().find("#numValue").text(value).parents(".product-number").next().find(".beforebuy-txt").text("请勾选您想要商品信息！");

                } else if (value > 99) {
                    //判断是否已存在提示
                    $ul.parents(".product-number").next().find(".beforebuy-txt").text("限购" + maxnum + "件");
                }
            };
            /* 手动改变商品数量*/
            function changeCount() {
                var $this = $(this),
                    $ul = $this.parents(".number"),
                    _s = $this.val(); //当前数量

                //判断是否为正整数
                if (_s.match(detail.regular.pint)) {
                    //是否超过最大值
                    $ul.find('button').removeClass("icon-minus-gray icon-add-gray");
                    if (_s > 99) {
                        $ul.parents(".product-number").next().find(".beforebuy-txt").text("限购" + maxnum + "件");
                        _s = 99;
                        $ul.find('button')[1].className = "add icon-add-gray";
                    } else if (_s <= 0) {
                        _s = 1;
                        $ul.find('a')[0].className = "minus icon-minus-gray ";
                    } else if (_s == 99) {
                        $ul.find('a')[1].className = "add icon-add-gray";
                    }
                    $this.val(_s);
                    $ul.next().find("#numValue").text(_s)
                        .parents(".product-number").next().find(".beforebuy-txt").text("请勾选您想要商品信息！");
                    //判断数量是否变化
                    //通知合计等事件
                } else {
                    $this.val(1);

                }
            };

            //加入购物车
            function addCart() {

                var d = dialog({
                    fixed: true,
                    width: '450px',
                    height: '289px',
                    title: '温馨提示',
                    content: document.getElementById("addCart-box"),
                    cancelValue: '关闭'
                });

                d.showModal();
            }


            //领取优惠卷
            function addCoupon() {
                var d = dialog({
                    fixed: true,
                    width: '283px',
                    height: '165px',
                    title: '温馨提示',
                    content: document.getElementById("addCoupon-box"),
                    cancelValue: '关闭'

                });
                d.showModal();
            }

            //添加到收藏夹
            function collect() {
                var d = dialog({
                    fixed: true,
                    width: '450px',
                    height: '264px',
                    title: '收藏单品',
                    content: document.getElementById("collect-box"),
                    cancelValue: '关闭'
                });
                d.showModal();
            }

            //到货通知登录
            function toGoods() {
                var d = dialog({
                    id: 'addGift',
                    fixed: true,
                    width: '450px',
                    height: '203px',
                    title: '到货通知',
                    content: document.getElementById("togoods-box"),
                    cancelValue: '关闭'
                });
                d.showModal();
            }

            //到货通知提示成功
            function goGoodsEnd() {

                var d = dialog({
                    fixed: true,
                    width: '450px',
                    height: '238px',
                    title: '到货通知',
                    content: document.getElementById("togoods-sub-box"),
                    cancelValue: '关闭'
                });

                //显示遮罩层
                d.showModal();

                dialog({

                    id: "addGift"

                }).close();
            }


            //降价通知
            function toPrice() {
                var d = dialog({
                    id: 'zPrice',
                    fixed: true,
                    width: '450px',
                    height: '248px',
                    title: '降价通知',
                    content: document.getElementById('toprice-box'),
                    cancelValue: '关闭'
                });
                d.showModal();
            }

            //降价通知订阅成功
            function toPriceEnd() {
                var d = dialog({

                    fixed: true,
                    width: '450px',
                    height: '238px',
                    title: '降价通知',
                    content: document.getElementById("toprice-sub-box"),
                    cancelValue: '关闭'
                });
                d.showModal();
                dialog({

                    id: "zPrice"

                }).close();
            }

            //tab选项卡
            function tab() {
                var $detailBox = $('.detail-public .detail-box'),
                    tabCur = "tab-cur",
                    $this = $(this),
                    index = $this.index();

                $this.addClass(tabCur).siblings().removeClass(tabCur);

                $this.parents(".detail-tabcont").find($detailBox).eq(index).removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');


                if ($this.parents(".J_tabFixed").length) {

                    $("html,body").animate({

                        scrollTop: parseInt($('#detailTop').offset().top) - 40

                    }, 300);
                }

            }

            //满增&领卷点击展开
            function rushClick() {

                var _this = $(this),

                    sClassName = "active";

                if (_this.hasClass(sClassName)) {

                    _this.removeClass(sClassName);

                } else {

                    _this.addClass(sClassName);

                }

                _this.parents("li").children('.J_add_box').slideToggle(200);
            }

            //倒计时
            function saleCountTime() {

                var $obj = $("#saleCountTime");

                if (!$obj.length) return;

                var endTime = $obj.attr("data-time") * 1000,

                    dateTime = new Date(),

                    difference = dateTime.getTime() - 0;

                var _action = setInterval(function() {

                    var nowTime = new Date(),

                        nMS = $obj.attr("data-time") * 1000 - nowTime.getTime() + difference,

                        myD = Math.floor(nMS / (1000 * 60 * 60 * 24)), //天

                        myH = Math.floor(nMS / (1000 * 60 * 60)) % 24, //小时

                        myM = Math.floor(nMS / (1000 * 60)) % 60, //分钟

                        myS = Math.floor(nMS / 1000) % 60, //秒

                        myMS = Math.floor(nMS / 100) % 10; //拆分秒

                    if (myD >= 0) {

                        if (myD > 0) {

                            var str = "<span>仅剩：</span>" + myD + " 天 ";

                        } else {
                            var str = "仅剩" + "<strong>" + myH + "</strong>" + "时" + "<strong>" + myM + "</strong>" + "分" + "<strong>" + myS + "." + myMS + "</strong>" + "秒";

                        }

                        $obj.html(str);

                    }


                }, 100);
            }

            //商详页点击直达
            function goAnchor(id) {

                var top = $("#" + id).offset().top;

                $("html,body").stop(true, true).animate({
                    scrollTop: top - 60
                }, 600);
            }

            //商详页点击直达
            function goNav() {

                var _that = $(this);

                goAnchor($(this).attr("data-id"));

                _that.parent().addClass('aside-cur').siblings().removeClass('aside-cur');

            }


        },

        //颜色&规格选择传入（已选择）
        normSelect: function() {
            selectValue();

            $("#productNorm .selectCtrl li").on("click", selectValue);

            function selectValue() {

                var _this = $(this);

                _this.addClass('select').siblings().removeClass('select');

                var strSelect,
                    strColor,
                    strNorm;
                strColor = $("#productNorm .product-color-info li.select").find('span').attr("data-spec");

                strNorm = $("#productNorm .product-format-info li.select").find('span').attr("data-spec");

                strSelect = '<span>“' + strColor + '”</span>' + '<span>“' + strNorm + '”</span>';

                $("#productNorm").find('.product-opt-info p').empty().append(strSelect);
            }

        },

        nowTopActive: function() {

            var thisTop = $('.J_tabFixed').offset().top;

            $(window).on('scroll', function() {

                var goScrollTop = $(window).scrollTop();

                if (goScrollTop >= thisTop) {

                    $('.J_tabFixed').addClass('fixed');

                } else {

                    $('.J_tabFixed').removeClass('fixed');
                }

            });

            $(window).scroll();
        }

        //------------------------通用封装-----------------------------//



    }
    $(function() {

        detail.init();

    });

});

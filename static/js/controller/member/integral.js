/**
 * @ integral
 * @ author zmh.zhu
 * @ date 20141030
 */
define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    var integral = {

        init: function() {

            //tab效果
            integral.tab();

            //移动到问号弹出提示
            integral.showTip();

            //表格hover变色
            //this.showColor();

            //下拉列表
            integral.zSelect();

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


        showTip: function() {

            var $showTip = $("#showTip");

            $showTip.on('mouseenter', function(event) {

                $(this).children('span').show();

            }).on('mouseleave', function(event) {

                $(this).children('span').hide();

            });

        },

        showColor: function() {

            var $table = $(".inte_table"),

                title = "inte_table_title",

                cur = "active";

            $table.on('mouseenter', 'ul', function() {

                if (!$(this).hasClass(title)) {

                    $(this).addClass(cur);

                }

            }).on("mouseleave", "ul", function() {

                $(this).removeClass(cur);

            });

        },

        zSelect: function() {

            var $lis = $('.options li'),

                $current = $('.current'),

                $options = $('.options');

            $lis.on("click", function() {

                var $this = $(this);

                $current.val($this.index());

                $current.html($this.text() + '<i></i>');

                $('.options').hide();

            }).on("mouseenter", function() {

                $(this).addClass("active");

            }).on("mouseleave", function() {

                $(this).removeClass("active");

            });

            $('.zSelect').on('mouseenter', function() {

                $('.options').show();

                $('.zSelect .current').addClass('totop');

            }).on('mouseleave', function() {

                $('.options').hide();

                $('.zSelect .current').removeClass('totop');

            });

        }

    };

    exports.init = integral.init;

});
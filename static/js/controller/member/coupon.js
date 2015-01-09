// JavaScript Document
define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    var coupon = {

        init: function() {

            //tab效果
            coupon.tab();

            /*
            //移动到问号弹出提示
			coupon.showTip();

			//表格hover变色
			coupon.showColor();
			*/

            coupon.toExplain();

            coupon.appMselect();

            coupon.toInfo_bar_wrap();

            coupon.addClass();
        },
        addClass: function() {

            $('.tickets_list').find(">ul>li:nth-child(3n)").addClass('last');
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

        toExplain: function() {
            /*使用说明部分*/
            $('.wrap_explain').on('mouseenter', function() {
                var $this = $(this);
                $this.parent().addClass('bg');
                $this.find('.explain').addClass('up')
                    .find('i').addClass('explain-ih').removeClass('explain-i');

                $this.find('.explain_panel').stop(true).slideToggle("fast"); //explain_pane 说明面板显示

                $this.parent().parent().addClass('zIndex');

            })


            $('.wrap_explain').on('mouseleave', function() {
                var $this = $(this);
                $this.parent().removeClass('bg');
                $this.find('.explain').removeClass('up')
                    .find('i').addClass('explain-i').removeClass('explain-ih');

                $this.find('.explain_panel').stop(true).slideToggle("fast"); //explain_pane 说明面板显示

                $this.parent().parent().removeClass('zIndex');

            })

        },

        plugSwitchClass: function(obj, classA, classB) {
            var oldClass = obj.attr('class') + ' '; //
            //var oldClass='on ';
            var bool = true;

            if (obj.attr('class') == 'on') {


                obj.on('click', function() {

                    if (bool) { //第一次点击

                        obj.attr('class', oldClass + classB);

                    } else { //第二次点击
                        obj.attr('class', oldClass + classA);
                    }
                    bool = !bool;
                });


            } else {
                oldClass = oldClass + ' ';
            }


        },
        /*JS 下拉框*/
        appMselect: function() {
            var $lis = $('.options li'),
                $current = $('.current'),
                $options = $('.options');

            $lis.on("click", function() {

                var $this = $(this);

                //$current.val($this .attr('rel')).html($this .html());

                $current.val($this.attr('rel'));
                $current.html('抵用券类型-' + $this.text() + '<i></i>');

                $('.options').hide();

            }).on("mouseenter", function() {

                $(this).addClass("active");

            }).on("mouseleave", function() {

                $(this).removeClass("active");

            });

            $('.mSelect').on('mouseenter', function() {
                $('.select_wrap').css('background', '#fff');
                $('.options').show();
                $('.mSelect .current').addClass('totop');
            }).on('mouseleave', function() {
                $('.select_wrap').css('background', '#fffef2');
                $('.options').hide();
                $('.mSelect .current').removeClass('totop');
            });
        },

        toInfo_bar_wrap: function() {
            var objs = $('.info_bar_wrap ul li').not('.select_wrap');
            var $this = $(this);
            var _this = this;
            objs.on('click', function() {
                var $this = $(this);
                if ($this.attr('class')) {
                    $this.find('i').toggleClass('ascdesc-i ascdesc-ih');
                } else {
                    $this.addClass('on').siblings().not('.select_wrap').attr('class', '');
                    $this.find('i').addClass('ascdesc-i').removeClass('ascdesc-ih')
                }
                // _this.plugSwitchClass($('.info_bar_wrap .on'),'asc','desc');

            });
        }


    };

    exports.init = coupon.init;

});
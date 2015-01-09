define(function(require, exports, module) {

    var utils = require('../utils');
    var DropDownList = require('dropdownList');

    var Confirm = {
        vars: {
            submitverify: [] //提交验证
        }
        //初始化方法
        ,
        init: function() {
            Confirm.bindEvents();
            Confirm.setSelcct();
            Confirm.invoiceACT();
            Confirm.submitACT();
        },
        setSelcct: function() {
            var _vars = Confirm.vars,
                data = [
                    ['#invoice-select-zhu', {
                        'column': 6,
                        'width': 100
                    }],
                    ['#province', {
                        'column': 6,
                        'width': 100
                    }],
                    ['#city', {
                        'column': 6,
                        'width': 100
                    }],
                    ['#townships', {
                        'column': 6,
                        'width': 100
                    }]
                ];
            _vars.ddl = [];
            $.each(data, function(i, v) {
                var $select = $(v[0]);
                _vars.ddl[i] = DropDownList.create({
                    select: $select,
                    attrs: v[1]
                });
                $select.data('ddl', i)
            });
            console.log(_vars.ddl);
        }
        /*
         *   函数名：verifyAddress
         *   维护人：shaokr
         *   日  期：2014-8-19
         *   依  赖：无
         *   说  明：收货信息验证
         */
        ,
        verifyAddress: function() {
            var _vars = Confirm.vars,
                address_jqs = {
                    $address: $('#confirm-address'),
                    $add: $('#address-add'),
                    $add_a: $('#address-add-a'),
                    $save: $('#address-save'), //确定取消
                    $def: $('#address-default') //默认
                };

            if (address_jqs.$address.find('input[type="radio"]:checked').length === 1 && address_jqs.$add.filter(':hidden').length === 1) {
                _vars.submitverify[0] = [true];
            } else {
                _vars.submitverify[0] = [false, '您需先保存<a href="#confirm-address">收货信息</a>，才能提交订单'];
            }

        }
        /*
         *   函数名：verifyInvoice
         *   维护人：shaokr
         *   日  期：2014-8-19
         *   依  赖：无
         *   说  明：发票信息验证
         */
        ,
        verifyInvoice: function() {
            var _vars = Confirm.vars,
                invoice_jqs = {
                    $invoice: $('#confirm-invoice'),
                    $compile: $("#invoice-compile"),
                    $selcct: $('#invoice-select'),
                    $r2: $('#invoice-r2')
                };

            if (invoice_jqs.$r2.filter(':checked').length === 1) {
                if (invoice_jqs.$selcct.filter(':hidden').length === 1) {
                    _vars.submitverify[1] = [true];
                } else {
                    _vars.submitverify[0] = [false, '您需先保存<a href="#confirm-invoice">发票信息</a>，才能提交订单'];
                }
            } else {
                _vars.submitverify[1] = [true];
            }

        }
        /*
         *   函数名：submitACT
         *   维护人：shaokr
         *   日  期：2014-8-19
         *   依  赖：无
         *   说  明：提交订单动作
         */
        ,
        submitACT: function() {
            var this_jqs = {
                    $bottom: $('#confirm-bottom'),
                    $reel: $('#reel-list'),
                    $reels: $('#reel-list>label'),
                    $clearing: $('#bottom-clearing'),
                    $button: $('#btn_submit'), //提交按钮
                    $warn: $('#bottom-clearing .clearing-warn'), //验证提示
                    $minus: $('#minus')
                },
                _bsub = true;


            //验证事件
            this_jqs.$button.on('sub', function() {
                Confirm.verifyAddress();
                Confirm.verifyInvoice();
                var _bol = true;
                $.each(Confirm.vars.submitverify, function(i, v) {
                    if (!v[0]) {
                        this_jqs.$warn.find('span').html(v[1]);
                        _bol = false;
                        return _bol;
                    }
                });
                if (_bol) {
                    this_jqs.$button.removeClass('btn-close').addClass('btn-red');
                    this_jqs.$warn.hide();
                } else {
                    this_jqs.$button.addClass('btn-close').removeClass('btn-red');
                    this_jqs.$warn.show();
                }
                _bsub = _bol;
            });

            //每秒触发事件
            setInterval(function() {
                this_jqs.$button.trigger('sub');
            }, 1000);

            //提交事件
            this_jqs.$button.on('click.submit', function() {
                this_jqs.$button.trigger('sub');
                if (_bsub) {
                    alert('提交成功:submitACT')
                }
            });

        }

        /*
         *   函数名：invoiceACT
         *   维护人：shaokr
         *   日  期：2014-8-14
         *   依  赖：无
         *   说  明：发票信息中的各种动作
         */
        ,
        invoiceACT: function() {
            var this_jqs = {
                $invoice: $('#confirm-invoice'),
                $compile: $("#invoice-compile"),
                $selcct: $('#invoice-select'),
                $r2: $('#invoice-r2')
            };

            this_jqs.$invoice.find('.invoice-list>label input').on('change', function() {
                var $this = $(this);

                $this.parents('.invoice-list').addClass('invoice-open')
                    .siblings().removeClass('invoice-open');

            });

            //判断是否第一次
            if (this_jqs.$compile.data('one') * 1) {
                this_jqs.$compile.hide().nextAll().show();
                this_jqs.$compile.prev().hide();
            }

            // 编辑按钮事件
            this_jqs.$compile.find('a').on('click', function() {
                this_jqs.$compile.nextAll().stop(true, true).toggle(100);
            });
            // 个人、单位选择
            this_jqs.$selcct.on('change', 'select', function() {
                var $this = $(this);
                if ($this.val() * 1) {
                    $('#invoice-name').show(200);
                } else {
                    $('#invoice-name').hide(200);
                }
            });

            this_jqs.$invoice.find('.invoice-begin button').on('click', function() {
                var _name;
                if (this_jqs.$selcct.find('select').val() * 1) {
                    _name = this_jqs.$selcct.find('input[type="text"]').val()
                } else {
                    _name = this_jqs.$selcct.find('select option').filter(":selected").data('name')
                }
                this_jqs.$compile.find("span").html(_name)

                this_jqs.$compile.show().prev().show();
                this_jqs.$compile.nextAll().stop(true, true).hide(100);
            });

        }
        //事件绑定
        ,
        bindEvents: function() {

            //新增地址
            $("#address-add-a").on("click", Confirm.EventList.addAddress);

            $("#confirm-address").on("click", "a[data-act='del']", Confirm.EventList.delAddress);

            $("#confirm-address").on("click", "a[data-act='edit']", Confirm.EventList.editAddress);

            //保存收货信息
            $("#confirm_add").on("click", Confirm.EventList.confirmAdd);

            //设置默认地址
            $("#confirm-address").on("click", "a[data-act='set']", Confirm.EventList.setDefaultAddress);

            //选择地址
            $("#confirm-address").on("click", "input[name='add']", Confirm.EventList.selectAddress);

            //选择支付方式
            $("#confirm-payment").on("click", ".payment-list:not('.payment-off') input[name='payment']", Confirm.EventList.selectPayType);

            //打开优惠信息详细
            $("#confirm-bottom").on("click", ".a-open", Confirm.EventList.openDetail);

            //添加抵用券
            $("#addDYQ").on("click", Confirm.EventList.addDYQ);

            //添加抵用券
            $("#addGWJ").on("click", Confirm.EventList.addGWJ);

            //添加抵用券
            $("#addYHQ").on("click", Confirm.EventList.addYHQ);

            //显示包裹详细信息
            $("#confirm-payment ").on("mouseenter", ".col-01 a", Confirm.EventList.showProDetail);
            //$("#c_detail").on("mouseenter",function(){$("#c_detail").show();});
            //隐藏包裹详细信息
            $("body").on("mouseout", "#confirm-payment .col-01 a", function(e) {
                $("#c_detail").removeAttr('style').hide();
            });

            $("#confirm-payment").on("click", ".delivery-time-lect-title", Confirm.EventList.showDateSelect);

            $("#confirm-payment").on("click", ".delivery-time-lect-content a", Confirm.EventList.selectDate);

            $("#modify_address").on("click",function(e){
                $(window).scrollTop(0);
            });

            //关闭编辑地址窗口
            $("#address-save .cancel").on("click",function(e){
                $('#address-add').hide();
            });
             //关闭加入购物车打开的规格选择属性
            $("body").on("click",".mask-close-x",function(e){
                $.unblockUI();
            });

            /*//选择发票
            $("#confirm-invoice").on("click","input[name='invoice']",Confirm.EventList.selectInvoice);

            //选择发票类型
            $("#invoice-select").on("click",".dropdown-options a",Confirm.EventList.selectInvoiceType);*/
        },
        EventList: {
            //新增地址
            addAddress: function() {
                var $this = $(this),
                    $add = $("#address-add");

                //清除数据
                $add.data("id", 0).find('input[name]').val('');


                if ($this.next().attr('id') !== 'address-add' || $add.is(':hidden')) {
                    $this.after($add.show())
                    $add.find("h3").css({
                        'visibility': 'visible'
                    })
                }
                /*$("#address-add-a").before($("#address-add"));
                $("#address-add").show();*/
            }
            //保存收货信息
            ,
            confirmAdd: function() {
                var $this_add;
                //判断是否为新增

                if ($("#address-add").children('h3').css("visibility") == "hidden") {
                    $this_add = $("#address-add").prev();
                } else {
                    var data = {
                            'id': 4
                        },
                        $this_add;
                    if ($.trim($("#userName").val()).length == 0) {
                        $("#userName").parent().siblings('.form-verify').show();
                        return false;
                    }
                    if ($.trim($("select[name=province]").val()).length == 0 || $.trim($("select[name=city]").val()).length == 0 || $.trim($("select[name=townships]").val()).length == 0) {

                        $("select[name=province]").parent().siblings('.form-verify').show();
                        return false;
                    }
                    if ($.trim($("#address-address input[name=address]").val()).length == 0) {
                        $("#address-address .form-verify").show();
                        return false;
                    }
                    if ($.trim($("#address-number input[name=cellphone]").val()).length == 0/* && $.trim($("#address-number input[name=telete]").val()).length == 0*/) {
                        $("#address-number .form-verify").show();
                        return false;
                    }
                    $this_add = $('<div class="address-list" data-id="' + data.id + '">' +
                        '<label for="r-' + data.id + '">' +
                        '<dl>' +
                        '<dt><input id="r-' + data.id + '" type="radio" name="add"><span data-add="name">' + $("#userName").val() + '</span></dt>' +
                        '<dd>' +
                        '<span data-add="province">' + $("select[name=province]").val() + '</span>' +
                        '<span data-add="city">' + $("select[name=city]").val() + '</span>' +
                        '<span data-add="townships">' + $("select[name=townships]").val() + '</span>' +
                        '<span data-add="address">' + $("#address-address input[name=address]").val() + '</span>' +
                        '<span class="cellphone" data-add="cellphone">' + $("#address-number input[name=cellphone]").val() + '</span>' +
                        /*'<span class="telete" data-add="telete">' + $("#address-number input[name=telete]").val() + '</span>' +*/
                        '<div class="address-operate">' +
                        '<a href="####" data-act="set">设为默认地址</a>' +
                        '<a href="####" data-act="edit">编辑</a>' +
                        '<a href="####" data-act="del">删除</a>' +
                        '</div>' +
                        '</dd>' +
                        '</dl>' +
                        '</label>' +
                        '</div>');
                }
                $("#address-add-a").before($this_add);
                //判断设置为默认收货地址是否勾选
                if ($("#address-default").prop('checked')) {
                    $this_add.find('[data-act="set"]').click();
                }
                $("#address-add").hide();
            }
            //设置默认收货地址
            ,
            setDefaultAddress: function(e) {
                var $this = $(e.currentTarget),
                    $parent = $this.parents(".address-list");
                $parent.addClass("address-default").siblings().removeClass("address-default")
                    .find('[data-act="set"]').html('设为默认地址');
                $this.html('默认收货地址');
            }
            //选择收货地址
            ,
            selectAddress: function(e) {
                var $this = $(e.currentTarget);
                $this.parents(".address-list").addClass("on")
                    .siblings().removeClass("on");
            }
            //选择支付方式
            ,
            selectPayType: function(e) {
                var $this = $(e.currentTarget);
                $this.parents(".payment-list").addClass("on")
                    .siblings().removeClass("on");
            }
            //选择发票
            ,
            selectInvoice: function(e) {
                if ($(e.currentTarget).attr("id") == "invoice-r1") {
                    $("#invoice_begin").hide();
                } else {
                    $("#invoice_begin").show();
                }
            }
            //选择发票类型
            ,
            selectInvoiceType: function(e) {
                if ($(e.currentTarget).attr("data-value") == 0) {
                    $("#invoice-name").hide(200);
                } else {
                    $("#invoice-name").show(200);
                }
            }
            //打开优惠券详细
            ,
            openDetail: function(e) {
                var $this = $(e.currentTarget),
                    $detail = $this.siblings('.bottom-hide');

                if ($detail.is(":visible")) {
                    $this.parent().removeClass("bottom-open");
                    $this.children().html("+");
                    $detail.hide();
                } else {
                    $this.parent().addClass("bottom-open");
                    $this.children().html("-");
                    $detail.show();
                }

            }
            //添加优惠券
            ,
            addDYQ: function(e) {
                $.blockUI({
                    message: $("#msg_addYHQ").html(),
                    css: {
                        width: '400px',
                        height: '160px',
                        left: ($(window).width() - 400) / 2 + 'px',
                        top: ($(window).height() - 160) / 2 + 'px',
                        border: '6px solid #5c5c5c'
                    }
                });
            }
            //添加购物金
            ,
            addGWJ: function(e) {
                $.blockUI({
                    message: $("#msg_addGWJ").html(),
                    css: {
                        width: '400px',
                        height: '160px',
                        left: ($(window).width() - 400) / 2 + 'px',
                        top: ($(window).height() - 160) / 2 + 'px',
                        border: '6px solid #5c5c5c'
                    }
                });
            }
            //添加购物金
            ,
            addYHQ: function(e) {
                $.blockUI({
                    message: $("#msg_addYHQ").html(),
                    css: {
                        width: '400px',
                        height: '160px',
                        left: ($(window).width() - 400) / 2 + 'px',
                        top: ($(window).height() - 160) / 2 + 'px',
                        border: '6px solid #5c5c5c'
                    }
                });
            }
            //显示包裹详细信息
            ,
            showProDetail: function(e) {
                var $this = $(e.currentTarget),
                    offset = $this.offset();
                offset.top += 23;
                offset.left -= 41;
                $("#c_detail").offset(offset).show();
            },
            showDateSelect: function(e) {
                var $this = $(e.currentTarget);
                $this.parent().addClass("delivery-time-open");
                $this.next().show();
            },
            selectDate: function(e) {
                var $this = $(e.currentTarget),
                    $parent = $this.parents(".delivery-time-lect-content"),
                    $input = $parent.siblings('.delivery-time-lect-title').children('span');
                $input.html($this.attr("data-time")).css({
                    'color': '#3c3c3c'
                });
                $parent.hide().parent().removeClass("delivery-time-open");

            },
            delAddress: function(e) {
                var $parent = $(e.currentTarget).parents(".address-list");
                $parent.animate({
                        height: 0
                    },
                    200,
                    function() {
                        $parent.remove();
                        if($("#address-add>h3").css("visibility")=="hidden"){
                            $("#address-add").hide();
                        }
                    });
            },
            editAddress: function(e) {
                // 编辑按钮
                var $this = $(this),
                    $this_add = $this.parents('.address-list'),
                    this_jqs = {
                        $address: $('#confirm-address'),
                        $add: $('#address-add'),
                        $add_a: $('#address-add-a'),
                        $save: $('#address-save'), //确定取消
                        $def: $('#address-default') //默认
                    },
                    _vars = Confirm.vars;

                //判断当前的下一个元素是否为$add
                if ($this_add.next().attr('id') !== 'address-add' || this_jqs.$add.is(':hidden')) {
                    $this_add.after(this_jqs.$add.show())
                    this_jqs.$add.data('id', $this_add.data('id'));
                    this_jqs.$def.prop('checked', false);
                    this_jqs.$add.find("h3").css({
                        'visibility': 'hidden'
                    })
                }

                $this_add.find('[data-add]').each(function() {
                    var $this = $(this);

                    $xq = this_jqs.$add.find('[name=' + $this.data("add") + ']');

                    switch ($xq.prop('tagName')) {
                        case 'INPUT':
                            $xq.val($this.html());
                            break;
                        case 'SELECT':
                            $xq.find('option').each(function() {
                                if ($(this).html() == $this.html()) {
                                    _vars.ddl[$xq.data('ddl')].val($this.html());
                                    return false;
                                }
                            });
                            break;
                            // not default

                    }

                });
            }

        }
    };

    exports.init = Confirm.init;
});

define(function(require, exports, module) {

    // 引入jquery
    var $ = require('jquery');

    var DropDownList = require('./jq-fn/dropdownlist.js').DropDownList;

    //require('./verify.js');
    var fn_verify = require('./verify.js').fn_verify;

    fn_verify.init();

    var user = {
        vars: {

        },
        jqs: {
            $list: $('#aa-list'),
            $add: $('#address-add'),
            $def: $('#address-default'),
            $add_a: $('#aa-list .list-add'),
            $new_list: $('#new-list'),
            $add_address: $("#add_address")
        },

        init: function() {
            user.setSelcct();
            user.listACT();
        },

        //创建自定义下拉
        setSelcct: function() {
            var _vars = user.vars,
                data = [
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
                $select.data('ddl', i);
            });
        },

        //各种操作
        listACT: function() {
            var _vars = user.vars,
                _jqs = user.jqs;
            //点击保存
            _jqs.$list.find('.confirm').on('click', function() {
                var $this_add;
                if (fn_verify.verify('#address-add')) {
                    //判断是否为新增
                    if (_jqs.$add.data('id')) {
                        $this_add = _jqs.$add.prev();
                    } else {
                        var data = {
                            'id': 4
                        };
                        $this_add = _jqs.$new_list.clone();
                        $this_add.data('id', data.id)
                        _jqs.$add_a.before($this_add)
                    }

                    //输出数据到页面
                    $this_add.find('[data-add]').each(function() {
                        var $this = $(this),
                            $xq = _jqs.$add.find('[name=' + $this.data('add') + ']');

                        switch ($xq.prop('tagName')) {
                            case 'INPUT':
                                $this.html($xq.val())
                                break;
                            case 'SELECT':
                                $this.html($xq.find('option').filter(":selected").html())
                                break;
                                // not default

                        }
                    });
                    //判断设置为默认收货地址是否勾选
                    if (_jqs.$def.prop('checked')) {
                        $this_add.find('[data-act="set"]').click();
                    }

                    _jqs.$add.prev().show();
                    //隐藏
                    _jqs.$add.hide(100);
                }
            });

            //取消
            _jqs.$list.find('.cancel').on('click', function() {
                _jqs.$add.prev().show();
                _jqs.$add.hide(100);
            });


            //设为默认
            _jqs.$list.on('click.set', '[data-act="set"]', function() {
                var $this = $(this),
                    $this_add = $this.parents('ul');

                $this_add.find('input').prop('checked', true);
                $this_add.addClass('list-on').siblings('ul').removeClass('list-on').find('.td-04').html('<a href="####" data-act="set">设为默认收货地址</a>');
                $this.parent().html('默认收货地址');

                return false;
            });
            //修改
            _jqs.$list.on('click.edit', '[data-act="edit"]', function() {
                var $this = $(this),
                    $this_add = $this.parents('ul');

                $this_add.hide();
                _jqs.$add.prev().show();
                _jqs.$add.find('.form-verify').removeClass("show");
                //判断当前的下一个元素是否为$add
                if ($this_add.next().attr('id') !== 'address-add' || _jqs.$add.is(':hidden')) {
                    $this_add.after(_jqs.$add.show())
                    _jqs.$add.data('id', $this_add.data('id'));
                    _jqs.$def.prop('checked', false);
                    _jqs.$add.find("h3").html('修改地址')
                }

                $this_add.find('[data-add]').each(function() {
                    var $this = $(this);

                    $xq = _jqs.$add.find('[name=' + $this.data("add") + ']');

                    switch ($xq.prop('tagName')) {
                        case 'INPUT':
                            $xq.val($this.html());
                            break;
                        case 'SELECT':
                            $xq.find('option').each(function() {
                                if ($(this).html() == $this.html()) {
                                    _vars.ddl[$xq.data('ddl')].val($this.html())
                                    return false;
                                }
                            });
                            break;
                            // not default

                    }

                });

                return false;

            });

            //删除
            _jqs.$list.on('click.del', '[data-act="del"]', function() {
                var $this = $(this),
                    $this_add = $this.parents('ul');
                if (confirm('是否确实删除!')) {
                    if ($this_add.next().attr('id') === 'address-add') {
                        _jqs.$add.hide(100);
                    }
                    $this_add.remove();
                }
                return false;
            });

            //新增
            _jqs.$list.find(".list-add").on('click', function() {
                var $this = $(this);
                _jqs.$add.prev().show();
                $this.hide();

                //清除数据
                _jqs.$add.data("id", 0).find('input[name]').val('');
                _jqs.$add.find('.form-verify').removeClass("show");

                if ($this.next().attr('id') !== 'address-add' || _jqs.$add.is(':hidden')) {
                    $this.after(_jqs.$add.show());
                    _jqs.$add.find("h3").html('增加新地址');

                }

            });

            //添加
            _jqs.$add_address.on('click', function() {

                var $this = _jqs.$list.find(".list-add");
                _jqs.$add.prev().show();
                $this.hide();

                //清除数据
                _jqs.$add.data("id", 0).find('input[name]').val('');
                _jqs.$add.find('.form-verify').removeClass("show");

                if ($this.next().attr('id') !== 'address-add' || _jqs.$add.is(':hidden')) {
                    $this.after(_jqs.$add.show());
                    _jqs.$add.find("h3").html('增加新地址');

                }


            });

        }

    };

    //把user对象传到外部
    exports.init = user.init;

});
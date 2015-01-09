define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    /*!
     * @ page
     * @ description 验证类
     * @ author Lewis.ye
     * @ date 2014-06-19
     */
    var fn_verify = {

        init: function() {

            fn_verify.addverify();

        },

        vars: {
            "name": /./,
            "address": /./,
            "cellphone": /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            "telete": /./,
            "province": /./,
            "city": /./,
            "townships": /./,
            nbool: true
        },

        /*!
         * @ author shaokr
         * @ 创建验证
         * @ date 2014-09-4
         * @ 当前只支持一组
         */

        addverify: function() {
            //_val=$.trim($this.val()).match(eval(self.vars.email)),
            var self = this;
            self.t = {};
            self.b = {};
            //获取所以含data-fn-verify的元素
            $("[data-fn-verify]").each(function() {
                var $ps = $(this);
                //把所有带data-fv-t数据写入对象self.t中
                $ps.find('[data-fv-t]').each(function() {
                    var $this = $(this),
                        _t = $this.data('fv-t');
                    if (!self.t[_t]) {
                        self.t[_t] = $ps.find('[data-fv-t="' + _t + '"]');
                    }
                });
                //把所有带data-fv-b数据写入对象self.b中
                $ps.find('[data-fv-b]').each(function() {
                    var $this = $(this),
                        _b = $this.data('fv-b');
                    self.b[_b] = $this;
                })
                //事件委派到select中
                $ps.on("change", "select", function(e) {
                    var $this = $(this),
                        _name = $this.data("name") || $this.attr("name") || false;
                    //判断是否存在验证方法
                    if (_name && self.vars[_name]) {
                        self.regular($this, e, _name);
                    } else {
                        console.log('无!')
                    }

                });
                //事件委派到input中
                $ps.on("blur", "input", function(e) {
                    var $this = $(this),
                        _name = $this.data("name") || $this.attr("name") || false;
                    //判断是否存在验证方法
                    if (_name && self.vars[_name]) {
                        self.regular($this, e, _name);
                    } else {
                        //console.log('无正则!')
                    }

                });

            });

        },
        //使用正则验证数据
        regular: function($this, e) {
            var self = this,
                _id = $this.data('fv-t'),
                _bool = true;
            //判断是否存在验证提示
            if (self.b[_id].length) {
                //判断验证关联(默认为并且)
                switch (self.b[_id].data('fv-of')) {
                    //或者
                    case 'or':
                        _bool = false;
                        self.t[_id].each(function() {
                            var $this = $(this),
                                _name = $this.data("name") || $this.attr("name") || false,
                                _val = "";
                            if (_name && self.vars[_name]) {
                                _val = $.trim($this.val()).match(self.vars[_name]);
                            } else {
                                _val = true;
                            }

                            if (_val) {
                                _bool = true;
                                return false;
                            }
                        })

                        break;
                    default:
                        self.t[_id].each(function() {
                            var $this = $(this),
                                _name = $this.data("name") || $this.attr("name") || false,
                                _val = "";
                            if (_name && self.vars[_name]) {
                                _val = $.trim($this.val()).match(self.vars[_name]);
                            } else {
                                _val = true;
                            }
                            if (!_val) {
                                _bool = false;
                                return false;
                            }
                        })

                }

            }

            self.result(_id, _bool);
            return _bool;

        },

        // 验证所在区域下的所有数据
        verify: function(e) {

            var self = this,
                _bool = true,
                $verify = $(e);
            if ($verify.length) {
                //获取所以含data-fn-verify的元素
                $verify.find("input,select").each(function() {

                    var $this = $(this),
                        _name = $this.data("name") || $this.attr("name") || false;
                    //判断是否存在验证方法
                    if (_name && self.vars[_name]) {
                        if (!self.regular($this, e)) {
                            _bool = false;
                        }
                    } else {
                        //console.log('无正则!')
                    }
                });
            }

            return _bool;

        },

        // 结果处理
        result: function(_id, res, fun) {
            var self = fn_verify;

            fun = fun || '';
            if (fun && typeof fun === "function") {
                fun($this, res);
            } else {

                if (res) {
                    self.b[_id].removeClass("show");
                    self.t[_id].removeClass("colour-red");
                } else {
                    self.b[_id].addClass("show");
                    self.t[_id].addClass("colour-red");
                }

            }
        }

    };
    //把user对象传到外部
    exports.fn_verify = fn_verify;

});
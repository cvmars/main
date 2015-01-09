define(function(require, exports, module) {
    require('jquery');

    function niaoSlider(obj, options) {
        this.init(options, $(obj));
    }
    niaoSlider.defaults = {
        wrapper: ">.slide-wrapper",
        pagerlist: ">.slide-pager .pagelist",
        pagercurrent: ">.slide-pager .pagenum .current",
        pagertotal: ">.slide-pager .pagenum .total",
        pagerprev: ">.slide-pager .pagebtn .prev",
        pagernext: ">.slide-pager .pagebtn .next",
        pagerlist: ">.slide-pager .pagelist",
        duration: 300,
        auto: false,
        delay: 5000
    }
    niaoSlider.prototype = {
        init: function(options, obj) {
            var that = this;
            this.dom = $(obj);
            this.options = options = $.extend({}, niaoSlider.defaults, options);
            this.wrapper = getDom(options.wrapper, obj);
            this.pagerlist = getDom(options.pagerlist, obj);
            this.pagercurrent = getDom(options.pagercurrent, obj);
            this.pagertotal = getDom(options.pagertotal, obj);
            this.pagerprev = getDom(options.pagerprev, obj);
            this.pagernext = getDom(options.pagernext, obj);
            this.pagerlist = getDom(options.pagerlist, obj);
            this.items = this.wrapper.children();
            this.itemWidth = this.wrapper.children().eq(0).width();
            this.wrapper.width(this.items.length * this.itemWidth);
            this.pagertotal.text(this.items.length);
            this.autoTimer;
            this.pagerprev.click(function(e) {
                that.prev();
                e.preventDefault();
            });
            this.pagernext.click(function(e) {
                that.next();
                e.preventDefault();
            });
            if (this.pagerlist.length > 0) {
                this.pagerlist.empty().append(new Array(this.items.length + 1).join("<li><a></a></li>"));
                this.pagerlist.find("a").each(function(i, item) {
                    $(item).click(function() {
                        that.goto(i);
                    });
                });
            }
            this.goto(0);

            function getDom(func, obj) {
                if (typeof func == "string") {
                    return $(func, obj);
                } else if ($.isFunction(func)) {
                    return func.call(obj);
                } else {
                    return null;
                }
            }
            if (!!options.auto) {
                this.startPlay();
                $(this.dom).hover(function() {
                    that.stopPlay();
                }, function() {
                    that.startPlay();
                });
            }
        },
        goto: function(i) {
            if (this.current == i) return;
            var that = this;
            this.current = i;
            this.wrapper.stop(false, false).animate({
                left: -i * this.itemWidth
            }, this.options.duration);
            that.setUI(i);
        },
        prev: function() {
            var that = this,
                current = this.current;
            if (current == 0) {
                this.goto(this.items.length - 1);
            } else {
                this.goto(current - 1 < 0 ? 0 : current - 1);
            }
        },
        next: function() {
            var that = this,
                current = this.current;
            if (current == this.items.length - 1) {
                that.goto(0);
            } else {
                this.goto(current + 1 > this.items.length - 1 ? this.items.length - 1 : current + 1);
            }
        },
        setUI: function(index) {
            (this.current == 0 ? $.fn.addClass : $.fn.removeClass).call(this.pagerprev, "");
            (this.current == this.items.length - 1 ? $.fn.addClass : $.fn.removeClass).call(this.pagernext, "");
            this.pagercurrent.text(this.current + 1);
            if (this.pagerlist.length > 0) {
                this.pagerlist.find("a").each(function(i, item) {
                    (i != index ? $.fn.removeClass : $.fn.addClass).call($(item), "on");
                });
            }
        },
        autoNext: function() {
            var next = this.current + 1;
            if (next >= this.items.length) {
                next = 0;
            }
            this.goto(next);
        },
        startPlay: function() {
            this.autoTimer = setInterval((function(o) {
                return function() {
                    o.autoNext();
                }
            })(this), this.options.delay);
        },
        stopPlay: function() {
            if (this.autoTimer) {
                clearInterval(this.autoTimer);
            }
        }

    };
    $.fn.extend({
        niaoSlider: function(options) {
            return new niaoSlider(this, options);
        }
    });
});

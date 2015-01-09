define(function(require, exports, module) {

    require('jquery'); //依赖jquery
    require('blockUI'); //依赖jquery.blockUI

    var FN = {
        config: {
            waitMsg: "正在拼命为您处理，请耐心等候",
            loadingImg: "../../images/busy.gif"
        },

        init: function() {
            this.extendJQuery();
            jQuery('.p_placeholder').placeholder();
        },

        /*
         * 绑定事件
         * @parentNode 父节点
         * @eventType 事件类型
         * @eventNode 事件节点
         * @cancelBubble 事件冒泡
         * @callback 回调方法
         */
        bindEvent: function(parentNode, eventType, eventNode, cancelBubble, callback) {

            function withCancelBubble(event) {

                var e = event || window.event;

                //阻止事件冒泡
                e && e.stopPropagation ?
                    e.stopPropagation() :
                    e.cancelBubble = true;
            }

            cancelBubble ?
                parentNode === eventNode ?
                $(eventNode).on(eventType, function(event) {
                    withCancelBubble(event);
                    //执行回调
                    callback(event);
                }) :
                $(parentNode).on(eventType, eventNode, function(event) {
                    withCancelBubble(event);
                    //执行回调
                    callback(event);
                }) :
                parentNode === eventNode ?
                $(eventNode).on(eventType, callback) :
                $(parentNode).on(eventType, eventNode, callback);

        },

        /*
         * 自定义jquery扩展方法
         */
        extendJQuery: function() {

            /*
             * 处理placeholder
             * 处理对象：所以带有placeholder属性的input
             * 处理逻辑：动态改变value值及颜色
             */
            jQuery.fn.placeholder = function() {
                var $this = $(this);
                $.each($this, function(index, val) {
                    var $val = $(val),
                        placeholder = $val.attr("placeholder");

                    $val.val(placeholder);
                    $val.removeAttr('placeholder');
                    $val.css({
                        'color': "#cecfc9"
                    });

                    $val.focus(function(event) {
                        if ($val.val() == placeholder) {
                            $val.val("");
                            $val.removeAttr('style');
                        }
                    }).blur(function(event) {
                        if ($val.val() == "") {
                            $val.val(placeholder);
                            $val.removeAttr('style');
                            $val.css({
                                'color': "#cecfc9"
                            });
                        }
                    });

                });
            };

        },
        /*
         * 蒙版
         */
        mask: function(a) {
            var $mask = $('.mask'),
                a = a || (a === 0 ? 0 : 500);
            $('body').on('click', '[data-mask]', function() {
                $mask.stop(true, true).fadeToggle(a);
                $mask.find('[data-mid=' + $(this).data('mask') + ']').show();
                return false;
            });

            $mask.click(function (event) {
                if (!$.contains(this, event.target) || $(event.target).data("x")) {
                    $mask.stop(true, true).fadeToggle(a)
                    $mask.find(">").hide();
                    return false;
                }

            });

        }
    };

    exports.FN = FN;
});

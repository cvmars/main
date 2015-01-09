/*
 *  @name  我的账户首页入口js        //项目名称
 *  @Copyright feiniu                //版权声明
 *  @Designed and built by frontEnd  @joker.ye zmh.zhu //制作人
 *  @date 2014-9-10           //制作时间
 *  @update 2014-12-08        //最后更新时间
 */
define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    //定义user对象
    var user = {

        vars: {},

        jqs: {

            $list: $('#user-order-list'), //订单列表

            $greeting: $('#greeting') //问候


        },

        init: function() {

            user.delOrder();

            user.getTimeGreeting();

            user.getInlineHeight();

        },

        /* module: 获取问候语 by @zmh.zhu */
        delOrder: function() {

            var _jqs = user.jqs;

            _jqs.$list.on('click', '[data-del]', function() {

                var $this = $(this);

                if (confirm('确认删除订单吗？')) {

                    //获取订单号ID
                    $this.data('del');

                    $this.parents('tbody').slideUp();

                }

            });

        },

        /* module: 获取问候语 by @zmh.zhu */
        getTimeGreeting: function() {

            var _jqs = user.jqs,
                _date = new Date(),
                _h = _date.getHours(),
                _data = [
                    [8, 11, '早上好，欢迎来到飞牛网'],
                    [11, 14, '中午要吃饱，飞牛要逛好'],
                    [14, 16, '下午好啊，喝杯茶提提神吧'],
                    [16, 19, '逛累了吗，伸个懒腰舒展一下吧'],
                    [19, 23, '晚上好，欢迎来到飞牛网'],
                    [23, 6, '早睡早起身体好，晚安咯'],
                    [6, 8, '每一天都是新的开始，加油哦']
                ];

            $.each(_data, function(i, v) {

                if (v[1] - v[0] > 0) {

                    if (v[0] <= _h && v[1] > _h) {

                        _jqs.$greeting.html(v[2]);

                        return false;

                    }

                } else if ((v[0] <= _h && 24 > _h) || (0 <= _h && v[1] > _h)) {

                    _jqs.$greeting.html(v[2]);

                    return false;

                }

            });

        },

        /* module: 获取行高 by @joker.ye */
        getInlineHeight: function() {


            var list_height = $(".list_td").find(">ul>li:first()").height() + "px";

            $(".list_td").find(".list-td-02").css("line-height", list_height);

        }

    };

    // exports.init = user.init;
    module.exports = user;

});

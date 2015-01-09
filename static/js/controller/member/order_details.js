define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    require('./jquery.artDialog.js');

    var order_details = {

        init: function() {

            //显示优惠券popup
            order_details.showVoucherInfo();

        },

        showVoucherInfo: function() {

            $(".invoices").on('click', function(event) {

                art.dialog({

                    title: "换开发票",

                    background: "#000",

                    opacity: 0.4,

                    lock: true,

                    content: $("#addVouchers").html(),

                    width: 670,

                    height: 285,

                    quickClose: true,

                    button: [{

                        name: "确认发送",

                        className: "btn_ok"

                    }, {

                        name: "关闭",

                        className: "btn_no"

                    }]

                });

            });

            //详情弹窗

            $(".tip3").on('click', function(event) {

                art.dialog({

                    title: "活动说明",

                    background: "#000",

                    opacity: 0.4,

                    lock: true,

                    content: $("#voucherDetails").html(),

                    width: 470,

                    height: 110,

                    quickClose: true,

                    button: [{

                        name: "关闭",

                        className: "btn_no"

                    }]

                });

            });

        }
    };

    module.exports = order_details;

});
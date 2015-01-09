/**
 * @ integral
 * @ author zmh.zhu
 * @ date 20141030
 */
define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    require('./jquery.artDialog.js');

    var vouchers = {

        init: function() {

            //显示优惠券popup
            vouchers.showVoucherInfo();

        },

        showVoucherInfo: function() {


            $(".vouchers_details").on('click', function() {


                art.dialog({

                    title: "抵用券明细",

                    background: "#000",

                    opacity: 0.4,

                    lock: true,

                    content: $("#voucherDetails").html(),

                    width: 800,

                    height: 300,

                    cancel: true,

                    button: [{

                        name: "取消",

                        className: "btn_no"

                    }]


                });

            });

            $("#redeemCoupon").on('click', function(event) {

                art.dialog({

                    title: "添加抵用券",

                    background: "#000",

                    opacity: 0.4,

                    duration: 0,

                    lock: true,

                    content: $("#addVouchers").html(),

                    width: 500,

                    height: 170,

                    quickClose: true,

                    button: [{

                        name: "兑换抵用券",

                        className: "btn_ok"

                    }, {

                        name: "取消",

                        className: "btn_no"

                    }]
                });

            });
        }
    };

    exports.init = vouchers.init;

});
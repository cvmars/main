define(function(require, exports, module) {

    // 引入jquery
    require('jquery');

    require('./jquery.artDialog.js');

    var shopping_gold = {

        init:function(){

            //显示优惠券popup
            shopping_gold.showVoucherInfo();

        },

        showVoucherInfo:function(){


            $(".shoppingCardDetails").on('click', function() {


                art.dialog({

                    title:"购物卡余额消费明细",

                    background:"#000",

                    opacity:0.4,

                    lock:true,

                    content:$("#voucherDetails").html(),

                    width:800,

                    height:300,

                    cancel: true,

                    quickClose: true,

                    button:[{

                        name:"取消",
                        
                        className: "btn_no"

                    }]

                });             

            });

            $("#Immediately_recharge").on('click', function(event) {

                art.dialog({

                    title:"购物卡充值",

                    background:"#000",

                    opacity:0.4,

                    lock:true,

                    content:$("#addVouchers").html(),

                    width:500,

                    height:170,

                    quickClose: true,

                    button:[{

                        name:"兑换抵用券",

                        className: "btn_ok"

                    },{

                        name:"取消",
                        
                        className: "btn_no"

                    }]
                }); 

            });

        }

    };

    exports.init = shopping_gold.init;

});
define(function(require, exports, module) {

    // 引入jquery
    var $ = require('jquery');

    require('lib/common.js');

    var url= require('url');

    console.log(url);

    $(function() {

        route.init();

    });

    //定义user对象
    var route = {

        init:function(){

            var urlParam = $.getUrlParam("t");

            if(urlParam === "index"){

                loadData("./index.html","./index.js");

            }else if(urlParam === "order"){

                loadData("order/index.html","./index.js");

            }else if(urlParam === "order_details"){

                loadData("order/order_details.html","./order_details.js");

            }else if(urlParam === "integral"){

                loadData("integral.html","./integral.js");

            }else if(urlParam === "favorites"){

                loadData("favorites.html","./favorites.js");

            }else if(urlParam === "commentary"){

                loadData("commentary.html","./commentary.js");

            }else if(urlParam === "evaluation"){

                loadData("evaluation.html","./evaluation.js");

            }else if(urlParam === "vouchers"){

                loadData("vouchers.html","./vouchers.js");

            }else if(urlParam === "shopping_card"){

                loadData("shopping_card.html","./shopping_card.js");

            }else if(urlParam === "coupon"){

                loadData("coupon.html","./coupon.js");

            }else if(urlParam === "shopping_gold"){

                 loadData("shopping_gold.html","./shopping_gold.js");

            }else if(urlParam === "address"){

                loadData("address.html","./address.js");

            }else if(urlParam === "security"){

                loadData("./security/index.html");

            }else if(urlParam === "change_passwd"){

               loadData("./security/change_passwd.html","./security.js");

            }else if(urlParam === "forget_passwd"){

                loadData("./security/forget_passwd.html","./security.js");

            }else if(urlParam === "set_paymentCode"){

                loadData("./security/set_paymentCode.html","./security.js");

            }else if(urlParam === "change_mailVerify"){

                loadData("./security/change_mailVerify.html","./security.js");

            }

            //数据加载函数
            //@param html_path 要添加进来的内容
            //@param js_path需要异步执行的脚本路径
            function loadData(html_path,js_path,id){

                if(!html_path)return;

                id = (typeof(id)==="undefined"?"mainContent":id);

                $.loadBlock(html_path, id, true, function() {

                    if(!js_path)return;

                    require.async(js_path,function(obj){

                        //debugger;
                        if(obj && obj.init){

                             obj.init();

                        }


                    });

                });

            }

        }

    };

});
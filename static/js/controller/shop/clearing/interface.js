/*
 *  @name 购物车列表页面UI交互
 *  @Copyright feiniu         //版权声明
 *  @Designed @beson.liu       //制作人
 *  @date 2014-12-10           //制作时间
 *  @update 2014-12-10        //最后更新时间
 */
define(function(require, exports, module) {

    //公共方法
    var utils = require('../utils');

    //下拉框UI组建引入
    var DropDownList = require('dropdownList');

    var Cart = {

        vars:{
            $total          :$(".cc-total"),             //结算栏
            delMsgInternal  :null
        }
        //正则 匹配数字
        ,regular:{
            pint:/^[0-9]\d*$/
        }

        //初始化方法
        ,init:function(){
            Cart.setSelcct();
            Cart.bindEvents();
            Cart.scrolls();
            Cart.resize();
        }
        ,resize:function(){

            $(window).resize(function(event) {

                var $blockUI = $(".blockUI.blockMsg.blockPage"),
                    width = $blockUI.width(),
                    height = $blockUI.height();

                //如有遮罩层，重新计算遮罩层位置
                if($blockUI.length>0){
                    $blockUI.css({
                        left: ($(window).width() - width) / 2 + 'px',
                        top: ($(window).height() - height) / 2 + 'px'
                    });
                }

            });
        }
        //确认对话框
        //@offset 显示位置
        //@callback 回调方法
        ,alterBox:function(offset,callback){
            var $alter_coupon = $("#alter_coupon");
            offset.left = offset.left-$alter_coupon.width()+76;
            offset.top = offset.top-$alter_coupon.height()-14;
            $alter_coupon.show().offset(offset);
            $("#alter_coupon .btn-red").click(function(event) {
                $alter_coupon.hide();
                if(typeof callback==="function"){
                    callback();
                    callback=null;
                }
                return false;
            });

        }
        //确认对话框
        //@msg 提示信息
        //@offset 显示位置
        //@callback 回调方法
        //@docb 是否显示取消按钮
        //@content 容器ID
        ,confirmBox:function(msg,offset,callback,docb,content){
            var content = content||"confirmBox";
            $("#"+content+" .msg_content").html(msg);

            if(docb!=undefined&&docb==false){
                $("#"+content+ " .btn_cancel").hide();
            }
            else{
                $("#"+content+ " .btn_cancel").show();
            }
            offset.left = offset.left-$("#"+content).width()+76;
            offset.top = offset.top-$("#"+content).height()-14;
            $("#"+content).show().offset(offset);
            $("#"+content+ " .btn_confirm").click(function(event) {
                $("#"+content).hide();
                if(typeof callback==="function"){
                    callback();
                    callback=null;
                }
                return false;
            });

        }
        //删除提示
        //@count 删除个数
        ,showDelMsg:function(count){

            var $show_delMsg = $("#show_delMsg");

            clearTimeout(Cart.vars.delMsgInternal);
            var scrollTop = $(window).scrollTop(),
                msgTop =$(".clearing-c").offset().top-$show_delMsg.height();
            $("#del_count").html(count);
            if(scrollTop>msgTop){
                $show_delMsg.addClass("fixed").show(200);
            }
            else{
                $show_delMsg.removeClass("fixed").show(200);
            }
            //Cart.vars.delMsgInternal = setTimeout(function(){$("#show_delMsg").hide("slow")},10000);
        }

        //初始化下拉框样式
        ,setSelcct:function(){

            var _vars=Cart.vars,
                data=[
                    ['#areaselect',{'column' : 6,'width' : 68}],

                    ['#ddl_album',{'column' : 6,'width' : 148}]

                ];
            _vars.ddl=[];
            $.each(data,function(i,v){
                var $select=$(v[0]);
                _vars.ddl[i]=DropDownList.create({
                    select: $select,
                    attrs:v[1]
                });
                $select.data('ddl',i);
            });
        }
        ,scrolls:function(){
            var self   =this,
                _vars  =this.vars,
                $d2    =_vars.$total.find('.div-02'),
                $window=$(window);

            //判断是否超过预定位置
            if(_vars.$total.offset().top-$window.scrollTop()-$window.height()+150<=0){
                $d2.removeClass('on');
            }else{
                $d2.addClass('on');
            }

            //注册窗口滚动事件
            $(window).scroll(function(e){
                var $this=$(this),
                    scrollTop = $window.scrollTop(),
                    $show_delMsg = $("#show_delMsg"),
                    contentTop = $(".clearing-c").offset().top,
                    msgTop =contentTop-$show_delMsg.height();

                //判断是否超过预定位置
                if(_vars.$total.offset().top-scrollTop-$window.height()+80<=0){
                    $d2.removeClass('on');
                }else{
                    $d2.addClass('on');
                }

                //删除提示信息
                if($show_delMsg.hasClass("fixed")&&scrollTop<contentTop){
                    $show_delMsg.removeClass("fixed");
                }
                else if(!$show_delMsg.hasClass("fixed")&&scrollTop>msgTop){
                    $show_delMsg.addClass("fixed");
                }

            });

        }
        ,bindEvents:function(){
            var $packageList = $("#packageList");
            //凑单免邮
            $packageList.on("click",".for-freefee",Cart.EventList.forFreeFee);

            //关闭凑单免邮
            $packageList.on("click",".fn-btn-carclose2",Cart.EventList.closeFreeFee)

            //切换商品规格
            $("body").on("click",".fn-sizeselect-box li a",Cart.EventList.selectOption);

            //选择商品
            $packageList.on("click",".td-01 input",Cart.EventList.selectOnePro);

            //全部包裹之外的全选
            $("#qx-1,#qx-2").on("click",Cart.EventList.packageAll);

            //包裹内全选
            $packageList.on("click",".all-select",Cart.EventList.selfPackageAll);

            //增加减少商品数量
            $packageList.on("click",".add-minus button",Cart.EventList.addOrMinus);

            //选择商品数量改变
            $packageList.on('change','.add-minus input',Cart.EventList.changeCount);

            //确认删除选择商品
            $packageList.on('click','.a-delete',Cart.EventList.beforeDeletePro);

            //删除选择商品
            $packageList.on('delete','.a-delete',Cart.EventList.deletePro);

            //确认修改优惠券
            $packageList.on('click','.a-alter',Cart.EventList.beforeAlterPro);

            //修改优惠券
            $packageList.on('delete','.a-alter',Cart.EventList.alterPro);

            //确认删除选中商品
            $("#del_selectPro").on('click',Cart.EventList.beforeDeleteSelectPro);

            //删除选中商品
            $("#del_selectPro").on('delete',Cart.EventList.deleteSelectPro);

            //确认清空购物车
            $("#del_allCart").on("click",Cart.EventList.beforeDelAllCart);

            //清空购物车
            $("#del_allCart").on("delete",Cart.EventList.delAllCart);

            //加入购物车
            $("body").on("click",".add2cart",Cart.EventList.addToCart);

            //确定添加
            $("body").on("click",".fn-btn-carconfirm",Cart.EventList.confirmAdd);

            //撤销删除
            $("#back_delete").on("click",Cart.EventList.backDelete);

            //关闭对话框
            $("#spc_confirmBox .btn_cancel").on("click",function(e){
                $('#spc_confirmBox').hide();
            });

            //关闭对话框
            $("#confirmBox .btn_cancel").on("click",function(e){
                $('#confirmBox').hide();
            });
            //关闭选择规格窗口
            $("body").on("click",".mk-title i",function(e){
                $.unblockUI();
            });

            //关闭优惠券选择窗口
            $("#alter_coupon .coupon-close").on("click",function(e){
                $('#alter_coupon').hide();
            });

        }

        ,EventList:{
            //凑单免邮
            forFreeFee:function(e){
                var content =$(e.currentTarget).parents(".fee-top").children(".clearing-recommend");
                if(content.is(":visible")){
                    content.hide();
                }
                else{
                    content.show();
                }
            }
            //切换商品规格
            ,selectOption:function(e){
                var $this = $(e.currentTarget),
                    $as = $this.parent().siblings().children();
                $as.removeClass('selecton');
                $this.addClass('selecton');
            }
            //选择商品
            ,selectOnePro:function(e){
                var $this = $(e.currentTarget),
                    $ul = $this.parents("ul");
                    if($this.prop("checked") == true){
                        $ul.addClass("on");
                    }
                    else{
                        $ul.removeClass("on");
                    }
            }
            //全选
            ,packageAll:function(e){
                var checked = $(e.currentTarget).prop("checked"),
                    $qx = $("#qx-1,#qx-2"),
                    $all_select = $("#packageList .all-select"),
                    $checkboxs = $("#packageList .one-package").find('input[type=checkbox]');
                if(checked){
                    $qx.prop("checked",true);
                    $all_select.prop("checked",true);
                    $checkboxs.find('input[type=checkbox]').prop("checked",true);
                }
                else{
                    $qx.prop("checked",false);
                    $all_select.prop("checked",false);
                    $checkboxs.prop("checked",false);
                }
            }
            //包裹内全选
            ,selfPackageAll:function(e){

                var $this = $(e.currentTarget);
                if($this.prop("checked")){
                    $this
                        .parents(".fee-top")
                        .next(".one-package")
                        .find('input[type=checkbox]').prop("checked",true);
                }
                else{
                    $this
                        .parents(".fee-top")
                        .next(".one-package")
                        .find('input[type=checkbox]').prop("checked",false);
                }
            }
            //增加减少商品数量
            ,addOrMinus:function(e){
                var $this = $(e.currentTarget),
                    $ul =$this.parents("ul"),
                    $input = $this.siblings("input"),
                    value = parseInt($input.val()) + parseInt($this.attr("value"));
                //此处最大最小值需要根据具体业务逻辑设定
                if(value>0&&value<=99){
                    $input.val(value);
                    if(value==1){
                        $ul.find('button')[0].className="icon-minus icon-minus-gray";
                    }
                    else if(value==99){
                        $ul.find('button')[1].className="icon-add icon-add-gray";
                    }
                    else{
                        $ul.find('button').removeClass("icon-minus-gray icon-add-gray");
                    }
                }
                else if(value>99){
                    //判断是否已存在提示
                    if(!$ul.find('.cl-xg').length){

                        var $xg=$('<div class="cl-xg">限购'+99+'件<i class="icon-triangle-02"></i></div>');
                        $ul.find('.td-04 .add-minus').append($xg);
                        $xg.show(100);
                        setTimeout(function(){$xg.remove();},20000000);     //2秒后消失
                    }
                }
            }
            //选择商品数量改变
            ,changeCount:function(){
                var $this     =$(this),
                    $ul       =$this.parents("ul"),
                    _s        =$this.val();                       //当前数量

                //判断是否为正整数
                if(_s.match(Cart.regular.pint)){
                    //是否超过最大值
                    $ul.find('button').removeClass("icon-minus-gray icon-add-gray");
                    if(_s>99){
                        //判断是否已存在提示
                        if(!$ul.find('.cl-xg').length){

                            var $xg=$('<div class="cl-xg">限购'+99+'件<i class="icon-triangle-02"></i></div>');

                            $ul.find('.td-04 .add-minus').append($xg);
                            $xg.show(100);
                            setTimeout(function(){$xg.remove();},2000);     //2秒后消失
                        }
                        _s=99;
                        $ul.find('button')[1].className="icon-add icon-add-gray";
                    }
                    else if(_s<=0){
                        _s = 1;
                        $ul.find('button')[0].className="icon-minus icon-minus-gray ";
                    }
                    else if(_s==99){
                        $ul.find('button')[1].className="icon-add icon-add-gray";
                    }
                    $this.val(_s);

                    //判断数量是否变化
                    //通知合计等事件
                }else{
                    $this.val(1);
                }

            }
            //确认修改优惠券
            ,beforeAlterPro:function(e){
                var $this = $(e.currentTarget);
                Cart.alterBox($this.offset(),function(){
                    //$this.trigger('delete');
                    alert("修改了优惠券");
                });
            }
            //修改优惠券
            ,alterPro:function(e){

            }
            //确认删除商品
            ,beforeDeletePro:function(e){
                var $this = $(e.currentTarget);
                Cart.confirmBox("确认从购物车中删除此商品？",$this.offset(),function(){
                    $this.trigger('delete');
                    Cart.showDelMsg(1);
                });
            }
            //删除选择商品
            ,deletePro:function(e){
                var $this = $(e.currentTarget),
                    $ul = $this.parents("ul"),
                    $package = $this.parents(".one-package"),
                    $active = $this.parents(".one-active"),
                    id = $ul.attr("id");

                var callback = function(){

                    $(this).remove();
                    if($package.find('ul:not(.tr-activity)').length<=1){
                        $package.prev().remove();
                        $package.remove();
                        if($.trim($("#packageList").html()).length<=0){
                            $("#package-none").show();
                        }
                    }
                    if($active.length>0 && $active.find("ul:not(.tr-activity)").length==0){
                        $active.remove();
                    }

                    if($("#packageList .one-package").length==0){
                        $("#package-none").show();
                    }
                }

                $ul.animate({height: "0px"},200, callback);

                if(id!=undefined){
                    $("ul[masterid="+id+"]").animate({height: "0px"}, 200, callback);
                }

            }
            //确认删除选中商品
            ,beforeDeleteSelectPro:function(e){

                var $this = $(e.currentTarget),
                    length = $("#packageList .one-package input:checked").length,
                    offset = $this.offset();
                offset.left = offset.left+15;

                if(length==0){
                    Cart.confirmBox("请选择需要删除的商品。",offset,null,false,"spc_confirmBox");
                }
                else{
                    Cart.confirmBox("确认从购物车中删除选中的商品？",offset,function(){
                        $this.trigger('delete');
                        Cart.showDelMsg(length);
                    },true,"spc_confirmBox");
                }
            }
            //删除选中商品
            ,deleteSelectPro:function(e){

                var checkedList = $("#packageList .one-package input:checked");
                checkedList.parent().siblings('.td-08').find(".a-delete").trigger('delete');
                Cart.showDelMsg(checkedList.length);

            }
            //确认清空购物车
            ,beforeDelAllCart:function(e){
                var $this = $(e.currentTarget),
                    offset = $this.offset();
                offset.left = offset.left+15;
                Cart.confirmBox("确认清空购物车？",offset,function(){
                    $this.trigger('delete');
                    //Cart.showDelMsg(length);
                },true,"spc_confirmBox");
            }
            //清空购物车
            ,delAllCart:function(e){
                $("#packageList .one-package,#packageList .fee-top").remove();
                $("#package-none").show();
            }
            //添加购物车
            ,addToCart:function(e){
                $.blockUI({
                    message: $("#addToCart").html(),
                    css: {
                        width: '400px',
                        height: '200px',
                        left: ($(window).width() - 400) / 2 + 'px',
                        top: ($(window).height() - 200) / 2 + 'px',
                        border: '6px solid #5c5c5c'
                    }
                });
            }
            //确定添加
            ,confirmAdd:function(e){
                $.unblockUI();
            }
            //撤销删除
            ,backDelete:function(e){
                $("#show_delMsg").hide();
                alert("撤销删除！");
            }
            //关闭凑单免邮
            ,closeFreeFee:function(e){
                 $(e.currentTarget).parents('.clearing-recommend-layer').hide();
            }

        }
    };

    exports.init=Cart.init;
});
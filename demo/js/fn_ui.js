/*!
 * common Javascript Library  - v0.1 (2014-12-12 AM9:00)
 * Copyright 2014- trueland
 */


/*!**********************************************************
 * type Dom
 * description 基类
 *************************************************************/
var FN={

    /**!
     * description tab选项卡
    **/
  tabSlider:function(obj,count,auto){
    var _this = this;
        _this.obj = obj;
        _this.count = count;
        _this.auto=auto;
        _this.time = 2000;//停留的时间
        _this.n = 0;
        var  t;
        this.slider = function(){
            $(_this.obj + " .ui_tab_nav li").bind("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                var index = $(_this.obj + " .ui_tab_nav li").index(this);
                $(_this.obj + " .ui_tab_content .ui_panel").eq(index).show().siblings().hide();
                _this.n = index;  
                return false;    
            })  
        }
        this.addhover = function(){
            $(_this.obj).hover(function(){clearInterval(t);},function(){t=setInterval(_this.autoplay,_this.time)}); 
        }
        this.autoplay = function(){
            _this.n = _this.n >=(_this.count-1)? 0 : ++_this.n;
            $(_this.obj + " .ui_tab_nav li").eq(_this.n).trigger("click"); 

        }   
        this.init = function(){
            this.slider();
            this.addhover();
            if(_this.auto){          
             t = setInterval(_this.autoplay,_this.time);           
            }
            else{
               clearInterval(t);
            }
            
        }
        this.init();
},
   zSelect:function(){
 
    var $lis=$('.options li'),
 
        $current = $('.current'),
 
        $options =  $('.options');
 
    $lis.on("click",function(){
     
        var $this = $(this);
 
        $(this).parent().prev().html($this.text()+'<i></i>');
         
        $('.options').hide();
     
    }).on("mouseenter",function(){
     
        $(this).addClass("active"); 
         
    }).on("mouseleave",function(){
         
        $(this).removeClass("active"); 
         
    });
     
    $('.zSelect').on('mouseenter',function(){
 
        $(this).find('.options').show();
 
        $(this).find('.current').addClass('totop');
 
    }).on('mouseleave',function(){
 
        $(this).find('.options').hide();
 
        $(this).find('.current').removeClass('totop');
 
    });
},   
    artDialog: function(otpions) {
            var _options = {
                lock: true,
                background: "#000",
                opacity: .25,
                title: "",
                content: "",
                button: [{
                    name: "确定",
                    className: "artbtn_save",
                    callback: function() {

                    }
                }, {
                    name: "取消",
                    className: "artbtn_cancel",
                    callback: function() {}
                }]

            };
            options = $.extend(_options, otpions);
            art.dialog(options);

        } 





  };

$(function(){
new FN.tabSlider("#tab1",3,true);//tab1
new FN.tabSlider("#tab2",3,true);//tab2
 FN.zSelect();//zSelect下拉框
 var ddl = DropDownList.create({
            select: $("#picture"),
            attrs: {column:5,width:150}
});//dropdownlist下拉框
  var ddt = DropDownList.create({
            select: $("#picture2"),
            attrs: {column:5,width:150}
});//dropdownlist下拉框2

$("#delete").click(function(e){

     FN.artDialog({
                id:"deletePic",
                title: "删除",
                width: "340px",
                height: "110px",
                content: document.getElementById("deleteAlbum"),
                button: [{
                    name: "确定",
                    className: "artbtn_save",
                    callback: function() {
                       
                    
                    }
                }, {
                    name: "取消",
                    className: "artbtn_cancel"
                }]
            });
});//弹出对话框





});


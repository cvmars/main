define(function(require, exports, module) {

    // 引入jquery
    var $ = require('jquery');

    var shop_hint={
        serve:[
            {title:'1分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'2分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'3分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'4分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'5分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
        ],
        speed:[
            {title:'1分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'2分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'3分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'4分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'5分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"}
        ],
        pack :[
            {title:'1分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'2分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'3分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'4分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"},
            {title:'5分 很满意',cun:"卖家的服务太棒了，考虑非常周到，完全超出期望值"}
        ]
    }
    var $ct_st        = $("#fn-st-comment"),
        $ct_star      = $ct_st.find(".fn-star"),
        $ct_re_effect = $ct_st.find(".re-effect"),
        $ct_pj        = $ct_st.find(".release-btn"),
        $ct_mask      = $(".fn-st-comment-mask"),
        $ct_title_a   = $ct_st.find(".fn-st-title a.red"),
        $st_shop      = $("#st-shop");        // 店铺评论   
    // 这个现在木有用
    (function(){
        $ct_title_a.click(function(){

        var $btn_0=$ct_st.find(".fn-st-btn").eq(0)
        if($btn_0.data("on")){
            $("body").stop(true,true).animate({scrollTop: $btn_0.offset().top-80}, 500);
        }else{
            $btn_0.click();
        }
        });
    })
    // 算星星
    function be_star(){
        $('i',$ct_star).attr('class','');
        $ct_star.each(function(){
            var $this=$(this),
                $list_i=$('i',$this),
                _star=$this.data("star")*1;
                
            $list_i.slice(0,_star).addClass('star-01');
            $list_i.slice(_star,5).addClass('star-02');
        });
    }
    be_star();
    //星星
    $ct_star.on("mouseover","i",function(){
        var $this=$(this);
        $this.parents(".fn-star").find("i").removeClass();
        $this
            .addClass("star-01")
            .prevAll('i').addClass('star-01').end()
            .nextAll('i').addClass('star-02');
    });

    $ct_star.on("click","i",function(){
        var $this=$(this);
        $this.parents(".fn-star").data("star",$this.index()+1);
    });

    $ct_star.on('mouseout',function(){
        be_star();
    })
    // 商家评论区星星事件
    $st_shop.on('mouseover','.fn-star i',function(){
        var 
            $this      = $(this),
            $ps        = $this.parents(".fn-star"),
            $hint      = $ps.find('.fn-star-hint'),
            _index     = $this.index(),
            _this_hint = shop_hint[$ps.data('hint')][_index];


        if(_this_hint){
            if(!$hint.length){
                $hint=$('<div class="fn-star-hint">'
                     +  '<h5></h5>'
                     +  '<p></p>'
                     +'</div>')
                $ps.append($hint);
            }
            $hint
                .css({'left':$this.position().left-15}).show()
                .find('h5').html(_this_hint.title).end()
                .find('p').html(_this_hint.cun);
        }
    });
    $st_shop.on('mouseout','.fn-star',function(){
        $('.fn-star-hint',this).hide();
    });

    // 打钩钩
    $ct_re_effect.on("click","li",function(event){

        var $this=$(this);
        if(this===event.target){
            $this.find("input").click();
        }else{
            $this.toggleClass("on");
        }
    });
    // 发表评价显示和隐藏 
    $ct_st.on("click",".fn-st-btn",function(){

        var $this=$(this),
            $ps=$this.parents(".adc-list-block"),
            $release=$('.adc-list-release[data-st="'+$ps.data('st')+'"]',$ct_st);

        if($this.data("on"))
        {
            $this.data("on",false)
                 .toggleClass("btn-on btn-01 btn-02")
                 .html('发表评论');
        }else{
            $("body").stop(true,true).animate({scrollTop: $this.offset().top-80}, 500);
            $this.data("on",true)
                 .toggleClass("btn-on btn-01 btn-02")
                 .html('收起评论<i class="edit_up"></i>');
        }
        $release
             .stop(true,false)
             .slideToggle(400);

        if($ps.data('close')){
            $this.parent().html('<p>已评价</p>');
        }
    });

    //输入框字数计算
    var ts_data={
        hi:'请输入<span>10-500</span>个字',
        list:[
            {
                le:[1,10],
                hi:'还需输入<span></span>个字',
                r:false
            },
            {
                le:[10,500],
                hi:'还可输入<span></span>个字',
                r:true
            },
            {
                le:[500,501],
                hi:'正好',
                r:true
            },
            {
                le:[500],
                hi:'已超过<span></span>个字',
                r:false
            }
        ]
    }
    $('.re-taste-ts').html(ts_data.hi);
    $ct_st.on('keypress change','textarea',function(){

        var _ts_data,_i,_l,
            $this=$(this),
            _len=$.trim($this.val()).length,
            $ts=$this.next();
            
        if(_len){
            for (_i = 0,_l=ts_data.list.length; _i < _l; _i++) {
                _ts_data= ts_data.list[_i];
                if(_ts_data.le[1]){
                    if(_len>=_ts_data.le[0] && _len<_ts_data.le[1]){
                        $ts.html(_ts_data.hi).find('span').html(_ts_data.le[1]-_len);
                        $this.data('bol',_ts_data.r);
                        break;
                    }
                }else{
                    if(_len>=_ts_data.le[0]){
                        $ts.html(_ts_data.hi).find('span').html(_len-_ts_data.le[0]);
                        $this.data('bol',_ts_data.r);
                        break;
                    }
                }
            };

        }else{
            $this.data('bol',false);
            $ts.html(ts_data.hi)
        }
    });
    // 商品评价验证
    $ct_pj.on('click',function(){

        var $ps,
            $this     =$(this),
            $release  =$this.parents(".adc-list-release"),
            $textarea =$('textarea',$release),
            $dt_2     =$('.dt-02',$release),
            $_span    =$('span',$dt_2),
            $_fn_star =$('.fn-star',$release);

        // 判断评价
        $ps=$_fn_star.parent();
        if(!$_fn_star.data('star')*1){
            // 判断是否存在span
            if($('span',$ps).length){
                $('span',$ps).show();
            }else{
                $ps.append('<span class="st-red" style="display: inline;" >你的评分对我们很重要喔!</span>');
            }
            return false;
        }else{
            $('span',$ps).hide();
        }
        // 判断印象
        if(!$release.find(".re-effect input:checked").length){
            if($_span.length){
                $_span.show();
            }else{
                $dt_2.append('<span class="st-red" style="display: inline;">至少选一个嘛!</span>')
            }
            return false;
        }else{
            $_span.hide();
        }
        // 判断体会
        if(!$textarea.data('bol')){
            alert('请至少输入10~500字')
            return false;
        }
        $ct_mask.stop(true,false).fadeIn();

        $('.adc-list-block[data-st="'+$release.data('st')+'"]',$ct_st).data('close',true).find('.fn-st-btn').click();
    });
    // 商家评价验证
    var $st_shop_star=$('.fn-star',$st_shop);

    $('.st-shop-btn',$st_shop).on('click',function(){
        $st_shop_star.each(function(){
            var $this=$(this);

            if(!$this.data('star')){
                $this.parent().find('.st-red').show();
                return false;
            }else{
                $this.parent().find('.st-red').hide();
            }
        });
    });
    //隐藏评论成功
    $ct_mask.on('click',function(event){
        if(!$.contains(this,event.target) || event.target.nodeName==='BUTTON'){
            $(this).stop(true,true).fadeOut();
        }
        
    });

    //把user对象传到外部
    //exports.init = user.init;

});
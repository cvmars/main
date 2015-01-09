jQuery.fn.placeholder = function(){
    var i = document.createElement('input'),
        placeholdersupport = 'placeholder' in i;
    if(!placeholdersupport){
        var inputs = jQuery(this);
        inputs.each(function(){
            var input = jQuery(this),
                text = input.attr('placeholder'),
                pdl = 0,
                height = input.outerHeight(),
                width = input.outerWidth(),
                placeholder = jQuery('<span class="phTips">'+text+'</span>');
            try{
                pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
            }catch(e){
                pdl = 5;
            }

            placeholder.css({
                'margin':0,'margin-left': -(width-pdl),
                'height':height,
                'line-height':height+"px",
                'position':'absolute', 
                'color': "#cecfc9",
                'bottom':'auto',
                'left':'auto',
                'top':'auto',
                'bottom':'auto',
                'font-size' : "12px"
            });

            placeholder.click(function(){
                input.focus();
            });
            if(input.val() !== ""){
                placeholder.css({display:'none'});
            }else{
                placeholder.css({display:'inline'});
            }
            placeholder.insertAfter(input);
            input.keyup(function(e){
                if(jQuery(this).val() !== ""){
                    placeholder.css({display:'none'});
                }else{
                    placeholder.css({display:'inline'});
                }
            });
        });
    }
    return this;
};
jQuery('input[placeholder]').placeholder();
/*!
 * @ page
 * @ description 验证类
 * @ author Lewis.ye
 * @ date 2014-06-19
 */
var fn_verify={

    init:function(){

        this.email();

    },
    vars:{
        "email":"/[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/"
    },

    /*!
     * @ author shaokr
     * @ 创建验证
     * @ date 2014-06-19
     */

    addverify:function(){

        var self=this;
        //获取所以含data-fn-verify的元素
        $("[data-fn-verify]").each(function(){
            //var $this=$(this);
            //事件委派到input中
            $(this).on("blur","input",function(e){
                var $this=$(this),
                    _name=$this.data("name") || $this.attr("name") || false ;
                //判断是否存在验证方法
                if(_name && typeof self[_name] === "function"){
                    //判断是否为重复密码
                    if(_name=="passwds"){

                        self[_name]($this,e);

                    }else{

                        $this.blur(function(){

                            self[_name]($this);

                        });

                    }
                    

                }

            });
               
            
        });

    },

    verify:function(e){

        var self=this,
            _bool=true,
            $verify=$(e).parentsUntil("[data-fn-verify]").parent();
            if(!$verify.length){$verify=$(e).parent();}
            //获取所以含data-fn-verify的元素
            $verify.find("input").each(function(){
                var $this=$(this);
                    _name=$this.data("name") || $this.attr("name") || false ;
                    if(_name && typeof self[_name] === "function"){
                        if(!$this.data("ver-bo")){
                            $this.focus().blur();
                            _bool=false;
                        }
                    }
            });
           
            return _bool;
                           
    },

    email:function($this,e){

        var self=this,
            _val=$.trim($this.val()).match(eval(self.vars.email)),
            _bool=false;

            if(_val){

                _bool=true;
                
            }

            self.result($this,_bool);

    },

    passwd:function($this,e){

        var self=this,
            _val=$.trim($this.val()),
            _bool=false;

            if(_val.length>=6 && _val.length<=16){

                _bool=true;

            }

            self.result($this,_bool);

    },

    passwds:function($this,e){
        var self=this,
            $passwds=$(e.delegateTarget).find("[data-name='passwds']"),
            _val=$.trim($this.val()),
            _bool=false;
            if($passwds.index($this)){
                
                if($passwds.eq(0).val()==_val){

                    _bool=true;

                }

            }else{

                if(_val.length>=6 && _val.length<=16){

                    _bool=true;

                }

            }

            self.result($this,_bool);

    },

    code:function($this,e){

        var self=this,
            _val=$.trim($this.val()),
            _bool=false;

        if(_val){

            _bool=true;

        }

        self.result($this,_bool);

    },

    // 结果处理

    result:function($this,res,fun){
        fun=fun || '';
        if(fun && typeof fun === "function"){

            fun($this,res);

        }else{
            $tips=$this.nextAll(".v-tips"+fun);
            if($tips.length){

                if(res){
                    $this.parent().removeClass("error")
                    
                    $tips.hide();
                }else{
                    $this.parent().addClass("error")
                    $tips.show();
                }
                $this.data("ver-bo",res);

            }else{

                //$this.after(fun)

            }

        }
    }

};
fn_verify.addverify();

 var login = {

    init:function(){

        this.tab();

        this.verify();

    },

    /**
     * @ login tab shaokr
     * @ date 20140623 
     */

    tab:function(){
        var param={
                "tab":"fn-tab",//主框
                "l":"fn-tab-l",//导航
                "l_css":"fn-mask-on",//导航添加的css名称
                "d":"fn-tab-d",//显示内容
                "d_css":"fn-mask-on"//显示内容添加的css名称
            };
            //在主体框中添加导航元素的点击事件委派
            $("[data-"+param.tab+"]").on("click","[data-"+param.l+"]",function(){
                var $this=$(this),
                $parent=$this.parentsUntil("[data-"+param.tab+"]").parent();
                $this.siblings("[data-"+param.l+"]").removeClass(param.l_css);
                $this.addClass(param.l_css);
                $parent.find("[data-"+param.d+"]").removeClass(param.d_css).filter("[data-"+param.d+"="+$this.data(param.l)+"]").addClass(param.d_css);
            }).each(function(){
                $(this).find("[data-"+param.l+"]").eq(0).click();
            });
    },

    /**
     * @ login 登陆页验证 shaokr
     * @ date 20140623   
     */

    verify:function(){
        var $login_form=$("#login-form");
        //表单提交事件
        $login_form.on("submit",function(){
            var fn_bool=true;
            $login_form.find(">div[data-verify]").each(function(){
                if(!fn_bool && !$(this).data("verify-on")){
                    fn_bool=false;
                }
            });
            return false;
        });
        //input焦点获取和解除事件（事件委派）
        $login_form.on({
            'focus':function(){
                var $this=$(this);
                $this.parent().addClass("on");
            },
            'blur':function(){
                var $this=$(this),
                $par=$this.parent();
                $par.removeClass("on");
                if($par.data("verify")){
                    $.ajax({
                      url: $par.data("verify"),
                      type:'get',
                      dataType : 'json',
                      data:{'id':1}
                    }).done(function(data) {
                      if(data.error){
                        $par.find(">i").addClass("icon-loss");
                        $par.addClass("verify-on").removeClass("verify-off");
                        $par.data("verify-on",1);
                      }else{
                        
                        $par.find(">i").removeClass();
                        $par.data("verify-on",0);
                        $par.addClass("verify-off").removeClass("verify-on");
                      }
                    });
                }
            }
        },"input");
    }

 };

/*!
 * @ page
 * @ description 
 * @ author Lewis.ye
 * @ date 2014-06-19
 */

 var security_passwd = {

    init:function(){

        this.selectTab();

        this.get_code();

        this.email();
    },

    /**
     * @ author shaokr
     * @ 
     * @ date 20140624
     */

    selectTab:function(){
        
        var self=this,
            $way=$("#way"),
            $way_se=$("#way-se");

        $way_se.on("change","select",function(){

            var $this=$(this);
             $way.removeClass().addClass("step-col way-ul-"+$this.val());
            
        });

    },

    /**
     * @ security_passwd selectTab shaokr
     * @ 使用邮箱验证
     * @ date 20140624
     */

    email:function(){
        
        var self=this,
            $email=$("#fs_email");

         $email.on("click",function(){
            //点击发送验证邮件后执行的函数
            var $this=$(this),
                $way=$("#way");
            $way.addClass("off");
            $way.prev().removeClass("off");
            
        });

    },

    /**
     * @ security_passwd selectTab shaokr
     * @ 使用短信验证
     * @ date 20140624
     */


    
    get_code:function(){
        var self=this,
            $getmc=$("#getmc");

        $getmc.on("click",function(){

            var $this=$(this),
                _s=5,time;

            $this.attr("disabled",true);
            $this.html(_s+"秒后重新获取");
            time=setInterval(function(){
                _s--;
                if(_s){
                    $this.html(_s+"秒后重新获取");
                }else{
                    $this.attr("disabled",false);
                    $this.html("获取短信验证码");
                    clearTimeout(time);
                }
            },1000);

        });
        
    },

    code:function(){
        
        var self=this,
            $code=$("#fx_code");

        $code.on("ciclk",function(){
            //点击短信验证码后执行的函数
            var $this=$(this);
            
        });

    }

    

 };

/*!
 * @ page
 * @ description 
 * @ author Lewis.ye
 * @ date 2014-06-19
 */

 var security_verify = {

    init:function(){
        //点击获取短信
        this.get_code();
        //邮箱
        this.email();
    },


    /**
     * @ security_passwd selectTab shaokr
     * @ 验证邮箱
     * @ date 20140624
     */

    email:function(){
        
        var self=this,
            $email=$("#ve_email");

         $email.on("click",function(){
            //点击发送验证邮件后执行的函数
            var $this=$(this);
            if(fn_verify.verify(this)){

                $this.parentsUntil(".steps-con").parent().hide().next().show();

            }
            
        });

    },

    /**
     * @ security_passwd selectTab shaokr
     * @ 验证短信
     * @ date 20140624
     */


    
    get_code:function(){
        var self=this,
            $getmc=$("#getmc");

        $getmc.on("click",function(){

            var $this=$(this),
                _s=5,time;

            $this.attr("disabled",true);
            $this.next().show();
            $this.html(_s+"秒后重新获取");
            time=setInterval(function(){
                _s--;
                if(_s){
                    $this.html(_s+"秒后重新获取");
                }else{
                    $this.attr("disabled",false);
                    $this.html("获取短信验证码");
                    clearTimeout(time);
                }
            },1000);

        });
        
    },

    code:function(){
        
        var self=this,
            $code=$("#fx_code");

        $code.on("ciclk",function(){
            //点击短信验证码后执行的函数
            var $this=$(this);
            
        });

    }

    

 };

define(function(require, exports, module) {
	require('jquery');
	var core={
		vars:{
			$way:$("#pay-way"),
			$hi:$("#wt-hi"),
			$detail:$("#showDetail"),
			$payFastAdd:$("#pay_fastAdd")
		}
		,init:function(){
			//支付类型切换
			core.paytab();
			//支付平台选择
			core.payway();
			core.detail();
			
            $("body").on("click",".mask-close-x",function(e){
                $.unblockUI();
            });
		}
		/*
		*	函数名：tab
		*	维护人：shaokr
		*	日  期：2014-8-15
		*	依  赖：无
		*	说  明：支付类型切换
		*/
		,paytab:function(){
			var self=core,
				_vars=self.vars,
				$list=_vars.$way.find('.way-list');

			_vars.$way.find('.wt-title input:checked').each(function(){
				$(this).parents('div.way-list').addClass('way-open');
			});

			_vars.$way.on('change','.wt-title input',function(){
				var $this=$(this),
					$this_list=$this.parents('div.way-list'),
					$y_open=_vars.$way.find('div.way-open');

				$y_open.removeClass('way-open');
				$this_list.addClass('way-open');
			});
		}
		/*
		*	函数名：on
		*	维护人：shaokr
		*	日  期：2014-8-15
		*	依  赖：无
		*	说  明：支付平台选择
		*/
		,payway:function(){
			var self=core,
				_vars=self.vars;

			_vars.$way.on('change','ul .li-01 input,.wt-label input',function(){
				var $this=$(this);
				$this.parents('.labels-block,.wt-label').addClass('wt-on').siblings().removeClass('wt-on');
			});

			_vars.$way.find('.labels-block input:checked,.wt-label input:checked').each(function(){
				var $this=$(this);
					$this.parents('.labels-block,.wt-label').addClass('wt-on');
			});

			_vars.$way.find("ul,.wt-label").click(function(event){
				$(this).find('input').trigger('change').prop('checked',true);
			});
			_vars.$payFastAdd.on("click",function(e){
                $.blockUI({
                    message: $("#add_pay_content").html(),
                    css: {
                        width: '469px',
                        height: '190px',
                        left: ($(window).width() - 468) / 2 + 'px',
                        top: ($(window).height() - 190) / 2 + 'px',
                        border: '6px solid #5c5c5c'
                    }
                });
			});

		}
		/*
		*	函数名：on
		*	维护人：shaokr
		*	日  期：2014-8-15
		*	依  赖：无
		*	说  明：支付平台选择
		*/
		,detail:function(){
			var self=core,
				_vars=self.vars;

			_vars.$detail.on('click',function(e){
				var $details=$(".pay-detail");
				if($details.is(':visible')){
					_vars.$detail.parent().removeClass("s-detailon");
					$details.hide();
				}
				else{
					_vars.$detail.parent().addClass("s-detailon");
					$details.show();
				}
			});
		}

	}
	exports.init=core.init;
});


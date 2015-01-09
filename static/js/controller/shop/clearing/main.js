/*
 *  @name 购物车列表页面入口js
 *  @Copyright feiniu         //版权声明
 *  @Designed @beson.liu       //制作人
 *  @date 2014-12-10           //制作时间
 *  @update 2014-12-10        //最后更新时间
 */
define(function(require){

  //引入购物车列表页面交互
  var clearing = require('./interface.js');

  //引入轮播控制js
  require('slide');

  //购物车列表页面行为初始化
  clearing.init();

  var s_btn_prev = ".fn-slideprev-btn",       //prev按钮 classname

      s_btn_next = ".fn-slidenext-btn",        //next按钮 classname

      s_btn_slide_page = ".fn-slidepage-btn"; //slide按钮 classname

  //猜你喜欢轮播控制
  $("#goodsyoulike").niaoSlider({
      pagerprev: function () { return this.parent().find(s_btn_prev); },
      pagernext: function () { return this.parent().find(s_btn_next); },
      pagerlist: function () { return this.parent().parent().find(s_btn_slide_page); }
  });

  //优惠选购轮播控制
  $("#preferbuy").niaoSlider({
      pagerprev: function () { return this.parent().find(s_btn_prev); },
      pagernext: function () { return this.parent().find(s_btn_next); },
      pagerlist: function () { return this.parent().parent().find(s_btn_slide_page); }
  });

  //凑单免邮
  $("#freepostage").niaoSlider({
      pagerprev: function () { return this.parent().find(s_btn_prev); },
      pagernext: function () { return this.parent().find(s_btn_next); },
      pagerlist: function () { return this.parent().parent().find(s_btn_slide_page); }
  });

});
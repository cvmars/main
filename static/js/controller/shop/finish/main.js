define(function(require, exports, module) {

  require('slide');
 
    $("#goodsyoulike").niaoSlider({
        pagerprev: function () { return this.parent().find(".fn-slideprev-btn"); },
        pagernext: function () { return this.parent().find(".fn-slidenext-btn"); },
        pagerlist: function () { return this.parent().parent().find(".fn-slidepage-btn"); }
    });

});

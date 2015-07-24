require(['avalon', "domReady!","jquery"], function(avalon,b,$) {//第二块，添加根VM（处理共用部分）

    avalon.log("加载avalon完毕，开始构建根VM与加载其他模块");

    avalon.templateCache.empty = "&nbsp;";

    avalon.define({
        $id: "root",
        header: "这是根模块，用于放置其他模块都共用的东西，比如<b>用户名</b>什么的111",
        footer: "页脚消息111",
        page: "empty"
    });

    avalon.scan(document.body);

    require(['./modules/aaa/aaa'], function() {//第三块，加载其他模块

        avalon.log("加载其他完毕222");

    });

});
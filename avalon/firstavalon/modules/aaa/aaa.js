define(["avalon", "text!./aaa.html"], function(avalon, aaa) {

    avalon.templateCache.aaa = aaa;

    avalon.define({
        $id: "aaa",
        username: "司徒正美ddd"
    });

    avalon.vmodels.root.page = "aaa";

});

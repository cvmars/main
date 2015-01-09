define('widget/validateForm',['lib/common'], function($) {
        /**
         * 校验form
         * @param config {id:校验元素ID, wrapId:校验元素的外层元素，errId:错误提示元素ID，errClass:校验不通过，wrapId元素添加的class}
         * @param callback 回调函数，具体的检验过程，必须返回true或者false
         * @param focusCallback 获取焦点时回调函数
         */
         function validate(config, callback, focusCallback) {
            var id = '#' + config.id;
            var li, err, errClass;
            li = !config.wrapId ? id + 'Li' : config.wrapId;
            err= !config.errId  ? id + 'Err' : config.errId;
            errClass= !config.errClass  ? 'ad_wrong' : config.errClass;

            $(id).on('blur', function () {
                if (!callback()) {
                    $(li).addClass(errClass);
                    $(err).show();
                }
            });
            $(id).on('focus', function () {
                focusCallback && focusCallback();
                $(li).removeClass(errClass);
                $(err).hide();
            });
        }
        // 获取表单数据
        function getForm(id){
            var _fo,
                _body ={},
                i     =0,
                _form =$('#'+id).serializeArray(),
                l     =_form.length;
            if(id){
                for (; i < l; i++) {
                    _fo=_form[i];
                    _body[_fo.name]=_fo.value;
                };
                return _body;
            }
        }
        /* 验证表单数据,全部验证成功后返回数据,
        *  @id   form表单元素的id
        *  @nameObj (可无) 表单元素name:{} or []  // 可为对象 或 数组,当无传入值时只返回 表单数据
            { 
                info:'（way为方法时，可无）值不符合正则时提示信息' , 
                regular:'（可无）正则表达式,默认不为空',
                way:'（可无）值不符合正则时执行的方法,当为方法时，提示信无效,可无',
                return:'(可无)不进行正则验证直接判断为 true(找到) 或者 false(未找到)'
            }
            例子:
            _nameObj={
                province     :{info:'请选择省份'},
                city         :[
                    {info:'请选择城市'}
                ],
                area         :{info:'请选择区县'},
                addr         :[
                    {info:'请输入详细地址'},
                    {info:'请输入中文',regular:/[\u4e00-\u9fa5]/}
                ]
                invoiceTitle :{info:'请输入发票抬头'}
            }
        **/
        function verify(id,nameObj){
            var p,_l,
                _nameObj,  // 当前nameObj数据
                _form=getForm(id),
                nameObj=nameObj||{};
            if(_form){
                for (p in nameObj) {
                    _form[p]=$.trim(_form[p]);
                    _nameObj=nameObj[p];

                    if(typeof _nameObj==='object'){
                        _l=_nameObj.length;
                       
                        if(typeof _l==='number'){
                            
                            for (var i = 0; i < _l; i++) {
                                if(!judgeRegular(_form[p],_nameObj[i])){
                                    return false;
                                }
                            }
                        }else{
                             if(!judgeRegular(_form[p],_nameObj)){
                                return false;
                            }
                        }
                        
                    }
                }
                return _form;
            }
        }

        function judgeRegular(data,regulars){
            var _bool=false;
            if(typeof regulars.return==="boolean"){
                _bool=regulars.return;

            }else{
                regulars.regular=regulars.regular || /.+/;// 是否存在相对应的正则 无则默认为不能为空
                if(data.match(regulars.regular)){
                   _bool=true;
                }
            }
            if(!_bool){
                if(typeof regulars.way==='function'){
                    regulars.way();
                }else{
                    $.alert(regulars.info,1000);
                }
            }
            return _bool;
        }

    return {
        validate : validate,
        verify   : verify
    }
})
/*
 *  @name cookie.js cookie增删改查功能
 *  @Copyright feiniu         //版权声明
 *  @Designed @joker.ye       //制作人
 *  @date 2014-12-08           //制作时间
 *  @update 2014-12-08        //最后更新时间
 */

define(function(require, exports, module) {

    return {

        /**!
         * author Lewis.ye
         * description 设置 cookies
         **/

        setCookie: function(name, value, expires, path, domain, secure) {
            var exp = new Date(),
                expires = arguments[2] || null,
                path = arguments[3] || "/",
                domain = arguments[4] || null,
                secure = arguments[5] || false;
            expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
            document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        },

        /**!
         * author Lewis.ye
         * description 获取 cookies
         **/

        getCookie: function(name) {

            var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),

                val = document.cookie.match(reg);

            return val ? (val[2] ? unescape(val[2]) : "") : null;
        },

        /**!
         * author Lewis.ye
         * description delete cookies
         **/

        removeCookie: function(name) {

            this.setCookie(name, 1, -1);

        }

    }
});

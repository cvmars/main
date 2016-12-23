<?php

echo strlen()

//php错误处理
//1.关闭和开启报错 -- c-windows-php.ini
// ; E_ALL             - All errors and warnings (includes E_STRICT as of PHP 6.0.0)
// ; E_ERROR           -- 严重错误 echo  str_len(); 没有这个方法  脚本会终止，致命错
// ; E_WARNING         -- 警告错误  echo strlen();  没有参数 脚本不会终止
// ; E_PARSE           -- 语法错误 echo $str   没有加分号
// ; E_NOTICE          -- 提示错误，变量要提前定义  脚本不会终止
//报什么错
//error_reporting = E_ALL
//E_ALL & ~E_NOTICE   -- 报所有错误，但是除了提示错误
//2.报错级别
//3.报错地方
//display_errors = On  是否从浏览器输出错误
//log_errors = On  是否把错误放到一个日志文件
//;error_log = "D:/like/wamp/logs/php_error.log"  日志存放的路径


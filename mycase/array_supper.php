<?php

header("Content-Type:text/html;charset=utf8");

//超全局数组
//$_SERVER  - 查看服务器信息
//$_GET - 获取用get提交过来的数据,两个页面的通讯（1.表单传值-get psot 表单推荐用post 2.A标签传值-get）能看见的是get
//$_POST - 获取用post提交过来的数据
//$_REQUEST - 混合代替GET POST  -- 速度慢，不太用。
//$_FILES
//$_COOKIES
//$_SESSION
//$GLOBALS
//超全局标量在任何地方都可以用

echo "<pre>";

// print_r($_SERVER);
print_r($_GET);

echo "</pre>";




?>
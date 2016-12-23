<?php

//多页面使用同一个变量
//1.变量放到一个文件中
//2.变量放到数据库
//3.所有a标签带值
//4.所有表带带值
//上面方法不够实际
//
//实际解决：
//cookie 和  session 实现登录功能
//cookie:setcookie  print_r
//
//session
//1.设置session  session_start()  $_SESSION['name'] = $name;
//2.查看session print_r($_SESSION);
//3.删除session  ----session_unset()  清空$_SESSION数组里面的数据  ----session_destroy() 销毁卡   ----setcookie(session_name(), "",time()-3600,'/');
//5.session 会在客户端有个cookie，名字为 session_name() 就是 PHPSESSID

header("Content-Type:text/html;charset=utf8");

// echo ($_COOKIE['PHPSESSID']);

$name = "yeling";

//过期时间为0 ，浏览器关闭就删cookie时间传 0
setcookie("TestCookie", $name,0,'/');

setcookie("TestCookie", "",time()-3600,'/');

session_start();

$_SESSION['name'] = $name;

print_r($_SESSION);

echo session_name(),"<br>";

echo session_id();



?>
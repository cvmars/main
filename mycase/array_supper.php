<?php

header("Content-Type:text/html;charset=utf8");

//超全局数组
//$_SERVER  - 查看服务器信息
//$_GET - 获取用get提交过来的数据,两个页面的通讯（1.表单传值-get psot 表单推荐用post 2.A标签传值-get）能看见的是get
//$_POST - 获取用post提交过来的数据
//$_REQUEST - 混合代替GET POST  -- 速度慢，不太用。
//$_FILES -- login.html里面有例子
//$_COOKIES -- cookie
//$_SESSION -- login session
//$GLOBALS
//超全局标量在任何地方都可以用

echo "<pre>";

// print_r($_SERVER);
print_r($_GET);

echo "</pre>";


//--------------------------cookie
setcookie("name","user1",time()+3600,"/");

echo "<pre>";

print_r($_COOKIE);

echo "</pre>";

//---------------------------session
session_start();

$_SESSION['name'] = "user2";

echo "<pre>";

print_r($_SESSION);

echo "</pre>";

echo "<hr>";
echo "<hr>";
echo "<hr>";

//---------------------global

function show(){

    $GLOBALS[username] = "user2";

}

echo "<pre>";

print_r($GLOBALS);

echo "</pre>";

//---------------------global







?>
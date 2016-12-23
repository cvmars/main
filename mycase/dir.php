<?php

//mkdir — 新建目录
//rmdir — 删除目录  该目录必须是空的，而且要有相应的权限。
//basename — 返回路径中的文件名部分
//dirname — 返回路径中的目录部分
//__FILE__  当前文件的路径
//realpath — 返回规范化的绝对路径名
//.  当前目录的绝对地址
//.. 上一级目录的绝对地址
//DIRECTORY_SEPARATOR 目录分隔符
//

$dirname = "dirname1";

// mkdir($dirname);
// rmdir($dirname);

$str = "c:\web\abc\www\ddssd\index.php";

//index.php
echo basename($str);

echo "<br>";

echo dirname($str);

echo "<br>";

//D:\like\wamp\www\mycase\dir.php
echo __FILE__;
echo "<br>";

//D:\like\wamp\www\mycase
echo realpath(".")."<br>";

echo realpath("..")."<br>";

echo DIRECTORY_SEPARATOR."<br>";

echo PATH_SEPARATOR."<br>";

echo PATH_SEPARATOR."<br>";

var_dump(pathinfo("/www/htdocs/inc/lib.inc.php"));

print_r(pathinfo("/www/htdocs/inc/lib.inc.php"));


?>
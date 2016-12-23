<?php

$id = $_GET['id'];

//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//2.选择数据库
mysql_select_db("feiniu",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

$sql = "delete from us where id={$id}";

$t = time();

if(mysql_query($sql)){

    echo "<script>location='index.php?t={$t}';</script>";

}

//4. 用完记得关闭
mysql_close($connection);


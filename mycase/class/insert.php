<?php

$clsname = $_POST['clsname'];

//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//2.选择数据库
mysql_select_db("test",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

$sql = "insert into cls(name) values('$clsname')";

$t = time();

if(mysql_query($sql)){

    echo "<script>location='index.php?t={$t}';</script>";

}else{

    echo "<script>alert('fail');</script>";

}


 ?>
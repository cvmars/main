<?php

$stuname = $_POST['stuname'];
$cid = $_POST['cid'];
$sex = $_POST['sex'];

//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//2.选择数据库
mysql_select_db("test",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

$sql = "insert into stu(name,cid,sex) values('$stuname','$cid','$sex')";

$t = time();

if(mysql_query($sql)){

    echo "<script>alert('成功');</script>";

    echo "<script>location='index.php?t={$t}';</script>";

}else{

    echo "<script>alert('fail');</script>";

}


 ?>
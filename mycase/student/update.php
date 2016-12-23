<?php

$id = $_POST['id'];

$stuname = $_POST['stuname'];

$cid = $_POST['cid'];

$sex = $_POST['sex'];

echo $id."<br>",$stuname."<br>",$cid."<br>",$sex."<br>";


//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}
//2.选择数据库
mysql_select_db("test",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

$t = time();

$sql = "update stu set name='{$stuname}',cid='{$cid}',sex='{$sex}' where id={$id}";

if(mysql_query($sql)){

    echo "<script>alert('修改成功');</script>";
    echo "<script>location='index.php?t={$t}';</script>";

}else{

    echo "<script>alert('修改失败');</script>";
    echo "<script>location='index.php?t={$t}';</script>";

}

//4. 用完记得关闭
mysql_close($connection);

 ?>
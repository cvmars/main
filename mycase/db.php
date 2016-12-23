<?php

$str = "222";

// echo "my age is $str","<br>";

//通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//选择数据库
mysql_select_db("feiniu",$connection);

//设置客户端和连接字符集
mysql_query("set names utf8");

//从表单接受数据
$name = "us999";

$age = "999";

// $sql = "INSERT INTO `us` (`name`) VALUES ('xiaoming')";

// $result = mysql_query($sql);

//1. 插入用户名
// $sql = "INSERT INTO `us` (`name`,`age`) VALUES ('xiaoming','888')";

//一定要加单引号
$sql = "insert into us(name,age) values('{$name}','{$age}')";

$result = mysql_query($sql);

if($result){

    echo "insert username success";
    echo "本次插入的是".mysql_insert_id()."行";

}else{

    echo "insert fail";

}

//2. 查看
$sql2 = "SELECT * FROM  `us`";

$result2 = mysql_query($sql2);

while ($row = mysql_fetch_array($result2)) {

    // echo $row['name']."<br>".$row['id']."<br>";
    var_dump($row);

};

//3. 用完记得关闭
mysql_close($connection);

?>
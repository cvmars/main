<?php

$host = "localhost";

$user = "root";

$password = "";

$connection = mysql_connect($host,$user,$password);

if(!$connection){

    die('connection fail');

}else{

    echo "success";

}

mysql_select_db("feiniu");

//修改客服端字符集
mysql_query("set names utf8");

$sql = "insert into joker2(name) values('叶岭')";

mysql_query($sql);


//3. 用完记得关闭
mysql_close($connection);

?>
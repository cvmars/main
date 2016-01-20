<?php

$host = "localhost";

$user = "root";

$password = "";

$connection = mysql_connect($host,$user,$password);

if(!$connection){

    die('connection fail');

}

// echo "connection success";

$dbname = "feiniu";

mysql_select_db($dbname,$connection);

//1. 插入用户名
// $sql = "INSERT INTO `user` (`UserName`) VALUES ('xiaoming')";

// $result = mysql_query($sql);

// if($result){

//     echo "insert username success";

// }else{

//     echo "insert fail";

// }

//2. 查看
$sql2 = "SELECT * FROM  `user`";

$result2 = mysql_query($sql2);

while ($row = mysql_fetch_array($result2)) {

    echo $row['UserName']."<br>";

};

//3. 用完记得关闭
mysql_close($connection);

?>
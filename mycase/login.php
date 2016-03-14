<?php

echo "<pre>";

print_r($_FILES);

echo "</pre>";

$username = $_POST["username"];

$password = $_POST["password"];

if($username === ""){

    die("用户名不能为空");

}

if($password == ""){

    die("密码不能为空");

}

//如果都对，那就入库
$host = "localhost";

$user = "root";

$pw = "";

$dbname = "feiniu";

$connection = mysql_connect($host,$user,$pw);

if($connection){

    mysql_select_db($dbname,$connection);

    $password = md5($password);

    $sql = "SELECT * FROM `userinfo` WHERE `UserName` = '$username' AND `Password` = '$password'";

    $result = mysql_query($sql);

    if($result){

        $row = mysql_fetch_array($result);

        if($row){

            echo $row['UserName']."登录成功";

        }else{

            die("用户名不正确，或者用户密码错误");

        }



    }else{

        die("登录失败");

    }

}else{

    die('connection fail');

}



?>
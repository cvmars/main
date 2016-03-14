<?php

session_start();

$username = $_POST["username"];

$password = $_POST["password"];

$password2 = $_POST["password2"];

$vcode = strtolower($_POST["vcode"]);

$vstr = strtolower($_SESSION['code']);

if($vcode !== $vstr){

    exit("验证码不正确");

}

if($username === ""){

    exit("用户名不能为空");

}

if($password !== $password2){

    exit("两次输入密码不一致");

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

    $sql = "INSERT INTO `userinfo` (`UserName`,`Password`) VALUES ('$username','$password')";

    $result = mysql_query($sql);

    if($result){

        echo $username."注册成功";

    }else{

        die("注册失败");

    }

}else{

    die('connection fail');

}



?>
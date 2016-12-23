<?php

session_start();

$username = $_POST['username'];

$password = $_POST['password'];

//user1 是从数据库查出来的password也是

if($username=="user" && $password=="123"){

    $_SESSION['username'] = $username;

    $_SESSION['login'] = 1;

    header("location:index.php");

}else{

    echo "<script>alert('登录失败');</script>";
    header("location:login.php");

}


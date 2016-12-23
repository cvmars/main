<?php
session_start();
if(!$_SESSION['login']){
    // echo "<script>location='login.php';</script>";
     header("location:login.php");
}
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>

<h1>首页页面</h1>
<h2>欢迎<?php echo @$_SESSION['username'] ?>登录|<a href="logout.php">退出</a></h2>
<div>

</div>

</body>
</html>
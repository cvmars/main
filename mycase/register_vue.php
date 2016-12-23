<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册页面</title>
    <link rel="stylesheet" href="static/css/common.css">
    <link rel="stylesheet" href="static/css/bootstrap.css">
    <style>
    form{
        border:1px solid #ddd;
        padding: 20px;
        margin: 20px;
    }
    </style>
    <script src="static/js/vue.js"></script>
</head>
<body>

<div id="app">

    <form action="register.php" method="post">
        <p>用户名: <input type="text" name="username"></p>
        <p>密  码: <input type="password" name="password"></p>
        <p>确认密码: <input type="password" name="password2"></p>
        <p>验证码：<input type="text" name="vcode" ><img src="gd_vcode.php" alt=""></p>
        <input type="submit" value="提交">
    </form>

    <img src="file_1.php" alt="">
    <?php
         $arr = array("1","2","3");
        foreach ($arr as $key => $value) {
            echo "<div>$value</div>";
        }
     ?>
    <input v-model="msg">
    <span> {{msg}} </span>
</div>
<script>
    var vm = new Vue({

        el: '#app',

        data:{
            msg:"hello"
        }

    });
    </script>
</body>
</html>
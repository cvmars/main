<?php
//empty 来判断也行
if(isset($_POST['mname'])){

    //接收表单数据
    $str = $_POST['mname']."<hr>";

    //不存在则创建
    file_put_contents("mess.db", $str,FILE_APPEND);

}
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件留言板11111</title>
</head>
<body>

    <h2>文件留言板11</h2>
    <hr>
    <form action="index.php" method="post">

        <h2>请留言</h2>
        <textarea name="mname" id="" cols="100" rows="10"></textarea><br>
        <input type="submit" value="提交">
    </form>
    <hr>
    <h2>看留言:</h2>
    <?php

        echo file_get_contents("mess.db");

     ?>

</body>
</html>
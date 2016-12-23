<?php

$id = $_GET['id'];

//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//2.选择数据库
mysql_select_db("test",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

$sql = "select * from cls where id={$id}";

$rst = mysql_query($sql);

$row = mysql_fetch_assoc($rst);

//4. 用完记得关闭
mysql_close($connection);

 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>修改</title>
</head>
<body>

<div>
    <h2>班级添加</h2>
    <form action="update.php" method="post">
        班级名称：<input type="text" id="" name="clsname" value="<?php echo $row['name'] ?>"><br>
        <input type="hidden" name="id" value="<?php echo $_GET['id'] ?>">
        <input type="submit" value="submit">
        <input type="reset" value="reset">
    </form>
</div>

</body>
</html>
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

$sql = "select * from stu where stu.id={$id}";

$rst = mysql_query($sql);

$row2 = mysql_fetch_assoc($rst);

//4. 用完记得关闭
// mysql_close($connection);

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
        学员名称：<input type="text" id="" name="stuname" value="<?php echo $row2['name'] ?>"><br>
        班级：
        <select name="cid" id="">
            <?php
                $sql="select * from cls order by id";
                $rst=mysql_query($sql);
                while($row=mysql_fetch_assoc($rst)){
                    $s = $row2['cid']==$row['id'] ?'selected':'';
                    echo "<option value='{$row['id']}' {$s}>{$row['name']}</option>";
                }
             ?>
        </select>
        <br>
        性别：
        <input type="text" id="" name="sex" value="<?php echo $row2['sex'] ?>"><br>
        <input type="hidden" name="id" value="<?php echo $_GET['id'] ?>">
        <input type="submit" value="submit">
        <input type="reset" value="reset">
    </form>
</div>

</body>
</html>
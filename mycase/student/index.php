<?php

// echo "my age is $str","<br>";

//1.通过PHP连接mysql数据库
$connection = mysql_connect("localhost","root","");

if(!$connection){

    die('connection fail');

}

//2.选择数据库
mysql_select_db("test",$connection);

//3.设置客户端和连接字符集
mysql_query("set names utf8");

//$offset 算法
//0-6

$length =10;

$pagenum = @$_GET['page']?$_GET['page']:1;

$totsql = "select count(*) from stu";

$totarr = mysql_fetch_row($totrst = mysql_query($totsql));

// var_dump($totarr);

$pagetot = ceil($totarr[0]/$length);

//限制最大页数
if($pagenum>=$pagetot){
    $pagenum = $pagetot;
}

$offset = ($pagenum-1)*$length;

//一定要加单引号
$sql = "select stu.id,stu.name sn,stu.sex,cls.name cn from stu,cls where stu.cid=cls.id order by stu.id desc limit {$offset},{$length}";

$result = mysql_query($sql);

$t = time();

echo "<style>table td,table th{padding:15px;}</style>";

echo "<h2>查看学员|<a href='add.php?t={$t}'>添加学员</a></h2>";
echo "<table width='700px' border='1px' style='border-collapse: collapse;'>";
echo "<tr>";
echo "<th>id</th>";
echo "<th>学员</th>";
echo "<th>班级</th>";
echo "<th>性别</th>";
echo "<th>修改</th>";
echo "<th>删除</th>";
echo "</tr>";

if($result){

    //@抑制报错
    while($row=mysql_fetch_assoc($result)){

        echo "<tr>";
        echo "<td>{$row['id']}</td>";
        echo "<td>{$row['sn']}</td>";
        echo "<td>{$row['cn']}</td>";
        echo "<td>{$row['sex']}</td>";
        echo "<td><a href='edit.php?id={$row['id']}&t={$t}'>[修改]</a></td>";
        echo "<td><a href='del.php?id={$row['id']}&t={$t}'>[删除]</a></td>";
        echo "</tr>";

    }

}else{

    echo "<tr><td colspan='6' align='center'>暂无学员信息</td></tr>";

}
echo "</table>";

//计算上一页 下一页
$prevpage=$pagenum-1;
$nextpage=$pagenum+1;
$time = time();

if($prevpage === 0){

    echo "<h2><a href='javascript:;'>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='index.php?page={$nextpage}&t={$time}'>下一页</a></h2>";

}else{

    echo "<h2><a href='index.php?page={$prevpage}&t={$time}'>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='index.php?page={$nextpage}&t={$time}'>下一页</a></h2>";

}



mysql_free_result($totrst);

mysql_free_result($result);


//4. 用完记得关闭
mysql_close($connection);

?>
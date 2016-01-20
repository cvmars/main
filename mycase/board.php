<?php

header("Content-Type:text/html;charset=utf8");

$title = $_POST['title'];

$content = $_POST['content'];

var_dump($title,$content);

//写文件，第一个参数为路径，第二为内容
file_put_contents("data.txt", $title.",".$content."\n",FILE_APPEND);

echo 'OK,<a href="form.html">继续添加</a><a href="show.php">查看全部</a>';

?>
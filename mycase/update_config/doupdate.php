<?php

var_dump($_POST);

// 1.读取配置文件的信息
$info = file_get_contents("dbconfig.php");

//2.对post遍历，并对配置文件信息进行正则替换
foreach($_POST as $k=>$v){

    $info = preg_replace("/define\(\"{$k}\",\".*?\"\)/","define(\"{$k}\",\"{$v}\")",$info);

}

//3.把info再写回去
file_put_contents("dbconfig.php",$info);

echo "success";
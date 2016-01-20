<?php

//开启错误调试
ini_set("display_errors", "On");

//调试PHP
error_reporting(E_ALL);

$a = 1;

$b = 5;

$c = $b / $a;

// echo $c;

//从这个函数开始，下面就不会执行
die();

exit();

echo 1;



?>
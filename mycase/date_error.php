<?php

//preg_grep — 返回匹配模式的数组条目
//数学函数
//min
//max
//日期函数
//time()
//date() date — 格式化一个本地时间／日期
//strtotime()
//microtime()
//date 参数
//Y 2013 年
//y 13
//m 03 月
//n 3
//d 05
//j 5 几号
//H h 24 和 12
//i 分
//s 秒
//w 0-6
//t 31 一个月几天
//L 是否为润年

$str = join("",range("a","z"));

echo $str;

//会报错
// $arr = explode("", $str);

$arr = preg_split('//', $str);

// var_dump($arr);

$arr1 = array("php is very much","linux is very much","mysql js content php,linux,lamp");

$ptn = '/linux/';

$arr2 = preg_grep($ptn,$arr1);

var_dump($arr2);

echo max(1,2,34,4)."<br/>";

echo min(1,2,34,4)."<br/>";

echo  "<br>";

echo max(array(1,2,3,4,5));

echo  "<br>";

//时间戳  1970年
echo time(), "\n";

echo strtotime("10 September 2000"), "<br>";

echo date("Y-m-d H:i:s w t",2147483647), "<br>";

echo strtotime("2013-08-6"),"<br>";

// 设定要用的默认时区。自 PHP 5.1 可用 还可以修改配置文件 php.ini
date_default_timezone_set('PRC');

//晚了8个小时,按照时区算的。
echo date("Y-m-d H:i:s w t",time()),"<br>";

// echo date("Y-n-j");
//脚本运行时间
$stime = microtime(1);

sleep(1);

$etime = microtime(1);

echo $etime - $stime;

?>
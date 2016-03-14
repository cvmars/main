<?php



//正则表达式
//1.原子
//2.元子符
//3.模式修正符
//
//正则表达式函数
//preg_match — 执行一个正则表达式匹配
//preg_match_all — 执行一个全局正则表达式匹配
//preg_grep — 返回匹配模式的数组条目
//preg_replace — 执行一个正则表达式的搜索和替换
//preg_split — 通过一个正则表达式分隔字符串
//
//. 任意一个字符
//

$str = "http://www.baidu.com/web/index.php?id=10&name=user";

$ptn = '/\w+:\/\/(.*)\/\w+\/.*(\?\w+)?/';

preg_match($ptn,$str,$mats);

print_r($mats);






?>
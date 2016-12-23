<?php

header("Content-Type:text/html;charset=utf8");

//字符串的输出
//echo
//printf "aaa"
//die("xxx")
//printf("---",$a,$b)
//sprintf()

$str = " hello word";

echo $str;

echo "<br>";

printf($str);

echo "<hr>";

//--------------------string--------------------
//
// ltrim() 去头空白
// rtrim() 去尾空白
// trim() 去头和尾空白
// str_pad — 使用另一个字符串填充字符串为指定长度
// str_repeat() 重复
// str_shuffle — 随机打乱一个字符串
//
// strtoupper — 将字符串转化为大写
// strtolower — 将字符串转化为小写
// ucfirst — 将字符串的首字母转换为大写
// ucwords — 将字符串中每个单词的首字母转换为大写
//
// 与html标签相关联的字符串函数
// nl2br — 在字符串所有新行之前插入 HTML 换行标记
//
//留言板：
//建议在插入数据库前，三道把控
//1.标签过滤 2. addslashes() 3.htmlspecialchars() 转实体
// htmlspecialchars — Convert special characters to HTML entities
// addslashes — 使用反斜线引用字符串
// stripslashes — 反引用一个引用字符串 与上面操作相反
// strip_tags — 从字符串中去除 HTML 和 PHP 标记
//
// str_split — 将字符串转换为数组
// strlen — 获取字符串长度
// strrev — 反转字符串
// number_format — 以千位分隔符方式格式化一个数字
// md5 — 计算字符串的 MD5 散列值
//
//substr — 返回字符串的子串
//strstr — 查找字符串的首次出现
//str_replace — 子字符串替换
//parse_url — 解析 URL，返回其组成部分
// parse_str — 将字符串解析成多个变量
// preg_split — 通过一个正则表达式分隔字符串
//
//
//--------------------end ---------------------

/*

// 去除头尾空格
var_dump(ltrim($str));

//计算字符串长度
var_dump(strlen($str));

$text = "\t\tThese are a few words :) ...  ";

$binary = "\x09Example string\x0A";

$hello  = "Hello World";

var_dump($text, $binary, $hello);

print "\n";

echo "<hr>";

$input = "Alien";

echo str_pad($input, 10, "-=", STR_PAD_LEFT);  // 输出 "-=-=-Alien"

echo "<hr>";

echo "重复一个字符串10次：".str_repeat("-=", 10);

echo "<hr>";

echo nl2br("foo isn't\n bar");

echo "<hr>";

$lash = "Is your name O'reilly?";

// 输出： Is your name O\'reilly?
echo addslashes($lash);

echo "<hr>";

echo strrev("Hello world!"); // 输出 "!dlrow olleH"

echo "<hr>";

$md = "apple111111111";

var_dump(md5($md));  //32位的随机密码

echo "<hr>";

$split = "a,b,c,d";

//默认长度为1
var_dump(str_split($split));

// Array ( [0] => a,b [1] => ,c, [2] => d )
print_r(str_split($split,3));

echo "<hr>";

//转实体，看源码才能看出来
$new = htmlspecialchars("<a href='test'>Test</a>", ENT_QUOTES);

echo $new;

echo "<hr>";

echo strip_tags('<div style="height:100px;">aaaaa&&&&aaa</div>');

echo htmlspecialchars("<div>   %%#^&&$&(&</div>");

$rest = substr("abcdef", 0, -1);  // 返回 "abcde"

$substr = "PHP字符串截取函数的使用";

echo "<hr>";

echo mb_substr($substr,0,6,"utf-8")."...";

echo "<hr>";

$strpo = "http://location/text/www/index.php";

$posi1 = strpos($strpo,'/');

echo $posi1;

echo "<hr>";

$posi2 = strrpos($strpo,'/');

echo $posi2;

echo "<hr>";

echo "substr:".substr($strpo,$posi2+1,9);

echo "<hr>";

echo "strstr:".strstr($strpo,"index");

echo "<hr>";

$email  = 'name@example.com';

echo strstr($email, '@');

echo strchr($email,"@");

echo "<hr>";


echo str_replace("test","phpwind","test/test/heihei.php",$num);

echo "<hr>";

echo $num;

$path_parts = pathinfo('/www/htdocs/inc/lib.inc.php');

var_dump($path_parts);

$query = parse_url("http://www.feiniu.com/css/common.css?v=11122233");

var_dump($query);
//拆分参数
parse_str($query['query'],$query2);

var_dump($query2);


*/
$str = "http://localhost/www/abc/www/index.php?id=10&name=user1&age=30";

$arr = parse_url($str);

$arr2 = preg_split('/&|=/',$arr['query']);

var_dump($arr2);

//数组改造,生成一个新的参数数组
for($i=0;$i<count($arr2);$i++){

    $arr3[$arr2[$i]] = $arr2[++$i];

}

print_r($arr3);






?>
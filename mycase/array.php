<?php

header("Content-Type:text/html;charset=utf8");

session_start();

print_r($_COOKIE);

print_r($_SESSION);

//查看数组
//var_dump()  print_r()

//多纬数组一定要用<pre></pre>  22行

$arr_1 = array(1,2,3);

var_dump($arr_1);

$arr['name'] = "jokerye";

$arr['age'] = 30;

$arr['sex'] = "male";

$arr[] = "abck";

echo "<pre>";

print_r($arr);

echo "</pre>";

var_dump($arr);

$i = 0;

//数组循环1  foreach 常用
foreach ($arr as $key => $value) {

    // echo $key.":".$value."<br>";

    if($i++%2 == 0){

         echo "<h2 style='color:red;'>{$key}:{$value}</h2>";

    }else{

         echo "<h2>{$key}:{$value}</h2>";

    }

}

//数组循环2 while  list each
$user[0] = "u1";

$user[1] = "u2";

print_r($user);

//list快  ,关联数组不能用list，要改成索引数组
// list($key1,$key2) = $user;

// echo "<br>";

// echo $key1;

// echo "<br>";

// echo $key2;

// echo '<hr>';

// $user2 = each($user);

// print_r($user2);

// echo '<hr>';

// $user3 = each($user);

// print_r($user3);

// echo '<hr>';

echo "<hr>";

while(list($key,$val) = each($user)){

    echo $key.":".$val;

    echo "<hr>";

}

//多纬数组
//
//
//

$a_1 = array(1,2,3);
$a_2 = array(4);

//1
echo is_array($a_1);

echo is_array($a_2);


?>
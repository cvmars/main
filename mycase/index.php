<?php

// echo $_SERVER["REQUEST_URI"];

// $arr_url = parse_url("/act/9c892664c19877ccaf580362312596b4?id=22423");

// var_dump($arr_url);

// $path = explode('/',$arr_url['path']);

// var_dump($path);

// echo $path[2];

// echo substr($path,strripos($path,"/")+1);


// $data = array ('a'=>1,'b'=>66,'c'=>3,'d'=>4,'e'=>5);

// $callback = $_GET['callback'];

// echo $callback.'('.json_encode($data).')';

// exit;
header('Content-type: application/json');

$callback = isset($_GET['callback']) ? trim($_GET['callback']) : ''; //jsonp回调参数，必需

$date = array("age"=>$_GET['age'], "message"=>$_GET['age']);

$date["msg"]="err";

$date["info"]="因人品问题，发送失败";

$tmp= json_encode($date); //json 数据

echo $callback . '(' . $tmp .')';  //返回格式，必需

// echo md5(7);
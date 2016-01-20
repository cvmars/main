<?php

// phpinfo();

echo "hello word";

echo "<br />";

$arrayName = array("1" => "我是一", "2" => "我是二","3" => "我是三");

//打印数组
print_r($arrayName);

var_dump($arrayName);

//数组foreach
foreach ($arrayName as $key => $value) {
    echo $key.":".$value."<br>";
}

?>
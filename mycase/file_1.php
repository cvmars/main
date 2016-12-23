<?php

//fread($fs) 读取文件，参数是资源
//file() 把文件以数组形式返回，参数是文件
//readfile()
//file_get_contents()
//

header("Content-Type:text/html;charset=utf8");

// $filename = "0519.txt";

// $fs = fopen($filename,"a+");

// //写数据
// fwrite($fs, '<a>abc</a>');

// rewind($fs);

// $str = fread($fs,1024);

// echo $str."_".filesize($filename)."字节";

// //关闭文件
// fclose($fs);



// $filename = "0519.txt";

// $arr = file($filename);

// // //aaa bbb ccc ddd  不用echo
// readfile($filename);

// var_dump($arr);

//header之前不能有输出
// header("Content-Type:image/png;");

// readfile("static/img/iphone5.png");
//

// $filename = "0519.txt";

// $str = file_get_contents($filename);

// echo nl2br($str).$str;


//----------------------------------------------
// $filename = "a.txt";

// $fs = fopen($filename,"r");

// // while ($str = fread($fs,3)) {

// //   echo $str."<br>";

// // }

// while (!feof($fs)) {

//   $str = fread($fs,5);

//   echo $str."<br>";

// }

// //判断是否读到结尾
// var_dump(feof($fs));


//--------------------------------
$filename = "2.txt";

file_put_contents($filename,"123456",FILE_APPEND);

echo file_get_contents($filename);

// readfile($filename);







?>
<?php

//php 验证码
session_start();

//1.准备画布资源
$im = imagecreatetruecolor(100, 50);

//2.准备涂料
$black = imagecolorallocate($im,0,0,0);

$gray = imagecolorallocate($im,200,200,200);

//背景填充
imagefill($im,0,0,$gray);

$x = (100-20*4)/2;

$y = (50-20)/2+20;

//3.在画布上画图像或文字
$strarr = array_merge(range(0,9),range('a','z'),range('A','Z'));

shuffle($strarr);

$str = join('',array_slice($strarr,0,4));

//把$str存入session
$_SESSION['code']=$str;

$font = "msyh.ttf";

imagettftext($im, 20, 0, $x, $y, $black, $font, $str);

//4.输出最终图像或保存最终图像
header("content-Type:image/png");

//保存png
//imagepng($im,"gogo.png");
imagepng($im);

//5.释放画布资源
imagedestroy($im);


?>
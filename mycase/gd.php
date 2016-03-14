<?php

// phpinfo();
//图片处理函数实用场景：
//1.验证码
//2.缩放
//3.裁剪
//4.水印
//


//1.准备画布资源
$im = imagecreatetruecolor(500, 300);

//2.准备涂料
$black = imagecolorallocate($im,0,0,0);

$white = imagecolorallocate($im,255,255,255);

//3.在画布上画图像或文字
imagefilledellipse($im, 258, 151, 300, 200, $white);

//4.输出最终图像或保存最终图像
header("content-Type:image/png");

//保存png
// imagepng($im,"gogo.png");
imagepng($im);

//5.释放画布资源
imagedestroy($im);





?>
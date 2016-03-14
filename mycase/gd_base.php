<?php

//绘制图像
//imageline — 画一条线段
//imagefill — 区域填充
//imagepolygon — 画一个多边形
//imagefilledpolygon — 画一多边形并填充
//imageellipse — 画一个椭圆
//imagefilledellipse — 画一椭圆并填充
//imagearc — 画椭圆弧
//imagestring — 水平地画一行字符串
//imagestringup — 垂直地画一行字符串
//imagechar — 水平地画一个字符
//imagecharup — 垂直地画一个字符
//imagettftext — 用 TrueType 字体向图像写入文本
//imagesetpixel — 画一个单一像素
//imagerectangle — 画一个矩形

//1.准备画布资源
$im = imagecreatetruecolor(1000, 800);

//2.准备涂料
$black = imagecolorallocate($im,0,0,0);

$white = imagecolorallocate($im,255,255,255);

$red = imagecolorallocate($im,255,0,0);

$grayred = imagecolorallocate($im,255,100,100);

$green = imagecolorallocate($im,0,255,0);

$blue = imagecolorallocate($im,0,0,255);

$gray = imagecolorallocate($im,200,200,200);

//3.在画布上画图像或文字
//a.画线
for($i=0;$i<2;$i++){

    imageline($im,mt_rand(0,1000),mt_rand(0,800),mt_rand(0,1000),mt_rand(0,800),$white);

}

//b.像素点
for($i=0;$i<2;$i++){

    imagesetpixel($im,mt_rand(0,1000),mt_rand(0,800),$white);

}

//c.矩形
imagerectangle($im,0,0,100,200,$white);

//imagefilledrectangle($im,0,0,100,200,$white);

//d.三角
$arr = array(500,100,100,300,500,200);

imagefilledpolygon($im,$arr,3,$white);

//e.园符
imagearc($im, 100, 100, 150, 150, 0, 270, $white);

for($i=0;$i<10;$i++){

    imagefilledarc($im, 358, 400+$i, 200, 200, 0, 70, $gray,IMG_ARC_PIE);

    imagefilledarc($im, 358, 400+$i, 200, 200, 70, 190, $grayred,IMG_ARC_PIE);

    imagefilledarc($im, 358, 400+$i, 200, 200, 190, 270, $green,IMG_ARC_PIE);

    imagefilledarc($im, 358, 400+$i, 200, 200, 270, 360, $blue,IMG_ARC_PIE);

}

imagefilledarc($im, 358, 400, 200, 200, 0, 70, $white,IMG_ARC_PIE);

imagefilledarc($im, 358, 400, 200, 200, 70, 190, $red,IMG_ARC_PIE);

imagefilledarc($im, 358, 400, 200, 200, 190, 270, $green,IMG_ARC_PIE);

imagefilledarc($im, 358, 400, 200, 200, 270, 360, $blue,IMG_ARC_PIE);

//f.写字
imagestring($im, 5, 100, 200, "Hello world!", $green);

//g.单个字符
imagechar($im, 5, 300, 200, "Hello world!", $green);

//h.用 TrueType 字体向图像写入文本
$str = "thank you.";
$font = "msyh.ttf";
imagettftext($im, 20, 0, 100, 500, $red, $font, $str);


//4.输出最终图像或保存最终图像
header("content-Type:image/png");

//保存png
// imagepng($im,"gogo.png");
imagepng($im);

//5.释放画布资源
imagedestroy($im);





?>
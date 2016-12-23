<?php

/**
 * 图片验证码
 * @param {$w} 宽
 * @param {$h} 高
 * @param {$fn} 验证码字体数量
 * @param {$fs} 验证码字体大小
 * @param {$internum｝干扰素数量
 *
 * @returns void
*
 * @date 2016-03-23
 * @author jokerye
*/

function vcode($w=200,$h=50,$fn=6,$fs=20,$internum=10){

    //php 验证码
    session_start();

    //1.准备画布资源
    $im = imagecreatetruecolor($w, $h);

    //2.准备涂料
    $black = imagecolorallocate($im,0,0,0);

    $gray = imagecolorallocate($im,200,200,200);

    //背景填充
    imagefill($im,0,0,$gray);

    for($i=0;$i<$internum;$i++){

        imagesetpixel($im,mt_rand(0,$w),mt_rand(0,$h),$black);

    }

    $x = ($w-$fs*$fn)/2;

    $y = ($h-$fs)/2+$fs;

    //3.在画布上画图像或文字
    $strarr = array_merge(range(0,9),range('a','z'),range('A','Z'));

    shuffle($strarr);

    $str = join('',array_slice($strarr,0,$fn));

    //把$str存入session
    $_SESSION['code']=$str;

    $font = "msyh.ttf";

    imagettftext($im, $fs, 0, $x, $y, $black, $font, $str);

    //4.输出最终图像或保存最终图像
    header("content-Type:image/png");

    //保存png
    //imagepng($im,"gogo.png");
    imagepng($im);

    //5.释放画布资源
    imagedestroy($im);

}

vcode();


?>
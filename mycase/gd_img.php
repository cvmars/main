<?php

// phpinfo();
//图片处理函数实用场景：
//1.验证码
//2.缩放
//3.裁剪
//4.水印
//
//获取图片宽高
//1. getimagesize()
//2. imagesx()
//3. imagesy()
//已经存在形成画布资源
//imagecreatefromjpeg/png
//
//图片缩放函数：imagecopyresampled() imagecopyresized()  图片裁剪函数：

//1.准备画布资源
//

/**
 * 图片尺寸缩减
 * @param {$maxfile} string 大图路径
 * @param {$minw} int 小图宽
 * @param {$minh} int 小图高
 * @returns void
*
 * @date 2016-03-23
 * @author jokerye
*/

function thumb($maxfile,$minw,$minh){

    $imgfile = $maxfile;

    $arr = getimagesize($imgfile);

    $maxw = $arr[0];

    $maxh = $arr[1];

    $maxt = $arr[2];

    $maxm = $arr["mime"];

    //大图资源
    $maxim = imagecreatefromjpeg($imgfile);

    //等比例缩放
    if(($minw/$maxw)>($minh/$maxh)){

        $bili = $minh/$maxh;

    }else{

        $bili = $minw/$maxw;

    }

    $minw = floor($maxw*$bili);

    $minh = floor($maxh*$bili);

    //小图资源
    $minim = imagecreatetruecolor($minw,$minh);

    //把大图弄成小图
    imagecopyresampled($minim,$maxim,0,0,0,0,$minw,$minh,$maxw,$maxh);

    //小图输出
    header("content-type:{$maxm}");

    // switch ($maxt) {
    //     case 1:
    //         $imgout = "imagegif";
    //         break;
    //     case 2:
    //         $imgout = "imagejpeg";
    //         break;
    //     case 3:
    //         $imgout = "imagepng";
    //         break;
    // }

    $imgout = str_replace("/","", $arr["mime"]);

    $minfilename = "s_small.jpg";

    $imgout($minim,$minfilename);

    // $imgout($minim);

    //释放资源
    imagedestroy($maxim);

    imagedestroy($minim);

}

thumb("static/img/small.jpg",200,500);


?>
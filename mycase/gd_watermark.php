<?php

/**
 * 图片打水印
 * @param {$maxfile} string 大图路径
 * @param {$minfile} string 小图路径
 * @returns void
*
 * @date 2016-03-23
 * @author jokerye
*/

function watermark($maxfile,$minfile){

    $maxim = imagecreatefromjpeg($maxfile);

    $minim = imagecreatefrompng($minfile);

    $minw = imagesx($minim);

    $minh = imagesy($minim);

    imagecopy($maxim,$minim,0,0,0,0,$minw,$minh);

    header("content-type:image/jpeg");

    imagejpeg($maxim);

}

watermark("static/img/small.jpg","static/img/iphone1.png");


?>
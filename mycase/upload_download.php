<?php
header("content-type:text/html;charset=utf-8");
//文件上传
print_r($_POST);

var_dump($_FILES);

$tmpfile = $_FILES['filename']['tmp_name'];

$fname = $_FILES['filename']['name'];

$ftype = $_FILES['filename']['type'];

//文件后缀
$fileext = array_pop(explode('.', $fname));

//文件类型
$filetype = explode('/', $ftype);

//或者这里用 array_unshift()

$dstfile = "uploads/".($filetype[0] == "image" ? "images/":"files/").time().'_'.mt_rand().'.'.$fileext;

//允许规定类型
$filearr = array("jpg","png","rar","exe","txt");

//允许文件大小 除以1024 就是多少KB
$filesize = $_FILES['filename']['size'];

//错误编码
$errorcode = $_FILES['filename']['error'];

if($errorcode !== 0)return;

if($filesize > 20480){

    echo "文件大小超出了".($filesize - 20480)."KB";

    return;

}

if(in_array($fileext, $filearr)){

    if(move_uploaded_file($tmpfile, $dstfile)){

        echo "upload success";

    }else{

        echo "upload failed";

    }

}else{

    echo "文件后缀不允许";

}

?>
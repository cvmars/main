<?php

// 文件处理函数
//1.文件操作 2.目录操作 3.文件上传 4.文件下载 5.多文件上传 6.文件和上传下载系统

//1.filetype — 取得文件类型
//2.is_dir — 判断给定文件名是否是一个目录
//3.is_file — 判断给定文件名是否为一个正常的文件
//4.file_exists — 检查文件或目录是否存在
//5.filesize — 取得文件大小  空的文件夹4K
//6.
//文件操作
//新建文件 fopen()
//删除文件 unlink — 删除文件
//文件重命名 rename — 重命名一个文件或目录
//文件复制 copy — 拷贝文件
//文件移动 copy() unlink()
//打开文件 fopen($filename,"打开模式")r r+ w+ w a a+
//写入文件 fwrite — 写入文件（可安全用于二进制文件）
//关闭文件 fclose() 有资源的时候，需要关闭，不关也行，但是理论上要关
//rewind — 倒回文件指针的位置
//

// 读取文件内容
// file()
// fread()
// readfile()
// file_get_contents()
// 写入文件
// fwrite()
// file_put_contents(filename, data)

// feof 试文件指针是否到了文件结束的位置

//dir
echo filetype("static/")."---".filetype("s_small.jpg");

echo "<hr>";

//boolean true
var_dump(is_dir("static/"));

//boolean true
var_dump(is_file("s_small.jpg"));

//boolean false
var_dump(file_exists("s_smal22l.jpg"));

//int 5348   5.348K
var_dump(filesize("file.txt"));

//--------------------------------------------file------------------------------------//

$filename = "file.txt";

// rename($filename,"file_new.txt");
// w+全清再写
$fp = fopen($filename,"w+");

//写数据
fwrite($fp, '567');

//读数据
rewind($fp);

$word = fread($fp,1024);

var_dump($word);

//关闭文件
fclose($fp);

// var_dump(copy($filename,"static/file.txt"));


// var_dump(unlink($filename));

// var_dump(unlink("file.txt"));



?>
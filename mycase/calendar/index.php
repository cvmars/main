<?php

// 1.相关知识点
// 日期函数
//     date
//     time
// 结构
//     循环结构
//     逻辑判断
// 2.实现步骤
//   a.获取当前日期信息 年和月（默认为当前年和当前月）
//   b.计算出当前月有多少天 和 本月1号是星期几
//   c.输出日历的头部信息（标题和表头）
//   d.循环遍历输出日期信息，天
//   e.输出上一个月和下一个月的链接

echo date("Y-m"),"<br>";

// a.获取当前日期信息 年和月（默认为当前年和当前月）
$year = @$_GET['y']?$_GET['y']:date("Y");

$mon = @$_GET['m']?$_GET['m']:date("m");

//b.计算出当前月有多少天 和 本月1号是星期几

$day = date("t",mktime(0,0,0,$mon,1,$year));

$w = date("w",mktime(0,0,0,$mon,1,$year));

//c.输出日历的头部信息（标题和表头）
echo "<center>";
echo "<h2>{$year}年{$mon}月</h2>";

echo "<table border='1' style='width:600px;border:1px solid #000;border-collapse: collapse;'>";

echo "<tr>";

for($k=0;$k<7;$k++){

    $h = array("日","一","二","三","四","五","六");

    echo "<th>星期{$h[$k]}</th>";

}

echo "</tr>";

//d.循环遍历输出日期信息，天
$dd=1;

while ($dd <= $day) {

    echo "<tr>";

    for($i=0;$i<7;$i++){

        //当还没有到该输出日期的时候，或者已经日期溢出时，输出的都是空单元格
        if(($w>$i && $dd==1) || $dd > $day){

            echo "<td>&nbsp;</td>";

        }else{

            echo "<td>{$dd}</td>";

            $dd++;

        }

    }

    echo "</tr>";

}

echo "</table>";

//e.输出上一个月和下一个月的链接
$prey=$nexty=$year;//年
$prem=$nextm =$mon;//月
if($prem<=1){

    $prem = 12;
    $prey--;

}else{
    $prem--;
}

if($nextm>=12){

    $nextm = 1;
    $nexty++;

}else{

    $nextm++;
}

$t=time();

echo "<a href='index.php?y={$prey}&m={$prem}&t={$t}'>上一月</a>";

echo "<a href='index.php?y={$nexty}&m={$nextm}&t={$t}'>下一月</a>";


echo "</center>";
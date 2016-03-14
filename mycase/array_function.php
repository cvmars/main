<?php

header("Content-Type:text/html;charset=utf8");

//数组键值操作函数
$array = array("name"=>"user1","age"=>"30","sex"=>"man");

//-------------------//
//  array_values
//  array_keys
//  in_array
//  var_dump 可以查看数组类型  print_r
//  array_key_exists - 检查给定的键名或索引是否存在于数组中
//  array_flip — 交换数组中的键和值
//  array_reverse — 返回一个单元顺序相反的数组
//  array_search — 在数组中搜索给定的值，如果成功则返回相应的键名

//  count — 计算数组中的单元数目或对象中的属性个数
//  array_count_values — 统计数组中所有的值出现的次数
//  array_unique — 移除数组中重复的值
//  array_map — 将回调函数作用到给定数组的单元上
//  array_merge — 合并一个或多个数组
//  array_chunk — 将一个数组分割成多个
//  array_column — 返回数组中指定的一列
//  array_combine — 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值
//  array_diff — 计算数组的差集
//  array_fill — 用给定的值填充数组
//  array_multisort — 对多个数组或多维数组进行排序
//
//  array_shift — 将数组开头的单元移出数组
//  array_unshift — 在数组开头插入一个或多个单元
//  array_push — 将一个或多个单元压入数组的末尾（入栈）
//  array_pop — 将数组最后一个单元弹出（出栈）
//  array_splice — 把数组中的一部分去掉并用其它值取代
//  array_slice — 从数组中取出一段
//  array_reduce — 用回调函数迭代地将数组简化为单一的值
//  array_rand — 从数组中随机取出一个或多个单元
//  array_sum — 计算数组中所有值的和
//
//  sort — 对数组排序，不保留key
//  rsort - 降序 不保留key
//  asort — 对数组进行排序并保持索引关系
//  arsort — 对数组进行逆向排序并保持索引关系
//  ksort — 对数组按照键名排序
//  krsort — 对数组按照键名逆向排序
//  natsort — 用"自然排序"算法对数组排序
//  natcasesort — 用"自然排序"算法对数组进行不区分大小写字母的排序
//  shuffle — 将数组打乱
//  range — 建立一个包含指定范围单元的数组
//
//  join — 别名 implode()
//  explode — 使用一个字符串分割另一个字符串

//  ---------------//
//Array ( [0] => user1 [1] => 30 [2] => man )
print_r(array_values($array));

//Array ( [0] => name [1] => age [2] => sex )
print_r(array_keys($array));

$array1 = array("blue", "red", "green", "blue", "blue");

//Array ( [0] => 0 [1] => 3 [2] => 4 )
print_r(array_keys($array1, "blue"));

//boolean true
var_dump(in_array("user1",$array));

//boolean true
var_dump(array_key_exists("name",$array));

$trans = array("a" => 1, "b" => 1, "c" => 2);
$trans1 = array_reverse($trans);
$trans = array_flip($trans);

//Array ( [1] => b [2] => c ) 键值互换
print_r($trans);

echo "<hr>";

//Array ( [c] => 2 [b] => 1 [a] => 1 )  反序
print_r($trans1);

echo "<hr>";

//2
echo (array_search("green",$array1));

echo "<hr>";

$stack = array("orange", "banana", "apple", "raspberry");
$fruit = array_shift($stack);

// Array ( [0] => banana [1] => apple [2] => raspberry )
print_r($stack);

echo "<hr>";

$queue = array("orange", "banana");
array_unshift($queue, "apple", "raspberry");

// Array ( [0] => apple [1] => raspberry [2] => orange [3] => banana )
print_r($queue);

echo "<hr>";

$a[0] = 1;
$a[1] = 3;
$a[2] = 5;
$result = count($a);


//3
echo "计算数组中的单元数目或对象中的属性个数：".$result;

echo "<hr>";

//Array ( [blue] => 3 [red] => 1 [green] => 1 )
print_r(array_count_values($array1));

echo "<hr>";

//Array ( [0] => blue [1] => red [2] => green )
print_r(array_unique($array1));

echo "<hr>";

function cube($n)
{
    return($n * $n * $n);
}

$a = array(1, 2, 3, 4, 5);
$b = array_map("cube", $a);

//Array ( [0] => 1 [1] => 8 [2] => 27 [3] => 64 [4] => 125 )
print_r($b);

echo "<hr>";

$array3 = array("color" => "red", 2, 4);

$array4 = array("a", "b", "color" => "green", "shape" => "trapezoid", 4);

$result5 = array_merge($array3, $array4);

// Array ( [color] => green [0] => 2 [1] => 4 [2] => a [3] => b [shape] => trapezoid [4] => 4 )
print_r($result5);

echo "<hr>";

$input_array = array('a', 'b', 'c', 'd', 'e');

// Array ( [0] => Array ( [0] => a [1] => b ) [1] => Array ( [0] => c [1] => d ) [2] => Array ( [0] => e ) )
print_r(array_chunk($input_array, 2));

echo "<br>";

// Array ( [0] => Array ( [0] => a [1] => b ) [1] => Array ( [2] => c [3] => d ) [2] => Array ( [4] => e ) )
print_r(array_chunk($input_array, 2, true));

echo "<hr>";

$a = array('green', 'red', 'yellow');
$b = array('avocado', 'apple', 'banana');
$c = array_combine($a, $b);

//Array ( [green] => avocado [red] => apple [yellow] => banana )
print_r($c);

echo "<hr>";

$array10 = array("a" => "green", "red", "blue", "red");
$array20 = array("b" => "green", "yellow", "red");
$result10 = array_diff($array10, $array20);

//Array ( [1] => blue )
print_r($result10);

echo "<hr>";

$a1 = array_fill(5, 6, 'banana');

$b1 = array_fill(-2, 4, 'pear');

//Array ( [5] => banana [6] => banana [7] => banana [8] => banana [9] => banana [10] => banana )
print_r($a1);

// Array ( [-2] => pear [0] => pear [1] => pear [2] => pear )
print_r($b1);

echo "<hr>";

$filter = array(80,60,30,20,120);

function heihei($val){

    if($val >60 ){

        return $val;

    }

}

//Array ( [0] => 80 [4] => 120 )
print_r(array_filter($filter,"heihei"));

echo "<hr>";

$fruits = array("lemon", "orange", "banana", "apple");

sort($fruits);

print_r($fruits);

echo "<hr>";

// Array ( [0] => apple [1] => banana [2] => lemon [3] => orange )
rsort($fruits);

// Array ( [0] => orange [1] => lemon [2] => banana [3] => apple )
print_r($fruits);

$arsort = array("a" => 10,"b" => 2,"c" => 5,"d" => 30);

sort($arsort);  //

rsort($arsort);

asort($arsort);  //升序,保留key

arsort($arsort);  //降序

ksort($arsort);

krsort($arsort);

print_r($arsort);

echo "<hr>";

$multi = array("aaaa","bbbbbbbb","ccc","ddddddddddddddd");

foreach ($multi as $val) {

    //下标
    $lens[] = strlen($val);

}

//按标题长度排序
//标题长度变成key

array_multisort($lens,SORT_ASC,$multi);

sort($lens);

$multi2 = array_combine($lens,$multi);

// Array ( [3] => ccc [4] => aaaa [8] => bbbbbbbb [15] => ddddddddddddddd )
print_r($multi2);

echo "<hr>";

$queue = array("orange", "banana");

array_unshift($queue, "apple", "raspberry");

//Array ( [0] => apple [1] => raspberry [2] => orange [3] => banana )
print_r($queue);

echo "<hr>";

$str = "a-b-c-d-e-f";

//Array ( [0] => a [1] => b [2] => c [3] => d [4] => e [5] => f )
$arrheihei = explode("-",$str);

//a,b,c,d,e,f
print_r(implode(",",$arrheihei));

echo "<hr>";

$arr_slice = array("aa","bb","cc","dd","ee");

//从0开始，取三个
$arr_slice1 = array_slice($arr_slice,0,3);

$arr_slice2 = array_slice($arr_slice,-2,2);

//Array ( [0] => aa [1] => bb [2] => cc )
print_r($arr_slice1);

// Array ( [0] => dd [1] => ee )
print_r($arr_slice2);

echo "<hr>";

$a1 = array("aa","bb","cc");

$a2 = array_pop($a1);

$a3 = array_push($a1,"dd","ee");

// Array ( [0] => aa [1] => bb )  $a1 被删除了最后一个元素
print_r($a1);

// cc
echo $a2;

echo "<hr>";

$rand = array("aa","bb","cc","dd","ee");

$rand2[] = $rand[array_rand($rand)];
$rand2[] = $rand[array_rand($rand)];
$rand2[] = $rand[array_rand($rand)];

//随机取key,Array ( [0] => aa [1] => dd [2] => ee )  随机
print_r($rand2);

echo "<hr>";

$shuffle = array("aa","bb","cc","dd","ee","ff");

//打乱，取前三
shuffle($shuffle);

print_r(array_slice($shuffle,0,3));

echo "<hr>";

//Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 )
$range = range("e","z");

print_r($range);

echo "<hr>";

$y4 = array_merge(range(0,9),range("a","z"),range("A","Z"));

shuffle($y4);

$y5 = array_slice($y4,0,4);

$y6 = join("",$y5);

echo "验证码：".$y6;

echo "<hr>";

//6
echo array_sum(array(1,2,3));







































?>
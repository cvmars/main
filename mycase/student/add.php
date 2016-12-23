<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>add class name</title>
</head>
<body>
    <div>
        <h2>学员添加</h2>
        <form action="insert.php" method="post">
            学员名称：<input type="text" id="" name="stuname"><br>
            班级：
                <select name="cid" id="">
                    <?php

                        //1.通过PHP连接mysql数据库
                        $connection = mysql_connect("localhost","root","");

                        if(!$connection){

                            die('connection fail');

                        }

                        //2.选择数据库
                        mysql_select_db("test",$connection);

                        //3.设置客户端和连接字符集
                        mysql_query("set names utf8");

                        $sql = "select * from cls order by id";

                        $result = mysql_query($sql);

                        if($result){

                            while($row=mysql_fetch_assoc($result)){

                                echo "<option value='{$row['id']}'>{$row['name']}</option>";

                            }

                        }else{

                            echo "<option>暂无班级信息</option>";

                        }

                        mysql_free_result($result);


                        //4. 用完记得关闭
                        mysql_close($connection);

                     ?>
                </select>
                <br>
            性别：<input type="text" id="" name="sex"><br>
            <input type="submit" value="submit">
            <input type="reset" value="reset">
        </form>
    </div>
</body>
</html>
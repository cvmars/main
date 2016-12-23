<?php

//start session
session_start();

//清空 $_SESSION
session_unset();

//销毁session
session_destroy();

//删除客户端PHPSESSId cookie值
setcookie(session_name(),"",time()-3600,"/");

header("location:login.php");
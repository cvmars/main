<?php

function ImageUpdateSize($picname,$maxx=100,$maxy=100,$pre="s_"){

   $info = getimagesize($picname);

   var_dump($info);

}


ImageUpdateSize('./static/img/index.png');

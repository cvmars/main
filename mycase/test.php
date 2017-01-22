<?php

class Foo {

    public $aMemberVar = 'aMemberVar Member Variable';

    public $aFuncName = 'aMemberFunc';

    private $go = "mine";


    function aMemberFunc() {

        print 'Inside `aMemberFunc()`';

    }
}

$foo = new Foo;

echo $foo->aMemberFunc();

echo "<br>";

echo $foo->aMemberVar;

echo $foo->go;
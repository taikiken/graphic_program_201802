<?php

include "local.php";

$o=new db;
$o->connect();

$dir=array(
	"raw"=>"raw",
	"480x240"=>"thumbnail3",
	"480x480"=>"thumbnail4"
);

$id=$_GET["id"];
$size=$dir[$_GET["size"]];

$sql=sprintf("select img1 from repo_n where id=%s;",$id);
$o->query($sql);
$f=$o->fetch_array();

$ext=pathinfo($f["img1"],PATHINFO_EXTENSION);
$file=sprintf("%s/%s/%s",$ImgPath,$size,$f["img1"]);

function _filesize($url) {
    static $regex='/^Content-Length: *+\K\d++$/im';
    if(!$fp=@fopen($url,'rb')) {
        return false;
    }
    if(isset($http_response_header)&&preg_match($regex,implode("\n",$http_response_header),$matches)){
        return (int)$matches[0];
    }
    return strlen(stream_get_contents($fp));
}

header('Content-Type: application/force-download');
header('Content-Length: '._filesize($file));
header('Content-disposition: attachment; filename="'.sprintf("%s_%s.%s",$id,$_GET["size"],$ext).'"');

readfile($file);

?>
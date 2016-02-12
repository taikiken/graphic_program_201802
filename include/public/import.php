<?php


function categorysearch($k){
	global $r;
	$x=130;
	for($i=0;$i<count($r);$i++){
		for($j=0;$j<count($r[$i][1]);$j++){
			if(preg_match("/".$r[$i][1][$j]."/",$k))$x=$r[$i][0];
		}
	}
	return $x;
}

function imgDresize($img_name,$n_Img,$re_size,$p="jpg"){
	$size=getimagesize($img_name);
	if($re_size[0]<$size[0]&&$re_size[1]<$size[1]){
		$ptage_w=$re_size[0]/$size[0];
		$ptage_h=$re_size[1]/$size[1];
		if($size[0]*$ptage_h<$re_size[0]){
			$ptg=$ptage_w;
			$x=0;
			$y=ceil(($size[1]*$ptg-$re_size[1])/6);
		}else{
			$ptg=$ptage_h;
			$x=ceil(($size[0]*$ptg-$re_size[0])/2);
			$y=0;
		}
		$sp=array(0,0);
		$resize=array($size[0]*$ptg+1,$size[1]*$ptg+1);
	}elseif($re_size[0]>$size[0]&&$re_size[1]>$size[1]){
		$sp[0]=ceil(($re_size[0]-$size[0])/2);
		$sp[1]=ceil(($re_size[1]-$size[1])/2);
		$x=$y=0;
		$resize=array($size[0],$size[1]);
	}elseif($re_size[0]<=$size[0]){
		$sp[0]=0;
		$sp[1]=ceil(($re_size[1]-$size[1])/2);
		$x=ceil(($size[0]-$re_size[0])/2);
		$y=0;
		$resize=array($size[0],$size[1]);
	}else{
		$sp[0]=ceil(($re_size[0]-$size[0])/2);
		$sp[1]=0;
		$x=0;
		$y=ceil(($size[1]-$re_size[1])/2);
		$resize=array($size[0],$size[1]);
	}
	
	$newImg=imagecreatetruecolor($re_size[0],$re_size[1]);
	imagefill($newImg,0,0,imagecolorclosest($newImg,0,0,0));
	$defImg=makeDefaultImg($img_name,$p);
	imagecopyresampled($newImg,$defImg,$sp[0],$sp[1],$x,$y,$resize[0],$resize[1],$size[0],$size[1]);
	//imagecopymergegray($newImg,$newImg,0,0,0,0,320,370,0);
	outputImg($newImg,$n_Img,$p);
}
function makeDefaultImg($filename,$type){
	if($type=="jpg"){
		return imagecreatefromjpeg($filename);
	}elseif($type=="png"){
		return imagecreatefrompng($filename);
	}elseif($type=="gif"){
		return imagecreatefromgif($filename);
	}	
}
function outputImg($res,$filename,$type){
	$compress=100;
	if($type=="jpg"){
		$e=imagejpeg($res,$filename,$compress);
	}elseif($type=="gif"){
		$e=imagegif($res,$filename,$compress);
	}elseif($type=="png"){
		$e=imagepng($res,$filename,$compress);
	}
	if($e){
		imagedestroy($res);
		chmod($filename,0777);
	}else{
		echo "画像の出力に失敗しました。もう一度アップロードしてください。";
	}
	return $e;
}

function getfileinfo($i){
	$s=pathinfo($i);
	preg_match("/.([0-9]+) /",microtime(),$m);
	return array(sprintf("%s%s.%s",date("YmdHis"),$m[1],$s["extension"]),$s["extension"]);
}

function outimg($oimg){

	if(getenv("REMOTE_ADDR")!="127.0.0.1"){
		$imgp="/var/www/html/prg_img/";
	}else{
		$imgp="D:/Apache/htdocs/tmp/ut/prg_img/";
	}

	$img=file_get_contents($oimg);
	$fl=getfileinfo($oimg);
	file_put_contents(sprintf("%sraw/%s",$imgp,$fl[0]),$img);
	imgDresize($oimg,sprintf("%simg/%s",$imgp,$fl[0]),array(640,400),$fl[1]);
	imgDresize($oimg,sprintf("%sthumbnail1/%s",$imgp,$fl[0]),array(320,180),$fl[1]);
	imgDresize($oimg,sprintf("%sthumbnail2/%s",$imgp,$fl[0]),array(150,150),$fl[1]);
	
	return $fl[0];
}

function splittime($a,$b){
	global $s;
	$ss=$a.",".$b;
	$ss=explode(",",str_replace(array(" ","-",":"),",",$ss));
	for($i=0;$i<count($ss);$i++){
		$s["a".($i+1)]=$ss[$i];
	}
}

function makesql($a,$f){

	if($f==0){

		while(list($k,$v)=each($a)){
			if(strlen($v)>0){

				$v=stripslashes($v);
				$v=addslashes($v);
				
				$v=str_replace(array("\r\n","\r"),"\n",$v);
				$v=str_replace("―","-",$v);
				
				$v=str_replace("\'","''",$v);
				$v=sprintf("'%s'",$v);
				
				if(preg_match("/select max/",$v))$v=str_replace("'","",$v);
				
			}else{
				$v="null";
			}
			$sv[$sn[]=$k]=$v;
		}
		
		return sprintf("insert into repo_n(%s) values(%s);",implode(",",$sn),implode(",",$sv));
		
		
	}else{

		while(list($k,$v)=each($a)){

			$v=stripslashes($v);
			$v=addslashes($v);
			
			$v=str_replace(array("\r\n","\r"),"\n",$v);
			$v=str_replace("―","-",$v);
			
			$v=str_replace("\'","''",$v);
							
			$sv[]=sprintf("%s=%s",$k,strlen($v)>0?sprintf("'%s'",$v):"null");
		}
		
		return sprintf("update repo_n set %s where id=%s;",implode(",",$sv),$f);

	}
}

?>
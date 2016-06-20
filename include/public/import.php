<?php

$excategory=array(129,130,133);

$exword=array();
$exword[]="スポーツ";
$exword[]="一般スポーツ";
$exword[]="その他";
$exword[]="ニュース";
$exword[]="プロ野球ニュース";
$exword[]="国内・海外・その他";
$exword[]="格闘技";
$exword[]="陸上";
$exword[]="ウインタースポーツ";
$exword[]="政治";
$exword[]="地方政治";
$exword[]="震災・防災・原発";
$exword[]="社会";
$exword[]="sports";
$exword[]="battle";
$exword[]="バトル";
$exword[]="くらし・趣味";
$exword[]="トラベル";
$exword[]="国際";
$exword[]="インタビュー";
$exword[]="ヨーロッパ";
$exword[]="ロシア";
$exword[]="試合結果サマリー";
$exword[]="本紙面（総合ニュース）";
$exword[]="海外ニュース";

$baseball=array("ヤクルト","巨人","阪神","広島","中日","DeNA","ソフトバンク","日本ハム","ロッテ","西武","オリックス","楽天");

function baseball_mapping($f){
	global $baseball;
	$e=array();
	$baseball_mapping=array("/(ヤクルト|ツバメ)/","/巨人/","/(阪神|トラ|猛虎)/","/(広島|コイ)/","/中日/","/DeNA/","/(ソフトバンク|SB|タカ)/","/ハム/","/ロッテ/","/(レオ|西武)/","/オリ/","/楽天/");
	for($i=0;$i<count($f);$i++){
		if(strlen($f[$i])>0){
			for($j=0;$j<count($baseball);$j++){
				if(preg_match($baseball_mapping[$j],$f[$i])){
					$e[]=$baseball[$j];
				}
			}
		}
	}
	if(count($e)>0){
		$e=array_unique($e);
		$e=array_values($e);
	}
	return $e;
}

function relatedlink($link,$id=0){
	
	$s=array();
	$n=count($link["li"]);
	for($i=0;$i<$n;$i++){
		
		$title=bind($link["li"][$i]["@attributes"]["url"]);
		$url=bind(str_replace("]>","]",$link["li"][$i]["@attributes"]["title"]));
		
		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{	
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s where not exists (select*from u_link where pid=%s and n=%s);",$id,$title,$url,($i+1),$id,($i+1));
			$s[]=sprintf("update u_link set title='%s',url='%s' where not exists (select * from u_link where title='%s' and url='%s') and cid=%s and n=%s;",$title,$url,$title,$url,$id,($i+1));
		}
	}
	return implode("\n",$s);
}

function is_tag($a,$b){
	$e=0;
	for($i=0;$i<count($a);$i++){
		if(strlen($a[$i])==0)break;
		for($j=0;$j<count($b);$j++){
			if($a[$i]==$b[$j]){
				$e=1;
				break;
			}
		}
	}
	return $e;
}

function categorysearch($r,$k){
	$x=129;
	for($i=0;$i<count($r);$i++){
		for($j=0;$j<count($r[$i][1]);$j++){
			if(preg_match("/".$r[$i][1][$j]."/",$k))$x=$r[$i][0];
		}
	}
	return $x;
}
function category_mapping($r,$f){
	$e=129;
	for($i=0;$i<count($f);$i++){
		if($e==129&&strlen($f[$i])>0){
			$e=categorysearch($r,$f[$i]);
			if($e!=129)break;
		}
	}
	return $e;
}
function categorymatching($exword,$k){
	$k=explode(",",$k);
	$w=array();
	for($i=0;$i<count($k);$i++){
		$d=trim($k[$i]);
		if(strlen($d)>0){
			$w[]=$d;
			for($j=0;$j<count($exword);$j++){
				if($d==$exword[$j]||preg_match("/^[0-9]+$/",$d)){
					array_pop($w);
					break;
				}
			}
		}
	}
	return $w;
}

function key_merge($k){
	if(is_array($k)){
		for($i=0;$i<count($k);$i++)$k[$i]=explode(",",$k[$i]);
		$r=array_merge($k[0],$k[1]);
		$r=array_unique($r);
		$r=array_values($r);
		$r=implode(",",$r);
	}else{
		$r=$k;
	}
	return $r;
}

function splittime($a,$b){
	global $s;
	if(strlen($b)>0)$ss=$a.",".$b;
	else $ss=$a;
	$ss=explode(",",str_replace(array(" ","-",":"),",",$ss));
	for($i=0;$i<count($ss);$i++){
		$s["a".($i+1)]=$ss[$i];
	}
}

function imgDresize($img_name,$n_Img,$re_size,$p="jpg"){
	$size=getimagesize($img_name);
	if($re_size[0]<$size[0]&&$re_size[1]<$size[1]){
		$ptage_w=$re_size[0]/$size[0];
		$ptage_h=$re_size[1]/$size[1];
		if($size[0]*$ptage_h<$re_size[0]){
			$ptg=$ptage_w;
			$x=0;
			$y=ceil(($size[1]*$ptg-$re_size[1])/2.5);
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
	if($type=="jpg"){
		$e=imagejpeg($res,$filename,100);
	}elseif($type=="gif"){
		$e=imagegif($res,$filename);
	}elseif($type=="png"){
		$e=imagepng($res,$filename,0);
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
	$ext=strtolower($s["extension"]);
	return array(sprintf("%s%s.%s",date("YmdHis"),$m[1],$ext),$ext);
}

function outimg($oimg){
	
	global $SERVERPATH;
	$imgp=$SERVERPATH."/prg_img/";
	
	$fl=getfileinfo($oimg);
	
	$ch=curl_init();
	curl_setopt($ch,CURLOPT_URL,$oimg);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
	$img=curl_exec($ch);
	file_put_contents(sprintf("%sraw/%s",$imgp,$fl[0]),$img);

	imgDresize(sprintf("%sraw/%s",$imgp,$fl[0]),sprintf("%simg/%s",$imgp,$fl[0]),array(640,400),$fl[1]);
	imgDresize(sprintf("%sraw/%s",$imgp,$fl[0]),sprintf("%sthumbnail1/%s",$imgp,$fl[0]),array(320,180),$fl[1]);
	imgDresize(sprintf("%sraw/%s",$imgp,$fl[0]),sprintf("%sthumbnail2/%s",$imgp,$fl[0]),array(150,150),$fl[1]);
	
	return $fl[0];
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
				if(preg_match("/(select max)/",$v))$v=str_replace("'","",$v);
				if(preg_match("/(nextval)/",$v))$v="nextval('repo_n_id_seq')";
			}else{
				$v="null";
			}
			$sv[$sn[]=$k]=$v;
		}
		return sprintf("insert into repo_n(%s) select %s where not exists (select * from repo_n where t7=%s);",implode(",",$sn),implode(",",$sv),$sv["t7"]);
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
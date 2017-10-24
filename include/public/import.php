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
$exword[]="アスリート";
$exword[]="女性";
$exword[]="こころ";
$exword[]="体";
$exword[]="悩み";
$exword[]="生きかた";

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

	if($n==1){
		$se=$link["li"];
		unlink($link);
		$link["li"][0]=$se;
	}

	for($i=0;$i<$n;$i++){

		$title=bind($link["li"][$i]["@attributes"]["url"]);
		$url=bind(str_replace("]>","]",$link["li"][$i]["@attributes"]["title"]));

		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s where not exists (select*from u_link where pid=%s and n=%s);",$id,$title,$url,($i+1),$id,($i+1));
			$s[]=sprintf("update u_link set title='%s',link='%s' where not exists (select * from u_link where title='%s' and link='%s') and pid=%s and n=%s;",$title,$url,$title,$url,$id,($i+1));
		}
	}

	return implode("\n",$s);
}

function relatedlink2($links,$id=0){

	$s=array();
	$n=count($links);

	if($n==1){
		$link[0]=$links;
	}else{
		$link=$links;
	}

	for($i=0;$i<$n;$i++){

		$title=bind($link[$i]["@attributes"]["url"]);
		$url=bind($link[$i]["@attributes"]["title"]);

		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{
			if($i==0)$s[]=sprintf("delete from u_link where pid=%s;",$id);
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s;",$id,$title,$url,($i+1));
		}
	}
	return implode("\n",$s);
}

function relatedlink3($links,$id=0){

	if(!$links)return;

	$s=array();

	if($links["link"]){
		$link[0]=$links;
	}else{
		$link=$links;
	}

	for($i=0;$i<count($link);$i++){

		$title=bind($link[$i]["link"]["@attributes"]["url"]);
		$url=bind($link[$i]["link"]["@attributes"]["title"]);

		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{
			if($i==0)$s[]=sprintf("delete from u_link where pid=%s;",$id);
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s;",$id,$title,$url,($i+1));
		}

		if($i==4)break;
	}

	return implode("\n",$s);
}

/**
 * 関連記事をSQL文にする
 * パターン４
 * @param $links
 * @param int $id
 * @return string
 */
function relatedlink4($links,$id=0)
{
	for($i=0;$i<count($links["link"]);$i++){

		$title=bind($links["link"][$i]["@attributes"]["url"]);
		$url=bind($links["link"][$i]["@attributes"]["title"]);

		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{
			if($i==0)$s[]=sprintf("delete from u_link where pid=%s;",$id);
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s;",$id,$title,$url,($i+1));
		}

		if($i==4)break;
	}

	return implode("\n",$s);
}

/*
* 2017-10-13 関連リンク生成
*/
function relatedlink_New($links, $id=0){

	$s = array();
	foreach($links as $i => $link) {
		$title = bind((string)$link->attributes()->url);
		$url = bind(str_replace("]>", "]", (string)$link->attributes()->title));

		if($id==0){
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),currval('repo_n_id_seq'),'%s','%s',%s;",$title,$url,($i+1));
		}else{
			$s[]=sprintf("insert into u_link select nextval('u_link_id_seq'),%s,'%s','%s',%s where not exists (select*from u_link where pid=%s and n=%s);",$id,$title,$url,($i+1),$id,($i+1));
			$s[]=sprintf("update u_link set title='%s',link='%s' where not exists (select * from u_link where title='%s' and link='%s') and pid=%s and n=%s;",$title,$url,$title,$url,$id,($i+1));
		}
	}
	return implode("\n",$s);
}


function removeimg($img){
	global $IMGP;
	echo $IMGP;
	$path=array();
	$e=array("raw","img","thumbnail1","thumbnail2");
	for($i=0;$i<count($e);$i++){
		unlink(sprintf(str_replace("tmp",$e[$i],$IMGP),$img));
	}
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

function get_imgs($img){
	$ch=curl_init();
	curl_setopt($ch,CURLOPT_URL,$img);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	if(preg_match("/https/",$img)){
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
		curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
	}
	$outimg=curl_exec($ch);
	if(curl_errno($ch))return "";
	else return $outimg;
}

function eximg($img1,$img2){

	global $SERVERPATH;

	$img1=str_replace(sprintf("%s/prg_img",$SERVERPATH),preg_match("#/dev/#",$SERVERPATH)?"https://dev-img.sportsbull.jp":"https://img.sportsbull.jp",$img1);

	$a=(binary)get_imgs($img1);
	$b=(binary)get_imgs($img2);

	return $a===$b?true:false;
}

function imgResize($img_name,$n_img,$re_size,$p="jpg"){

	global $SERVERPATH;

	$ww=$re_size;
	$size=getimagesize($img_name);

	if($ww>$size[0]){
		copy($img_name,$n_img);
		s3upload($img_name,str_replace($SERVERPATH."/prg_img/","",$n_img));
	}else{
		$s=$ww/$size[0];
		$ptage_w=round($size[0]*$s);
		$ptage_h=round($size[1]*$s);
		$resize=array($ptage_w,$ptage_h);
		$newImg=imagecreatetruecolor($resize[0],$resize[1]);
		$defImg=makeDefaultImg($img_name,$p);
		if($p=="png"){
			imagealphablending($newImg,false);
			imagesavealpha($newImg,true);
		}
		imagecopyresampled($newImg,$defImg,0,0,0,0,$resize[0]+1,$resize[1]+1,$size[0],$size[1]);
		outputImg($newImg,$n_img,$p);
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
			$y=20;
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
		$y=20;
		$resize=array($size[0],$size[1]);
	}

	$newImg=imagecreatetruecolor($re_size[0],$re_size[1]);
	imagefill($newImg,0,0,imagecolorclosest($newImg,0,0,0));
	$defImg=makeDefaultImg($img_name,$p);
	if($p=="png"){
		imagealphablending($newImg,false);
		imagesavealpha($newImg,true);
	}
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

	global $SERVERPATH;

	if($type=="jpg"){
		$e=imagejpeg($res,$filename,85);
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

	s3upload($filename,str_replace($SERVERPATH."/prg_img/","",$filename));

	return $e;
}

function getfileinfo($i){
	$s=pathinfo($i);
	preg_match("/.([0-9]+) /",microtime(),$m);
	$ext=strtolower($s["extension"]);
	return array(sprintf("%s%s",date("YmdHis"),$m[1]),$ext);
}

function outimg($oimg,$tumb=1, $parse=true){

	global $SERVERPATH;
	$imgp=$SERVERPATH."/prg_img/";

	if($parse) {
		$oimg=str_replace(" ","%20",$oimg);
		$u=parse_url($oimg);
		$oimg=sprintf("%s://%s%s",$u["scheme"],$u["host"],$u["path"]);
	}

	$fl=getfileinfo($oimg);
	$img=get_imgs($oimg);
	if($img=="")return "";

	$file=sprintf("%stmp/%s.%s",$imgp,$fl[0],$fl[1]);
	file_put_contents($file,$img);

	$size=getimagesize($file);
	if(!$size)return "";

	if(preg_match("/jpe?g/",$size["mime"]))$p="jpg";
	elseif(preg_match("/gif/",$size["mime"]))$p="gif";
	elseif(preg_match("/png/",$size["mime"]))$p="png";

	if($tumb==1){
		imgDresize($file,sprintf("%simg/%s.%s",$imgp,$fl[0],$p),array(640,400),$p);
		imgDresize($file,sprintf("%sthumbnail1/%s.%s",$imgp,$fl[0],$p),array(320,180),$p);
		imgDresize($file,sprintf("%sthumbnail2/%s.%s",$imgp,$fl[0],$p),array(150,150),$p);
		//2140 repro出力画像サイズ追加
		imgDresize($file,sprintf("%sthumbnail3/%s.%s",$imgp,$fl[0],$p),array(480,240),$p);
		imgDresize($file,sprintf("%sthumbnail4/%s.%s",$imgp,$fl[0],$p),array(480,480),$p);
	}
	imgResize($file,sprintf("%sraw/%s.%s",$imgp,$fl[0],$p),980,$p);

	/* sportsbull移行後EC2のファイルは削除を有効にする */
	unlink($file);

	return sprintf("%s.%s",$fl[0],$p);
}

function makesql($a,$f,$mediaid){

	global $MEDIAID;

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
		return sprintf("insert into repo_n(%s) select %s where not exists (select * from repo_n where d2=%s and t7=%s);",implode(",",$sn),implode(",",$sv),$MEDIAID,$sv["t7"]);
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

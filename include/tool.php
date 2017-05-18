<?php

function makeContentsPreview($d){
	
	global $LANG;
	if($d["types"]==0||$d["types"]==1||$d["types"]==5||$d["types"]==6){
		for($i=0;$i<count($LANG);$i++){
			$l[]=sprintf("<div class=\"clearfix %s cblockprv\"><span class=\"sp00e\">%s</span><p>%s</p></div>",$LANG[$i],strtoupper($LANG[$i]),strlen($d["title".$LANG[$i]])>0?$d["title".$LANG[$i]]:"<span class=\"colred\">見出し未設定</span>");
		}
		return sprintf("<div>%s</div>",implode("",$l));
	}else{
		switch($d["types"]){
			case 2:$n=1;break;case 3:$n=2;break;case 4:$n=3;break;
		}
		for($i=1;$i<=$n;$i++){
			$l[]=sprintf("<li%s><img src=\"/prg_img/thumbnail1/%s\" width=\"180\"></li>",$i==1?" style=\"padding:0;\"":"",$d["img".$i]);
		}
		return sprintf("<ul class=\"clearfix\">%s</ul>",implode("",$l));
	}
}

function multiLangTitle($f){
	global $MULTILANG;
	if($MULTILANG!=1){
		return $f;
	}else{
		return $_COOKIE["lang"]!="al"?$f.$_COOKIE["lang"]:$f."en";
	}
}
function multiLangTitleField($f){
	global $MULTILANG,$LANG;
	if($MULTILANG!=1){
		return $f;
	}else{
		for($i=0;$i<count($LANG);$i++){
			$l[]=$f.$LANG[$i];
		}
		return implode(",",$l);
	}
}

function rtimg($a,$b,$c,$d,$e,$f,$g,$h,$r=1){
	global $imgNo;
	array_unshift($h,implode("-",$g));
	$ls="";
	if(strlen($a)>0){
		$fn=(float)microtime();
		$ls.="<ul class=\"imglist\">";
		for($i=0;$i<count($h);$i++){
			if(strlen($h[$i])>0){
				$Tgyh=explode("-",$h[$i]);
				$ls.=sprintf("<li>%s<br ><a href=\"javascript:editImages('%s',%s,%s,%s,'%s',%s,%s,%s,'%s','%s',%s)\"><img src=\"/shared/cms/img/btn_thumnail.png\" alt=\"サムネイル画像を編集する\" width=\"90\" height=\"25\" class=\"pthum rollover\"></a></li>",
				swforimg($c[$i],$b,"",$e.$i),$d,$i,$Tgyh[0],(strlen($Tgyh[0])>0&&strlen($Tgyh[1])>0)?$Tgyh[1]:$Tgyh[0]*0.75,$f,$Tgyh[2],$Tgyh[3],$Tgyh[4],$e.$i,$c[$i],$Tgyh[5]);
			}
		}
		$ls.="</ul>";
		$Tgyh=$g;
		$ls.=sprintf("<script type=\"text/javascript\">ImgData[%s]=['%s',%s,%s,%s,'%s',%s,%s,%s,'%s','%s',%s];</script>",$imgNo,$d,0,$Tgyh[0],$Tgyh[1],$f,$Tgyh[2],$Tgyh[3],$Tgyh[4],$imgNo,$c[0],$Tgyh[5]);
		$imgNo++;
	}else{
		$Tgyh=$g;
		$ls.=swforimg($c[0],$b,"",$e);
		$ls.=sprintf("<br ><a href=\"javascript:editImages('%s',%s,%s,%s,'%s',%s,%s,%s,'%s','%s',%s)\"><img src=\"/shared/cms/img/btn_thumnail.png\" alt=\"サムネイル画像を編集する\" width=\"90\" height=\"25\" class=\"pthum rollover\"></a>",
		$b,0,$Tgyh[0],(strlen($Tgyh[1])>0)?$Tgyh[1]:$Tgyh[0]*0.75,$f,$Tgyh[2],$Tgyh[3],$Tgyh[4],$e,$c[0],$Tgyh[5]);
	}
	if($r==1)$ls.=sprintf("<input type=\"hidden\" name=\"%s\" value=\"%s\" ><br>",$e,$b);
	return $ls;
}

function getLatLng($ad){
	$u=sprintf("http://maps.google.com/maps/api/geocode/json?address=%s&sensor=false&region=JP&language=ja",urlencode($ad));
	$fp=fopen($u,"r");
	$flg=0;
	while($f=fgets($fp,1024)){
		$f=trim($f);	
		if(ereg("location",$f))$flg=1;
		if($flg==1&&ereg("lat",$f))$k[$i][1]=str_replace(array('"lat" : ',","),"",$f);
		if($flg==1&&ereg("lng",$f)){
			$k[$i][2]=str_replace('"lng" : ',"",$f);
			return array($k[$i][2],$k[$i][1]);
		}
	}
}
function getBill(){
	global $o;
	
	if(strlen($_GET["qid"])>0)$cid=$_GET["qid"];
	elseif(strlen($_GET["rid"])>0)$cid=$_GET["rid"];
	else $cid=$_GET["cid"];
	
	$sql=sprintf("select bill from editor where directory='nid' and f_name='title' and cid=%s",$cid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	return $f["bill"];
}

function makeTextfieldAddOption($a,$b,$c,$d,$e,$f,$g,$h,$x){
	
	global $o,$p;
	
	if($b==""){
		$f_name=array($a);
		$_OPTION=preg_match("/,/",$b)?explode(",",$b):array($b);
		$SIZE=array($c);
		$OP=array($d);
	}else{
		$f_name=explode(",",$a);
		$_OPTION=explode(",",$b);
		$SIZE=explode(",",$c);
		$OP=array($d,$e,$f,$g,$x);
	}
	
	//var_dump($OP);
	
	$pv=$h;
	if(strlen($pv)>0)$pvl=strtoupper($pv);
	
	$l="";$ll="";$s="<ul class=\"m_%s%s\" style=\"display:none\">%s</ul>";
	for($U=0;$U<count($SIZE);$U++){
		$OPv=trim($OP[$U]);
		$l.=sprintf("<div class=\"clearfix %s%s langs\">%s%s<input type=\"text\" style=\"width:%spx;\" name=\"p_%s%s\" value=\"%s\" class=\"in q%s\"%s>%s</div>",
		$pv,strlen($SIZE)>1?" fl":" fl",strlen($pvl)>0?sprintf("<span class=\"sp00e\">%s</span>",$pvl):"",$_OPTION[$U],$SIZE[$U]*7,$f_name[$U],$pv,mod_HTML($p[$f_name[$U].$pv]), strlen($OPv)>0?1:0,preg_match("/＠/",$OPv)?" readonly=\"readonly\"":"",(count($_OPTION)-2)==$U?$_OPTION[$U+1]:"");
		if(strlen($OPv)>0){
			$OPv=str_replace("＠","",$OPv);
			if(!preg_match("/select/",$OPv)){
				$sa=explode("\n",$OPv);
				for($i=0;$i<count($sa);$i++)$sa[$i]=sprintf("<li>%s</li>",$sa[$i]);
			}elseif(preg_match('/^select id,/',$OPv)){
				unset($sa);
				if(!preg_match("/{p_[0-9a-z]+}/",$OPv)){
					
					$o->query(str_replace("{LANG}",$h,$OPv));
					while($f=$o->fetch_array()){
						$sa[]=sprintf("<li>%s:%s</li>",$f["id"],$f["title"]);
						if($p[$f_name[$U].$pv]==$f["id"]){
							echo sprintf("<script type='text/javascript'>$(function(){\$('[name=\"p_%s%s\"]').val('%s:%s');})</script>",$f_name[$U],$pv,$f["id"],addslashes($f["title"]));
						}
					}
				}else{
					$sa=array();
					if(preg_match("/^\d+$/",$p[$f_name[$U].$pv])){
						preg_match("/(select .*) where/",$OPv,$basic);
						$sql=$basic[1].sprintf(" where id=%s",$p[$f_name[$U].$pv]);
						$o->query($sql);
						$f=$o->fetch_array();
						echo sprintf("<script type='text/javascript'>$(function(){\$('[name=\"p_%s%s\"]').val('%s:%s');})</script>",$f_name[$U],$pv,$f["id"],addslashes($f["title"]));
					}
					$ll.=sprintf("<span class=\"m_%s\" style=\"display:none\">%s</span>",$f_name[$U],str_replace("{LANG}",$_COOKIE["lang"],$OPv));
				}
			}elseif(!preg_match('/{p_/',$OPv)){
				unset($sa);
				$o->query(str_replace("{LANG}",$h,$OPv));
				//$o->query($OPv);
				while($f=$o->fetch_array())$sa[]=sprintf("<li>%s</li>",$f["title"]);
			}else{
				$sa=array();
				$ll.=sprintf("<span class=\"m_%s\" style=\"display:none\">%s</span>",$f_name[$U],$OPv);
			}
			$sa[]="<li>選択をクリアする</li>";
			$ll.=sprintf($s,$f_name[$U],$h,@implode("",$sa));
		}
	}
	return $l.$ll;
}
function makeTextfieldCell($a,$b,$c,$d,$e){
	global $q,$p;
	echo sprintf("<tr class=\"%s\"><td%s class=\"inputTitle\">%s</td><td class=\"inputFields\">",$a,strlen($d)>0&&!preg_match("/\.php/",$d)?" rowspan=\"2\"":"",$b);
	if($e==0){
		if(preg_match("/fn0fn1/",$a))include "_map.php";
		echo makeTextfieldAddOption($c[0],$c[1],$c[2],$c[3],$c[4],$c[5],$c[6],"",$c[7]);

		if(preg_match("/a1a2a3a4a5a6|a7a8a9a10a11a12/",$a)){
			echo sprintf("<span class=\"btncurrenttime rollover %s\" id=\"%s\">現在の日時を設定</span><br class=\"cboth %s\">",$LANG[$i],$c[0],$LANG[$i]);
		}elseif(preg_match("/d1d2/",$a)){
			if($_GET["rid"]==7){
				echo sprintf("<span class=\"btnpreview rollover %s\" id=\"%s\">確認</span><br class=\"cboth %s\">",$LANG[$i],$c[0],$LANG[$i]);
			}
		}

	}else{
		global $LANG;
		for($i=0;$i<count($LANG);$i++){
			echo makeTextfieldAddOption($c[0],$c[1],$c[2],$c[3],$c[4],$c[5],$c[6],$LANG[$i],$c[7]);
		}
	}
	if(preg_match("/youtube/i",$b))include "_youtube.php";
	if(preg_match("/\.php/",$d))include $d;
	echo "</td></tr>";
	if(strlen($d)>0&&!preg_match("/\.php/",$d))echo sprintf("<tr class=\"%s\"><td class=\"inputCap\">%s</td></tr>",$a,$d);
}

function getPulldownValue($table,$id,$lang=""){
	global $o,$TABLE;
	$f=!preg_match("/^repo$/",$table)?"title":"name";
	if($lang!=""){
		$sql=sprintf("select id,%s%s as title from %s where id=%s",$f,$lang,$table,$id);
	}else{
		$sql=sprintf("select id,%s%s as title from %s where id=%s",$f,"",$table,$id);
	}
	$o->query($sql);
	$f=$o->fetch_array();
	return sprintf("%s:%s",$f["id"],$f["title"]);
}

function setTextfieldMenuTitle($sql,$id){
	global $o;
	preg_match("/(select.*where)/",$sql,$t);
	$sql=sprintf("%s id=%s;",$t[0],$id);
	$o->query($sql);
	$f=$o->fetch_array();
	return sprintf("%s:%s",$f["id"],$f["title"]);
}

function makeTextfieldConf($a,$b,$c,$d,$e,$f,$g,$h,$yz){

	global $q,$LANG,$_OP01,$_OP02,$_OP03;

	if($b==""){
		$f_name=array($a);
		$_OPTION=preg_match("/,/",$b)?explode(",",$b):array($b);
		$SIZE=array($c);
	}else{
		$f_name=explode(",",$a);
		$_OPTION=explode(",",$b);
		$SIZE=explode(",",$c);
	}
	
	$SQLS=array($_OP01,$_OP02,$_OP03);
	
	echo sprintf("<tr class=\"%s\"><td class=\"confTitle\">%s</td><td class=\"confFields\">",$f,$g);
	if($h==0){
		
		//if(preg_match("/fn0fn1/",$f))include "_map.php";
		for($U=0;$U<count($f_name);$U++){
			$s=$e[$d.$f_name[$U]];
			$v=(!preg_match("/^(m|d)/",$a))?intfloat($f_name[$U],$s):$s;
			if(strlen($v)>0&&$q->dr==2&&preg_match("/^(d|m)/",$a)){
				$v=setTextfieldMenuTitle($SQLS[$U],$v);
				//$v=getPulldownValue($q->pdir,$v);
			}			
			echo sprintf("%s%s",$_OPTION[$U],strlen($v)>0?mod_HTML($v):"-");
		}
		if(count($_OPTION)>count($f_name))echo $_OPTION[$U];
	}else{
		for($i=0;$i<count($LANG);$i++){
			echo sprintf("<div class=\"clearfix %s langs\">%s<div class=\"wmod2\">",$LANG[$i],strlen($LANG[$i])>0?sprintf("<span class=\"sp00e\">%s</span>",strtoupper($LANG[$i])):"");
			for($U=0;$U<count($f_name);$U++){
				$s=$e[$d.$f_name[$U].$LANG[$i]];
				$v=(!preg_match("/^(m|d)/",$a))?intfloat($f_name[$U].$LANG[$i],$s):$s;
				if(strlen($v)>0&&$q->dr==2&&preg_match("/^(d|m)/",$a)){
					$v=getPulldownValue($q->pdir,$v,$LANG[$i]);
				}
				echo sprintf("%s%s",$_OPTION[$U],strlen($v)>0?mod_HTML($v):"-");
			}
			if(count($_OPTION)>count($f_name))echo $_OPTION[$U];
			echo "</div></div>";
		}
	}
	if(preg_match("/youtube/i",$g))include "_youtube.php";
	if(preg_match("/\.php/",$yz))include $yz;
	echo "</td></tr>";
}

function makeTextAreaCell($a,$b,$c,$d,$e,$f){
	global $q,$p,$f_name,$CONTENTS_EDITED;
	echo sprintf("<tr class=\"%s\"><td%s class=\"inputTitle\">%s</td><td class=\"inputFields\"><div class=\"ckbox\">",$b,strlen($e)>0?" rowspan=\"2\"":"",$a);
	if($f==0){
		echo sprintf("<textarea name=\"p_%s\" id=\"p_%s\" rows=\"%s\"%s>%s</textarea>",$b,$b,$c,$d==82?" class=\"ckeditor\"":"",stripslashes($p[$b]));
	}else{
		global $LANG;
		for($i=0;$i<count($LANG);$i++){
			echo sprintf("<div class=\"clearfix %s langs\">%s<div class=\"wmod2\"><textarea name=\"p_%s%s\" id=\"p_%s%s\" rows=\"%s\"%s>%s</textarea></div></div>",$LANG[$i],strlen($LANG[$i])>0?sprintf("<span class=\"sp00e\">%s</span>",strtoupper($LANG[$i])):"",$b,$LANG[$i],$b,$LANG[$i],$c,$d==82?" class=\"ckeditor\"":"",stripslashes($p[$b.$LANG[$i]]));
		}
	}
	echo sprintf("</div></td></tr>%s",strlen($e)>0?sprintf("<tr><td class=\"inputCap\">%s</td></tr>",$e):"");
}

function makeTextAreaConf($a,$b,$c,$d,$e){
	
	global $LANG;
	echo sprintf("<tr class=\"%s\"><td class=\"confTitle\"><div class=\"cms_widget\">%s</div></td><td class=\"confFields\">",$b,$a);
	if($e==0){
		$f=$d[$c.$b];
		if(strlen($f)>0){
			if(preg_match("/<p>/",$f)){
				$f=preg_replace("/style=\".*?\"|style='.*?'/i","",$f);
				$f=preg_replace("/(\r\n|\r|\n|\t)/","",$f);
				echo sprintf("<div class=\"preview\">%s</div>",$f);
			}else{
				echo nl2br(htmlspecialchars($f));
			}
		}else{
			echo "-";
		}
	}else{
		for($i=0;$i<count($LANG);$i++){
			$f=$d[$c.$b.$LANG[$i]];
			echo sprintf("<div class=\"clearfix %s langs\">%s<div class=\"wmod2 txtconf\">%s</div></div>",$LANG[$i],strlen($LANG[$i])>0?sprintf("<span class=\"sp00e\">%s</span>",strtoupper($LANG[$i])):"",strlen($f)>0?$f:"-");
		}

	}
	echo "</td></tr>";
}



function intfloat($f,$v){
	if(preg_match("/^(m|d)[0-9]+/",$f)){
		$v=preg_replace("/[^0-9]/","",mb_convert_kana($v,"n"));
	}elseif(preg_match("/^fn[0-9]+/",$f)){
		$v=preg_replace("/[^0-9.]/","",mb_convert_kana(str_replace("．",".",$v),"n"));
	}
	return $v;
}



function dir_match($path,$ar){
	preg_match_all("/{([a-z0-9]+)}/",$path,$mar);
	for($i=0;$i<count($mar[1]);$i++){
		$mar[1][$i]=$ar[$mar[1][$i]];
	}
	return str_replace($mar[0],$mar[1],$path);
}

function fieldsplit($s){
	$s=explode(",",$s);
	return array(sprintf("%s,%s,%s",$s[0],$s[1],$s[2]),sprintf("%s,%s,%s",$s[3],$s[4],$s[5]));
}

function status($status,$sy,$sm,$sd,$ey,$em,$ed){
	//var_dump(array($status,$sy,$sm,$sd,$ey,$em,$ed));
	if($status==55){
		if(strlen($sy)==4&&strlen($ey)==4&&strlen($sm)>=1&&strlen($em)>=1&&strlen($sd)>=1&&strlen($ed)>=1){
			$s=(int)sprintf("%s%s%s",$sy,(strlen($sm)==1)?sprintf("0%s",$sm):$sm,(strlen($sd)==1)?sprintf("0%s",$sd):$sd);
			$e=(int)sprintf("%s%s%s",$ey,(strlen($em)==1)?sprintf("0%s",$em):$em,(strlen($ed)==1)?sprintf("0%s",$ed):$ed);
			$c=(int)date("Ymd");
			if($s<=$c&&$e>=$c){
				$pub=1;
			}else{
				$pub=0;
			}
		}else{
			$pub=0;
		}
	}else{
		$pub=1;
	}
	return $pub;
}

function addJs($p){
	return strlen($p)>0 ? sprintf("<script type=\"text/javascript\">%s</script>",$p) : "";
}

function rewrite($url,$d,$l){

	global $o;
	$pURL=$url;
	preg_match_all("/{([a-zA-Z0-9.:=]+)}/si",$url,$r);

	if(count($r[1])==1){
		$pURL=str_replace($r[0],$d[$r[1][0]],$pURL);
		//var_dump(array($r[0],$r[1][0]));
	}else{
		$j=$r[1];
		for($i=0;$i<count($j);$i++){
			if(strpos($j[$i],":")>0){
				preg_match_all("/([a-zA-Z0-9]+):([a-zA-Z0-9]+)=([a-zA-Z0-9]+)/",$j[$i],$jj);
				$sql=sprintf("select %s from repo where %s=%s",$jj[1][0],$jj[2][0],$d[$jj[3][0]]);
				$o->query($sql);
				$f=$o->fetch_array();
				$befor[]=$r[0][$i];
				$after[]=$f[$jj[1][0]];
				unset($jj);
			}else{
				$befor[]=$r[0][$i];
				$after[]=$d[$j[$i]];
			}
		}
		$pURL=str_replace($befor,$after,$pURL);
	}
	return (strlen($l)>0?sprintf("/%s",$l):"").$pURL;
}

function echoCommentGeneral($c,$f,$opt=0){
	$option=array("入力","選択","参照");
	return mod_HTML(strlen($c)>0 ? $c : sprintf("%sを%sしてください。",$f,$option[$opt]));
}
function echoCellField($title,$contents,$comment="",$flag=1){
	
	$option[]=array($comment==""?" class=\"inputTitle\"":" rowspan=\"2\" class=\"inputTitle\""," class=\"confTitle\"");
	$option[]=array(" class=\"inputFields\""," class=\"confFields\"");
	
	$l="<tr>";
	$l.=sprintf("<td%s>%s</td>",$option[0][$flag],$title);
	$l.=sprintf("<td%s>%s</td>",$option[1][$flag],$contents);
	$l.="</tr>";
	if($flag==0&&$comment!="")$l.=sprintf("<tr><td class=\"inputCap\">%s</td></tr>",$comment);
	return $l;
}

function echoPullMenu($f_name,$SIZE,$d_name,$op,$sv,$r,$op01="",$op02="",$op03="",$op04="",$op05="",$langf=""){

	global $o;

	$c=explode(",",$f_name);
	for($i=0;$i<count($c);$i++){
		$c[$i]=$c[$i].$langf;
	}
	
	if(count($c)==1&&$sv[$r.$c[0]]==0){
		return "その他";
	}
	
	$s=mb_convert_kana($SIZE,"a");	
	ereg("select ([a-z0-9_]+),([a-z0-9_]+) from",$s,$t);
	$op=trim($op);
	if(strlen($op)>0&&!ereg("^and",$op)){
		$op=explode("=",$op);
		$op=sprintf("and %s=%s",$op[0],$_GET[$op[1]]);
	}
	$sql=$s." where %s in ('%s') ".$op;
	$sql.=" order by n";
	
	for($i=0;$i<count($c);$i++){
		if(strlen($sv[$r.$c[$i]])>0)$l[]=$sv[$r.$c[$i]];
	}
	if(count($l)==0) return sprintf("%sなし",$d_name);
	$l=@implode("','",$l);
	$sql=sprintf($sql,$t[1],$l);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$kg[]=$f[$t[2]];
	}

	return implode(",",$kg);
}

function makePullMenus($f,$s,$d,$op,$sv,$r="p_",$v="",$op01="",$op02="",$op03="",$op04="",$op05="",$langf=""){

	global $o;
	
	$c=explode(",",$f);
	for($i=0;$i<count($c);$i++){
		$c[$i]=$c[$i].$langf;
	}
	$s=mb_convert_kana($s,"a");
	ereg("select ([a-z0-9_]+),([a-z0-9_]+) from",$s,$t);
	
	if($v=="")$v=" where flag=1 %s order by ".$t[2];
	$q=$s.$v;
	$op=trim($op);
	if(strlen($op)>0&&!ereg("^and",$op)){
		$op=explode("=",$op);
		$op=sprintf(" and %s=%s",$op[0],$_GET[$op[1]]);
	}
	$q=sprintf($q,$op);
	
	
	for($i=0;$i<count($c);$i++){	
		$l.=sprintf("<label for=\"%s\" class=\"pulldownmenulabel\"><select name=\"p_%s\"%s%s>",$c[$i],$c[$i],$op01!="" ?  sprintf(" size=\"%s\"",$op01):"",$op01!=1?" class=\"p\"":"");
		$l.="<option value=\"\">---選択しない---</option>";
		$o->query($q);
		while($f=$o->fetch_array()){
			$l.=sprintf("<option value=\"%s\"%s>%s</option>",$f[$t[1]],$f[$t[1]]==$sv[$r.$c[$i]] ? " selected":"",$f[$t[2]]);
		}
		if($op02==1)$l.=sprintf("<option value=\"0\"%s>その他</option>",$sv[$r.$c[$i]]==="0" ? " selected":"");
		$l.="</select></label>";
	}
	//if($op03==1)$l.=sprintf("<input type=\"text\" size=\"30\" >");
	if(strlen($op03)>0)$l.=sprintf("<script type=\"text/javascript\">%s</script>",$op03);
	
	return $l;
}

function conffieldStyleOutput(){
	
	global $CSSFILE0;
	$flg=0;
	$l="";
	
	$fp=fopen($CSSFILE0,"r");
	while($f=fgets($fp,1024)){
		if(gettype(strpos($f,"DescriptionExtendsClassStart"))=="integer")$flg=1;
		if($flg==1)$l.=$f;
		if($flg==1&&gettype(strpos($f,"DescriptionExtendsClassEnd"))=="integer")break;
	}
	
	$l=str_replace(".contentsEditor .description","table.listTable td.confFields",$l);
	
	echo $l;
}
function echoBlockContents($s,$l,$h=""){
	/*
		コンテンツエディタのコンテンツ表示
	*/
	global $BILLINGUAL;
	$a=array(sprintf("%stitle",$h),sprintf("%sbody",$h),sprintf("%salt0",$h),sprintf("%salt1",$h));
	for($i=0;$i<count($s);$i++){
		if(strlen($s[$a[$i]])>0){
			$s[$a[$i]]=strip_tags($s[$a[$i]]);
			$s[$a[$i]."_e"]=strip_tags($s[$a[$i]."_e"]);
			if(!$BILLINGUAL||$h!=""){
				$st=(mb_strlen($s[$a[$i]])>=$l)?sprintf("%s.....",mb_substr($s[$a[$i]],0,$l)):$s[$a[$i]];
			}else{
				$j=mb_strlen($s[$a[$i]])>=$l ?sprintf("%s.....",mb_substr($s[$a[$i]],0,$l)) : $s[$a[$i]];
				$e=strlen($s[$a[$i]."_e"])>=$l*2 ?sprintf("%s.....",substr($s[$a[$i]."_e"],0,$l*2)) : $s[$a[$i]."_e"];
				$st=sprintf("<span class=\"j\">%s</span><span class=\"e\">%s</span>",$j,strlen($e)>0?$e:"英語版登録無し");
			}
		}
	}
	return $st;
}
function echoBlockContents2($s){
	global $contentsEditorTypes;
	for($i=0;$i<count($s);$i++){
		$sld=($s[$i]["id"]==$_GET["eid"])?sprintf("value=\"\" selected=\"selected\""):sprintf("value=\"%s\"",$s[$i]["id"]);
		$k[$i]=sprintf("<option %s>%s:%s</option>",$sld,$s[$i]["n"],$contentsEditorTypes[$s[$i]["types"]]);
	}
	return implode("",$k);
}

function echoBlockContents4($s){
	global $contentsEditorTypes;
	
	$k[]="<option value=\"\"></option>";
	for($i=0;$i<count($s);$i++){
		$sld=($s[$i]["id"]==$_GET["nid"])?sprintf("value=\"\" selected=\"selected\""):sprintf("value=\"%s\"",$s[$i]["id"]);
		for($j=0;$j<count($a);$j++){
			if(strlen($s[$i][$a[$j]])>0){
				$s[$i][$a[$j]]=strip_tags($s[$i][$a[$j]]);
				$st=(mb_strlen($s[$i][$a[$j]])>=$l)?sprintf("%s.....",mb_substr($s[$i][$a[$j]],0,$l)):$s[$i][$a[$j]];
				$k[$i]=sprintf("<option %s>%s　:　%s</option>",$sld,$contentsEditorTypes[$s[$i]["types"]],$st);
				break;
			}
		}
		if(!isset($k[$i])){
			$k[$i]=sprintf("<option %s>%s</option>",($s[$i]["id"]==$_GET["nid"])?sprintf("value=\"\" selected=\"selected\""):sprintf("value=\"%s\"",$s[$i]["id"]),$s[$i]["name"]);
		}
	}
	return implode("",$k);
}

function echoBlockContentsTitle($s){
	global $contentsEditorTypes;
	$a=array("title","body","alt0","alt1");
	$l=30;

	for($j=0;$j<count($a);$j++){
		if(strlen($s[$a[$j]])>0){
			$s[$a[$j]]=strip_tags($s[$a[$j]]);
			$st=(mb_strlen($s[$a[$j]])>=$l)?sprintf("%s.....",mb_substr($s[$a[$j]],0,$l)):$s[$a[$j]];
			$st=sprintf("%s　:　%s",$contentsEditorTypes[$s["types"]],$st);
			break;
		}
	}
	if(!isset($st)){
		$st=sprintf("%s",$contentsEditorTypes[$s[$i]["types"]]);
	}

	return $st;
}

function checkEnglishTitle($s){
	return (strlen($s)>0) ? mod_HTML($s,1) : "英語タイトル入力無し";
}


function get_youtubeimg($y){

  $youtubeimg[]=sprintf("http://i.ytimg.com/vi/%s/maxresdefault.jpg",$y);
  $youtubeimg[]=sprintf("http://i.ytimg.com/vi/%s/sddefault.jpg",$y);
  $youtubeimg[]=sprintf("http://i.ytimg.com/vi/%s/mqdefault.jpg",$y);
  
  for($i=0;$i<count($youtubeimg);$i++){
	  $img=$youtubeimg[$i];
	  $size=getimagesize($img);
	  if($size[0]){
		  return $img;
	  }
  }	
}

function makeComment($s,$m,$c){
	$l.=sprintf(" サイズ：[ %sMbyte ]以下",$m);
	$l.="、種類：[ JPG | PNG | GIF | SWF ]のファイルをアップロードすることができます。";
	$s=explode("-",$s);
	$l.=sprintf("<br >横：[ %spx ]",$s[0]);
	$l.=" x ";
	$l.=(strlen($s[1])>0)?sprintf("縦：[ %spx ]",$s[1]):sprintf("縦：[ 任意 ]",$s[1]);
	$l.="以上のファイルは自動でリサイズされますが、編集することができます。";
	if(strlen($c)>0){
		$l.="<br >";
		$l.=mod_HTML($c,1);
	}
	return $l;
}

function checkFileType($p){
	$extension="";
	switch($p["type"]){
		case "image/pjpeg" : $extension="jpg";
		break;
		case "image/jpeg" : $extension="jpg";
		break;
		case "image/gif" : $extension="gif";
		break;
		case "image/png" : $extension="png";
		break;
		case "image/x-png" : $extension="png";
		break;
		case "application/x-shockwave-flash" : $extension="swf";
		break;
		case "video/mp4" : $extension="mp4";
		break;
	}
	return $extension;
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
	
	global $domain;
	
	if($type=="jpg"){
		$e=imagejpeg($res,$filename,75);
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
	
	if(preg_match("/prg_img/",$filename)){
		s3upload($filename,str_replace("../../../prg_img/","",$filename));
	}
	
	return $e;
}
function imgFileMove($p,$filename){
	global $TMPPATH;
	global $RAWIMG;
	global $domain;
	if(move_uploaded_file($p["tmp_name"],$TMPPATH.$filename)){
		if(copy($TMPPATH.$filename,$RAWIMG.$filename)){
			$up=1;
			s3upload(sprintf("%s%s",$TMPPATH,$filename),str_replace("../../../prg_img/","",sprintf("%s%s",$RAWIMG,$filename)));
		}else{
			$up=0;
		}
	}else{
		$up=0;
	}
	return $up;
}
function chk_img($p,$SIZE="",$copy="",$oi="",$df=""){

	global $TMPPATH;
	global $IMG;
	global $RAWIMG;
	global $_OPTION;
	global $domain;
	
	$imgSubstance=imgInitialize($_OPTION,$SIZE);
	
	if($df!=""){
		return false;
	}
	if(strlen($p["tmp_name"])<10){
		//if(strlen($oi)>0)outputs($imgSubstance,$oi,"","",$copy);
		return false;
	}
	if(!$type=checkFileType($p)){
		echo "登録できる画像の形式は拡張子が[.jpg][.gif][.png][.swf]のものだけになります。<br>お手数ですが形式を変換してからご登録ください。";
		return false;
	}
	ereg(".([0-9]+) ",microtime(),$m);
	if(!preg_match("#^http#",$p["tmp_name"])){
		
		if(!imgFileMove($p,$filename=sprintf("img%s%s.%s",date("YmdHis"),$m[1],$type))){
			echo "画像のアップロードに失敗しました。もう一度アップロードしてください。";
			return false;
		}
	}else{
		
		$size=getimagesize($p["tmp_name"]);
		$img=get_contents($p["tmp_name"]);
		$filename=sprintf("img%s%s.%s",date("YmdHis"),$m[1],$type);
		file_put_contents($TMPPATH.$filename,$img);
		
		if($size>728){
			imgResize($TMPPATH.$filename,$RAWIMG.$filename,728,$p="jpg","","","","");
		}else{
			file_put_contents($RAWIMG.$filename,$img);
		}
		s3upload(sprintf("%s%s",$RAWIMG,$filename),str_replace("../../../prg_img/","",sprintf("%s%s",$RAWIMG,$filename)));
	}

	if($type!="mp4"){
		if(!$size=GetImageSize($TMPPATH.$filename)){
			echo "画像のアップロードに失敗しました。もう一度アップロードしてください。";
			return false;
		}
	}
	
	if($type=="swf"){
		if($size[0]<$SIZE){
			return $filename;
		}else{
			echo sprintf("アップロードできる画像サイズ（幅）は%sピクセルまでです。もう一度アップロードしてください。",$SIZE);
			return false;
		}
	}
	
	outputs($imgSubstance,$filename,$type,$size,$copy);
	return $filename;
}

function outputs($imgSubstance,$filename,$type,$size,$copy){

	global $IMG;
	global $RAWIMG;
	global $domain;
		
	if(strlen($type)==0)$type=substr($filename,-3,3);
	if(strlen($size)==0)$size=getimagesize($RAWIMG.$filename);

	for($i=0;$i<count($imgSubstance);$i++){
		if($type!="gif"){
			if($imgSubstance[$i]["w"]!=""&&$imgSubstance[$i]["h"]!=""){
				if($imgSubstance[$i]["w"]<$size[0]){
					imgDresize($RAWIMG.$filename,$IMG[$i].$filename,array($imgSubstance[$i]["w"],$imgSubstance[$i]["h"]),$type,$imgSubstance[$i]["c"],$copy,$imgSubstance[$i]["i"],$imgSubstance[$i]["p"]);
				}else{
					if($i==0){
						copy($RAWIMG.$filename,$IMG[$i].$filename);
						s3upload(sprintf("%s%s",$RAWIMG,$filename),str_replace("../../../prg_img/","",sprintf("%s%s",$IMG[$i],$filename)));
						//imgInCopy($IMG[$i].$filename,$type,$imgSubstance[$i]["c"],$copy);
					}else{
						imgDresize($RAWIMG.$filename,$IMG[$i].$filename,array($imgSubstance[$i]["w"],$imgSubstance[$i]["h"]),$type,$imgSubstance[$i]["c"],$copy,$imgSubstance[$i]["i"],$imgSubstance[$i]["p"]);
					}
				}
			}elseif($imgSubstance[$i]["w"]!=""){
				if($imgSubstance[$i]["w"]<$size[0]){
					imgResize($RAWIMG.$filename,$IMG[$i].$filename,$imgSubstance[$i]["w"],$type,$imgSubstance[$i]["c"],$copy,$imgSubstance[$i]["i"],$imgSubstance[$i]["p"]);
				}else{
					copy($RAWIMG.$filename,$IMG[$i].$filename);
					s3upload(sprintf("%s%s",$RAWIMG,$filename),str_replace("../../../prg_img/","",sprintf("%s%s",$IMG[$i],$filename)));
					//imgInCopy($IMG[$i].$filename,$type,$imgSubstance[$i]["c"],$copy);
				}
			}
		}else{
			copy($RAWIMG.$filename,$IMG[$i].$filename);
			s3upload(sprintf("%s%s",$RAWIMG,$filename),str_replace("../../../prg_img/","",sprintf("%s%s",$IMG[$i],$filename)));
		}
	}
}

function imgInitialize($option,$size){
	$s=explode(",",(strlen($option)>0)?sprintf("%s,%s",$size,$option):$size);
	for($i=0;$i<count($s);$i++){
		unset($r);
		$r=explode("-",$s[$i]);
		$imgSubstance[$i]["w"]=$r[0];
		$imgSubstance[$i]["h"]=$r[1];
		$imgSubstance[$i]["c"]=$r[2];
		$imgSubstance[$i]["i"]=$r[3];
		$imgSubstance[$i]["p"]=$r[4];
	}
	return $imgSubstance;
}

function imgResize($o_img,$n_img,$re_size,$p="jpg",$copytype,$copy,$iconNo,$iconPos){

	$ww=$re_size;
	$size=getimagesize($o_img);
	$s=$ww/$size[0];
	$ptage_w=round($size[0]*$s);
	$ptage_h=round($size[1]*$s);
	$resize=array($ptage_w,$ptage_h);
	$newImg=imagecreatetruecolor($resize[0],$resize[1]);
	$defImg=makeDefaultImg($o_img,$p);
	imagecopyresampled($newImg,$defImg,0,0,0,0,$resize[0]+1,$resize[1]+1,$size[0],$size[1]);
	if($resize[0]>150)embedCopy($newImg,$resize[1],$copytype,$copy);
	embedIcon($newImg,$resize,$iconNo,$iconPos);
	outputImg($newImg,$n_img,$p);
}

function imageflips($image, $mode){

    $dst_w = imagesx($image);
    $dst_h = imagesy($image);
    $src_x = 0;
    $src_y = 0;
    $src_w = $dst_w;
    $src_h = $dst_h;
    $dst_image = imagecreatetruecolor($dst_w, $dst_h);    
    
    switch($mode)
    {
        case 'IMG_FLIP_HORIZONTAL': // 垂直方向
            $src_y = $dst_h -1; // コピー元のy座標＝コピー先の高さ-1
            $src_h = -$dst_h; // コピー元の高さ＝-コピー先の高さ
            break;
        case 'IMG_FLIP_VERTICAL': // 水平方向
            $src_x = $dst_w -1; // コピー元のx座標＝コピー先の幅-1
            $src_w = -$dst_w; // コピー元の幅＝-コピー先の幅
            break;
        case 'IMG_FLIP_BOTH': // 垂直方向＋水平方向
            $src_x = $dst_w -1;
            $src_y = $dst_h -1;
            $src_w = -$dst_w;
            $src_h = -$dst_h;
            break;
        default:
            return $image;
    }
    if (imagecopyresampled($dst_image, $image, 0, 0, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h)) {
        return $dst_image;
    }
    return $image;
}

function imageRotation($file_name,$orientation){

    $im = imagecreatefromjpeg($file_name);

    $degrees = 0;
    $mode = '';
  
    switch($orientation) {
        case 1: // 通常
            break;
        case 2: // 水平反転
            $mode = 'IMG_FLIP_VERTICAL';
            break;
        case 3: // 180°回転
            $degrees = 180;
            break;
        case 4: // 垂直反転
            $mode = 'IMG_FLIP_HORIZONTAL';
            break;
        case 5: // 水平反転、 時計回りに90°回転
            $degrees = 90;
            $mode = 'IMG_FLIP_VERTICAL';
            break;
        case 6: // 時計回りに90°回転
            $degrees = 270;
            break;
        case 7: // 時計回りに270°回転（反時計回りに90°回転） 水平反転
            $degrees = 270;
            $mode = 'IMG_FLIP_VERTICAL';
            break;
        case 8: // 時計回りに270°回転（反時計回りに90°回転）
            $degrees = 270;
            break;
    }
    if (! empty($mode)) {
        $im = imageflips($im, $mode);
    }
    if ($degrees > 0) {
        $im = imagerotate($im, $degrees, 0);
    }
    imagejpeg($im,$file_name);
    imagedestroy($im);    
}

function get_orientation($exif){
	foreach ($exif as $key => $section) { 
		foreach ($section as $name => $value) { 
			if($name=="Orientation"){
				return $value;
			}
		}
	}
	return 0;
}

function imgDresize($img_name,$n_Img,$re_size,$p="jpg",$copytype,$copy,$iconNo,$iconPos){

	$exif=exif_read_data($img_name,0,true);
	$orientation=get_orientation($exif);

	if($p=="jpg"&&$orientation!=0){
		imageRotation($img_name,$orientation);
	}
	
	$size=getimagesize($img_name);
	if($re_size[0]==$size[0]&&$re_size[1]==$size[1]){
		copy($img_name,$n_Img);
		imgInCopy($n_Img,$p,$copytype,$copy);
	}else{
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
		if($p=="png"){
			imagealphablending($newImg,false);
			imagesavealpha($newImg,true);
		}
		imagefill($newImg,0,0,imagecolorclosest($newImg,0,0,0));
		$defImg=makeDefaultImg($img_name,$p);
		imagecopyresampled($newImg,$defImg,$sp[0],$sp[1],$x,$y,$resize[0],$resize[1],$size[0],$size[1]);
		//if($re_size[0]>150)embedCopy($newImg,$re_size[1],$copytype,$copy);
		//embedIcon($newImg,$re_size,$iconNo,$iconPos);
		outputImg($newImg,$n_Img,$p);
	}
}

function imgFresize($filename,$newimgname,$w,$h,$tx,$ty,$ow,$oh,$copytype,$copy,$iconNo,$iconPos,$rotation,$pt){

	$size=getimagesize($filename);
	$p=substr($filename,-3,3);
	$newImg=imagecreatetruecolor($w,$h);
	imagefill($newImg,0,0,imagecolorclosest($newImg,0,0,0));
	$defImg=makeDefaultImg($filename,$p);
	if($rotation!=0){
		$defImg=imagerotate($defImg,$rotation*90*-1,0);
		if($rotation==1||$rotation==3){
			$r=$size[1];
			$size[1]=$size[0];
			$size[0]=$r;
			$ow=$size[0]*$pt/100;
			$oh=$size[1]*$pt/100;
		}
	}
	imagecopyresampled($newImg,$defImg,$tx,$ty,0,0,$ow,$oh,$size[0],$size[1]);
	if($w>150)embedCopy($newImg,$h,$copytype,$copy);
	embedIcon($newImg,array($w,$h),$iconNo,$iconPos);
	$e=outputImg($newImg,$newimgname,$p);
	return $e;
}

function embedIcon($img,$size,$no,$pos){
	global $THUMIMG;
	if($no!=0){
		$no=$no-1;
		$icon=imagecreatefrompng($THUMIMG[$no]);
		$ls=getimagesize($THUMIMG[$no]);
		$x=$y=0;
		if($pos==2){
			$x=$size[0]-$ls[0];
		}elseif($pos==3){
			$y=$size[1]-$ls[1];
		}elseif($pos==4){
			$x=$size[0]-$ls[0];
			$y=$size[1]-$ls[1];
		}
		imagecopy($img,$icon,$x,$y,0,0,$ls[0],$ls[1]);
	}
}

function embedCopy($img,$height,$copytype,$copy){
	
	if(strlen($copy)==0)return false;
	if($copytype!=1)return false;
	
	global $FONT;

	$f_size=8;
	$copyX=14;
	$f_white=imagecolorclosest($img,255,255,255);
	$f_gray=imagecolorclosest($img,80,80,80);
	$f_black=imagecolorclosest($img,0,0,0);

	if(colorPicker($img,$height)){
		$colorselect[0]=$f_gray;
		$colorselect[1]=$f_white;
	}else{
		$colorselect[0]=$f_white;
		$colorselect[1]=$f_black;
	}
	if($copytype==1){
		imagettftext($img,9,0,1,($height-5),$colorselect[0],$FONT,"©");
		imagettftext($img,9,0,3,($height-5),$colorselect[0],$FONT,"©");
		imagettftext($img,9,0,2,($height-6),$colorselect[0],$FONT,"©");
		imagettftext($img,9,0,2,($height-4),$colorselect[0],$FONT,"©");
		imagettftext($img,9,0,2,($height-5),$colorselect[1],$FONT,"©");
	}else{
		$copyX=2;
	}
	imagettftext($img,$f_size,0,$copyX,($height-5),$colorselect[0],$FONT,$copy);
	imagettftext($img,$f_size,0,$copyX+2,($height-5),$colorselect[0],$FONT,$copy);
	imagettftext($img,$f_size,0,$copyX+1,($height-6),$colorselect[0],$FONT,$copy);
	imagettftext($img,$f_size,0,$copyX+1,($height-4),$colorselect[0],$FONT,$copy);
	imagettftext($img,$f_size,0,$copyX+1,($height-5),$colorselect[1],$FONT,$copy);
}

function imgInCopy($img_name,$p,$copytype,$copy){
	
	if(strlen($copy)==0)return false;
	$re_size=getimagesize($img_name);
	$newImg=imagecreatetruecolor($re_size[0],$re_size[1]);
	$defImg=makeDefaultImg($img_name,$p);
	imagecopyresampled($newImg,$defImg,0,0,0,0,$re_size[0],$re_size[1],$re_size[0],$re_size[1]);
	embedCopy($newImg,$re_size[1],$copytype,$copy);
	outputImg($newImg,$img_name,$p);

}

function colorPicker($img,$y){

	$point=$y-12;
	for($i=15;$i<=100;$i++){
		$rgb[]=imagecolorat($img,$i,$point);
		$rgb[]=imagecolorat($img,$i,$point-1);
		$rgb[]=imagecolorat($img,$i,$point-2);
		$rgb[]=imagecolorat($img,$i,$point-3);
		$rgb[]=imagecolorat($img,$i,$point-4);
		$rgb[]=imagecolorat($img,$i,$point-5);
		$rgb[]=imagecolorat($img,$i,$point-6);
		$rgb[]=imagecolorat($img,$i,$point-7);
		$rgb[]=imagecolorat($img,$i,$point-8);
		$rgb[]=imagecolorat($img,$i,$point-9);
	}
	
	$wh=0;$bl=0;
	for($i=0;$i<count($rgb);$i++){
		$r=($rgb[$i]>>16)&0xFF;
		$g=($rgb[$i]>>8)&0xFF;
		$b=$rgb[$i]&0xFF;
		$len=(3*$r)+(6*$g)+$b;
		if($len<1175){
			$wh++;
		}else{
			$bl++;
		}
		$d[]=$len;
	}
	return($wh>bl)?true:false;
}

function chk_file($f,$typ,$fg=0){
	global $TMPPATH;
	$FILES['pdf']=array("PDF","application/pdf");
	$FILES['csv']=array("CSV","text/plain");
	$FILES['text']=array("タブ区切りテキスト","text/plain");
	$n=$f["tmp_name"];
	$t=$f["type"];
	$m=$f["name"];
	$td=array("","");
	if(strlen($n)<10)return $td;
	if($fg){
		if(strlen($f)<5){
			$pp=1;
			$err_message=$FILES[$typ][0]."ファイルが指定されておりません。";
			include 'error.php';
			exit;
		}
	}
	$r=($t==$FILES[$typ][1])?1:0;
	if($r){
		switch($t){
			case "application/pdf" : $extension=".pdf";
			break;
			default : $extension=substr($m,-4);
			break;
		}
		$tda=explode(" ",microtime());
		$tda=explode(".",$tda[0]);
		$tda=$tda[1];
		$td[0]=date("YmdHis").$tda;
		$td[1]="pdf".$td[0].$extension;
		move_uploaded_file($n,$TMPPATH.$td[1]);
	}else{
		$err_message="登録できるファイルは".$FILES[$typ][0]."だけです。<br>お手数ですがファイルを指定しなおしてください。";
	}
	if(isset($err_message)){
		$pp=1;
		include "error.php";
		exit;
	}else{
		return array($td[1],$m);
	}
}





?>
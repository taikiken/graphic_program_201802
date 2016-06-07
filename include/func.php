<?php

function modInputData($s){
	$l="";
	if(strlen($s)>0){
		$s=explode("\n",$s);
		for($i=0;$i<count($s);$i++){
			$l.="<div class=\"pms clearfix\">";
			$r=trim($s[$i]);
			$r=explode("\t",$r);
			for($j=0;$j<count($r);$j++){
				$l.=sprintf("<textarea style=\"width:%s\" name=\"zzz_%s%s\" class=\"in tt%s\" rows=\"1\">%s</textarea>",floor(88/count($r))."%",$i,$j,$j,$r[$j]);
			}
			$l.="</div>";
		}
	}
	return $l;
}

function modDispText($t,$h){

	$table="<table>";
	if(strlen($h)>0){
		$table.=sprintf("<caption>%s</caption>",$h);
	}
	$t=explode("\n",$t);
	for($i=0;$i<count($t);$i++){
		$s=explode("\t",$t[$i]);
		$table.="<tr>";
		for($j=0;$j<count($s);$j++){
			$y=trim($s[$j]);
			$y=strlen($y)>0?$y:"&nbsp;";
			if(preg_match("/^(\+|＋){1}/",$s[$j])){
				$table.=sprintf("<th>%s</th>",preg_replace("/^(\+|＋){1}/","",($y!="+"&&$y!="＋")?$y:"&nbsp;"));
			}else{
				$table.=sprintf("<td>%s</td>",preg_replace("/^(\+|＋){1}/","",$y));
			}
		}
		$table.="</tr>";
	}
	$table.="</table>";
	return $table;

}

function make_contents($id,$type=0){

	global $o;
	$sql=sprintf("select * from repo_e where nid=%s and flag=1 order by n",$id);
	$o->query($sql);
	$l=array();

	while($f=$o->fetch_array()){
		$l[]=make_contentsblock($f["types"],$f["title"],$f["media"],$f["link"]);
	}
	$l=implode("\n",$l);
	
	if($type==0){
		return $l;
	}else{
		$s=pg_escape_string($l);
		$sql=sprintf("update repo_body set body='%s' where pid=%s;\n",$s,$id);
		$sql.=sprintf("update repo_n set u_time=now() where id=%s;",$id);
		$o->query($sql);
	}
}

function youtubeURL($u){
	$par=array("rel","showinfo");
	preg_match('/src="([^"]+)"/',$u,$r);
	$originalurl=$r[1];
	if(preg_match('\?',$originalurl)){
		$u0=explode("?",$originalurl);
		$base=$u0[0];
	}else{
		$base=$originalurl;
	}
	$rewriteurl=sprintf("%s?rel=0&showinfo=0",$base);
	return str_replace($originalurl,$rewriteurl,$u);
}

function make_contentsblock($type,$title,$media,$link){
	
	$title=str_replace("''","'",$title);
	$l="";
	if($type==0){
		$l=sprintf("<div class=\"cms_text\">%s</div>",$title);
	}elseif($type==1){
		$l=sprintf("<div class=\"cms_heading\"><h%s>%s</h%s></div>",($media-132),$title,($media-132));
	}elseif($type==2){
		if(strlen($link)>0){
			$l=sprintf("<div class=\"cms_img\"><a href=\"%s\" target=\"_blank\"><img src=\"/prg_img/img/%s\"></a>%s</div>",$link,$media,(strlen($title)>0)?sprintf("<div class=\"caption\"><span>%s</span></div>",$title):"");
		}else{
			$l=sprintf("<div class=\"cms_img\"><img src=\"/prg_img/img/%s\">%s</div>",$media,(strlen($title)>0)?sprintf("<div class=\"caption\"><span>%s</span></div>",$title):"");
		}
	}elseif($type==3){
		$l=sprintf("<div class=\"cms_video\"><div class=\"youtube\"><iframe width=\"640\" height=\"375\" src=\"http://www.youtube.com/embed/%s?rel=0&showinfo=0\" frameborder=\"0\" allowfullscreen></iframe></div>%s</div>",$media,(strlen($title)>0)?sprintf("<div class=\"caption\"><span>%s</span></div>",$title):"");
	}elseif($type==4){
		$l=sprintf("<div class=\"cms_table\">%s</div>",modDispText($title,$media));
	}elseif($type==5){
		if(preg_match("/youtube/",$title)){
			
			$css=" ratio16_9";
			$container="<div class=\"ratio16_9-inner\">%s</div>";
			$title=youtubeURL($title);
			
		}else{
			$css="";
			$container="%s";
		}
		$l=sprintf("<div class=\"cms_widget%s\">%s</div>",$css,sprintf($container,$title));
	}elseif($type==6){
		//$l=sprintf("<div class=\"cms_pdf\"><a href=\"/prg_img/pdf/%s\" target=\"_blank\">%s</a></div>",$media,$title);
	}
	return $l;
}


function timemapping($t){
	preg_match("/([0-9]{4}-[0-9]{2}-[0-9]{2})/",$t,$r);
	return str_replace("-","/",$r[1]);
}

function datemapping($t){
	preg_match("/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})/",$t,$r);
	return str_replace("-","/",$r[1]);
}
function splittxts($s){
	$s=strip_tags($s);
	$s=htmlspecialchars($s);
	
	$l=mb_strlen($s);
	if($l>100){
		$s=mb_substr($s,0,100);
		$s=str_replace(array("\r\n","\r","\n"),"",$s);
		return $s."&hellip;";
	}else{
		$s=str_replace(array("\r\n","\r","\n"),"",$s);
		return $s;
	}
}


function bookmarkMaker($title,$url,$w=1){

	global $o;
	
	if(!$o){
		$o=new db;
		$o->connect();
	}
	
	$title=urlencode($title);
	$url=urlencode($url);
	
	$sql="select name,name_e from pm_ where flag=1 and cid=22 order by n";
	$o->query($sql);

	$l ="<div class=\"bookmark clearfix\">";
	$l.="<dl>";
	$l.="<dt><img src=\"/shared/img/i/labelBookmark.png\" width=\"65\" height=\"16\" alt=\"Bookmark\" ></dt>";
	$l.="<dd>";
	$l.="<ul>";
	while($f=$o->fetch_array()){
		$u=str_replace(array("{TITLE}","{URL}"),array($title,$url),$f["name_e"]);
		$l.=sprintf("<li><a href=\"%s\" target=\"_blank\"><img src=\"/shared/img/bookmark/%s.png\" width=\"16\" height=\"16\" alt=\"%s\" ></a></li>",$u,$f["name"],$f["name"]);
	}
	$l.="</ul>";
	$l.="</dd>";
	$l.="</dl>";
	$l.="</div>";
	return $l;
}


function fileNameModified($n){
	return str_replace(" ","-",strtolower(ereg_replace('[^a-zA-Z0-9 ]',"",mb_convert_kana($n,"as"))));
}

function setTransaction($title,$sessionid,$condition=""){

	global $_SERVER;
	global $SITE_URL;
	global $SESSIONFILEDIR;
	
	$r=$_SERVER['HTTP_REFERER'];
	$ua=$_SERVER['HTTP_USER_AGENT'];
	$ip=$_SERVER['REMOTE_ADDR'];
	
	if(strlen($ua)>0&&!chkCrawler($ua,$ip)){
		$encd="";
		$hash="";
		$ke="";
		if(!strpos($r,"gp-asset.co.jp")){
			$u=explode("?",$r);
			$u1=explode("&",$u[1]);
			$u[1]=urldecode($u[1]);
			$encd=mb_detect_encoding($u[1]);
			if(strpos($r,"yahoo")>1){
				$hash="p=";
				$eng="YAHOO";
			}elseif(strpos($r,"google")>1){
				$hash="q=";
				$eng="GOOGLE";
			}elseif(strpos($r,"msn")>1){
				$hash="q=";
				$eng="MSN";
			}elseif(strpos($r,"live.com")>1){
				$hash="q=";
				$eng="LIVE SEARCH";
			}elseif(strpos($r,"livedoor")>1){
				$hash="q=";
				$eng="LIVEDOOR";
			}elseif(strpos($r,"goo")>1){
				$hash="MT=";
				$eng="GOO";
			}elseif(strpos($r,"infoseek")>1){
				$hash="qt=";
				$eng="INFOSEEK";
				$encd="UTF-8";
			}elseif(strpos($r,"baidu")>1){
				$hash="wd=";
				$eng="BAIDU";
			}elseif(strpos($r,"ask")>1){
				$hash="q=";
				$eng="ASK";
			}elseif(strpos($r,"excite")>1){
				$hash="search=";
				$eng="EXCITE";
			}else{
				$eng=str_replace(array("http://",".www."),"",$u[0]);
				if($encd!="UTF-8")$ke=mb_convert_encoding($ke,"UTF-8",$encd);
				$ke=mb_convert_encoding($u[1],"SJIS","UTF-8");
			}
			if(strlen($hash)>0){
				for($i=0;$i<count($u1);$i++){
					if(ereg(sprintf("^%s",$hash),$u1[$i])){
						$ke=urldecode($u1[$i]);
						$ke=str_replace($hash,"",$ke);
						if($encd!="UTF-8")$ke=mb_convert_encoding($ke,"UTF-8",$encd);
						$ke=mb_convert_encoding($ke,"SJIS","UTF-8");
						break;
					}
				}
			}
		}
		$file=sprintf("%s.csv",$sessionid);
		$f=$SESSIONFILEDIR.$file;
		if(!file_exists($f)){
			touch($f);
			chmod($f,0666);
			$len=mb_convert_encoding("日時,ユーザ,ページ,URL,検索エンジン,検索ワード,エリア,価格,利回り,専有面積,築年,状態,検索文字列\r\n","SJIS","UTF-8");
		}else{
			$len="";
		}
		$fp=fopen($f,"a");
		$len.=sprintf("%s,%s %s,%s,%s,%s,%s%s%s\r\n",date("Y-m-d H:i:s"),$ip,$ua,mb_convert_encoding($title,"SJIS","UTF-8"),$eng,$ke,$SITE_URL,$_SERVER['REQUEST_URI'],$condition);
		fputs($fp,$len);
		fclose($fp);
	}else{
		$file="robots.csv";
		$f=$SESSIONFILEDIR.$file;
		if(!file_exists($f)){
			touch($f);
			chmod($f,0666);
			$len=mb_convert_encoding("日時,UA,URL\r\n","SJIS","UTF-8");
		}else{
			$len="";
		}
		/*
		$fp=fopen($f,"a");
		$len.=sprintf("%s,%s,%s%s\r\n",date("Y-m-d H:i:s"),$ua,$SITE_URL,$_SERVER['REQUEST_URI']);
		fputs($fp,$len);
		fclose($fp);
		*/
	}
}


function tagMatchSplit($iOpenRegex,$iCloseRegex,$iString,&$oMatches){

	$matchesOpen=$matchesClose=$oMatches=array();
	$start=$pos=$len=$searchPos=$tmpPos=0;
	$splitstr='';
	
	if(!preg_match_all($iOpenRegex,$iString,$matchesOpen)){
		return false;
	}
	if(!preg_match_all($iCloseRegex,$iString,$matchesClose)){
		return false;
	}
	if(count($matchesOpen[0])!=count($matchesClose[0])){
		return false;
	}
	for($openStr=array_shift($matchesOpen[0]),$closeStr=array_shift($matchesClose[0]);

		$openStr;
		$openStr=array_shift($matchesOpen[0]),$closeStr=array_shift($matchesClose[0])){
		$start=mb_strpos($iString,$openStr,$pos);
		$len=mb_strpos($iString,$closeStr,$pos)+mb_strlen($closeStr)-$start;
		$searchPos=mb_strlen($openStr);

		while($splitstr=mb_substr($iString,$start,$len)){

			if($nextOpenStr=array_shift($matchesOpen[0])){
				if(($tmpPos=mb_strpos($splitstr,$nextOpenStr,$searchPos))!==FALSE){
					$nextCloseStr=array_shift($matchesClose[0]);
					$len=mb_strpos($iString,$nextCloseStr,$start+$len)+mb_strlen($nextCloseStr)-$start;
					$searchPos=$tmpPos+mb_strlen($nextOpenStr);
				}else{
					array_unshift($matchesOpen[0],$nextOpenStr);
					break;
				}
			}else{
				break;
			}
		}
		$oMatches[]=$splitstr;
		$pos=$start+$len-1;
	}
	return true;
}

function pTagModify($l){

	$start=array('/<table[^>]*>/si' ,'/<h3[^>]*>/si' ,'/<blockquote[^>]*>/si','/<ul[^>]*>/si' ,'/<dl[^>]*>/si' ,'/<ol[^>]*>/si' ,'/<p[^>]*>/si','/<a[^>]*>/si');
	$end  =array('/<\/table>/si'    ,'/<\/h3>/si'    ,'/<\/blockquote>/si'   ,'/<\/ul>/si'    ,'/<\/dl>/si'    ,'/<\/ol>/si'    ,'/<\/p>/si'   ,'/<\/a>/si'   );

	$n=0;
	$to=array();
	$fr=array();

	for($i=0;$i<count($start);$i++){
		unset($matches);
		tagMatchSplit($start[$i],$end[$i],$l,$matches);
		for($j=0;$j<count($matches);$j++){
			$to[$n]=ereg_replace("[\r\n|\r]","",$matches[$j]);
			$fr[$n]="reg_$n";
			$l=str_replace($matches[$j],"reg_$n",$l);
			$n++;
		}
	}
	$l=auto_link($l);
	unset($matches);
	tagMatchSplit('/<a[^>]*>/si','/<\/a>/si',$l,$matches);
	for($j=0;$j<count($matches);$j++){
		$to[$n]=ereg_replace("[\r\n|\r]","",$matches[$j]);
		$fr[$n]="reg_$n";
		$l=str_replace($matches[$j],"reg_$n",$l);
		$n++;
	}

	$l=explode("\n",$l);
	$nl=array();

	for($i=0;$i<count($l);$i++){
		$f=trim($l[$i]);
		if(strlen($f)!=0){
			if(!ereg("^reg_",$f)){
				$nl[]=sprintf("<p>%s</p>",$f);
			}else{
				$nl[]=str_replace($fr,$to,$f);
			}
		}
	}
	return str_replace($fr,$to,implode($nl));
}

function stSw($a,$b){
	if(strlen($a)>0){
		return mod_HTML($a);	
	}else{
		return($b!="")?mod_HTML($b):"&nbsp;";	
	}
}

function table($name,$f="title"){
	global $_SERVER;
	if(!strpos($_SERVER['HTTP_REFERER'],"editdm")){
		return sprintf("(select * from %s where %s!='' and flag=1 and expire=1) as %s",$name,$f,$name);
	}else{
		return $name;
	}
}

function dateOffset($offset,$y,$m,$d){
	if(strlen($d)>0){
		$m=(strlen($m)==1)?sprintf("0%s",$m):$m;
		$d=(strlen($d)==1)?sprintf("0%s",$d):$d;
		return sprintf("%s%s%s%s%s",$y,$offset,$m,$offset,$d);
	}else{
		$m=(strlen($m)==1)?sprintf("0%s",$m):$m;
		return sprintf("%s%s%s",$y,$offset,$m);	
	}
}

function logIns($message,$usr,$error="",$sqls=""){
	
	global $CMSLOG,$_COOKIE;
		
	$fp=@fopen($CMSLOG,"a");
	@fputs($fp,sprintf("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",date("Y-m-d H:i:s"),$_COOKIE["usr"],$message,(strlen($error)>0)?0:1,$error,preg_replace('/(\n|\t)/',"",$sqls)));
	@fclose($fp);
}
function sessionregister($s){
	global $_SESSION;
	for($i=0;$i<count($s);$i++)$_SERVER[$s[$i]]="";
}
function setSorC($name,$value){
	global $SORC;
	if($SORC==0){
		setcookie($name,$value,time()+60*60*3,"/");
	}else{
		global $_SESSION;
		$_SESSION[$name]=$value;
	}
}
function getSorC($name){
	global $SORC;
	if($SORC==0){
		global $_COOKIE;
	}else{
		global $_SESSION;
	}
	return ($SORC==0)?$_COOKIE[$name]:$_SESSION[$name];
}

function source_check($r){
	global $SOURCE_URL;
	$a=true;
	for($i=0;$i<count($SOURCE_URL);$i++){
		if($SOURCE_URL[$i]==$r){
			$a=false;
			break;
		}
	}
	return $a;
}

function checkEmailAddress($str){
	if (!$str) {
		return false;
	}
	$matches=array();
	$regx='/([\.\w!#$%&\'*+-\/=?^`{|}~]+@[\w!#$%&\'*+-\/=?^`{|}~]+(\.[\w!#$%&\'*+-\/=?^`{|}~]+)*)/';
	if (preg_match_all($regx,$str,$matches)) {
		return array_pop($matches[1]);
	}
	return false;
}

function dblm($from,$n){
	global $DB;
	if($DB=="postgre"){
		$s=sprintf("limit %s offset %s",$n,$from);
	}else{
		$s=sprintf("limit %s,%s",$from,$n);
	}
	return $s;
}
function dbtm($n,$r=1){
	global $DB;
	if($DB=="postgre"){
		if($r==1){
			$s=sprintf("to_char(%s,'YYYY-mm-dd\"T\"HH24:MI:SS\"+09:00\"')",$n);
		}elseif($r==2){
			$s=sprintf("to_char(%s,'YYYY-mm-dd')",$n);
		}elseif($r==3){
			$s=sprintf("to_char(%s,'mm-dd')",$n);
		}elseif($r==4){
			$s=sprintf("to_char(%s,'HH24:MI:SS')",$n);
		}else{
			$s=sprintf("to_char(%s,'YYYY-mm-dd HH24:MI:SS')",$n);
		}
	}else{
		if($r==1){
			$s="concat(date_format(".$n.",'%Y-%m-%d') ,'T',date_format(".$n.",'%H:%i:%s'),'+09:00')";
		}elseif($r==2){
			$s="date_format(".$n.",'%Y-%m-%d')";
		}elseif($r==3){
			$s="date_format(".$n.",'%m-%d')";
		}elseif($r==4){
			$s="date_format(".$n.",'%H:%i:%s')";
		}else{
			$s="date_format(".$n.",'%Y-%m-%d %H:%i:%s')";
		}
	}
	return $s;
}

function auto_link($str){
	global $SITE_URL;
	$pattern0="((www.)([[:alnum:]\+\$\;\?\.%,!#~*\/:@&=_-]+))";
	$pattern1="((ftp://|http://|https://){2})([[:alnum:]\+\$\;\?\.%,!#~*\/:@&=_-]+)";
	$pattern2="(((ftp://|http://|https://){1})[[:alnum:]\+\$\;\?\.%,!#~*\/:@&=_-]+)";
	$pattern3="([_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,3})";
	$str=ereg_replace($pattern0,"http://\\1",$str);
	$str=ereg_replace($pattern1,"\\2\\3",$str);
	$a=(strpos($str,$SITE_URL))?"":" target=\"_blank\"";
	$str=ereg_replace($pattern2,"<a href=\"\\1\"".$a.">\\1</a>",$str);
	$str=ereg_replace($pattern3,"<a href=\"mailto:\\1\"><u>\\1</u></a>",$str);
	return $str;
}

function ctx($s,$f=0){
	
	if(preg_match("/</",$s)){
		return str_replace(array("<div","</div>"),array("<p","</p>"),$s);
	}else{
		if($f==0){
			return $s;
		}else{
			$s=auto_link($s);
			return nl2br($s);
		}
	}
}
function ptagmake($s){
	if(preg_match("/\n/",$s)){
		$s=@explode("\n",$s);
		for($i=0;$i<count($s);$i++){
			$l=trim($s[$i]);
			if($l!=""){
				$y[]=sprintf("<p%s>%s</p>",$J!=0?sprintf(" class=\"pt%sem\"",$J):"",htmlspecialchars($l));
				$J=0;
			}else{
				$J++;
			}
		}
		return @implode("",$y);
	}else{
		return strlen($s)>0?sprintf("<p>%s</p>",$s):"";
	}
}

function mod_HTML($str,$rua=0){	
	global $w;
	$str=trim($str);
	$str=stripslashes($str);
	//$str=addslashes($str);
	if($rua==0){
		//$str=htmlspecialchars($str);
	}elseif($rua==1){
		//$str=htmlspecialchars($str);
		$str=auto_link($str);
		$str=ereg_replace("\n","<br>",$str);
		
	}elseif($rua==2){
		$str=strip_tags($str,"<img><blockquote><sub><sup><strong><italic><strike><a><span><b><u><i><p><div><ol><ul><li><dl><dt><dd><table><tr><th><td><h1><h2><h3><h4><h5><h6><br><font>");
		$str=pTagModify($str);
	}elseif($rua==3){
		//$str=auto_link($str);
		$str=strip_tags($str);
		$str=ereg_replace("\r\n","\n",$str);
		$str=ereg_replace("\r","\n",$str);
		//$str=htmlspecialchars($str);
		//$str=ereg_replace("\n","\\n",$str);
	}else{
		
	}
	//$str=ex2byte($str);
	return $str;
}
function ex2byte($s){
	return $s;
	global $w;
	if($w->lang!="j")return $s;
	else return preg_match('/<[^>]+>/e',$s) ? preg_replace('>([^<]+)</e',"'>'.mb_convert_kana('\\1','A').'<'",$s) : mb_convert_kana($s,"A");
}
function strlenChker($str,$f=0){
	if(strlen($str)>0){
		$str=htmlspecialchars($str);
		$str=ereg_replace("\n","<br >",$str);
	}else{
		$str=($f)?"0":"-";
	}
	return $str;
}

function queryString($q){

	if(strlen($q)){
		$q=mb_convert_kana($q,"rnKV");
		$q=sqlinj($q);
		if(!isint($q))$e=1;
	}else{
		$e=1;
	}
	return(!isset($e))?$q:"error";
}

function isint($str){
	return (preg_match("/^[0-9]+$/",$str))?1:0;
}

function sqlinj($q){
	return $q;
}

function is1byte($s){
	for($i=0;$i<strlen($a);$i++){
		if(!ereg("[0-9a-zA-Z]",substr($a,$i,1)))return false;
	}
	return true;
}

function echo_hidden($f,$q=1){
	while(list($k,$v)=each($f)){
		if($q==1){
			if(!(int)$k){
				if(!is_array($v)){
					echo "<input type=\"hidden\" name=\"".$k."\" value=\"".htmlspecialchars($v)."\">\n";
				}else{
					for($j=0;$j<count($v);$j++){
						echo "<input type=\"hidden\" name=\"".$k."[]\" value=\"".htmlspecialchars($v[$j])."\">\n";
					}
				}
			}
		}else{
			if(!(int)$k){
				if(!is_array($v)){
					echo "<input type=\"hidden\" name=\"".$k."\" value=\"".htmlspecialchars(str_replace("null","",$v))."\">\n";
				}else{
					for($j=0;$j<count($v);$j++){
						echo "<input type=\"hidden\" name=\"".$k."[]\" value=\"".htmlspecialchars(str_replace("null","",$v[$j]))."\">\n";
					}
				}
			}
		}
	}
}

function data_conf($q="^p_"){

	global $_POST;
	global $sv;
	global $sn;

	while(list($k,$v)=each($_POST)){
		if(ereg($q,$k)){
			if(!is_array($v)){
				$v=trim($v);
				//$v=stripslashes($v);
				//$v=mb_convert_kana($v,"rnK");
				//$v=sqlinj($v);
				$sv[$sn[]=$k]=retxt($v);
			}else{
				$sv[$sn[]=$k]=retxt($v);
			}
		}
	}
}
function data_sql($q="^p_"){
	global $_POST;
	global $sv;
	global $sn;
	while(list($k,$v)=each($_POST)){
		if(ereg($q,$k)){
			if(strlen($v)>0){
				if(is_array($_POST[$k])){
					$v=implode(",",$_POST[$k]);
				}
				//$v=stripslashes($v);
				//$v=addslashes($v);
				if(preg_match('/((m|d|fn)[0-9]+)/',$k)){
					//$v=mb_convert_kana($v,"n");
					if(preg_match('/(^[0-9]+):/',$v,$rrd)){
						$v=$rrd[1];
					}else{
						$v=ereg_replace("[^0-9.]","",$v);
					}
				}
				$v=str_replace(array("\r\n","\r"),"\n",$v);
				$v=str_replace("―","-",$v);
				
				if(preg_match("/body[a-z]{2}/",$k)){
					//$v=ctx($v,2);
				}
				$v=str_replace("'","''",$v);
				$v=html_entity_decode($v);
				$v=sprintf("'%s'",$v);
			}else{
				$v="null";
			}
			$sv[$sn[]=ereg_replace($q,"",$k)]=$v;
		}
	}
}

function retxt($s){
	return $s;
}

function strs_split($str_data,$line_width){
	$temp_array=explode("\n",$str_data);
	$mystr="";
	for($i=0;$i<count($temp_array);$i++){
		$mystr.=line_split($temp_array[$i],$line_width);
	}
	return $mystr;
}
function line_split($line_data,$line_width){
	
	$this_array=array();
	$i=0;
	while($line_data!=""){
		$this_array[$i]=mb_strcut($line_data,0,$line_width);
		//echo $this_array[$i]."\n";
		$line_data=mb_substr($line_data,mb_strlen($this_array[$i]));
		if(mb_strwidth($this_array[$i])==$line_width){
			if(mb_ereg("[0-9a-zA-Z]",mb_strcut($this_array[$i],mb_strwidth($this_array[$i])-1))&mb_strwidth(mb_strcut($line_data,0,1))==1){
				for($j=mb_strwidth($this_array[$i]);$j>0;$j--){
					$temp_str=mb_strcut($this_array[$i],$j);
					if( mb_strwidth($temp_str)<>mb_strlen($temp_str) | mb_ereg("[ \.\,]",$temp_str)){
						$cut_str=mb_strcut($this_array[$i],$j+1);
						break;
					}
				}
				$this_array[$i]=mb_substr($this_array[$i],0,mb_strrpos($this_array[$i],$cut_str));
				$line_data=$cut_str.$line_data;
			}
		}
		$i++;
	}
	$mystr=implode("\n",$this_array)."\n";
	return $mystr;
}

function swforimg($IMG,$f,$alt="",$name=""){

	$p=$IMG.$f;
	$t=$p["type"];
	$s=GetImageSize($IMG.$f);
	if($s[0]>780){
		$s[0]=780;
		$s[1]=$s[1]*(780/$s[0]);
	}
	$flg=(strpos($f,"swf"))?0:1;

	if($flg){
		$src=sprintf("<img src=\"%s%s?m=%s\" width=\"%s\" border=\"0\" alt=\"%s\"%s >",$IMG,$f,date("His").(float)microtime(),$s[0],$alt,(strlen($name)>0)?sprintf(" name=\"%s\"",$name):"");
	}else{
		$src="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" ";
		$src.="codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0\" width=\"".$s[0]."\" height=\"".$s[1]."\">\n";
		$src.="<param name=\"movie\" value=\"".$IMG.$f."\">\n";
		$src.="<param name=\"quality\" value=\"high\">\n";
		$src.="<embed src=\"".$IMG.$f."\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" ";
		$src.="type=\"application/x-shockwave-flash\" width=\"".$s[0]."\" height=\"".$s[1]."\">\n";
		$src.="</embed>\n</object>\n";
	}
	return $src;
}

function pm_date($n,$q="p",$v=0,$r=0){

	$dt[]=array(1925,date("Y"));
	$dt[]=array(1,12);
	$dt[]=array(1,31);

	$hd=array("年","月","日");
	$hc=array("yy","mm","dd");
	$sz=array(60,40,40);

	if(!$v)$gg=" selected";
	$sa=($r)?array(2000,1,1):array("","","");

	for($j=0;$j<count($hd);++$j){
		$s.="<select name=\"".$q."_".$n.$hc[$j]."\">\n";
		$s.="<option value=\"".$sa[$j]."\"".$gg."></option>";
		for($i=$dt[$j][0];$i<=$dt[$j][1];$i++){
			$s.="<option value=\"".$i."\"";
			$s.=($i==$v[$j])?" selected":"";
			$s.=">".$i."</option>\n";
		}
		$s.="</select>\n".$hd[$j]."\n";
	}
	return $s;
}


function generalCheckbox($v,$size,$name,$e=""){
	$e=@explode(",",$e);
	$nm=ceil(count($v)/$size);
	$K=0;
	$cb="<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">\n";
	for($I=0;$I<$nm;$I++){
		$cb.="<tr>\n";
		for($J=0;$J<$size;$J++){
			if(strlen($v[$K]["name"])>0){
				$cb.="<td>";
				$cb.="<input type=\"checkbox\" name=\"p_".$name."[]\" value=\"".$v[$K]["id"]."\" id=\"".$name.$K."\"";
				for($L=0;$L<count($e);$L++){
					if($e[$L]==$v[$K]["id"]){
						$cb.=" checked";
						break;
					}
				}
				$cb.="><label for=\"".$name.$K."\">";
				$cb.=$v[$K]["name"];
				$cb.="</label></td>\n";
				$K++;
			}else{
				$cb.="<td>&nbsp;</td>\n";
			}
		}
		$cb.="</tr>\n";
	}
	$cb.="</table>\n";
	return $cb;
}

function generalRadioButton($v,$name,$e=""){
	$l="<ul>\n";
	for($i=0;$i<count($v);$i++){
		$l.=sprintf("<li><label for=\"radio_%s%s\"><input type=\"radio\" name=\"radio%s\" value=\"%s\"%s ><span>%s</span></label></li>\n",$name,$i,$name,$i,($i===$e)?" checked=\"checked\"":"",$v[$i]);
	}
	$l.="</ul>";
	return $l;
}

?>
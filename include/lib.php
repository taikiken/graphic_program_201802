<?php

/*
if($_POST["u"]==1){
	$sqls="update ".$TABLE." set flag=".$_POST["nv"]." where id=".$_POST["nn"];
	@$o->query($sqls);
	$e=$o->affected_rows();
	
	$oo=new dbutl($TABLE);
	$oo->setExpire($_POST["nn"]);
	$oo->setCount();
	
	include $INCLUDEPATH."__debug_title.php";
	
	$sql=sprintf("select %s from %s where id=%s",$TITLEFIELDNAME,$TABLE,$_POST["nn"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$RIREKITITLE=$f[$TITLEFIELDNAME];

//	if($CURRENTDIRECTORY=="repo_e"){/
//		$sql=sprintf("select title,body,pos,alt0,types from repo_e where id=%s",$_POST["nn"]);
//		$o->query($sql);
//		$f=$o->fetch_array();
//		if(strlen($f["title"])>0){
//			$RIREKITITLE=$f["title"];
//		}elseif(strlen($f["alt0"])>0){
//			$RIREKITITLE=$f["alt0"];
//		}elseif(strlen($f["body"])>0){
//			$RIREKITITLE=mb_substr($f["body"],0,25);
//		}
//	}

	$RIREKITITLE=addslashes($RIREKITITLE);
	logIns(sprintf("%s %s [ID : %s ] %s を%s",$PARENT,$THIS,$_POST["nn"],$RIREKITITLE,($_POST["nv"]==1)?"表示設定に変更しました。":"非表示設定に変更しました。"),getSorC("usr"),$e,$sqls);
	//if($CURRENTDIRECTORY=="repo_e")include $INCLUDEPATH."updateFulltext.php";
}

if(strlen($_POST["s"])>0){

	$S=$_POST["s"];
	$T=$_POST["t"];
	
	$III=0;
	include $INCLUDEPATH."__debug_title.php";
	$sql=sprintf("select id,%s from %s%sn in(%s,%s) order by n",$TITLEFIELDNAME,$TABLE,(strlen($WHERE)>0)?$WHERE." and ":" where ",$S,($T==0)?$S+1:$S-1);
	$o->query($sql);
	while($f=$o->fetch_array($III)){
		$IDSN[]=$f;
		if($T==0){
			if($III==0){
				$RIREKITITLE=$f[$TITLEFIELDNAME];
				$RIREKITITLEID=$f["id"];
			}
		}else{
			if($III==1){
				$RIREKITITLE=$f[$TITLEFIELDNAME];
				$RIREKITITLEID=$f["id"];
			}
		}
		$III++;
	}
	if($T==1){
		$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S-1),$IDSN[1]["id"]);
		$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[0]["id"]);
	}else{
		$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S+1),$IDSN[0]["id"]);
		$sqls[]=sprintf("update %s set n=%s where id=%s;",$TABLE,($S),$IDSN[1]["id"]);
	}

	$sqls=implode("\n",$sqls);
	@$o->query($sqls);
	
	$e=$o->affected_rows();
	
	if($CURRENTDIRECTORY=="repo_e"&&strlen($RIREKITITLE)==0){
		$sql=sprintf("select body from repo_e where id=%s",$RIREKITITLEID);
		$o->query($sql);
		$f=$o->fetch_array();
		if(strlen($f["body"])>0){
			$RIREKITITLE=mb_substr($f["body"],0,25);
		}
	}
	logIns(sprintf("%s %s [ID : %s ] %s を一つ%s(%s番)に並べ替えました。",$PARENT,$THIS,$RIREKITITLEID,$RIREKITITLE,($T==1)?"上":"下",($T==1)?($S-1):($S+1)),getSorC("usr"),$e,$sqls);
	//if($CURRENTDIRECTORY=="repo_e")include $INCLUDEPATH."updateFulltext.php";
}
*/

if($CURRENTDIRECTORY=="repo_n"&&$_GET["cid"]==1){

	if(strlen($_COOKIE["exuser"])>0){
		$exuser=$_COOKIE["exuser"]!=0?sprintf(" and d2=%s",$_COOKIE["exuser"]):"";
		
		$sql=sprintf("select cid,(select name from repo where id=u_member.cid) as name,title from u_member where id=%s",$_COOKIE["exuser"]);
		$o->query($sql);
		$f=$o->fetch_array();
		setcookie("exusername",sprintf("%s:%s",$_COOKIE["exuser"],$f["title"]));
		setcookie("exusercategory",sprintf("%s:%s",$f["cid"],$f["name"]));
	}
	if(strlen($_COOKIE["excategory"])>0){
		if($_COOKIE["excategory"]!="a"){
			$excategory=$_COOKIE["excategory"]!=0?sprintf(" and (m1=%s or m2=%s)",$_COOKIE["excategory"],$_COOKIE["excategory"]):"";
		}else{
			$excategory=" and m1 is null and m2 is null";
		}
	}
	if($_COOKIE["orderby"]=="snew"){
		$orderby=sprintf("m_time desc");
	}elseif($_COOKIE["orderby"]=="sold"){
		$orderby=sprintf("m_time");
	}else{
		$orderby="n desc";
	}

	$sql=sprintf("select count(*) as n from %s%s%s%s",$TABLE,$WHERE,$exuser,$excategory);

}else{
	$sql=sprintf("select count(*) as n from %s%s",$TABLE,$WHERE);
}



$o->query($sql);
$f=$o->fetch_array();
$N=$f["n"];

$offset=$PAGEOFFSET;
if($CURRENTDIRECTORY!="repo_e"){
	$no=(isset($_GET["no"]))?$_GET["no"]:0;
}else{
	$no=0;
}
$div=ceil($N/$offset);

if($CURRENTDIRECTORY=="repo_n"&&$_GET["cid"]==1){
	if(!$_COOKIE["orderby"]&&!$_COOKIE["exuser"]&&!$_COOKIE["excategory"]){
		$sql=sprintf("select %s from %s%s order by n%s %s",$FIELD,$TABLE,$WHERE," desc",dblm($no,$offset));
		setcookie("orderby","",time()-3600,"/");
	}else{		
		$sql=sprintf("select %s from %s%s%s%s order by %s %s",$FIELD,$TABLE,$WHERE,$exuser,$excategory,$orderby,dblm($no,$offset));
	}
}elseif($CURRENTDIRECTORY=="repo_n"&&$_GET["rid"]==2){
	$sql=sprintf("select %s from %s%s%s%s order by %s %s",$FIELD,$TABLE,$WHERE,$exuser,$excategory,"id",dblm($no,$offset));
}else{
		$sql=sprintf("select %s from %s%s order by n%s %s",$FIELD,$TABLE,$WHERE,($CURRENTDIRECTORY=="log")?" desc":"",dblm($no,$offset));
}

$o->query($sql);
$III=0;
while($f=$o->fetch_array($III)){
	$p[]=$f;
	$ID[]=$f["n"];
	$IID[]=$f["id"];
	$III++;
}

?>
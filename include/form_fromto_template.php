<?php

if(isint($g->f("template"))){
	
	if(isset($_GET["from"])){
		$FROMPARENT="mailtemplate";
		$FROMCHILD="mail_template";
		$TOPARENT="mail";
		$TOCHILD="mail_";
		$PARENTTEXT="フォームテンプレート[ %s ]から新規フォーム";
		$CHILDTEXT="フォームテンプレート[ %s ]から新規フォームブロック";
	}else{
		$FROMPARENT="mail";
		$FROMCHILD="mail_";
		$TOPARENT="mailtemplate";
		$TOCHILD="mail_template";
		$PARENTTEXT="フォーム[ %s ]から新規フォームテンプレート";
		$CHILDTEXT="フォーム[ %s ]から新規テンプレートのフォームブロック";
	}

	$sql=sprintf("select id,n from %s order by id desc %s",$TOPARENT,dblm(0,1));
	$o->query($sql);
	$f=$o->fetch_array();
	$INSERTID=(strlen($f["id"])>0)?($f["id"]+1):1;
	$n=(strlen($f["n"])>0)?($f["n"]+1):1;
	
	$fieldNAME="subject,exp,exptag,exp2,exp2tag,body,path,mailto,mailfrom";
	
	$sql=sprintf("select %s from %s where id=%s",$fieldNAME,$FROMPARENT,$g->f("template"));
	$o->query($sql);
	$f=$o->fetch_array();
	
	$fieldNAME=explode(",",$fieldNAME);
	for($i=0;$i<count($fieldNAME);$i++){
		${$fieldNAME[$i]}=$f[$fieldNAME[$i]];
		if(strlen(${$fieldNAME[$i]})>0){
			${$fieldNAME[$i]}=sprintf("'%s'",addslashes(${$fieldNAME[$i]}));
		}else{
			${$fieldNAME[$i]}="NULL";
		}
		if($i==0)$FROMSUBJECT=$f[$fieldNAME[$i]];
	}

	$o->query("begin");
	$sql=sprintf("insert into %s(id,subject,body,mailto,mailfrom,path,exp,exp2,n,m_time,u_time,exptag,exp2tag,flag) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,now(),now(),%s,%s,2);",$TOPARENT,$INSERTID,$subject,$body,$mailto,$mailfrom,$path,$exp,$exp2,$n,$exptag,$exp2tag);
	$o->query($sql);
	$e=$o->affected_rows();
	logIns(sprintf("%sを作成するのに%sしました。",sprintf($PARENTTEXT,$FROMSUBJECT),(!$e)?"成功":"失敗"),getSorC("usr"),$e,$sql);

	if($e){
		$o->query("abort");
	}else{
		$sql=sprintf("select max(id) as id from %s",$TOCHILD);
		$o->query($sql);
		$f=$o->fetch_array();
		$INITNO=$f["id"]+1;

		$sql=sprintf("select * from %s where cid=%s order by n",$FROMCHILD,$g->f("template"));
		$o->query($sql);
		while($f=$o->fetch_array()){
			$s[]=$f;
		}

		for($i=0;$i<count($s);$i++){
			$kq[]=sprintf("insert into %s(id,cid,lib,fname,at,fvalue,fsize,pre,sep,cap,flag,n,u_time,m_time) values(%s,%s,%s,'%s',%s,'%s','%s',%s,%s,%s,1,%s,now(),now());",$TOCHILD,$INITNO++,$INSERTID,addslashes($s[$i]["lib"]),(strlen($s[$i]["fname"])>0)?addslashes($s[$i]["fname"]):"null",(strlen($s[$i]["at"])>0)?$s[$i]["at"]:"null",(strlen($s[$i]["fvalue"])>0)?addslashes($s[$i]["fvalue"]):"null",(strlen($s[$i]["fsize"])>0)?addslashes($s[$i]["fsize"]):"null",(strlen($s[$i]["pre"])>0)?sprintf("'%s'",addslashes($s[$i]["pre"])):"null",(strlen($s[$i]["sep"])>0)?sprintf("'%s'",addslashes($s[$i]["sep"])):"null",(strlen($s[$i]["cap"])>0)?sprintf("'%s'",addslashes($s[$i]["cap"])):"null",$i+1);
		}
		$kq=implode("\n",$kq);
		$o->query($kq);
		$e=$o->affected_rows();
		
		logIns(sprintf("%sを作成するのに%sしました。",sprintf($CHILDTEXT,$FROMSUBJECT),(!$e)?"成功":"失敗"),getSorC("usr"),$e,$kq);
		
		if($e){
			$o->query("abort");
		}else{
			$o->query("commit");
		}
	}
}
header(sprintf("Location:%smail%s/?%s",$ADPATH,(isset($_GET["from"]))?"":"template",$g->g_url("template,from")));

?>
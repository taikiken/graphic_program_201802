<?php

if($q->get_dir()===1){

	$sql=sprintf("select usr,message,sql,error,flag,%s as m_time from rireki%s order by usr,id desc",dbtm("m_time",0),(getSorC("mid")!=1)?sprintf(" where usr!='%s'","psychsa"):"");
	$o->query($sql);
	$p=$o->fetch_array();
	
	$i=0;
	$Fl[]=sprintf("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"","実行時間","ユーザ名","作業内容","発行SQL","実行エラー");
	while($f=$o->fetch_array($i++)){
		$Fl[]=sprintf("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"",$f["m_time"],$f["usr"],$f["message"],$f["sql"],$f["error"]);
	}

	$Fl=implode("\n",$Fl);
	$Fl=str_replace("\n","\r\n",$Fl);
	$Fl=mb_convert_encoding($Fl,"SJIS","UTF-8");
	$filename=mb_convert_encoding(sprintf("作業ログ%s",date("YmdHis")),"SJIS","UTF-8");
	
	header("Content-Type: application/octet-stream");
	header(sprintf("Content-Disposition: attachment; filename=%s.csv",$filename));
	
	echo $Fl;
	exit;
	
}elseif($q->get_dir()===2){

	$sql=sprintf("delete from rireki%s",(getSorC("mid")!=1)?sprintf(" where usr!='%s'","psychsa"):"");
	$o->query($sql);
	
	header("Location:../");

}elseif($q->get_dir()===3){

	if(strlen($_SERVER["HTTP_REFERER"])>0&&gettype(strpos($_SERVER["HTTP_REFERER"],"log"))=="boolean")setcookie("refback",$_SERVER["HTTP_REFERER"],time()+3600,"/editdm/");

	$TABLE="rireki";
	$FIELD=sprintf("usr,message,%s as m_time,error,flag,sql",dbtm("m_time",0));
	
	if(getSorC("alv")==51){
		if(getSorC("mid")!=1){
			$WHERE=sprintf(" where usr!='%s'","psychsa");
		}
	}else{
		$WHERE=sprintf(" where usr = '%s'",getSorC("usr"));
	}
	if(isset($_GET["types"])){
		$WHERE=(strlen($WHERE)>0)?($WHERE." and flag!=1"):" where flag!=1";
	}
	if(isset($_GET["usr"])){
		$WHERE=(strlen($WHERE)>0)?($WHERE." and usr='".$_GET["usr"]."'"):" where usr='".$_GET["usr"]."'";
	}
	$TITLEFIELDNAME="usr";

}

$EDITDELETEINITIAL="";

?>
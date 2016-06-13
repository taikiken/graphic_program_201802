<?php

$FILES=chk_file($HTTP_POST_FILES["file"],"text");
$fp=fopen($TMPPATH.$FILES[0],"r");

$i=0;

while($l=fgets($fp,1024)){
	if(strlen($l)>6){
		$l=mb_convert_encoding($l,"UTF-8","UTF-8");
		$l=trim($l);
		$l=str_replace("\"","",$l);
		$l=explode("\t",$l);
		$DATA[$i++]=$l;
	}
}

$sql="delete from repo_n where cid=".$g->f("cid");
$o->query($sql);

for($i=0;$i<count($DATA);$i++){
	$sql="insert into repo_n(cid,qid,title,body,t1,t2,t3,t4,n1,n2,n3,n4,flag,n,m_time,u_time) values(%s,%s,'%s','%s','%s','%s','%s','%s','%s',%s,%s,%s,%s,%s,now(),now())";
	$t=str_replace("～",":",$DATA[$i][0]);
	$t=explode(":",$t);
	$sql=sprintf($sql,$g->f("cid"),$g->f("rid"),addslashes(mb_convert_kana($DATA[$i][5],"rn")),addslashes(mb_convert_kana($DATA[$i][6],"rn")),$t[0],$t[1],$t[2],$t[3],($DATA[$i][1])?56:55,($DATA[$i][2])?58:57,(strlen($DATA[$i][3])>0)?$DATA[$i][3]:"null",$DATA[$i][4]+67,1,$i+1);
	//echo $sql;
	$o->query($sql);
}

fclose($fp);
unlink($TMPPATH.$FILES[0]);
header("Location:../?".$g->g_url());

?>
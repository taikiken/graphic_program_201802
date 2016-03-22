<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();
$uid=auth();

if(strlen($uid)==0){
	$sql="select id,name,name_e,img from pm_ where cid=20 and flag=1 order by n";
}else{
	$sql=sprintf("select id,name,name_e,img,n,1 as m from pm_ where id in (select categoryid from u_category where userid=%s and flag=1) and flag=1 union select id,name,name_e,img,n,2 as m from pm_ where cid=20 and flag=1 and id not in (select categoryid from u_category where userid=%s and flag=1) order by m,n",$uid,$uid);
}
$o->query($sql);

while($f=$o->fetch_array())$p[]=$f;

for($i=0;$i<count($p);$i++){
	$s[$i]["id"]=(int)$p[$i]["id"];
	$s[$i]["label"]=$p[$i]["name"];
	$s[$i]["slug"]=$p[$i]["name_e"];
	$s[$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
	$s[$i]["title_img"]=strlen($p[$i]["img"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["img"]):"";
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;

print_json($y,$_SERVER['HTTP_REFERER']);

?>
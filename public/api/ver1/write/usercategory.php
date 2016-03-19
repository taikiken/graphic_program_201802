<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
set_useraccount($uid);

if($y["status"]["code"]===200){

	if($_SERVER["REQUEST_METHOD"]=="POST"){
		if(is_string($_REQUEST["interest"])){
			if(strlen($_REQUEST["interest"])>0){
				$category=@explode(",",$_REQUEST["interest"]);
			}else{
				$category=array();
			}
		}else{
			$category=$_REQUEST["interest"];
		}
	
		if(count($category)>0){

			for($i=0;$i<count($category);$i++){
				$sql[]=sprintf("insert into u_category(userid,categoryid,flag,regitime) select %s,%s,1,now() where not exists (select 1 from u_category where userid=%s and categoryid=%s);",$uid,$category[$i],$uid,$category[$i]);
			}
			
			$category=implode(",",$category);
			$sql[]=sprintf("update u_category set flag=0,regitime=now() where userid=%s and categoryid not in(%s);",$uid,$category);
			$sql[]=sprintf("update u_category set flag=1,regitime=now() where userid=%s and categoryid in(%s);",$uid,$category);
			$sql[]=sprintf("update repo_n set t20='%s' where id=%s;",$category,$uid);
			
			$sql=implode("\n",$sql);
			$o->query($sql);
			$e=$o->affected_rows2();
			if($e){
				set_status(array("user_message"=>"興味のあるカテゴリーを更新しました。"));
			}else{
				set_servererror();
			}
		}
	}
	
	$sql=sprintf("select (case when t1.id is not null then 1 else 0 end) as f,t2.* from (select id,categoryid from u_category where userid=%s and flag=1) as t1 right join (select id,name,name_e,img,n from pm_ where cid=20 and flag=1) as t2 on t1.categoryid=t2.id order by n",$uid);
	$o->query($sql);
	
	while($f=$o->fetch_array())$p[]=$f;
	for($i=0;$i<count($p);$i++){
		$s[$i]["id"]=(int)$p[$i]["id"];
		$s[$i]["label"]=$p[$i]["name"];
		$s[$i]["slug"]=$p[$i]["name_e"];
		$s[$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
		$s[$i]["is_interest"]=$p[$i]["f"]==1?true:false;
		$s[$i]["title_img"]=strlen($p[$i]["img"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["img"]):"";
	}
}

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;

print_json($y,$_SERVER['HTTP_REFERER']);

?>
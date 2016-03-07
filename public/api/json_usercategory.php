<?php


include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

if($_SERVER["REQUEST_METHOD"]=="POST"){
	
	if(strlen($uid)){
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
			
			$category=implode(",",$category);
			$sql[]=sprintf("update u_category set flag=0,regitime=now() where userId=%s and categoryid not in(%s);",$uid,$category);
			$sql[]=sprintf("update u_category set flag=1,regitime=now() where userId=%s and categoryid in(%s);",$uid,$category);
			$sql[]=sprintf("update repo_n set t20='%s' where userId=%s and categoryid in(%s);",$uid,implode(",",$category));
			
			$category=explode(",",$category);	
			for($i=0;$i<count($category);$i++){
				$sql[]=sprintf("insert into u_category(userId,categoryId,flag,regitime) select %s,%s,1,now() where not exists (select 1 from u_category where userid=%s and categoryid=%s);",$uid,$category[$i],$uid,$category[$i]);
			}
			$o->query(implode("\n",$sql));
			$e=$o->affected_rows2();
			
			if(!$e){
				$y["status"]["code"]=500;
				$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				$y["status"]["message_type"]="error";
			}
		}
	}else{
		$y["status"]["code"]=400;
		$y["status"]["user_message"]="ログインしてください。";
		$y["status"]["message_type"]="error";
	}
}

$sql=sprintf("select (case when t1.id is not null then 1 else 0 end) as f,t2.* from (select id,categoryid from u_category where userid=%s and flag=1) as t1 right join (select id,name,name_e,n from pm_ where cid=20 and flag=1) as t2 on t1.categoryid=t2.id order by n",$uid);
$o->query($sql);

while($f=$o->fetch_array())$p[]=$f;

for($i=0;$i<count($p);$i++){

	$s[$i]["id"]=(int)$p[$i]["id"];
	$s[$i]["label"]=$p[$i]["name"];
	$s[$i]["slug"]=$p[$i]["name_e"];
	$s[$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
	$s[$i]["is_interest"]=$p[$i]["f"]==1?true:false;
}

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>
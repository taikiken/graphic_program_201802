<?php

$sql="select * from editor where cid=".$QS." and flag=1 and directory='nid' order by n";
$o->query($sql);
$YII=0;
$XX=1;

while($FPI=$o->fetch_array($YII)){
	if($q->get_dir()!=4){
		$a[]=array($FPI["f_type"],$FPI["d_name"],$FPI["f_name"],$FPI["f_size"],$FPI["f_option"],$FPI["f_comment"],$FPI["bill"],$FPI["f_option2"],$FPI["f_option3"],$FPI["f_option4"],$FPI["f_option5"],$FPI["f_option6"]);
	}else{
		if($q->get_file()==0){
			$SF=0;
			$e=explode(",",$SEARCHTARGET);
			for($TT=0;$TT<count($e);$TT++){
				if($e[$TT]==$FPI["id"]){
					$SF=1;
					break;
				}
			}
			if($SF==1){
				$a[]=array($FPI["f_type"],$FPI["d_name"],$FPI["f_name"],$FPI["f_size"],$FPI["f_option"],$FPI["f_comment"],$FPI["bill"],$FPI["f_option2"],$FPI["f_option3"],$FPI["f_option4"],$FPI["f_option5"],$FPI["f_option6"]);
			}
		}
	}
	$YII++;
}

if($META!=111){	
	$a[]=array("textfield","コメント","comment","120","","",$BILLINGUAL);
}

include $INCLUDEPATH."print_write.php";

if($q->get_dir()==4){
	if($q->get_file()===0){
		//include $INCLUDEPATH."_newfield.php";
	}elseif($q->get_file()===1){
		echo $HTML;
	}
}else{

	if($TABLE!="u_comment"){
		include $INCLUDEPATH."_pageaddition.php";
	}
}

?>
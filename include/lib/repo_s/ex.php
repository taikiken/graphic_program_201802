<?php

if ($_GET["rid"] == "95") { // 注目の選手
  $a[]=array("textfield","タイトル","name","45","","",$BILLINGUAL);
}

if(!isset($_GET["cid"])){
	$sql="select * from editor where cid=".$QS." and flag=1 and directory='rid' order by n";
}else{
	$sql="select * from editor where cid=".$QS." and flag=1 and directory='pid' order by n";
}

$o->query($sql);
$YII=0;
$XX=1;

while($FPI=$o->fetch_array($YII)){
	$a[]=array($FPI["f_type"],$FPI["d_name"],$FPI["f_name"],$FPI["f_size"],$FPI["f_option"],$FPI["f_comment"],$FPI["bill"],$FPI["f_option2"],$FPI["f_option3"],$FPI["f_option4"],$FPI["f_option5"],$FPI["f_option6"]);
	$YII++;
}

if(!isset($_GET["cid"])){
	if($q->get_file()===1){
		if($q->get_dir()===0){
			if($CCFLAG==1){
				echo "<input type=\"hidden\" name=\"p_c_flag\" value=\"1\">";
			}
		}
	}
}

/*
$a[]=array("head","コンテンツメタ情報設定");
$a[]=array("textfield","キーワード","keyword","45","","HTMLのメタタグ keyword を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);
$a[]=array("textarea","ディスクリプション","description","5","","HTMLのメタタグ description を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);

$a[]=array("head","公開設定");
$a[]=array("menu","5","rb",2,"chgExpire(this.value)");
$a[]=array("startendDate","公開スケジュール","sy,sm,sd,ey,em,ed","","","","");
*/

include $INCLUDEPATH."print_write.php";

?>
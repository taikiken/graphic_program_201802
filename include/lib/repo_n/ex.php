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

if($q->get_dir()!=4){

	if($META!=111){	
		$a[]=array("head","コンテンツメタ情報設定");
		$a[]=array("textfield","キーワード","keyword","55","","HTMLのメタタグ keyword を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);
		$a[]=array("textarea","ディスクリプション","description","5","","HTMLのメタタグ description を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);
		//$a[]=array("textfield","タグ","tag","45","","エントリのキーワードをカンマ区切りで入力してください。タグはエントリの相互関連リンクを作成する際に使用されます。");
	}
	if(strlen($PAGEOPTION)>0){
		$a[]=array("head","コンテンツオプション設定");
		if(gettype(strpos($PAGEOPTION,"trackback"))=="integer"){
			$a[]=array("menu","15","rb",2);
		}
		if(gettype(strpos($PAGEOPTION,"clickenquete"))=="integer"){
			$a[]=array("p_menu","クリックアンケート","clickenquete","select id,title from clickenquete");
		}
		if(gettype(strpos($PAGEOPTION,"form"))=="integer"){
			$a[]=array("p_menu","フォーム","form","select id,subject from mail");
		}
	}

	if($META!=111){
		$a[]=array("head","公開設定");
		$a[]=array("menu","5","rb",2,"chgExpire(this.value)");
		$a[]=array("startendDate","公開スケジュール","sy,sm,sd,ey,em,ed","","","","");
		//$a[]=array("date","開始日","sy,sm,sd",0);
		//$a[]=array("date","終了日","ey,em,ed",0);
	}

}else{
	if($q->get_file()===0){
		if($CONTENTSEDIT==1)$a[]=array("textarea","ブロック作成コンテンツ","fulltext","5","","",$BILLINGUAL);
		//$a[]=array("textfield","タグ","tag","55","","エントリのキーワードをカンマ区切りで入力してください。タグはエントリの相互関連リンクを作成する際に使用されます。",$BILLINGUAL);
		//$a[]=array("menu","5","rb",2,"chgExpire(this.value)");
	}
}

include $INCLUDEPATH."print_write.php";

if($q->get_dir()==4){
	if($q->get_file()===0){
		$a=array("表示設定","flag",array("表示","非表示"),"");
		include $INCLUDEPATH."_newfield.php";
	}elseif($q->get_file()===1){
		echo $HTML;
	}
}

$a=array("表示設定","flag",array("表示","非表示"),"");
include $INCLUDEPATH."_newfield2.php";

if($q->get_dir()==1){
	include $INCLUDEPATH."_pageaddition5.php";
}

?>
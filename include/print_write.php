<?php
for($III=0;$III<count($a);$III++){
	unset($_OPTION,$_COMMENT,$d_name,$f_name,$SIZE,$_BILL,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05);
	$d_name=$a[$III][1];
	$f_name=$a[$III][2];
	$SIZE=$a[$III][3];
	if(strlen($a[$III][4])>0)$_OPTION=$a[$III][4];
	if(strlen($a[$III][5])>0)$_COMMENT=$a[$III][5];
	if(strlen($a[$III][6])>0)$_BILL=$a[$III][6];
	if(strlen($a[$III][7])>0)$_OP01=$a[$III][7];
	if(strlen($a[$III][8])>0)$_OP02=$a[$III][8];
	if(strlen($a[$III][9])>0)$_OP03=$a[$III][9];
	if(strlen($a[$III][10])>0)$_OP04=$a[$III][10];
	if(strlen($a[$III][11])>0)$_OP05=$a[$III][11];
	if(preg_match('/^webview/',$f_name) && $a[$III][0] !== 'head'){
		include $INCLUDEPATH."_category_webview.php";
	} else {
		include $INCLUDEPATH."_".$a[$III][0].".php";
	}
}

?>
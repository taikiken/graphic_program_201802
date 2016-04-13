<?php

if(isset($_POST["back"])){
	while(list($k,$v)=each($_POST)){
		if(!ereg("^img",$k)){
			if(!is_array($v)){
				$v=trim($v);
				$v=stripslashes($v);
				$p[ereg_replace("^p_","",$k)]=$v;
			}else{
				$p[ereg_replace("^p_","",$k)]=implode(",",$_POST[$k]);
			}
		}
	}
}
?>
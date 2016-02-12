<?php
class ps{

	var $tstr;
	var $dr;
	var $fl;
	var $pdir;

	function ps($s){
		$this->tstr=explode("/",$s);
		$this->pdir=$this->chk_parent();
		$this->dr=$this->chk_dir();
		$this->fl=$this->chk_file();
	}

	function chk_dir(){
		switch($this->tstr[count($this->tstr)-2]){
			case "edit":
			$dr=1;
			break;
			case "delete":
			$dr=2;
			break;
			case "new":
			$dr=0;
			break;
			case "search":
			$dr=4;
			break;
			case "import":
			$dr=5;
			break;
			default:
			$dr=3;
			break;
		}
		return $dr;
	}

	function chk_file(){
		$f=explode(".",$this->tstr[count($this->tstr)-1]);
		switch($f[0]){
			case "conf":
			$fl=1;
			break;
			case "exe":
			$fl=2;
			break;
			case "index":
			$fl=0;
			break;
			case "result":
			$dr=4;
			break;
			default:
			$fl=3;
			break;
		}
		
		/*
		if($t=="")$fl=0;
		elseif(ereg("^conf",$t))$fl=1;
		elseif(ereg("^exe",$t))$fl=2;
		elseif(ereg("^result",$t))$fl=4;
		else $fl=3;
		*/

		return $fl;
	}

	function chk_parent(){
		return $this->tstr[2];
	}

	function get_dir(){
		return $this->dr;
	}
	function get_file(){
		return $this->fl;
	}
	function btn_img(){
		$a=array("regi","edit_j","delete","","","det");
		return $a[$this->dr];
	}
	function exe_fl(){
		$dr=array("登録","編集","削除","一覧","検索");
		return $dr[$this->dr];
	}
	function chk_pos(){
		if($this->dr!=4){
			$fo=array("","確認","終了");
			$fo[0]=$this->exe_fl();
		}else{
			$fo=array("検索条件指定","検索結果");
		}
		$sy="<span>\$KK</span>";

		for($i=0;$i<count($fo);++$i){
			if($i!=0)$str.="-";
			$str.=($i==$this->fl)?str_replace("\$KK",$fo[$i],$sy):$fo[$i];
		}
		
		if($this->get_dir()==4){
			$str="<span>検索</span>";
		}
		
		if($this->get_dir()==3){
			$str="<span>一覧</span>";
		}
		
		return $str;
	}
}

?>
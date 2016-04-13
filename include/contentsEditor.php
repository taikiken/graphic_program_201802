<?php

include $INCLUDEPATH."contentsEditorTemplate.php";

class contentsEditor{
	
	var $id;
	var $rss;
	var $p;
	var $o;
	var $r;
	var $t;
	var $td;
	var $yet;
	var $befor;
	var $after;
	
	function contentsEditor(){}

	function readData(){
		$sql=sprintf("select * from repo_e where nid=%s and flag=1 order by n",$this->id);
		$this->o->query($sql);
		while($f=$this->o->fetch_array()){$p[]=$f;}
		return $p;
	}
	function setThisData(){
		global $_SERVER;
		$sql=sprintf("select * from repo_n where id=%s",$this->id);
		$this->o->query($sql);
		$f=$this->o->fetch_array();
		if(!$f&&strpos($_SERVER['HTTP_REFERER'],"editdm")!=-1){
			$this->yet=1;
		}
		return $f;
	}
}

class contentsEditorPattern0 extends contentsEditor{

	function contentsEditorPattern0($id,$b,$rss=""){
		global $o;
		global $contentsEditorTemplate;
		$this->o=$o;
		$this->t=$contentsEditorTemplate;

		$this->id=$id;
		$this->b=$b;
		$this->rss=$rss;
		$this->r=$this->readData();
		$this->td=$this->setThisData();
		//if($this->td["cid"]==5||$this->td["cid"]==6)$this->setArtworkData();
	}
	function i($n,$name){
		$j=$this->r[$n]["img".$name];
		if(strlen($j)==0)return "";
		$t=$this->r[$n]["alt0"];
		$t2=mod_HTML(trim(strip_tags($t)));

		if(strlen($t)>0){
			if($this->r[$n]["types"]!=5){
				$l=sprintf("%s%s",sprintf($this->t[0][0][0],$j,$t2,$this->setImg("thumbnail1/",$j,$t2)),sprintf($this->t[0][1],$t));
			}else{
				$l=sprintf($this->t[0][0][1],$this->setImg("thumbnail1/",$j,$t2));
			}
		}else{
			if($this->r[$n]["types"]!=5){
				$l=sprintf($this->t[0][0][0],$j,"",$this->setImg("thumbnail1/",$j,"#"));
			}else{
				$l=sprintf($this->t[0][0][1],$this->setImg("thumbnail1/",$j,"#"));
			}
		}
		
		return $l;
	}
	function setImg($d,$n,$a){
		global $FSPATH;
		$s=getimagesize($FSPATH.$d.$n);
		return sprintf("<img src=\"/prg_img/%s%s\" width=\"%s\" height=\"%s\" alt=\"%s\" >",$d,$n,$s[0],$s[1],trim(strip_tags($a)));
	}
	function setNotes($d){
		$d=explode("\n",$d);
		$l="";
		for($i=0;$i<count($d);$i++){
			$l.=sprintf("<dl class=\"notes clearfix\"><dt><span>*</span>%s</dt><dd>%s</dd></dl>",$i+1,mod_HTML($d[$i],1));
		}
		return $l;
	}
	function makeHtmlFromTemplate(){
		global $MSG;
		$l="";
		for($i=0;$i<count($this->r);$i++){
				 if($this->r[$i]["types"]==0){
					$l.=sprintf($this->t[1][0],$this->r[$i]["pos"],mod_HTML($this->r[$i]["title"]));
			}elseif($this->r[$i]["types"]==1){
					$l.=sprintf($this->t[1][1],$this->r[$i]["pos"],mod_HTML($this->r[$i]["title"]));
			}elseif($this->r[$i]["types"]==2){
					$l.=sprintf($this->t[1][2],$this->r[$i]["pos"],mod_HTML($this->r[$i]["title"]));
			}elseif($this->r[$i]["types"]==3){
					$l.=sprintf($this->t[1][3],$this->r[$i]["pos"],mod_HTML($this->r[$i]["title"]));
			}elseif($this->r[$i]["types"]==4){
					$l.=sprintf($this->t[1][4],$this->r[$i]["pos"],mod_HTML($this->r[$i]["body"],$this->r[$i]["bodytag"]));
			}elseif($this->r[$i]["types"]==5){
					$l.=sprintf($this->t[1][5],$this->i($i,0));
			}elseif($this->r[$i]["types"]==6){
					$l.=sprintf($this->t[1][6],$this->r[$i]["pos"],$this->i($i,0));
			}elseif($this->r[$i]["types"]==7){
					$l.=sprintf($this->t[1][7],$this->r[$i]["pos"],$this->i($i,0),$this->i($i,1));
			}elseif($this->r[$i]["types"]==8){
					$l.=sprintf($this->t[1][8],mod_HTML($this->r[$i]["title"]),mod_HTML($this->r[$i]["body"],$this->r[$i]["bodytag"]));
			}
		}
		if($l==""){
			$l=sprintf("<div class=\"contentsEditorText0\"><div class=\"description\"><p>%s</p></div></div>",$MSG[sprintf("underconstraction%s",$this->b)]);
		}
		$l=sprintf("<div class=\"contentsEditor\">%s<br class=\"cb\" ></div>",$l);
		if($this->yet==1){
			$l=sprintf("<div class=\"contentsEditorText0\"><div class=\"description\"><p>%s</p></div></div>",$MSG[sprintf("underconstraction%s",$this->b)]);
		}
		return $l;
	}
	function getThisDatas($n){
		return mod_HTML($this->td[strlen($this->b)>0?sprintf("%s_e",$n):$n]);
	}
	function getProperty($n){
		return $this->td[$n];
	}
}



?>
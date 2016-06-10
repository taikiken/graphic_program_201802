<?php
class m{

	var $id;
	var $name;
	var $o;
	var $size;

	function m($id,$size,$option="",$fieldname){
		global $o;
		$this->o=$o;
		$this->id=$id;
		$this->sql=$sql;
		$this->size=$size;
		$this->option=$option;
		$this->name=$fieldname;		
		//$this->field=$fieldname;
	}
	function mt(){
		$III=0;
		$sql="select id,name from pm_ where flag=1 and cid=".$this->id." order by n";
		$this->o->query($sql);
		while($f=$this->o->fetch_array($III)){
			$p[]=$f;
			$III++;
		}
		return $p;
	}
	function mn($e=""){
		if($e=="")$sql="select name from pm where id=".$this->id;
		else $sql="select name from pm_ where id=".$e;
		$this->o->query($sql);
		$f=$this->o->fetch_array();
		return (strlen($f["name"])>0)?$f["name"]:"入力なし";
	}
	function ms($e){
		if($e){
			$sql="select name from pm_ where id=".$e;
			$this->o->query($sql);
			$f=$this->o->fetch_array();
			return (strlen($f["name"])>0)?$f["name"]:"入力なし";
		}else{
			return "未選択";
		}
	}
	function mn_c($e){

		global $sv;

		if(!is_array($e))$e=@explode(",",$e);
		if(count($e)==1&&$e[0]==""){
			$sv["p_".$this->gv()]="";
			return "指定なし";
		}
		if(count($e)>0){
			$i_value=implode(",",$e);
			for($I=0;$I<count($e);$I++){
				$e[$I]="id=".$e[$I];
			}
			$e=implode(" or ",$e);
			$sql="select name from pm_ where ".$e." order by n";
			$this->o->query($sql);
			$IIII=0;
			while($f=$this->o->fetch_array($IIII)){
				$p[]=$f["name"];
				$IIII++;
			}
			$sv["p_".$this->gv()]=$i_value;
			return implode("<br >",$p);
		}else{
			$sv["p_".$this->gv()]="";
			return "指定なし";
		}
	}
	function gv(){
		/*
		$sql="select value from pm where id=".$this->id;
		$this->o->query($sql);
		$f=$this->o->fetch_array();
		return $f["value"];
		*/
		return $this->name;
	}
	function pd($e=""){
		$v=$this->mt();
		$pd="<select name=\"p_".$this->name."\"";
		$pd.=(strlen($this->option)>0)?$this->option:"";
		$pd.=">\n";
		$pd.="<option value=\"\">".$this->mn()."選択</option>\n";
		for($I=0;$I<count($v);$I++){
			$pd.="<option value=\"".$v[$I]["id"]."\"";
			$pd.=($e==$v[$I]["id"])?" selected":"";
			$pd.=">";
			$pd.=$v[$I]["name"]."</option>\n";
		}
		$pd.="</select>\n";
		if($this->size!=1){
			$pd.=" <span class=\"w\"><a href='../../pm_?cid=".$this->id."' target='_blank'>▼メニュー編集</a></span>";
		}
		return $pd;
	}
	function rb($e=""){
		$v=$this->mt();
		$nm=ceil(count($v)/$this->size);
		$K=0;
		$cb="<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">\n";
		for($I=0;$I<$nm;$I++){
			$cb.="<tr>\n";
			for($J=0;$J<$this->size;$J++){
				if(strlen($v[$K]["name"])>0){
					$cb.="<td><input type=\"radio\" class=\"box\" name=\"p_".$this->name."\" value=\"".$v[$K]["id"]."\" id=\"".$this->name.$K."\"";
					$cb.=(strlen($this->option)>0)?sprintf(" onclick=\"%s\"",$this->option):"";
					$cb.=($e==$v[$K]["id"])?" checked":"";
					//$cb.=($e==""&&$K==0)?" checked":"";
					//$cb.=($K==0)?" checked":"";
					$cb.="><label for=\"".$this->name.$K."\">";		
					$cb.=$v[$K]["name"];
					$cb.="</label></td>\n";
					$K++;
				}else{
					$cb.="<td>&nbsp;</td>\n";
				}
			}
			$cb.="</tr>\n";
		}
		$cb.="</table>\n";
		return $cb;
	}
	function cb($e=""){
		$e=@explode(",",$e);
		$v=$this->mt();
		$nm=ceil(count($v)/$this->size);
		$K=0;
		$cb="<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">\n";
		for($I=0;$I<$nm;$I++){
			$cb.="<tr>\n";
			for($J=0;$J<$this->size;$J++){
				if(strlen($v[$K]["name"])>0){
					$cb.="<td>";
					$cb.="<input type=\"checkbox\" class=\"box\" name=\"p_".$this->name."[]\" value=\"".$v[$K]["id"]."\" id=\"".$this->name.$K."\"";
					for($L=0;$L<count($e);$L++){
						if($e[$L]==$v[$K]["id"]){
							$cb.=" checked";
							break;
						}
					}
					$cb.="><label for=\"".$this->name.$K."\">";
					$cb.=$v[$K]["name"];
					$cb.="</label></td>\n";
					$K++;
				}else{
					$cb.="<td>&nbsp;</td>\n";
				}
			}
			$cb.="</tr>\n";
		}
		$cb.="</table>\n";
		return $cb;
	}
}
?>
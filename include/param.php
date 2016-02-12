<?php
class gm{

	var $k;
	var $v;
	var $f;
	
	function gm($a){
		$this->m($a);
	}

	function m($a){
		while(list($k,$v)=each($a)){
			$this->k[]=$k;
			$this->v[]=$v;
			$this->f[$k]=$v;
		}
	}

	function g_url($j=""){
		if($j!=""){
			$jj=explode(",",$j);
			for($i=0;$i<count($this->k);$i++){
				$fe=0;
				for($r=0;$r<count($jj);$r++){
					if($this->k[$i]==$jj[$r]){
						$fe=1;
						break;
					}
				}
				if($fe==0)$s[]=$this->k[$i]."=".urlencode($this->v[$i]);
			}
		}else{
			for($i=0;$i<count($this->k);$i++){		
				$s[]=$this->k[$i]."=".urlencode($this->v[$i]);
			}		
		}

		$s=@implode("&",$s);
		return $s;
	}

	function g_ipt(){
		for($i=0;$i<count($this->k);$i++){
			$s.="<input type=\"hidden\" name=\"g_".$this->k[$i]."\" value=\"".htmlspecialchars($this->v[$i])."\">\n";
		}
		return $s;
	}
	
	function f($ky){
		return $this->f[$ky];
	}
	function c($c=0){
		return count($this->f)-$c;
	}
}
?>
<?php
class dbutl extends db{

	var $table;
	var $target;
	var $columns;
	var $sql;
	var $value;
	var $db;
	
	function outputSQL(){
		return $this->sql;
	}

	function empty2null($v){
		return preg_replace("/^''$/","null",$v);
	}
	
	function setval(){
		$sql="select setval('".$this->table."_id_seq',max(id)) from ".$this->table;
		$this->db->query($sql);
	}
	
	function setid(){
		$sql="select max(id) as m from ".$this->table;
		$this->db->query($sql);
		$f=$this->db->fetch_array();
		return (strlen($f["m"])>0)?$f["m"]+1:1;
	}

	function dbutl($table,$columns="",$value=""){
		global $o;
		$this->table=$table;
		$this->columns=$columns;
		$this->value=$value;
		$this->db=$o;
	}
		
	function bodysplit($k,$v){
		$tk=array();
		$tv=array();
		for($i=0;$i<count($k);$i++){
			if($k[$i]!="body"){
				$tk[]=$k[$i];
				$tv[]=$v[$k[$i]];
			}else{
				$body=$v[$k[$i]];
			}
		}
		return array($tk,$tv,$body);
	}
	
	function makelink($s,$f){
		if($f!=0)$sql[]=sprintf("delete from u_link where pid=%s;\n",$f);
		for($i=2;$i<=6;$i++){
			if($s["t".$i]!="null"){
				$sql[]=sprintf("insert into u_link(pid,title,link,n) values(%s,%s,%s,%s);\n",$f==0?"currval('repo_n_id_seq')":$f,$s["b".$i],$s["t".$i],$i);
			}
		}
		return implode("",$sql);
	}
	
	function insert(){
		
		global $_GET;
		
		//$id=$this->setid();
		//$this->value[$this->columns[]="id"]=$id;
		if($this->table=="repo_n"&&in_array("body",$this->columns)){

			$a=$b=$c=$d=array();
			for($i=0;$i<count($this->columns);++$i){
				if(preg_match("/^(b|t)[2-6]{1}$/",$this->columns[$i])){
					$a[$this->columns[$i]]=$this->value[$this->columns[$i]];
				}elseif($this->columns[$i]=="body"){
					$body=$this->value[$this->columns[$i]];
					$body=preg_replace("/(\r\n|\r|\n|\t)/","",$body);
					$body=str_replace("<br />","<br>",$body);
					$body=preg_replace("/style=\".*?\"|style='.*?'/i","",$body);
				}else{
					$c[]=$this->columns[$i];
					$d[]=$this->value[$this->columns[$i]];
				}
			}
			
			$this->value["m_time"]=sprintf("'%s'",str_replace("'","",sprintf("%s-%s-%s %s:%s:%s",$this->value["a1"],$this->value["a2"],$this->value["a3"],$this->value["a4"],$this->value["a5"],$this->value["a6"])));
			
			$this->sql="insert into ".$this->table."(".implode(",",$c).") values(".implode(",",$d).");\n";
			$this->sql.=sprintf("insert into repo_body(pid,body) values((select currval('repo_n_id_seq')),%s);\n",$body);
			$this->sql.=$this->makelink($a,0);
			//var_dump($this->sql);
		}else{
			
			$this->columns=implode(",",$this->columns);
			$this->value=implode(",",$this->value);
			$this->value=$this->empty2null($this->value);
			$this->sql="insert into ".$this->table."(".$this->columns.") values(".$this->value.")";				
		}

		@$this->db->query($this->sql);
		$e=$this->db->affected_rows2();
		return $e;
	}

	function update($t){
		$a=array();
		if(in_array("body",$this->columns)){
			for($i=0;$i<count($this->columns);++$i){

				if(preg_match("/^(b|t)[2-6]{1}$/",$this->columns[$i])){
					$a[$this->columns[$i]]=$this->value[$this->columns[$i]];
				}elseif($this->columns[$i]=="body"){
					$body=preg_replace("/(\r\n|\r|\n|\t)/","",$this->value[$this->columns[$i]]);
					$body=str_replace("<br />","<br>",$body);
					$body=preg_replace("/style=\".*?\"|style='.*?'/i","",$body);
					$this->sql=sprintf("update repo_body set body=%s where pid=%s;\n",$body,$t);
				}else{
					$pp[]=$this->columns[$i]."=".$this->value[$this->columns[$i]];
				}
			}
			$this->sql.=$this->makelink($a,$t);
		}else{
			$this->sql="";
			for($i=0;$i<count($this->columns);++$i){
				$pp[]=$this->columns[$i]."=".$this->value[$this->columns[$i]];
			}
		}
		$pp=implode(",",$pp);
		$pp=$this->empty2null($pp);
		$this->sql.=sprintf("update %s set %s where id=%s;",$this->table,$pp,$t);
		//var_dump($this->sql);
		//echo $this->sql;
		@$this->db->query($this->sql);
		$e=$this->db->affected_rows2();
		return $e;
	}

	function remove($t){
		$this->sql="delete from ".$this->table." where id=".$t;
		@$this->db->query($this->sql);
		$e=$this->db->affected_rows2();
		return $e; 
	}

}
?>
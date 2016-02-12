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
	
	function setExpire($id){
		global $_GET;
		if($this->table=="repo"||$this->table=="repo_n"){
			$sql=sprintf("update %s set expire=case when (select case when oc=54 then true else case when (case when case when (sy is null or sm is null or sd is null) then now() else date(sy||'-'||sm||'-'||sd) end<=now()=false or case when (ey is null or em is null or ed is null) then now() else date(ey||'-'||em||'-'||ed) end>=now()=false then false else true end)=true then true else false end end from %s where id=%s)=true then 1 else 2 end where id=%s;",$this->table,$this->table,$id,$id);
			if($this->table=="repo")$sql.=sprintf("update repo set tf=(case when name is null then 2 else 1 end),tf_e=(case when name_e is null then 2 else 1 end) where rid!=0 and id=%s;",$id);
			if($this->table=="repo_n"){
				$sql.=sprintf("update repo_n set tf=(case when title is null then 2 else 1 end),tf_e=(case when title_e is null then 2 else 1 end) where id=%s;",$id);
				if($_GET["cid"]==7)$sql.=sprintf("update repo_n set pd=t.pm,st=t.s,en=t.e,exd=t.f from (select id,date(t5||'-'||t6||'-'||t7)-date(now()) as pm,date(t2||'-'||t3||'-'||t4) as s,date(t5||'-'||t6||'-'||t7) as e,case when (date(now())<=date(t5||'-'||t6||'-'||t7) and date(now())>=date(t2||'-'||t3||'-'||t4)) then 1 when (date(now())<date(t2||'-'||t3||'-'||t4)) then 2 when (date(now())>date(t5||'-'||t6||'-'||t7)) then 3 else 0 end as f from repo_n where id=%s) as t where repo_n.id=%s;",$id,$id);
			}
			@$this->db->query($sql);
		}
	}
	function setCount(){

		global $_GET;
		global $CNTPTN;
		global $BILLINGUAL;

		$pj[0]="update repo set cnt=(select count(*) as cnt from repo_n where cid=%s and flag=1 and expire=1 and title!='') where id=%s;";
		$pe[0]="update repo set cnt_e=(select count(*) as cnt from repo_n where cid=%s and flag=1 and expire=1 and title_e!='') where id=%s;";
		$is[0]="cid";
		$pj[1]="update repo set cnt=(select count(*) as cnt from repo where rid=%s and flag=1 and expire=1 and name!='') where id=%s;";
		$pe[1]="update repo set cnt_e=(select count(*) as cnt from repo where rid=%s and flag=1 and expire=1 and name_e!='') where id=%s;";
		$is[1]="rid";
		$pj[2]="update repo set cnt=(select count(*) as cnt from repo where pid=%s and flag=1 and expire=1 and name!='') where id=%s;";
		$pe[2]="update repo set cnt_e=(select count(*) as cnt from repo where pid=%s and flag=1 and expire=1 and name_e!='') where id=%s;";
		$is[2]="cid";
		$pj[3]="update repo_n set cnt=t1.cnt from (select n1,count(n1) as cnt from repo where rid=2 and name!='' and expire=1 and flag=1 group by n1) as t1 where id=t1.n1;";
		$pe[3]="update repo_n set cnt_e=t1.cnt from (select n1,count(n1) as cnt from repo where rid=2 and name_e!='' and expire=1 and flag=1 group by n1) as t1 where id=t1.n1;";
		
		if(strlen($CNTPTN)>0){
			if($CNTPTN!=3){
				if($BILLINGUAL==1){
					$sql[]=sprintf($pj[$CNTPTN],$_GET[$is[$CNTPTN]],$_GET[$is[$CNTPTN]]);
					$sql[]=sprintf($pe[$CNTPTN],$_GET[$is[$CNTPTN]],$_GET[$is[$CNTPTN]]);
					$sql=implode("\n",$sql);
				}else{
					$sql=sprintf($pj[$CNTPTN],$_GET[$is[$CNTPTN]],$_GET[$is[$CNTPTN]]);
				}
			}else{
				if($BILLINGUAL==1){
					$sql[]=$pj[$CNTPTN];
					$sql[]=$pe[$CNTPTN];
					$sql=implode("\n",$sql);
				}else{
					$sql=$pj[$CNTPTN];
				}
			}
			@$this->db->query($sql);
		}
	}

	function insert(){
		$id=$this->setid();
		$this->value[$this->columns[]="id"]=$id;
		$this->columns=implode(",",$this->columns);
		$this->value=implode(",",$this->value);
		$this->value=$this->empty2null($this->value);
		$this->sql="insert into ".$this->table."(".$this->columns.") values(".$this->value.")";
		
/*
		$fp=fopen("d:/log/sql.txt","a");
		fputs($fp,$_SERVER['SCRIPT_FILENAME']."\t".$this->sql."\n");
		fclose($fp);
		var_dump($this->sql);
*/
				
		@$this->db->query($this->sql);
		$e=$this->db->affected_rows();
		//$this->setExpire($id);
		//$this->setCount();
		return $e==0?$id:0;
	}

	function update($t){
		for($i=0;$i<count($this->columns);++$i){
			$pp[]=$this->columns[$i]."=".$this->value[$this->columns[$i]];
		}
		$pp=implode(",",$pp);
		$pp=$this->empty2null($pp);
		$this->sql=sprintf("update %s set %s where id=%s",$this->table,$pp,$t);
		@$this->db->query($this->sql);
		$e=$this->db->affected_rows();
		//$this->setExpire($t);
		//$this->setCount();
		return $e; 
	}

	function remove($t){
		$this->sql="delete from ".$this->table." where id=".$t;
		@$this->db->query($this->sql);
		$e=$this->db->affected_rows();
		//$this->setCount();
		return $e; 
	}

}
?>
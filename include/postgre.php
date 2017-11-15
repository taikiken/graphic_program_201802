<?php

class db{

	var $db;
	var $rsc;
	var $r;

	function __construct(){
		global $DBNAME,$DBUSR,$DBPWD,$DBHOST,$DBPORT;

		$this->db_name=$DBNAME;
		$this->password=$DBPWD;
		$this->user=$DBUSR;
		$this->host=$DBHOST;
		$this->port=$DBPORT;
		$this->rsc="";
	}

	function connect(){
		if(!$this->db){
			$this->db=pg_connect("host=".$this->host." port=".$this->port." dbname=".$this->db_name." user=".$this->user." password=".$this->password);
			//pg_set_client_encoding($this->db,UNICODE);
		}
	}

	function disconnect(){
		pg_close($this->db);
	}

	function query($s){

		global $SQLLOG;

		return $this->rsc=pg_exec($s);

		$er=pg_last_error($this->db);

		if(!$er){
			return $this->rsc;
		}else{
			$erm=implode("\n",array(date("Y-m-d H:i:s"),$er,$s));
			file_put_contents($ERRORLOG,$erm."\n",FILE_APPEND);
		}

	}

	function fetch_array(){
		return $this->r=@pg_fetch_array($this->rsc);
	}
	function fetch_object(){
		return $this->r=@pg_fetch_object ($this->rsc);
	}

	function free_result(){
		pg_freeresult($this->rsc);
	}

	function get_error(){
		pg_last_error($this->rsc);
	}

	function num_rows(){
		return $this->r=pg_num_rows($this->rsc);
	}
	function affected_rows2(){
		return pg_affected_rows($this->rsc);
	}
	function affected_rows(){
		return pg_last_error($this->db);
	}
	function _f(){
		return $this->r=$this->fetch_array();
	}
	function _q($s){
		return $this->r=$this->query($s);
	}
}
?>
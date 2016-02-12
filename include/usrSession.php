<?php

class usrSession{

	var $robot=array(
		"slurp",
		"bot",
		"spider",
		"crawler",
		"nagios",
		"archiver",
		"blogsearch",
		"tracker",
		"askjeeves",
		"website explorer",
		"hatena-mobile-gateway",
		"teoma",
		"walker",
		"copyright",
		"fly",
		"(ax)",
		"Java/1.6.0_03",
		"iceweasel",
		"estraier"
	);

	var $forbidden=array(
		"84.222.13.242",
		"122.152.128.47",
		"221.189.180.200",
		"150.100.1.66",
		"195.210.57.124"
	);
	
	var $se=array(
		"yahoo"=>"yahoo",
		"google"=>"google",
		"msn"=>"msn",
		"live.com"=>"live search",
		"livedoor"=>"livedoor",
		"infoseek"=>"infoseek",
		"goo"=>"goo",
		"ask"=>"ask",
		"excite"=>"excite",
		"baidu"=>"baidu",
		"nifty"=>"@nifty"
	);
	
	var $paramName=array("q","p","qt","MT","search","wd","Text","query","qry","key","term","keyword");
	
	var $SERVER;
	var $FULLURL;
	var $SESSIONFILEDIR;
	
	var $RF;
	var $UA;
	var $RA;

	var $RF_DOM;
	var $RF_QRY;

	var $CHARACODE;
	var $SEARCHENGIN;
	
	var $title;
	var $sessid;
	var $condition;
	
	function usrSession($title,$sessid,$condition=""){

		global $_SERVER;
		global $SITE_URL;
		global $SESSIONFILEDIR;
		
		$this->SERVER=$_SERVER;
		$this->FULLURL=$SITE_URL;
		$this->SESSIONFILEDIR=$SESSIONFILEDIR;
		
		$this->RF=urldecode($_SERVER['HTTP_REFERER']);
		$this->UA=$_SERVER['HTTP_USER_AGENT'];
		$this->RA=$_SERVER['REMOTE_ADDR'];
		
		$this->modRef();
		
		$this->CHARACODE=detectCharacode();
		$this->SEARCHENGIN=detectSearchEngin();
		
	}

	function modRef(){
		$e=explode("?",$this->RF);
		$this->RF_DOM=str_replace(array("http://","https://",".www.",".www.",".search.",".com",".co.jp",".net",".jp"),"",$e[0]);
		$this->RF_QRY=explode("&",$e[1]);
	}
	
	function detectCharacode(){
		return mb_detect_encoding($this->RF);
	}
	
	function detectSearchEngin(){
		$r=false;
		while(list($k,$v)=each($this->se)){
			if(strpos($this->se[$k],$this->RF)>0){
				return $this->se[$v];
			}
		}
		if($r){
			return $this->RF_DOM;
		}
	}
	
	function searchKeyword(){
		for($i=0;$i<count($this->RF_QRY);$i++){
			if(ereg(sprintf("^%s="),$this->paramName),$this->RF_QRY){
				
			}
		}
	}
	
}

?>
<?php

class form{

	var $v;
	var $m;
	var $e;
	var $a;
	var $ER;
	var $ERMESSAGE;
	var $mode;
	var $o;
	var $info;
	var $POST;
	var $SERVER;
	var $domain;
	var $fid;
	var $sitename;
	var $tmpfile;
	var $deletefile;
    var $datasec=array();
    var $ctrl_dir=array();
    var $eof_ctrl_dir="\x50\x4b\x05\x06\x00\x00\x00\x00";
    var $old_offset=0;
	var $pagetitle=array("input","confirme","complete");

	function form($n,$draft=0){

		global $sv;
		global $sn;
		global $_POST;
		global $_GET;
		global $_SERVER;
		global $gp_session;
		global $SITE;
		global $DOMAIN;
		global $o;
		global $SESSIONFILEDIR;
		
		$this->fid=$n;
		$this->domain=$DOMAIN;
		$this->POST=$_POST;
		$this->SERVER=$_SERVER;
		$this->SESSIONFILEDIR=$SESSIONFILEDIR;
		$this->SESSIONID=$gp_session;
		$this->sitename=$SITE;
		$this->mode=($_GET["m"]=="exec")?"exe":"input";
		if(gettype($o)!="object"){
			$this->o=new db;
			$this->o->connect();
		}else{
			$this->o=$o;
		}
		@data_conf();
		
		$sql=sprintf("select * from mail where id=%s",$n);
		$this->o->query($sql);
		$f=$this->o->fetch_array();
		$this->info=$f;
		$this->pubE;
		
		$this->v=$sv;
		$this->y=$sn;
		$this->formelement($n);
		
		if($draft){
			$this->pub=1;
		}else{
			$this->status();
		}

		if($this->mode=="input"&&!$this->POST["back"]&&count($this->v)>0)$this->chkErrorInitialize();
		if($this->mode=="exe")$this->formExec();
	}
	
	function p($k){
		return $this->info[$k];
	}
	
	function formBodyPrint(){
		if($this->mode=="input"){
			$this->makeTables();
			//setTransaction(sprintf("%s%s",$this->info["subject"],$pagetitle[0]),$this->SESSIONID);
		}elseif($this->mode=="conf"){
			$this->makeConf();
			//setTransaction(sprintf("%s%s",$this->info["subject"],$pagetitle[1]),$this->SESSIONID);
		}elseif($this->mode=="exe"){
			$this->makeExec();
			//setTransaction(sprintf("%s%s",$this->info["subject"],$pagetitle[2]),$this->SESSIONID);
		}
	}

	function status(){
		if($this->info["flag"]==1){
			if($this->info["oc"]==55){
				$s=(int)sprintf("%s%s%s",$this->info["sy"],(strlen($this->info["sm"])==1)?sprintf("0%s",$this->info["sm"]):$this->info["sm"],(strlen($this->info["sd"])==1)?sprintf("0%s",$this->info["sd"]):$this->info["sd"]);
				$e=(int)sprintf("%s%s%s",$this->info["ey"],(strlen($this->info["em"])==1)?sprintf("0%s",$this->info["em"]):$this->info["em"],(strlen($this->info["ed"])==1)?sprintf("0%s",$this->info["ed"]):$this->info["ed"]);
				$c=(int)date("Ymd");
				if($s<=$c&&$e>=$c){
					$this->pub=1;
				}else{
					$this->pub=0;
					if($e<$c){
						$this->pubE=sprintf("Sorry, we closed the acceptance of %s form on %s.Thank you many applications.",
						$this->info["subject"],date("F m,Y",strtotime(sprintf("%s-%s-%s",$this->info["ey"],$this->info["em"],$this->info["ed"]))));	
					}elseif($s>$c){
						$this->pubE=sprintf("We start the acceptance of %s form from %s. We welcome your application.",
						$this->info["subject"],date("F m,Y",strtotime(sprintf("%s-%s-%s",$this->info["sy"],$this->info["sm"],$this->info["sd"]))));				
					}
				}
			}else{
				$this->pub=1;
			}
		}else{
			$this->pub=0;
			$this->pubE=sprintf("<p style=\"padding:0 0 0 20px;\">Sorry, the %s form is currently on maintainance.  Please wait for a while.</p>",$this->info["subject"]);
		}
	}

	function formelement($n){
		$i=0;
		$sql=sprintf("select mail_.*,pm_.p1 as p1 from mail_,pm_ where mail_.cid=%s and mail_.flag=1 and mail_.lib=pm_.id order by n",$n);
		$this->o->query($sql);
		while($f=$this->o->fetch_array($i)){
			$this->m[$i][0]=$f["p1"];
			$this->m[$i][1]=mod_HTML($f["fname"]);
			$this->m[$i][2]=($f["at"]==66)?1:0;
			if($this->m[$i][2]==1)$this->ER[]=1;
			$this->m[$i][3]="";
			$this->m[$i][4]=(gettype(strpos($f["fvalue"],","))!="boolean")?explode(",",$f["fvalue"]):$f["fvalue"];
			$f["fsize"]=ereg_replace("\n",",",$f["fsize"]);
			$this->m[$i][5]=(gettype(strpos($f["fsize"],","))!="boolean")?explode(",",$f["fsize"]):$f["fsize"];
			$this->m[$i][6]=(gettype(strpos($f["pre"],","))!="boolean")?explode(",",$f["pre"]):$f["pre"];
			$this->m[$i][7]=(gettype(strpos($f["sep"],","))!="boolean")?explode(",",$f["sep"]):$f["sep"];
			$this->m[$i][8]=mod_HTML($f["cap"],1);
			$this->m[$i][9]=(gettype(strpos($f["msize"],","))!="boolean")?explode(",",$f["msize"]):$f["msize"];
			$i++;
		}
	}

	function makeTitle($name){
		return sprintf("<tr>\n<th colspan=\"2\">%s</th>\n</tr>",$name);
	}
	
	function makeTitle2($name){
		return sprintf("<tr>\n<th colspan=\"2\" class=\"formAt\">%s</th>\n</tr>",$name);
	}

	function makeTextfield($name,$size,$msize,$pre=""){

		if(count($name)>1){
			for($i=0;$i<count($name);$i++){
				$s[]=sprintf("<label for=\"p_%s\">%s <input name=\"p_%s\" type=\"text\" id=\"p_%s\" value=\"%s\" size=\"%s\"%s ></label>\n",$name[$i],$pre[$i],$name[$i],$name[$i],$this->v["p_".$name[$i]],$size[$i],(strlen($msize[$i])>0)?sprintf(" maxlength=\"%s\"",$msize[$i]):"");
			}

			if(count($pre)>$i)$s[]=$pre[$i];
			$s=implode(" ",$s);
			if($name[0]=="zip0"){
				$s.=" <div id=\"zipMess\"></div>";
			}
			return $s;
		}else{
			return sprintf("<label for=\"p_%s\">%s <input name=\"p_%s\" type=\"text\" id=\"p_%s\" value=\"%s\" size=\"%s\"%s ></label>\n",$name,$pre,$name,$name,$this->v["p_".$name],$size,(strlen($msize)>0)?sprintf(" maxlength=\"%s\"",$msize):"");
		}
	}

	function makeTextarea($name,$size){
		return sprintf("<textarea name=\"p_%s\" rows=\"%s\" id=\"p_%s\">%s</textarea>\n",$name,$size,$name,$this->v["p_".$name]);

	}

	function makeFilefield($name){
		$s=sprintf("<input name=\"%s\" type=\"file\" id=\"file\" size=\"30\" >\n",$name);
		if(strlen($this->v["p_".$name])>0){
			//if(strlen($this->tmpfile[$name])==0&&strlen($this->POST["TMPFILENAME".$name])>0)$this->tmpfile[$name]=$this->POST["TMPFILENAME".$name];
			if($this->POST["back"]){
				$this->v["p_".$name]=$this->POST["p_".$name];
				$this->tmpfile[$name]=$this->POST["TMPFILENAME".$name];
			}
			$s.=sprintf("<input type=\"hidden\" name=\"p_%s\" value=\"%s\" >",$name,$this->v["p_".$name]);
			$s.=sprintf("<p class=\"filename\">Uploaded File : %s</p>",$this->tmpfile[$name]);
			if(strlen($this->tmpfile[$name])>0){
				$s.=sprintf("<input type=\"hidden\" name=\"TMPFILENAME%s\" value=\"%s\" >",$name,$this->tmpfile[$name]);
			}
		}
		return $s;
	}

	function makeRadio($l,$n,$g){
		if($this->POST["back"]){
			if(ereg("^etc. : ",$this->v["p_".$l])){
				$this->v["p_".$l]="etc.";
			}
		}
		$ll="<table cellspacing=\"0\" class=\"subTable\">\n";
		for($i=0;$i<count($n);$i++){
			$q=0;
			if(strlen($this->v["p_".$l])>0){
				if($this->v["p_".$l]==$n[$i])$q=1;
			}
			if(($i%$g)==0)$ll.="<tr>\n";
			if($i==(count($n)-1)){
				$offset=($g-($i%$g));
			}
			$ll.=sprintf("<td%s><input type=\"radio\" name=\"p_%s\" value=\"%s\" id=\"%s%s\" %s ><label for=\"%s%s\">%s",($offset==1)?"":sprintf(" colspan=\"%s\"",$offset),$l,$n[$i],$l,$i,($q==1)?" checked":"",$l,$i,$n[$i]);
			if($n[$i]=="etc.")$ll.=sprintf(" <input type=\"text\" name=\"etc%s\" value=\"%s\">\n",$l,$this->POST["etc".$l]);
			$ll.="</label></td>\n";
			if(($i%$g)==($g-1))$ll.="</tr>\n";
		}
		if(((count($n))%$g)!=0)$ll.="</tr>\n";
		$ll.="</table>\n";
		return $ll;
	}

	function makeCheckbox($l,$n,$g){
		if($this->POST["back"]){
			for($i=0;$i<count($this->v["p_".$l]);$i++){
				if(ereg("^etc.",$this->v["p_".$l][$i]))$this->v["p_".$l][$i]="etc.";
			}
		}
		if(count($this->v["p_".$l])==0){
			$ll="<table cellspacing=\"0\" class=\"subTable\">\n";
			for($i=0;$i<count($n);$i++){
				if(($i%$g)==0)$ll.="<tr>\n";
				if($i==(count($n)-1)){
					$offset=($g-($i%$g));
				}
				$ll.=sprintf("<td%s><input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\"%s ><label for=\"%s%s\">%s",($offset==1)?"":sprintf(" colspan=\"%s\"",$offset),$l,$n[$i],$l,$i,"",$l,$i,$n[$i]);
				if($n[$i]=="etc.")$ll.=sprintf(" <input type=\"text\" name=\"etc%s\" value=\"%s\">\n",$l,$this->POST["etc".$l]);
				$ll.="</label></td>\n";
				if(($i%$g)==($g-1))$ll.="</tr>\n";
			}
			$ll.="</table>\n";
		}else{
			$ll="<table cellspacing=\"0\" class=\"subTable\">\n";
			for($i=0;$i<count($n);$i++){
				$u="";
				for($j=0;$j<count($this->v["p_".$l]);$j++){
					if($this->v["p_".$l][$j]==$n[$i]){
						$u=" checked";
						break;
					}
				}
				if(($i%$g)==0)$ll.="<tr>\n";
				if($i==(count($n)-1)){
					$offset=($g-($i%$g));
				}
				$ll.=sprintf("<td%s><input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\" %s ><label for=\"%s%s\">%s",($offset==1)?"":sprintf(" colspan=\"%s\"",$offset),$l,$n[$i],$l,$i,$u,$l,$i,$n[$i]);
				if($n[$i]=="etc.")$ll.=sprintf(" <input type=\"text\" name=\"etc%s\" value=\"%s\">\n",$l,$this->POST["etc".$l]);
				$ll.="</label></td>\n";
				if(($i%$g)==($g-1))$ll.="</tr>\n";
			}
			$ll.="</table>\n";
		}
		return $ll;
	}

	function makePulldown($l,$n){
		$ll=sprintf("<table cellspacing=\"0\" class=\"subTable\">\n<select name=\"p_%s\">\n",$l);
		$ll.=sprintf("<option%s></option>\n",(strlen($this->v["p_".$l][$i])==0)?" selected":"");
		for($i=0;$i<count($n);$i++){
			$ll.=sprintf("<option value=\"%s\"%s>%s</option>\n",$n[$i],($this->v["p_".$l]==$n[$i])?" selected":"",$n[$i]);
		}
		$ll.="</table>\n";
		return $ll;
	}
	
	function makeRef(){
		$s=(strlen($this->POST["p_refurl"])>0)?$this->POST['p_refurl']:$this->SERVER['HTTP_REFERER'];
		$l=sprintf("<input type=\"hidden\" name=\"p_refurl\" value=\"%s\" >\n",$s);
		return $l;
	}

	function makeLabel($l,$f,$e){
		if($f==1){
			return sprintf("<td rowspan=\"2\" class=\"%s\">%s<p>* Required</p></td>\n",($e==1)?"titleNormal":"titleErr",$l);
		}else{
			return sprintf("<td rowspan=\"2\" class=\"titleNoInput\">%s</td>\n",$l);
		}
	}

	function makeDate($l){
	
		$FIELD=$l;
		//global $INCLUDEPATH;

/*		
		$_YY=date("Y");
		$_MM=date("m");
		
		$Y_CONDITION=array($_YY,$_YY+1);
		$M_CONDITION=array(1,12);
	
		$_YY=(strlen($this->v["p_".$FIELD[0]])>0)?$this->v["p_".$FIELD[0]]:"";
		$_MM=(strlen($this->v["p_".$FIELD[1]])>0)?$this->v["p_".$FIELD[1]]:"";
*/
		
		$l="";
		$l.="\n<div id=\"dateMess\"></div>\n";
		$l.=sprintf("<input type=\"text\" name=\"p_%s\" style=\"vertical-align:middle;\" value=\"%s\" size=\"3\" onclick=\"displayErr('dateMess','Make a choice of your requesting date from calender above.')\" ><span class=\"q\">/</span>\n",$FIELD[1],strlen($this->v["p_".$FIELD[1]])>0?$this->v["p_".$FIELD[1]]:"");
		if(count($FIELD)>=3){
			$l.=sprintf("<input type=\"text\" name=\"p_%s\" style=\"vertical-align:middle;\" value=\"%s\" size=\"3\" onclick=\"displayErr('dateMess','Make a choice of your requesting date from calender above.')\" ><span class=\"q\">/</span>\n",$FIELD[2],strlen($this->v["p_".$FIELD[2]])>0?$this->v["p_".$FIELD[2]]:"");
		}
		$l.=sprintf("<input type=\"text\" style=\"vertical-align:middle;\" name=\"p_%s\" value=\"%s\" size=\"5\" onclick=\"displayErr('dateMess','Make a choice of your requesting date from calender above.')\" ><span class=\"q\">/</span>\n",$FIELD[0],strlen($this->v["p_".$FIELD[0]])>0?$this->v["p_".$FIELD[0]]:"");
		
/*
		$l.=sprintf("<select name=\"p_%s\">",$FIELD[0]);
		$l.="<option value=\"\"></option>";
		for($i=$Y_CONDITION[0];$i<=$Y_CONDITION[1];$i++){
			$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_YY)? " selected":"",$i);
		}
		$l.="</select><span class=\"q\">年</span>";
		$l.=sprintf("<select name=\"p_%s\">",$FIELD[1]);
		$l.="<option value=\"\"></option>";
		for($i=$M_CONDITION[0];$i<=$M_CONDITION[1];$i++){
			$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_MM)? " selected":"",$i);
		}
		$l.="</select><span class=\"q\">月</span>";
		if(count($FIELD)>=3){
			$_DD=date("d");
			$D_CONDITION=array(1,31);
			$_DD=(strlen($this->v["p_".$FIELD[2]])>0)?$this->v["p_".$FIELD[2]]:"";
			$l.=sprintf("<select name=\"p_%s\">",$FIELD[2]);
			$l.="<option value=\"\"></option>";
			for($i=$D_CONDITION[0];$i<=$D_CONDITION[1];$i++){
				$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_DD)? " selected":"",$i);
			}
			$l.="</select><span class=\"q\">日</span>";
		}
*/
		if(count($FIELD)>=4){
			$_HH=date("H");
			$H_CONDITION=array(10,18);
			$_HH=(strlen($this->v["p_".$FIELD[3]])>0)?$this->v["p_".$FIELD[3]]:"";
			$l.=sprintf("<select name=\"p_%s\" style=\"vertical-align:middle;\">",$FIELD[3]);
			$l.="<option value=\"\"></option>";
			for($i=$H_CONDITION[0];$i<=$H_CONDITION[1];$i++){
				$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_HH)? " selected":"",$i);
			}
			$l.="</select>";
		}

		return $l;
	}
	
	function getPageTitle($s){
		$fp=fopen($s,"r");
		while($l=fgets($fp,1024)){
			if(ereg("^<title>",$l)){
				$t=str_replace(array("<title>","</title>"," | ",$this->sitename),"",$l);
				return trim($t);
			}
		}
	}

	function makeCaption($s){
		return sprintf("<tr>\n<td class=\"caption\">%s</td>\n</tr>\n",$s);
	}

	function makeCell($n,$j){
		if($this->m[$n][0]!=6&&$this->m[$n][0]!=4){
			echo "<tr>\n";
			echo $this->makeLabel($this->m[$n][1],$this->m[$n][2],$this->ER[$j]);
			echo "<td class=\"input\">\n";
			if($this->m[$n][0]==0){
				echo $this->makeTextfield($this->m[$n][4],$this->m[$n][5],$this->m[$n][9],$this->m[$n][6]);
			}elseif($this->m[$n][0]==1){
				echo $this->makeTextarea($this->m[$n][4],$this->m[$n][5]);
			}elseif($this->m[$n][0]==2){
				echo $this->makeRadio($this->m[$n][4],$this->m[$n][5],$this->m[$n][6]);
			}elseif($this->m[$n][0]==3){
				echo $this->makePulldown($this->m[$n][4],$this->m[$n][5]);
			}elseif($this->m[$n][0]==4){
				include $this->m[$n][5];
			}elseif($this->m[$n][0]==5){
				echo $this->makeCheckbox($this->m[$n][4],$this->m[$n][5],$this->m[$n][6]);
			}elseif($this->m[$n][0]==7){
				echo $this->makeFilefield($this->m[$n][4]);
			}elseif($this->m[$n][0]==8){
				echo $this->makeFilefield($this->m[$n][4]);
			}elseif($this->m[$n][0]==9){
				include $INCLUDEPATH."public/calendar.php";
				echo $this->makeDate($this->m[$n][4]);
			}
			echo "</td>\n";
			echo "</tr>\n";
			echo $this->makeCaption((strlen($this->m[$n][8])>0)?$this->m[$n][8]:"Please enter ".$this->m[$n][1]);
		}else{
			if($this->m[$n][0]==6){
				echo $this->makeTitle($this->m[$n][1]);
			}else{
				echo $this->makeTitle2($this->m[$n][1]);
			}
		}
	}

	function makeTables(){
		
		echo "<div id=\"formArea\">\n";
		if($this->pub==1){
			echo sprintf("<div id=\"caption\">%s</div>\n",mod_HTML($this->info["exp"],$this->info["exptag"]));
			
			echo sprintf("<form name=\"fg\" action=\"./conf_%s.html#errTitle\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
			$this->makeError();
			echo "<div id=\"formFlow\"><img src=\"/shared/form/img/flow01_e.gif\" width=\"660\" height=\"37\" ></div>\n<div id=\"attention\">\n<ul>\n<li>Required information</li>\n<li class=\"spont\">Arbitrary information</li>\n</ul>\n</div>\n";
			echo "<div id=\"formBlock\">\n<table cellspacing=\"2\" cellpadding=\"0\" class=\"mainTable\">";
			$j=0;
			for($i=0;$i<count($this->m);$i++){
				$this->makeCell($i,($this->m[$i][2]==1)?$j++:"");
			}
			echo "</table>\n";
			echo $this->makeRef();
			echo "</div>\n<div id=\"formButton\">\n<ul>\n<li><input name=\"submit\" type=\"submit\" value=\"To confirm this data\" class=\"next\" ></li>\n</ul>\n</div>\n</form>\n";
		}else{
			echo sprintf("<div id=\"caption\">%s</div>\n",$this->pubE);
		}
		echo "</div>\n";
	}

	function chkErrorInitialize(){
		$j=0;
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][2]==1){
				if(is_array($this->m[$i][4])){
					for($k=0;$k<count($this->m[$i][4]);$k++){
						if(strlen($this->v["p_".$this->m[$i][4][$k]])==0){
							$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],($this->m[$i][0][$k]<=1)?" is not entered.":" is not chosen.");
							$this->ER[$j]=0;
						}else{

							$TMPVALUE=str_replace(array(" ","　"),"",$this->v["p_".$this->m[$i][4][$k]]);
							
							if(strlen($TMPVALUE)==0){
								$this->ERMESSAGE[]=($this->m[$i][0][$k]<=1)?sprintf("Only space is involved in %s%s field.",$this->m[$i][1],$this->m[$i][7][$k]):sprintf("%s%s is not chosen.",$this->m[$i][1],$this->m[$i][7][$k]);
								$this->ER[$j]=0;
							}else{

								if(gettype(strpos($this->m[$i][4][$k],"tel0"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"tel1"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"tel2"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"fax0"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"fax1"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"fax2"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"mtel0"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"mtel1"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"mtel2"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3||strlen($this->v["p_".$this->m[$i][4][$k]])>6){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"zip0"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])!=3){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"zip1"))!="boolean"){
									if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])!=4){
										$this->ERMESSAGE[]=sprintf("%s%s is invalid. Please enter it in alphanumeric character.",$this->m[$i][1],$this->m[$i][7][$k]);
										$this->ER[$j]=0;
									}
								/*
								}elseif(gettype(strpos($this->m[$i][4][$k],"kana0"))!="boolean"){
									if(!mb_ereg("^[あ-ん]+$",$this->v["p_".$this->m[$i][4][$k]])){
										$this->ERMESSAGE[]="氏名（し）はひらがなで入力してください。";
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"kana1"))!="boolean"){
									if(!mb_ereg("^[あ-ん]+$",$this->v["p_".$this->m[$i][4][$k]])){
										$this->ERMESSAGE[]="氏名（めい）はひらがなで入力してください。";
										$this->ER[$j]=0;
									}
								
								}elseif(gettype(strpos($this->m[$i][4][$k],"name0"))!="boolean"){
									if(!mb_ereg("^[^!-~あ-ん]",$this->v["p_".$this->m[$i][4][$k]])){
										$this->ERMESSAGE[]="氏名（氏）は漢字で入力してください。";
										$this->ER[$j]=0;
									}
								}elseif(gettype(strpos($this->m[$i][4][$k],"name1"))!="boolean"){
									if(!mb_ereg("^[^!-~あ-ん]",$this->v["p_".$this->m[$i][4][$k]])){
										$this->ERMESSAGE[]="氏名（名）は漢字で入力してください。";
										$this->ER[$j]=0;
									}
								*/
								}
							}
						}
					}
					//任意項目のチェック
					if($this->m[$i][0]==9&&$this->ER[$j]==1){
						if($this->dateSearch($this->v["p_".$this->m[$i][4][0]],$this->v["p_".$this->m[$i][4][1]],$this->v["p_".$this->m[$i][4][2]])){
							$this->ER[$j]=0;
							$this->ERMESSAGE[]="Sorry, your requesting day is closed-day.";
						}
					}
				}else{
					if($this->m[$i][0]==7||$this->m[$i][0]==8){

						global $_FILES;
						global $MAXFILESIZE;
						global $RAWDATA;

						if($_FILES[$this->m[$i][4]]["error"]!=0){
							if(strlen($this->v["p_".$this->m[$i][4]])==0){
								$this->ERMESSAGE[]=sprintf("%s is not attached.",$this->m[$i][1]);
								$this->ER[$j]=0;
							}else{
								$this->tmpfile[$this->m[$i][4]]=$this->POST["TMPFILENAME".$this->m[$i][4]];
							}
						}else{
							if($_FILES[$this->m[$i][4]]["size"]>($MAXFILESIZE*1000000)){
								$this->ERMESSAGE[]=sprintf("The %s exceed the limitation of up-loading size.   The limit-size is up to 2MB.",$this->m[$i][1]);
								$this->ER[$j]=0;
							}else{
								for($PmFl=0;$PmFl<count($this->m[$i][5]);$PmFl++){
									if(gettype(strpos($_FILES[$this->m[$i][4]]["type"],$this->m[$i][5][$PmFl]))=="integer"){
										$UFOK=1;
										$FILETYPE=$this->m[$i][5][$PmFl];
									}
								}
								if($UFOK!=1){
									$this->ERMESSAGE[]=sprintf("The %s file is only allowed for uploading.",implode(",",$this->m[$i][5]));
									$this->ER[$j]=0;
								}else{
									if($this->m[$i][0]==8){
										if($FILETYPE=="excel")$ext=".xls";
										elseif($FILETYPE=="word")$ext=".doc";
										elseif($FILETYPE=="powerpoint")$ext=".ppt";
										elseif($FILETYPE=="pdf")$ext=".pdf";
										elseif($FILETYPE=="zip")$ext=".zip";
									}elseif($this->m[$i][0]==7){
										if($FILETYPE=="jpg")$ext=".jpg";
										elseif($FILETYPE=="gif")$ext=".gif";
										elseif($FILETYPE=="png")$ext=".png";
										elseif($FILETYPE=="flash")$ext=".swf";
										elseif($FILETYPE=="octet")$ext=".flv";
									}

									$newfile=sprintf("%s%s%s",$FILETYPE,date("YmdHis"),$ext);
									if(move_uploaded_file($_FILES[$this->m[$i][4]]["tmp_name"],sprintf("%stmp/%s",$RAWDATA,$newfile))){
										$this->v["p_".$this->m[$i][4]]=$newfile;
										$this->tmpfile[$this->m[$i][4]]=$_FILES[$this->m[$i][4]]["name"];
									}else{
										$this->ERMESSAGE[]="The application form was not successfully uploaded.";
										$this->ER[$j]=0;
									}
								}
							}
						}
					}else{
						if(strlen($this->v["p_".$this->m[$i][4]])==0){
							$this->ERMESSAGE[]=sprintf("%s%s",$this->m[$i][1],($this->m[$i][0]<=1)?" is not entered.":" is not chosen.");
							$this->ER[$j]=0;
						}else{

							$TMPVALUE=str_replace(array(" "," "),"",$this->v["p_".$this->m[$i][4]]);
							
							if(strlen($TMPVALUE)==0){
								$this->ERMESSAGE[]=($this->m[$i][0]<=1)?sprintf("Only space is involved in %s%s field.",$this->m[$i][1],$this->m[$i][7]):sprintf("%s%s is not chosen.",$this->m[$i][1],$this->m[$i][7]);
								$this->ER[$j]=0;
							}else{
								if(ereg("^etc",$this->m[$i][4])&&$this->v["p_".$this->m[$i][4]]=="etc."){
									if(strlen($this->POST["etc".$this->m[$i][4]])==0){
										$this->ER[$j]=0;
										$this->ERMESSAGE[]=sprintf("%s : Please input etc. field.",$this->m[$i][1]);
									}
								}
								if(gettype(strpos($this->m[$i][4],"email"))=="integer"){
									if(!checkEmailAddress($this->v["p_".$this->m[$i][4]])){
										$this->ER[$j]=0;
										$this->ERMESSAGE[]=sprintf("%s is invalid.  Please enter it in alphanumeric character.",$this->m[$i][1]);
									}else{
									/*
									//メールマガジンここから
										if($this->fid==6){
											$sql=sprintf("select id from form where email='%s' and fid=5",$this->v["p_".$this->m[$i][4]]);
											$this->o->query($sql);
											$f=$this->o->fetch_array();
											if(strlen($f["id"])==0){
												$this->ER[$j]=0;
												$this->ERMESSAGE[]=sprintf("入力いただいたメールアドレスでのご登録はございません。",$this->m[$i][1]);
											}
										}
										if($this->fid==5){
											$sql=sprintf("select id from form where email='%s' and fid=5",$this->v["p_".$this->m[$i][4]]);
											$this->o->query($sql);
											$f=$this->o->fetch_array();
											if(strlen($f["id"])>0){
												$this->ER[$j]=0;
												$this->ERMESSAGE[]=sprintf("入力いただいたメールアドレスはすでに登録がございます。",$this->m[$i][1]);
											}
										}
									//メールマガジンここまで
									*/
									}
								}
							}
						}
					}
				}
				$j++;
			}else{
				//任意項目のチェック
				if($this->m[$i][0]==9){
					if($this->dateSearch($this->v["p_".$this->m[$i][4][0]],$this->v["p_".$this->m[$i][4][1]],$this->v["p_".$this->m[$i][4][2]])){
						//$this->ER[$j]=0;
						$this->ERMESSAGE[]="Sorry, your requesting day is closed-day.";
					}
				}
			}
		}
		if(count($this->ERMESSAGE)==0){
			//include "./conf.php";
			//exit;
			$this->mode="conf";
		}
	}
	
	function checkFieldName($name,$needle){
		return gettype(strpos($name,$needle));
	}
	
	function dateSearch($y,$m,$d){

		global $HOLIDAYTEXT;

		$fp=fopen($HOLIDAYTEXT,"r");
		while($f=fgets($fp,1024)){
			if(trim($f)==sprintf("%s.%s.%s",$y,$m,$d)){
				return true;
			}
		}
		fclose($fp);
		return false;
	}
	
	function makeError(){
		if(count($this->ERMESSAGE)>0){
			echo "<div id=\"errArea\">\n";
			echo "<div id=\"errTitle\">You data is not complete.  Please check and enter the following item again.</div>\n";
			echo "<ul>\n";
			for($i=0;$i<count($this->ERMESSAGE);$i++){
				echo sprintf("<li>%s</li>\n",$this->ERMESSAGE[$i]);
			}
			echo "</ul>\n";
			echo "</div>\n";
		}
	}
	
	function makeConf(){
		echo "<div id=\"formArea\">\n";
		//echo sprintf("<div id=\"formTitles\">%s</div>\n",$this->info["subject"]);
		echo "<div id=\"caption\">\n";
		echo "<div id=\"content1\">\n";
		echo "<p class=\"pd180\">This form is transmitted by the following content.</p>\n";
		echo "<p class=\"pd180\">Please push &quot;to correct this data&quot; when you like to correct, or &quot;to send this data&quot; if you confirm.</p>\n";
		echo "</div>\n";
		echo "</div>\n";
		echo sprintf("<form name=\"fg\" action=\"./exec_%s.html\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		echo "<div id=\"formFlow\"><img src=\"/shared/form/img/flow02_e.gif\" width=\"660\" height=\"37\" ></div>";
		echo "<div id=\"attention\">\n";
		echo "<ul>\n";
		echo "<li>Required information</li>\n";
		echo "<li class=\"spont\">Arbitrary information</li>\n";
		echo "</ul>\n";
		echo "</div>\n";
		echo "<div id=\"formBlock\">\n";
		echo "<table cellspacing=\"2\" cellpadding=\"0\" class=\"mainTable\">\n";
		for($i=0;$i<count($this->m);$i++){
			echo "<tr>\n";
			if($this->m[$i][0]==6){
				echo sprintf("<th colspan=\"2\">%s</th>\n",$this->m[$i][1]);
			}elseif($this->m[$i][0]==4){
				echo sprintf("<th colspan=\"2\" class=\"formAt\">%s</th>\n",$this->m[$i][1]);
			}elseif($this->m[$i][0]==2){
				echo sprintf("<td class=\"%s\">%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1]);
				echo "<td class=\"conf\">";
				if($this->v["p_".$this->m[$i][4]]=="etc."){
					$this->v["p_".$this->m[$i][4]]=sprintf("etc. : %s",$this->POST["etc".$this->m[$i][4]]);
					$this->v["etc".$this->m[$i][4]]=$this->POST["etc".$this->m[$i][4]];
				}
				echo strlenChker($this->v["p_".$this->m[$i][4]]);
				echo "</td>\n";
			}elseif($this->m[$i][0]==7){
				echo sprintf("<td class=\"%s\">%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1]);
				echo "<td class=\"conf\">";
				echo strlenChker($this->tmpfile[$this->m[$i][4]]);
				$this->v["TMPFILENAME".$this->m[$i][4]]=$this->tmpfile[$this->m[$i][4]];
				echo "</td>\n";
			}elseif($this->m[$i][0]==8){
				echo sprintf("<td class=\"%s\">%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1]);
				echo "<td class=\"conf\">";
				echo strlenChker($this->tmpfile[$this->m[$i][4]]);
				$this->v["TMPFILENAME".$this->m[$i][4]]=$this->tmpfile[$this->m[$i][4]];
				echo "</td>\n";
			}elseif($this->m[$i][0]==9){

				echo sprintf("<td class=\"%s\">%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1]);
				echo "<td class=\"conf\">";

				echo (strlen($this->v["p_".$this->m[$i][4][0]])>0)?$this->v["p_".$this->m[$i][4][0]]:"-";
				echo "<span class=\"q\">/</span>";
				echo (strlen($this->v["p_".$this->m[$i][4][1]])>0)?$this->v["p_".$this->m[$i][4][1]]:"-";
				echo "<span class=\"q\">/</span>";
				if(count($this->m[$i][4])>=3){
					echo (strlen($this->v["p_".$this->m[$i][4][2]])>0)?$this->v["p_".$this->m[$i][4][2]]:"-";
					echo "<span class=\"q\"></span>";
				}
				if(count($this->m[$i][4])>=4){
					echo (strlen($this->v["p_".$this->m[$i][4][3]])>0)?$this->v["p_".$this->m[$i][4][3]]:"-";
					echo "<span class=\"q\"></span>";
				}
				echo "</td>\n";
			}else{
				echo sprintf("<td class=\"%s\">%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1]);
				echo "<td class=\"conf\">";
				if(is_array($this->m[$i][4])){
					for($j=0;$j<count($this->m[$i][4]);$j++){
						echo sprintf("%s%s",(gettype(strpos($this->m[$i][4][$j],"name"))=="boolean"&&gettype(strpos($this->m[$i][4][$j],"kana"))=="boolean")?$this->m[$i][6][$j]:" ",strlenChker($this->v["p_".$this->m[$i][4][$j]]));
					}
				}else{
					if(!is_array($this->v["p_".$this->m[$i][4]])){
						echo strlenChker($this->v["p_".$this->m[$i][4]]);
					}else{
						for($JI=0;$JI<count($this->v["p_".$this->m[$i][4]]);$JI++){
							if($this->v["p_".$this->m[$i][4]][$JI]!="etc."){
								echo strlenChker($this->v["p_".$this->m[$i][4]][$JI]);
							}else{
								$this->v["p_".$this->m[$i][4]][$JI]=sprintf("etc. : %s",$this->POST["etc".$this->m[$i][4]]);
								$this->v["etc".$this->m[$i][4]]=$this->POST["etc".$this->m[$i][4]];
								echo strlenChker($this->v["p_".$this->m[$i][4]][$JI]);
							}
							if($JI!=(count($this->v["p_".$this->m[$i][4]])-1))echo "<br >";
						}
					}
				}
				echo "</td>\n";
			}
			echo "</tr>\n";
		}
		echo "</table>\n";
		echo "</div>\n";
		echo "<div id=\"formButton\">\n";
		echo "<ul>\n";
		echo sprintf("<script type=\"text/javascript\">hb=function(){document.fg.action=\"./index_%s.html#formBlock\";document.fg.submit.click();}</script>\n",$this->fid);
		echo "<li><input name=\"back\" type=\"button\" value=\"To correct this data\" onClick=\"hb();\" class=\"prev\" ></li>\n";
		echo "<li><input name=\"submit\" type=\"submit\" value=\"To send this data\" class=\"next\" ></li>\n";
		echo "</ul>\n";
		echo "</div>\n";
		echo "<input type=\"hidden\" name=\"back\" value=\"1\">\n";
		echo_hidden($this->v);
		echo "</form>\n";
		echo "</div>\n";
	}

	function makeExec(){
		echo "<div id=\"formArea\">\n";
		//echo sprintf("<div id=\"formTitles\">%s</div>\n",$this->info["subject"]);
		echo "<div id=\"caption\">\n";
		if(strlen($this->ERRMSG)>0){
			echo sprintf("<p style=\"color:#CC0000\">%s</p>\n",$this->ERRMSG);
			echo "<p>Please back to the input page by &quote;Return to the inter page&quot; button.</p>\n";
		}else{
			echo mod_HTML($this->info["exp2"],$this->info["exp2tag"]);
		}
		echo "</div>\n";
		echo sprintf("<form name=\"fg\" action=\"./index_%s.html?#formTitles\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		echo "<div id=\"formFlow\" style=\"padding-bottom:200px;\"><img src=\"/shared/form/img/flow03_e.gif\" width=\"660\" height=\"37\" ></div>";
		echo "<input type=\"hidden\" name=\"back\" value=\"1\">\n";
		if(strlen($this->ERRMSG)>0){
			echo_hidden($this->POST);
		}
		echo "<div id=\"formButton\">\n";
		echo "<ul>\n";
		if(strlen($this->ERRMSG)>0){
			echo "<li><input name=\"submit\" type=\"submit\" value=\"Return to the inter page\" class=\"next\" ></li>\n";
		}else{
			if(strlen($this->info["path"])>0){
				echo sprintf("<script type=\"text/javascript\">bt=function(){document.location.href=\"http://%s%s\"}</script>\n",$this->domain,$this->info["path"]);
				echo "<li><input name=\"back\" type=\"button\" value=\"Back\" onClick=\"bt();return false;\" class=\"prev\" ></li>\n";
			}
		}
		echo "</ul>\n";
		echo "</div>\n";
		echo "</form>\n";
		echo "</div>\n";
	}
	
	function fileMove($name){
		global $RAWDATA;
		if(copy(sprintf("%stmp/%s",$RAWDATA,$this->POST["p_".$name]),sprintf("%s/%s",$RAWDATA,$this->POST["p_".$name]))){
			$this->delfile=sprintf("%stmp/%s",$RAWDATA,$this->POST["p_".$name]);
			return $this->POST["TMPFILENAME".$name];
		}else{
			$this->ERRMSG="Failed to save the uploading file. Please try again after some intervals.";
		}
	}

	function makeMailBody($a,$b,$c="",$d=""){
		$max=0;
		
		if($c==""){		
			$l=sprintf("Information sent\n----------------------------------------------------------------------\nRegistered date : %s\nRegistered no   : %s\n\n",$a,$b);
		}else{
			$l=sprintf("Information sent\n----------------------------------------------------------------------\nRegistered date : %s\nRegistered no   : %s\nCustomer ID     : %s\n\n",$a,$b,$c);
		}
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]!=6&&$this->m[$i][0]!=4){
				$s=mb_strlen($this->m[$i][1]);
				if($s>$max)$max=$s;
			}
		}
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]==6){
				$l.=sprintf("\n%s\n----------------------------------------------------------------------\n",$this->m[$i][1]);
			}elseif($this->m[$i][0]==4){

			}elseif($this->m[$i][0]==7){
				for($j=strlen($this->m[$i][1]);$j<$max;$j++){
					$t.=" ";
				}
				$l.=sprintf("%s%s : %s\n",$this->m[$i][1],$t,$this->fileMove($this->m[$i][4]));
			}elseif($this->m[$i][0]==8){
				for($j=strlen($this->m[$i][1]);$j<$max;$j++){
					$t.=" ";
				}
				$l.=sprintf("%s%s : %s\n",$this->m[$i][1],$t,$this->fileMove($this->m[$i][4]));
			}elseif($this->m[$i][0]==9){
				for($j=strlen($this->m[$i][1]);$j<$max;$j++){
					$t.=" ";
				}
				$l.=sprintf("%s%s：%s年%s月",$this->m[$i][1],$t,$this->v["p_".$this->m[$i][4][0]],$this->v["p_".$this->m[$i][4][1]]);
				if(strlen($this->m[$i][4][2])>0)$l.=sprintf("%s日",$this->v["p_".$this->m[$i][4][2]]);
				if(strlen($this->m[$i][4][3])>0)$l.=sprintf("%s時頃",$this->v["p_".$this->m[$i][4][3]]);
				$l.="\n";
			}else{
				for($j=mb_strlen($this->m[$i][1]);$j<$max;$j++){
					$t.="　";
				}
				if(!is_array($this->m[$i][4])){
					if(is_array($this->v["p_".$this->m[$i][4]])){
						$this->v["p_".$this->m[$i][4]]=implode(",",$this->v["p_".$this->m[$i][4]]);
					}
					$l.=sprintf("%s%s : %s\n",$this->m[$i][1],$t,str_replace(array("\r\n","\r","\n")," ",$this->v["p_".$this->m[$i][4]]));
				}else{
					if(gettype(strpos($this->m[$i][4][0],"name"))=="boolean"&&gettype(strpos($this->m[$i][4][0],"kana"))=="boolean"){
						$I=$this->m[$i][6][0].$this->v["p_".$this->m[$i][4][0]].$this->m[$i][6][1].$this->v["p_".$this->m[$i][4][1]].$this->m[$i][6][2].$this->v["p_".$this->m[$i][4][2]];
					}else{
						$I=$this->v["p_".$this->m[$i][4][0]]." ".$this->v["p_".$this->m[$i][4][1]];
					}
					$l.=sprintf("%s%s : %s\n",$this->m[$i][1],$t,$I);
				}
			}
			$t="";
		}
		return $l;
	}

	function formExec(){

		if(count($this->POST)){

			$TN="form";
			$sql="select max(id) as m from form";
			$this->o->query($sql);
			$f=$this->o->fetch_array(0);
			$INSERTID=(strlen($f["m"])>0)?$f["m"]+1:1;
			$BEFOR["name0"]="\$NAME0";
			$AFTER["name0"]=$this->v["p_name0"];
			$BEFOR["infobody"]="\$INFOBODY";
			$DATE=date("Y-m-d H:i:s");
			$REF=$this->v["p_refurl"];
			//$REFTITLE=$this->getPageTitle($REF);
			$AFTER["infobody"]=$this->makeMailBody($DATE,$INSERTID);

			if(strlen($this->ERRMSG)==0){

				while(list($k,$v)=each($this->POST)){
					if(ereg("p_",$k)){
						if(strlen($v)>0){
							if(is_array($v))$v=implode(",",$v);
							$v=stripslashes($v);
							$v=addslashes($v);
							$v=str_replace("\r\n","\n",$v);
							$v=str_replace("\r","\n",$v);
							$v="'".$v."'";
						}else{
							$v="null";
						}
						$sv[$sn[]=ereg_replace("p_","",$k)]=$v;
					}
				}

				$sv[$sn[]="id"]=$INSERTID;
				$sv[$sn[]="sessionid"]=sprintf("'%s'",$this->SESSIONID);
				$sv[$sn[]="fid"]=$this->fid;
				$sv[$sn[]="reftitle"]=sprintf("'%s'",addslashes($REFTITLE));
				$sv[$sn[]="flag"]=1;
				$sv[$sn[]="m_time"]=sprintf("'%s'",$DATE);
				$sv[$sn[]="u_time"]=sprintf("'%s'",$DATE);

				$sql="insert into ".$TN."(".implode(",",$sn).") values(".implode(",",$sv).")";
				$this->o->query("begin");
				$this->o->query($sql);

				$sql="select max(id) as m from form";
				$this->o->query($sql);
				$f=$this->o->fetch_array(0);
				$e=($f["m"]==$INSERTID)?true:false;

				if($e){

					$body=$this->info["body"];
					$body=str_replace($BEFOR,$AFTER,$body);
					$body=strs_split($body,140);
					$MAIL=$this->sendMail($this->v["p_email"],sprintf("[%s] Thank you for your %s",$this->sitename,$this->info['subject']),$body);

					if($MAIL){

						$AFTER["infobody"]=$this->makeMailBody($DATE,$INSERTID,$this->SESSIONID);
						$body=$this->info["body"];
						$body=str_replace($BEFOR,$AFTER,$body);
						$body=strs_split($body,140);
/*

セッションデータをとっている場合

						$fp=fopen(sprintf("%s%s.csv",$this->SESSIONFILEDIR,$this->SESSIONID),"r");
						$SESSDATA="";
						while($FFF=fgets($fp,2048)){
							$SESSDATA.=$FFF;
						}
						fclose($fp);
*/
						$MAILS=$this->sendMail($this->info['mailto'],sprintf("[auto confirm mail for admin] %s",$this->info['subject']),$body);

						if($MAILS){

							$this->o->query("commit");
							if(strlen($e)==0){
								$this->ERRMSG="Due to server being crowded, you failed to connect with database. Please try again after some intervals. ";
							}else{
								if(strlen($this->delfile)>0)unlink($this->delfile);
							}
							//メールマガジン解除
							//if($e)if($this->fid==6)$this->o->query(sprintf("delete from form where email='%s' and fid=5",$emailaddr));
						}else{
							$this->o->query("abort");
							$this->ERRMSG="Due to server being crowded, we may have failed to send you an automatic reply for your email address.  Please retry to send the form after some intervals.";
						}
					}else{
						$this->o->query("abort");
						$this->ERRMSG="Due to server being crowded or incorrect email address, we  failed to send you an automatic reply.  Please check your registered email address and retry to send the form after some intervals.";
					}
				}else{
					$this->o->query("abort");
					$this->ERRMSG="Failed to connect with database.  Please contact us from the inquiry form. ";
				}
			}else{
				$this->o->query("abort");
				$this->ERRMSG="Your data was not collated.  Please send the inquiry form again. ";
			}
		}else{
			$this->o->query("abort");
			$this->ERRMSG="It is an illegal access.  Please send your data by the allowed inquiry form. ";
		}
	}
	
	function sendMail($to,$subject,$body,$f=""){

		global $SITE_e;
		$SITE=$SITE_e;
		$sbj=sprintf("=?utf-8?B?%s?=",base64_encode($subject));
		$msg=stripslashes($body);
		$msg=$msg;
		$header=sprintf("From:=?utf-8?B?%s?=<%s>\n",base64_encode($SITE),$this->info["mailfrom"]);
		$header.=sprintf("Reply-To:%s\n",$this->info["mailfrom"]);
		$header.=sprintf("Return-Path:%s\n",$this->info["mailfrom"]);
		if(strlen($to)==0){
			$to=$this->info["mailto"];
		}
		$header.=sprintf("X-Mailer:PHP/%s\n",phpversion());
		$header.="MIME-Version:1.0\n";
		if(strlen($f)>0){
			$boundary="----=_NextPart_".uniqid(rand(),1);
			$header.="Bcc:saegusa@nomadstudio.jp\n";
			$header.=sprintf("Content-type:multipart/mixed;boundary=\"%s\"\n",$boundary);
			$body =sprintf("--%s\n",$boundary);
			$body.=sprintf("Content-Type:text/plain;charset=\"UTF-8\"\n\n%s\n",$msg);
			$body.=sprintf("--%s\n",$boundary);
			$body.=sprintf("Content-Type:application/octet-stream;name=\"%s.csv\"\n",$this->SESSIONID);
			$body.="Content-Transfer-Encoding:base64\n";
			$body.=sprintf("Content-Disposition:attachment;filename=\"%s.csv\"\n\n%s\n\n",$this->SESSIONID,chunk_split(base64_encode($f)));
			$body.=sprintf("--%s\n",$boundary);
			$msg=$body;
		}else{
			$header.="Content-Type:text/plain;charset=\"UTF-8\"";
		}
		return @mail($to,$sbj,$msg,$header);
	}
	
	function csvDownload(){
		
		global $RAWDATA;
		
		$t[]="\"Registration No.\"";
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]!=6)$t[]=sprintf("\"%s\"",$this->m[$i][1]);
		}
		$t[]="\"Registered date\"";
		$l[]=implode(",",$t);
		
		$sql=sprintf("select *,%s as mtime from form where fid=%s order by id",dbtm("m_time",0),$this->fid);
		$this->o->query($sql);
		
		$i=0;
		
		while($f=$this->o->fetch_array($i++)){
			unset($L);
			$L[]=$f["id"];
			for($j=0;$j<count($this->m);$j++){
				if($this->m[$j][0]!=6&&$this->m[$j][0]!=4){
					if(is_array($this->m[$j][4])){
						$e=1;
						unset($w);
						for($k=0;$k<count($this->m[$j][4]);$k++){
							$w[]=$f[$this->m[$j][4][$k]];
							/*
							if(strlen($f[$this->m[$j][4][$k]])==0){
								$e=0;
								break;
							}
							*/
						}
						$L[]=sprintf("\"%s\"",($e)?implode(" ",$w):"");
					}else{
						$L[]=sprintf("\"%s\"",(strlen($f[$this->m[$j][4]])>0)?$f[$this->m[$j][4]]:"");
						if($this->m[$j][0]==7||$this->m[$j][0]==8){
							$tmpfiles[]=$f[$this->m[$j][4]];
						}
					}
				}
			}
			$L[]=$f["mtime"];
			$l[]=implode(",",$L);
		}
		$l=implode("\r\n",$l);
		$l=mb_convert_encoding($l,"SJIS","UTF-8");
		$filename=sprintf("%s%s",mb_convert_encoding($this->info["subject"],"SJIS","UTF-8"),date("YmdHis"));
		
		if(!$tmpfiles){
			header("Content-Type: application/octet-stream");
			header(sprintf("Content-Disposition: attachment; filename=%s.csv",$filename));
			echo $l;
		}else{
			$fp=fopen(sprintf("%stmp/%s.csv",$RAWDATA,$filename),"w");
			fputs($fp,$l);
			fclose($fp);
			if(file_exists(sprintf("%stmp/%s.csv",$RAWDATA,$filename))){
				for($i=0;$i<count($tmpfiles);$i++){
					$handle=fopen(sprintf("%s%s",$RAWDATA,$tmpfiles[$i]),"rb");
					$contents=fread($handle,filesize(sprintf("%s%s",$RAWDATA,$tmpfiles[$i])));
					fclose($handle);
					$this->addFile($contents,$tmpfiles[$i]);
				}
				$handle=fopen(sprintf("%stmp/%s.csv",$RAWDATA,$filename),"r");
				$contents=fread($handle,filesize(sprintf("%stmp/%s.csv",$RAWDATA,$filename)));
				fclose($handle);
				$this->addFile($contents,sprintf("%s.csv",$filename));
				$zip_buffer=$this->file();
				
				header("Content-Type: application/zip");
				header(sprintf("Content-Disposition: attachment; filename=%s.zip",$filename));
				echo $zip_buffer;
			}
		}
	}


    function unix2DosTime($unixtime = 0) {
        $timearray=($unixtime==0)?getdate():getdate($unixtime);

        if ($timearray['year']<1980){
            $timearray['year']=1980;
            $timearray['mon']=1;
            $timearray['mday']=1;
            $timearray['hours']=0;
            $timearray['minutes']=0;
            $timearray['seconds']=0;
        }

        return (($timearray['year'] - 1980) << 25) | ($timearray['mon'] << 21) | ($timearray['mday'] << 16) |
                ($timearray['hours'] << 11) | ($timearray['minutes'] << 5) | ($timearray['seconds'] >> 1);
    }

    function addFile($data, $name, $time = 0){
        $name     = str_replace('\\', '/', $name);

        $dtime    = dechex($this->unix2DosTime($time));
        $hexdtime ='\x'.$dtime[6].$dtime[7]
                  .'\x'.$dtime[4].$dtime[5]
                  .'\x'.$dtime[2].$dtime[3]
                  .'\x'.$dtime[0].$dtime[1];
        eval('$hexdtime = "' . $hexdtime . '";');

        $fr   = "\x50\x4b\x03\x04";
        $fr   .= "\x14\x00";
        $fr   .= "\x00\x00";
        $fr   .= "\x08\x00";
        $fr   .= $hexdtime;

        $unc_len = strlen($data);
        $crc     = crc32($data);
        $zdata   = gzcompress($data);
        $zdata   = substr(substr($zdata, 0, strlen($zdata) - 4), 2);
        $c_len   = strlen($zdata);
        $fr      .= pack('V', $crc);
        $fr      .= pack('V', $c_len);
        $fr      .= pack('V', $unc_len);
        $fr      .= pack('v', strlen($name));
        $fr      .= pack('v', 0);
        $fr      .= $name;
        $fr .= $zdata;

        $this -> datasec[] = $fr;

        $cdrec = "\x50\x4b\x01\x02";
        $cdrec .= "\x00\x00";
        $cdrec .= "\x14\x00";
        $cdrec .= "\x00\x00";
        $cdrec .= "\x08\x00";
        $cdrec .= $hexdtime;
        $cdrec .= pack('V', $crc);
        $cdrec .= pack('V', $c_len);
        $cdrec .= pack('V', $unc_len);
        $cdrec .= pack('v', strlen($name) );
        $cdrec .= pack('v', 0 );
        $cdrec .= pack('v', 0 );
        $cdrec .= pack('v', 0 );
        $cdrec .= pack('v', 0 );
        $cdrec .= pack('V', 32 );

        $cdrec .= pack('V', $this -> old_offset );
        $this -> old_offset += strlen($fr);

        $cdrec .= $name;
        $this -> ctrl_dir[] = $cdrec;
    }

    function file(){
        $data    = implode('', $this -> datasec);
        $ctrldir = implode('', $this -> ctrl_dir);

        return
            $data .
            $ctrldir .
            $this -> eof_ctrl_dir .
            pack('v', sizeof($this -> ctrl_dir)) .
            pack('v', sizeof($this -> ctrl_dir)) .
            pack('V', strlen($ctrldir)) .
            pack('V', strlen($data)) .
            "\x00\x00";
    }
}

?>
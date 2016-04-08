<?php

class form{

	var $v;
	var $m;
	var $e;
	var $a;
	var $ER;
	var $ERMESSAGE;
	var $o;
	var $info;
	var $POST;
	var $fid;

	function form($n,$t=1,$draft=0){
		
		global $sv;
		global $sn;
		global $_POST;
		
		$this->fid=$n;
		$this->POST=$_POST;
		$this->o=new db;
		$this->o->connect();

		@data_conf();
		
		$sql=sprintf("select * from mailtemplate where id=%s",$n);
		$this->o->query($sql);
		$f=$this->o->fetch_array();
		$this->info=$f;
		$this->pubE;
		
		$this->v=$sv;
		$this->y=$sn;
		$this->formelement($n);
		
		$this->pub=1;
		
//		if($draft){
//			$this->pub=1;
//		}else{
//			$this->status();
//		}

		if($t==1&&!$this->POST["back"]&&count($this->v)>0)$this->chkErrorInitialize();
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
					if($e<$c)$this->pubE=sprintf("%sフォームの受付は %s-%s-%s を持ちまして修了しました。たくさんのご応募ありがとうございました。",$this->info["subject"],$this->info["ey"],$this->info["em"],$this->info["ed"]);	
					if($s>$c)$this->pubE=sprintf("%sフォームの受付は %s-%s-%s から開始します。たくさんのご応募お待ちしております。",$this->info["subject"],$this->info["sy"],$this->info["sm"],$this->info["sd"]);					
				}
			}else{
				$this->pub=1;
			}
		}else{
			$this->pub=0;
			$this->pubE=sprintf("%sフォームの受付は終了しました。たくさんのご応募ありがとうございました。",$this->info["subject"]);
		}
	}

	function formelement($n){
		$i=0;
		$sql=sprintf("select mail_template.*,pm_.p1 as p1 from mail_template,pm_ where mail_template.cid=%s and mail_template.flag=1 and mail_template.lib=pm_.id order by n",$n);
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
			$i++;
		}
	}

	function makeTitle($name){
		return sprintf("<tr>\n<th colspan=\"2\">%s</th>\n</tr>",$name);
	}

	function makeTextfield($name,$size,$pre=""){
		if(count($name)>1){
			for($i=0;$i<count($name);$i++){
				$s[]=sprintf("<label for=\"p_%s\">%s <input name=\"p_%s\" type=\"text\" id=\"p_%s\" value=\"%s\" size=\"%s\" ></label>\n",$name[$i],$pre[$i],$name[$i],$name[$i],$this->v["p_".$name[$i]],$size[$i]);
			}
			if(count($pre)>$i)$s[]=$pre[$i];
			return implode(" ",$s);
		}else{
			return sprintf("<label for=\"p_%s\">%s <input name=\"p_%s\" type=\"text\" id=\"p_%s\" value=\"%s\" size=\"%s\" ></label>\n",$name,$pre,$name,$name,$this->v["p_".$name],$size);
		}
	}

	function makeTextarea($name,$size){
		return sprintf("<textarea name=\"p_%s\" cols=\"%s\" rows=\"%s\" id=\"p_%s\">%s</textarea>\n",$name,$size[0],$size[1],$name,$this->v["p_".$name]);

	}

	function makeRadio($l,$n,$g){
		$ll="<table cellspacing=\"0\" class=\"subTable\">\n";
		for($i=0;$i<count($n);$i++){
			$q=0;
			if(strlen($this->v["p_".$l])>0){
				if($this->v["p_".$l]==$n[$i])$q=1;
			}
			if(($i%$g)==0)$ll.="<tr>\n";
			$ll.=sprintf("<td><input type=\"radio\" name=\"p_%s\" value=\"%s\" id=\"%s%s\" %s ><label for=\"%s%s\">%s</label></td>\n",$l,$n[$i],$l,$i,($q==1)?" checked":"",$l,$i,$n[$i]);
			if(($i%$g)==($g-1))$ll.="</tr>\n";
		}
		if(((count($n))%$g)!=0)$ll.="</tr>\n";
		$ll.="</table>\n";
		return $ll;
	}

	function makeCheckbox($l,$n,$g){
		if(count($this->v["p_".$l])==0){
			$ll="<table cellspacing=\"0\" class=\"subTable\">\n";
			for($i=0;$i<count($n);$i++){
				if(($i%$g)==0)$ll.="<tr>\n";
				$ll.=sprintf("<td><input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\"%s ><label for=\"%s%s\">%s</label></td>\n",$l,$n[$i],$l,$i,"",$l,$i,$n[$i]);
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
				$ll.=sprintf("<td><input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\" %s ><label for=\"%s%s\">%s</td>\n",$l,$n[$i],$l,$i,$u,$l,$i,$n[$i]);
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

	function makeLabel($l,$f,$e){
		if($f==1){
			return sprintf("<td rowspan=\"2\" class=\"%s\">%s<p>※必須項目です</p></td>\n",($e==1)?"titleNormal":"titleErr",$l);
		}else{
			return sprintf("<td rowspan=\"2\" class=\"titleNoInput\">%s</td>\n",$l);
		}
	}

	function makeCaption($s){
		return sprintf("<tr>\n<td class=\"caption\">%s</td>\n</tr>\n",$s);
	}

	function makeCell($n,$j){
		if($this->m[$n][0]!=6){
			echo "<tr>\n";
			echo $this->makeLabel($this->m[$n][1],$this->m[$n][2],$this->ER[$j]);
			echo "<td class=\"input\">\n";
			if($this->m[$n][0]==0){
				echo $this->makeTextfield($this->m[$n][4],$this->m[$n][5],$this->m[$n][6]);
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
			}
			echo "</td>\n";
			echo "</tr>\n";
			echo $this->makeCaption((strlen($this->m[$n][8])>0)?$this->m[$n][8]:$this->m[$n][1]."を入力してください。");
		}else{
			echo $this->makeTitle($this->m[$n][1]);
		}
	}

	function makeTables(){
		echo sprintf("<div id=\"formArea\">\n<div id=\"formTitles\">%s</div>\n",$this->info["subject"]);
		if($this->pub==1){
			echo sprintf("<div id=\"caption\">%s</div>\n",mod_HTML($this->info["exp"],$this->info["exptag"]));
			echo sprintf("<form name=\"fg\" action=\"./index.php?fid=%s#errArea\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
			$this->makeError();
			echo "<div id=\"attention\">\n<ul>\n<li>入力必須項目です</li>\n<li class=\"spont\">入力任意項目です</li>\n</ul>\n</div>\n<div id=\"formBlock\">\n<table cellspacing=\"2\" cellpadding=\"0\" class=\"mainTable\">";
			$j=0;
			for($i=0;$i<count($this->m);$i++){
				$this->makeCell($i,($this->m[$i][2]==1)?$j++:"");
			}
			echo "</table>\n</div>\n<div id=\"formButton\">\n<ul>\n<li><input name=\"submit\" type=\"submit\" value=\"入力内容を確認する\" class=\"next\" ></li>\n</ul>\n</div>\n</form>\n";
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
							$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],($this->m[$i][0][$k]<=1)?"が入力されておりません。":"が選択されておりません。");
							$this->ER[$j]=0;
						}else{
							if(gettype(strpos($this->m[$i][4][$k],"tel0"))!="boolean"){
								if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<2){
									$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],"に入力間違いがあります。");
									$this->ER[$j]=0;
								}
							}elseif(gettype(strpos($this->m[$i][4][$k],"tel1"))!="boolean"){
								if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3){
									$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],"に入力間違いがあります。");
									$this->ER[$j]=0;
								}
							}elseif(gettype(strpos($this->m[$i][4][$k],"tel2"))!="boolean"){
								if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3){
									$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],"に入力間違いがあります。");
									$this->ER[$j]=0;
								}
							}elseif(gettype(strpos($this->m[$i][4][$k],"zip0"))!="boolean"){
								if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<3){
									$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],"に入力間違いがあります。");
									$this->ER[$j]=0;
								}
							}elseif(gettype(strpos($this->m[$i][4][$k],"zip1"))!="boolean"){
								if(!isint($this->v["p_".$this->m[$i][4][$k]])||strlen($this->v["p_".$this->m[$i][4][$k]])<4){
									$this->ERMESSAGE[]=sprintf("%s%s%s",$this->m[$i][1],$this->m[$i][7][$k],"に入力間違いがあります。");
									$this->ER[$j]=0;
								}
							}
						}
					}
				}else{
					if(strlen($this->v["p_".$this->m[$i][4]])==0){
						$this->ERMESSAGE[]=sprintf("%s%s",$this->m[$i][1],($this->m[$i][0]<=1)?"が入力されておりません。":"が選択されておりません。");
						$this->ER[$j]=0;
					}else{
						if(gettype(strpos($this->m[$i][4],"email"))=="integer"){
							if(!ereg("[_\.0-9a-z-]+@[0-9a-z][0-9a-z-]+\.+[a-z]{2,3}",$this->v["p_".$this->m[$i][4]])){
								$this->ER[$j]=0;
								$this->ERMESSAGE[]=sprintf("%sが無効な形式です。",$this->m[$i][1]);
							}
						}
					}
				}
				$j++;
			}
		}
		if(count($this->ERMESSAGE)==0){
			include "./conf.php";
			exit;
		}
	}
	
	function makeError(){
		if(count($this->ERMESSAGE)>0){
			echo "<div id=\"errArea\">\n";
			echo "<div id=\"errTitle\">入力エラーがありました。</div>\n";
			echo "<ul>\n";
			for($i=0;$i<count($this->ERMESSAGE);$i++){
				echo sprintf("<li>%s</li>\n",$this->ERMESSAGE[$i]);
			}
			echo "</ul>\n";
			echo "</div>\n";
		}
	}
	
	function makeConf(){
		echo sprintf("<div id=\"formArea\">\n<div id=\"formTitles\">%s</div>\n",$this->info["subject"]);
		echo "<div id=\"caption\">\n";
		echo "<p>下記内容で申し込みます。</p>\n";
		echo "<p>フォームの内容をご確認の上、よろしければ「上記内容を送信する」を修正する場合は「上記内容を修正する」を押してください。</p>\n";
		echo "</div>\n";
		echo sprintf("<form name=\"fg\" action=\"./exec.php?fid=%s#formTitles\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		echo "<div id=\"attention\">\n";
		echo "<ul>\n";
		echo "<li>入力必須項目です</li>\n";
		echo "<li class=\"spont\">入力任意項目です</li>\n";
		echo "</ul>\n";
		echo "</div>\n";
		echo "<div id=\"formBlock\">\n";
		echo "<table cellspacing=\"2\" cellpadding=\"0\" class=\"mainTable\">\n";
		for($i=0;$i<count($this->m);$i++){
			echo "<tr>\n";
			if($this->m[$i][0]==6){
				echo sprintf("<th colspan=\"2\">◆%s</th>\n",$this->m[$i][1]);
			}else{
				echo sprintf("<td class=\"%s\">%s%s</td>\n",($this->m[$i][2]==1)?"titleNormal":"titleNoInput",$this->m[$i][1],($this->m[$i][2]==1)?"<p>※必須項目です</p>":"");
				echo "<td class=\"conf\">";
				if(is_array($this->m[$i][4])){
					for($j=0;$j<count($this->m[$i][4]);$j++){
						echo sprintf("%s%s",(gettype(strpos($this->m[$i][4][$j],"name"))=="boolean")?$this->m[$i][6][$j]:" ",strlenChker($this->v["p_".$this->m[$i][4][$j]]));
					}
				}else{
					if(!is_array($this->v["p_".$this->m[$i][4]])){
						echo strlenChker($this->v["p_".$this->m[$i][4]]);
					}else{
						echo strlenChker(implode(",",$this->v["p_".$this->m[$i][4]]));
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
		echo sprintf("<script type=\"text/javascript\">hb=function(){document.fg.action=\"./index.php?fid=%s#formBlock\";document.fg.submit.click();}</script>\n",$this->fid);
		echo "<li><input name=\"back\" type=\"button\" value=\"入力内容を修正する\" onClick=\"hb();\" class=\"prev\" ></li>\n";
		echo "<li><input name=\"submit\" type=\"submit\" value=\"入力内容を送信する\" class=\"next\" ></li>\n";
		echo "</ul>\n";
		echo "</div>\n";
		echo "<input type=\"hidden\" name=\"back\" value=\"1\">\n";
		echo_hidden($this->v);
		echo "</form>\n";
		echo "</div>\n";
	}

	function makeExec(){
		echo sprintf("<div id=\"formArea\">\n<div id=\"formTitles\">%s</div>\n",$this->info["subject"]);
		echo "<div id=\"caption\">\n";
		if(strlen($this->ERRMSG)>0){
			echo "<p style=\"color:#CC0000\"><?=$ERRMSG?></p>\n";
			echo "<p>「入力ページへ戻る」からフォーム入力ページへ戻ってください。</p>\n";
		}else{
			echo mod_HTML($this->info["exp2"],$this->info["exp2tag"]);
		}
		echo "</div>\n";
		echo sprintf("<form name=\"fg\" action=\"./index.php?fid=%s#formTitles\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		echo "<input type=\"hidden\" name=\"back\" value=\"1\">\n";
		if(strlen($this->ERRMSG)>0){
			echo_hidden($this->POST);
		}
		echo "<div id=\"formButton\">\n";
		echo "<ul>\n";
		if(strlen($this->ERRMSG)>0){
			echo "<li><input name=\"submit\" type=\"submit\" value=\"入力ページへ戻る\" class=\"next\" ></li>\n";
		}else{
			echo sprintf("<script type=\"text/javascript\">bt=function(){document.location.href=\"%s?fid=%s\"}</script>\n",$this->info["path"],$this->fid);
			echo sprintf("<li><input name=\"back\" type=\"button\" value=\"%s へ戻る\" onClick=\"bt();return false;\" class=\"prev\" ></li>\n",$this->info["subject"]);
		}
		echo "</ul>\n";
		echo "</div>\n";
		echo "</form>\n";
		echo "</div>\n";
	}

	function makeMailBody($a,$b){
		$max=0;
		$l=sprintf("■フォーム送信情報\n└──────────────────────────────────\n送信日時：%s\n送信Ｎｏ：%s\n",$a,$b);
		for($i=0;$i<count($this->m);$i++){
			$s=mb_strlen($this->m[$i][1],"UTF-8");
			if($s>$max)$max=$s;
		}
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]==6){
				$l.=sprintf("\n■%s\n└──────────────────────────────────\n",$this->m[$i][1]);
			}else{
				for($j=mb_strlen($this->m[$i][1]);$j<$max;$j++){
					$t.="　";
				}
				if(!is_array($this->m[$i][4])){
					if(is_array($this->v["p_".$this->m[$i][4]])){
						$this->v["p_".$this->m[$i][4]]=implode(",",$this->v["p_".$this->m[$i][4]]);
					}
					$l.=sprintf("%s%s：%s\n",$this->m[$i][1],$t,str_replace(array("\r\n","\r","\n")," ",$this->v["p_".$this->m[$i][4]]));
				}else{
					if(gettype(strpos($this->m[$i][4][0],"name"))=="boolean"){
						$I=$this->m[$i][6][0].$this->v["p_".$this->m[$i][4][0]].$this->m[$i][6][1].$this->v["p_".$this->m[$i][4][1]].$this->m[$i][6][2].$this->v["p_".$this->m[$i][4][2]];
					}else{
						$I=$this->v["p_".$this->m[$i][4][0]]." ".$this->v["p_".$this->m[$i][4][1]];
					}
					$l.=sprintf("%s%s：%s\n",$this->m[$i][1],$t,$I);
				}
			}
			$t="";
		}
		return $l;
	}

	function formExec(){

		if(count($this->POST)){

			$TN="formtemplate";
			$sql="select max(id) as m from formtemplate";
			$this->o->query($sql);
			$f=$this->o->fetch_array(0);
			$INSERTID=(strlen($f["m"])>0)?$f["m"]+1:1;
			
			$BEFOR["name0"]="\$NAME0";
			$AFTER["name0"]=$this->v["p_name0"];
			$BEFOR["infobody"]="\$INFOBODY";
			$DATE=date("Y-m-d H:i:s");
			$AFTER["infobody"]=$this->makeMailBody($DATE,$INSERTID);
			$body=$this->info["body"];
			$body=str_replace($BEFOR,$AFTER,$body);
			$body=strs_split($body,70);
			$MAIL=sendmail($this->v["p_email"],$this->info['subject'],$body,$this->info['mailfrom'],$this->info['mailfrom'],$this->info['mailto']);

			if($MAIL){

				while(list($k,$v)=each($this->POST)){
					if(ereg("p_",$k)){
						if(strlen($v)>0){
							if(is_array($v)){
								$v=implode(",",$v);	
							}
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
				$sv[$sn[]="fid"]=$this->fid;
				$sv[$sn[]="flag"]=1;
				$sv[$sn[]="m_time"]=sprintf("'%s'",$DATE);
				$sv[$sn[]="u_time"]=sprintf("'%s'",$DATE);
		
				$sql="insert into ".$TN."(".implode(",",$sn).") values(".implode(",",$sv).")";
				$this->o->query($sql);
		
				$sql="select max(id) as m from form";
				$this->o->query($sql);
				$f=$this->o->fetch_array(0);
				$e=($f["m"]==$INSERTID)?true:false;
		
				if(strlen($e)==0){
					$this->ERRMSG="サーバが混雑していてデータベースに接続することができませんでした。お手数ですが時間を空けてもう一度お試しください。";
				}
			}else{
				$this->ERRMSG="サーバが混雑しているか、メールアドレスに誤りがあるため、メールを送信することができませんでした。<br >お手数ですが時間を空けてもう一度お試しください。";
			}
		}else{
			$this->ERRMSG="不正なアクセスです。<br >フォーム入力ページからデータを送信してください。";
		}
	}
	
	function csvDownload(){
		
		global $CPATH;
		
		$t[]="\"申し込みNO\"";
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]!=6)$t[]=sprintf("\"%s\"",$this->m[$i][1]);
		}
		$t[]="\"申し込み日時\"";
		$l[]=implode(",",$t);
		
		$sql=sprintf("select *,to_char(m_time,'YYYY-mm-dd HH:mm:ss') as mtime from formtemplate where fid=%s order by id",$this->fid);
		$this->o->query($sql);
		
		$i=0;
		
		while($f=$this->o->fetch_array($i++)){
			
				unset($L);
				$L[]=$f["id"];
				for($j=0;$j<count($this->m);$j++){
					if($this->m[$j][0]!=6){
					if(is_array($this->m[$j][4])){
						$e=1;
						unset($w);
						for($k=0;$k<count($this->m[$j][4]);$k++){
							$w[]=$f[$this->m[$j][4][$k]];
							if(strlen($f[$this->m[$j][4][$k]])==0){
								$e=0;
								break;
							}
						}
						$L[]=sprintf("\"%s\"",($e)?implode(" ",$w):"なし");
					}else{
						$L[]=sprintf("\"%s\"",(strlen($f[$this->m[$j][4]])>0)?$f[$this->m[$j][4]]:"なし");
					}
					}
				}
				$L[]=$f["mtime"];
				$l[]=implode(",",$L);

		}
		$l=implode("\r\n",$l);
		$l=mb_convert_encoding($l,"SJIS","EUC");
		
		header("Content-Type: application/octet-stream");
		header(sprintf("Content-Disposition: attachment; filename=%s%s.csv",mb_convert_encoding($this->info["subject"],"SJIS","EUC"),date("YmdHis")));
		
		echo $l;
		
		/*
		$fp=fopen($CPATH.mb_convert_encoding($this->info["subject"],"SJIS","EUC").".csv","w");
		fputs($fp,$l);
		fclose($fp);
		*/
	}
}

?>
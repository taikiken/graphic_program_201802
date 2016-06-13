<?php

class form{

	var $v;
	var $imaxsize=300;
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
	var $errfield=array();
    var $datasec=array();
    var $ctrl_dir=array();
    var $eof_ctrl_dir="\x50\x4b\x05\x06\x00\x00\x00\x00";
    var $old_offset=0;
	var $pagetitle=array("フォーム-入力","フォーム-確認","フォーム-終了");
	var $isSP;
	
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
		
		$this->isSP=$this->checkua($this->SERVER['HTTP_USER_AGENT']);
		
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

	function makeTables(){
		
		echo "<div id=\"formArea\">\n";
		echo sprintf("<h1>%s</h1>\n",$this->info["subject"]);
		if($this->pub==1){
			if(strlen($this->info["exp"])>0)echo sprintf("<div id=\"caption\"><p>%s</p></div>\n",preg_match('/<("[^"]*"|\'[^\']*\'|[^\'">])*>/',$this->info["exp"])?mod_HTML($this->info["exp"],2):mod_HTML($this->info["exp"],1));
			
			echo sprintf("<form name=\"fg\" action=\"./conf_%s.html#errTitle\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
			$this->makeError();
			if($this->isSP){
				echo "<p class=\"formFlow\" id=\"formFlow\">必要事項をご入力ください。</p>\n<div class=\"reqop\"><p>入力必須項目です</p></div>\n";
			}else{
				echo "<div class=\"formFlow\" id=\"formFlow\"><img src=\"/shared/form/img/flow01.png\" width=\"741\" height=\"41\" /></div>\n<div class=\"reqop\"><p>入力必須項目です</p></div>\n";
			}
			echo "<div class=\"formBlock\">\n";
			$j=0;
			for($i=0;$i<count($this->m);$i++){
				$this->makeCell($i,($this->m[$i][2]==1)?$j++:"");
			}
			//echo $this->makeRef();
			if($this->isSP){
				echo "</div>\n<div class=\"formButton1\"><input name=\"send\" type=\"image\" src=\"/shared/form/img/inputBtn1.png\" width=\"215\" height=\"46\"></div>\n</form>\n";
			}else{
				echo "</div>\n<div class=\"formButton1\"><input name=\"send\" type=\"image\" src=\"/shared/form/img/inputBtn.png\" class=\"btn\"></div>\n</form>\n";
			}
		}else{
			echo strlen($this->pubE)>0?sprintf("<div id=\"caption\">%s</div>\n",$this->pubE):"";
		}
		echo "</div>\n";
		echo '<div class="privacypolicy"><h2>個人情報保護方針</h2><div class="title1 clearfix"><table width="115" border="0" cellpadding="2" cellspacing="0" title="このマークは、SSLで通信を保護している証です。" class="sslv"><tr><td width="115" align="center" valign="top"><!-- GeoTrust QuickSSL [tm] Smart  Icon tag. Do not edit. --> <SCRIPT LANGUAGE="JavaScript"  TYPE="text/javascript" SRC="//smarticon.geotrust.com/si.js"></SCRIPT><!-- end  GeoTrust Smart Icon tag --><p style="text-align:center; font-weight:bold; font-size:10px; margin:0; padding:0;">A <span style="color:#9b0033;">VeriSign</span> Company</p><a href="https://www.geotrust.co.jp/ssl-certificate/" target="_blank"  style="color:#000000; text-decoration:none; font:bold 12px \'ＭＳ ゴシック\',sans-serif; letter-spacing:.5px; text-align:center; margin:0px; padding:0px;">SSLで通信を保護</a></td></tr></table><p>株式会社ジー・ピー・アセット（以下当社という）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法令および社内規程等を、すべての役員･従業者が遵守することにより、個人情報の適正な取扱いと、安全かつ確実な管理･運営に万全を尽くしております。<br />また、継続的に見直しを実施して、個人情報保護の一層の改善･向上に努めております。</p></div><dl class="privacy"><dt>個人情報の取得、利用、提供</dt><dd>お客様の個人情報の取得は、適正な手段によって行うとともに、利用目的の公表・通知・明示等を行い、ご本人の同意なく、利用目的の範囲を超えた個人情報のお取扱いはいたしません。また、個人情報を第三者に提供・開示等する場合は、法令の定める手続きに則って行います。</dd><dt>個人情報を利用する目的</dt><dd><p>お客様の個人情報は、以下の目的に利用いたします。</p><ul class="purpose"><li>不動産の売買・賃貸、それらの代理・仲介、管理その他付帯する事業</li><li>賃貸不動産・売買不動産情報等の広告掲載（情報誌・インターネット・弊社ホームページ）</li><li>保険媒介代理事業</li><li>時間貸駐車場その他の駐車場事業</li><li>上記の事業に関して、郵便物・電子メール・電話等の営業活動、顧客動向分析または商品・営業手法開発等の調査分析</li><li>生活・住環境・レジャーに関連する商品サービス等の情報提供</li><li>上記(1)、(4)の目的の達成に必要な範囲での、個人情報の第三者への提供</li></ul></dd><dt>個人情報の第三者提供</dt><dd><p>お客様の個人情報は、法令の規定に基づく場合のほか、上記利用目的の達成に必要な範囲で、書面・郵便物・電話・インターネット・電子メール・広告媒体等で第三者に提供されることがあります。なお、ご本人からの申し出により、相手先への提供は停止いたします。 </p><ol><li>個人情報を提供する相手先（例示）<ul class="dtted"><li>新規物件の販売における事業主・共同代理会社・媒介会社。</li><li>不動産売買・賃貸の仲介における契約相手方となる者、その見込者、他の宅地建物取引業者、インターネット広告掲載業者・不動産事業団体、および指定流通機構（物件登録、成約通知および同機構のデータを利用しての営業、価格査定等の実地）。</li><li>不動産取引の付帯業務における金融機関、司法書士、土地家屋調査士、不動産管理業者。</li><li>月極駐車場の契約相手方となる者、その見込者、他の宅地建物取引業者。</li></ul></li><li>提供される個人情報の項目<ul class="dtted"><li>お名前、ご住所、電話番号、物件情報、成約情報等、上記の利用目的に必要な範囲の項目。</li></ul></li></ol></dd><dt>継続的な見直しについて</dt><dd>当社は、個人情報保護に関する日本の法令その他の模範を遵守するとともに、この個人情報保護方針の内容を継続的に見直し、改善に努めます。また、遵守すべき法令その他の規範の変更にともない、個人情報保護方針を改定することがあります。その際は当ウェブサイトにて公表いたします。</dd><dt>個人情報に関するお問い合わせについて</dt><dd><p>お客様の個人情報について、その内容の開示・訂正・利用の停止等のご請求、その他個人情報に関するご質問、ご意見等のお申し出については、以下のお問合わせ窓口またはお客様の担当営業部署にご連絡ください。 </p><table class="ppadr"><tr><th colspan="2">株式会社ジー・ピー・アセット個人情報担当窓口</th></tr><tr><th width="50">住所</th><td>〒151-0053 東京都渋谷区代々木2-10-8 ケイアイ新宿ビル5階</td></tr><tr><th>電話</th><td>03-5304-4981 受付時間 10時～20時（毎週水曜日、第一、第三火曜日を除く）</td></tr><tr><th>Eメール</th><td>info@gp-asset.co.jp</td></tr></table></dd></dl></div>';
	}
	function makeConf(){
		$r="<div id=\"formArea\">\n";
		$r.=sprintf("<h1>%s</h1>\n",$this->info["subject"]);
		$r.="<div class=\"caption\">\n";
		$r.="<p>下記内容で送信します。</p>\n";
		$r.="<p>フォームの内容をご確認の上、よろしければ「この内容で送信する」を、修正する場合は「修正する」を押してください。</p>\n";
		$r.="</div>\n";
		$r.=sprintf("<form name=\"fg\" action=\"./exec_%s.html\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		if(!$this->isSP){
			$r.="<div class=\"formFlow\"><img src=\"/shared/form/img/flow02.png\" width=\"741\" height=\"41\"></div>";
		}
		$r.="<div class=\"formBlock\">\n";
		for($i=0;$i<count($this->m);$i++){

			if($this->m[$i][0]==6){
				$r.=sprintf("<div class=\"explain\"><p>%s</p></div>\n",$this->m[$i][1]);
			}elseif($this->m[$i][0]==4){

			}elseif($this->m[$i][0]==2){
				if($this->v["p_".$this->m[$i][4]]=="その他"){
					$this->v["p_".$this->m[$i][4]]=sprintf("その他：%s",$this->POST["etc".$this->m[$i][4]]);
					$this->v["etc".$this->m[$i][4]]=$this->POST["etc".$this->m[$i][4]];
				}
				$r.=sprintf("<div class=\"fc\"><dl class=\"fbox clearfix\"><dt><span class=\"%s\">%s</span></dt><dd>%s</dd></dl></div>\n",($this->m[$i][2]==1)?"required":"optional",$this->m[$i][1],strlenChker($this->v["p_".$this->m[$i][4]]));
			}elseif($this->m[$i][0]==7){
				
				if(strlen($this->v["p_".$this->m[$i][4]])>0){
					global $UPPATH;
					$s=getimagesize($UPPATH.$this->v["p_".$this->m[$i][4]]);
					$size=$s[0]<$this->imaxsize?$s[0]:$this->imaxsize;
				}
				$r.=sprintf("<div class=\"fc\"><dl class=\"fbox clearfix\"><dt><span class=\"%s\">%s</span></dt><dd>%s</dd></dl></div>\n",
				($this->m[$i][2]==1)?"required":"optional",$this->m[$i][1],strlen($this->v["p_".$this->m[$i][4]])>0?sprintf("<img src='/shared/module/img.php?img=%s' width='%s'><br />%s",$this->v["p_".$this->m[$i][4]],$size,$this->v["TMPFILENAME".$this->m[$i][4]]):"-");
				
			}elseif($this->m[$i][0]==8){
				$r.=sprintf("<td class=\"%s\">%s</td>",($this->m[$i][2]==1)?"required":"optional",$this->m[$i][1]);
				$r.=sprintf("<td class=\"conf\">%s</td>",strlen($this->v["p_".$this->m[$i][4]])>0?sprintf("<a href='/prg_img/tmp/%s' target='_blank'>%s</a>",$this->v["p_".$this->m[$i][4]],$this->v["TMPFILENAME".$this->m[$i][4]]):"-");
			}elseif($this->m[$i][0]==9){
				
				$yyy =(strlen($this->v["p_".$this->m[$i][4][0]])>0)?$this->v["p_".$this->m[$i][4][0]]:"-";
				$yyy.="年";
				$yyy.=(strlen($this->v["p_".$this->m[$i][4][1]])>0)?$this->v["p_".$this->m[$i][4][1]]:"-";
				$yyy.="月";
				$yyy.=(strlen($this->v["p_".$this->m[$i][4][2]])>0)?$this->v["p_".$this->m[$i][4][2]]:"-";
				$yyy.="日";
				$yyy.=(strlen($this->v["p_".$this->m[$i][4][3]])>0)?$this->v["p_".$this->m[$i][4][3]]:"-";
				$yyy.="時頃";
				$r.=sprintf("<div class=\"fc\"><dl class=\"fbox clearfix\"><dt><span class=\"%s\">%s</span></dt><dd>%s</dd></dl></div>\n",($this->m[$i][2]==1)?"required":"optional",$this->m[$i][1],$yyy);
			}else{
				$yyy="";
				if(is_array($this->m[$i][4])){
					for($j=0;$j<count($this->m[$i][4]);$j++){
						if($j==0&&!ereg('(name|kana)',$this->m[$i][4][$j])){
							$yyy.=strlen($this->m[$i][6][0])>0?$this->m[$i][6][0]:"";
						}
						$yyy.=sprintf("%s%s",strlenChker($this->v["p_".$this->m[$i][4][$j]]),!ereg('(name|kana)',$this->m[$i][4][$j])?$this->m[$i][6][$j+1]:" ");
					}
				}else{
					if(!is_array($this->v["p_".$this->m[$i][4]])){
						$yyy.=strlen($this->m[$i][6][0])>0?$this->m[$i][6][0]:"";
						$yyy.=strlenChker($this->v["p_".$this->m[$i][4]]);
						$yyy.=strlen($this->m[$i][6][1])>0?$this->m[$i][6][1]:"";
					}else{
						for($JI=0;$JI<count($this->v["p_".$this->m[$i][4]]);$JI++){
							if($this->v["p_".$this->m[$i][4]][$JI]!="その他"){
								$yyy.=strlenChker($this->v["p_".$this->m[$i][4]][$JI]);
							}else{
								$this->v["p_".$this->m[$i][4]][$JI]=sprintf("その他：%s",$this->POST["etc".$this->m[$i][4]]);
								$this->v["etc".$this->m[$i][4]]=$this->POST["etc".$this->m[$i][4]];
								$yyy.=strlenChker($this->v["p_".$this->m[$i][4]][$JI]);
							}
							if($JI!=(count($this->v["p_".$this->m[$i][4]])-1))$yyy.="<br />";
						}
					}
				}
				$r.=sprintf("<div class=\"fc\"><dl class=\"fbox clearfix\"><dt><span class=\"%s\">%s</span></dt><dd>%s</dd></dl></div>\n",($this->m[$i][2]==1)?"required":"optional",$this->m[$i][1],$yyy);
			}
		}
		$r.="</div>\n";
		$r.="<div class=\"formButton2\">\n";
		$r.="<ul class=\"clearfix\">\n";
		if($this->isSP){
			$r.="<li class=\"prev\"><img src=\"/shared/form/img/confBtnM1.png\" width=\"98\" height=\"39\"></li>\n";
			$r.="<li class=\"next\"><input name=\"send\" type=\"image\" src=\"/shared/form/img/confBtn1.png\" width=\"186\" height=\"46\"></li>\n";
		}else{
			$r.="<li class=\"prev\"><img src=\"/shared/form/img/confBtnM.png\" width=\"147\" height=\"36\" class=\"btn\"></li>\n";
			$r.="<li class=\"next\"><input name=\"send\" type=\"image\" src=\"/shared/form/img/confBtn.png\" class=\"btn\"></li>\n";
		}
		$r.="</ul>\n";
		$r.="</div><input type=\"hidden\" name=\"back\" value=\"1\">\n";
		$r.=$this->p_hidden($this->v);
		$r.="</form>\n";
		$r.="</div>\n";
		echo $r;
	}
	function makeExec(){
		echo "<div id=\"formArea\">\n";
		echo sprintf("<h1>%s</h1>\n",$this->info["subject"]);
		echo sprintf("<form name=\"fg\" action=\"./index_%s.html?#formTitles\" method=\"post\" enctype=\"multipart/form-data\">\n",$this->fid);
		if(!$this->isSP){
			echo "<div class=\"formFlow\"><img src=\"/shared/form/img/flow03.png\" width=\"741\" height=\"41\"></div>";
		}
		echo "<div class=\"caption\">\n";
		if(strlen($this->ERRMSG)>0){
			echo sprintf("<p style=\"color:#CC0000\">%s</p>\n",$this->ERRMSG);
			echo "<p>「入力ページへ戻る」からフォーム入力ページへ戻ってください。</p>\n";
		}else{
			echo preg_match('/<("[^"]*"|\'[^\']*\'|[^\'">])*>/',$this->info["exp2"])?mod_HTML($this->info["exp2"],2):mod_HTML($this->info["exp2"],1);
		}
		echo "</div>\n";
		echo '<div class="endmsg"><p>お申し込みいただいた方には自動返信メールを送信しております。メールが迷惑メールフォルダに入ってしまったり、キャリアのブロックで届かないことがありますので、自動返信メールが届かない場合は、大変お手数ですが、メール:<a href="mailto:gp_hp_echo@gp-asset.co.jp">gp_hp_echo@gp-asset.co.jp</a>もしくはお電話：<b>0120-86-4981</b>までご連絡下さい。</p></div>';
		echo "<input type=\"hidden\" name=\"back\" value=\"1\">\n";
		if(strlen($this->ERRMSG)>0){
			echo_hidden($this->POST);
		}
/*
		echo "<div class=\"formButton3\">\n";
		if($this->isSP){
			if(strlen($this->ERRMSG)>0)echo "<input name=\"send\" type=\"image\" src=\"/shared/form/img/execBtnM1.png\" width=\"148\" height=\"39\" />\n";
			else echo sprintf("<a href=\"%s\"><img src=\"/shared/form/img/execBtn1.png\" width=\"291\" height=\"40\" /></a>\n",$this->info["path"]);
		}else{
			if(strlen($this->ERRMSG)>0)echo "<input name=\"send\" type=\"image\" src=\"/shared/form/img/execBtnM.png\" class=\"btn\" />\n";
			else echo sprintf("<a href=\"http://www.amos-style.com/%saudition.html\"><img src=\"/shared/form/img/execBtn.png\" width=\"345\" height=\"50\" /></a>\n",($this->isSP)?"sp/":"");
		}
		echo "</div>\n";
*/
		echo "</form>\n";
		echo "</div>\n";
	}


	function checkua($ua){
		$f=0;
		$c[]=ereg('Android',$ua)&&ereg('Mobile',$ua);
		$c[]=ereg('iPhone',$ua)||ereg('iPod',$ua);
		$c[]=ereg('Windows Phone',$ua);
		$c[]=ereg('blackberry',$ua);
		$c[]=ereg('3DS',$ua)||ereg('DSi',$ua)||ereg('Nitro',$ua);
		$c[]=ereg('PlayStation Portable',$ua);
		$c[]=ereg('KDDI-',$ua);
		$c[]=ereg('DoCoMo',$ua);
		for($i=0;$i<count($c);$i++)if($c[$i]===true)return 1;
		return $f;
	}
	
	function p($k){
		return $this->info[$k];
	}
	
	function formBodyPrint(){
		if($this->mode=="input"){
			$this->makeTables();
		}elseif($this->mode=="conf"){
			$this->makeConf();
		}elseif($this->mode=="exe"){
			$this->makeExec();
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
					if($e<$c)$this->pubE=sprintf("%sフォームの受付は %s-%s-%s を持ちまして修了しました。たくさんのご応募ありがとうございました。",$this->info["subject"],$this->info["ey"],$this->info["em"],$this->info["ed"]);	
					if($s>$c)$this->pubE=sprintf("%sフォームの受付は %s-%s-%s から開始します。たくさんのご応募お待ちしております。",$this->info["subject"],$this->info["sy"],$this->info["sm"],$this->info["sd"]);					
				}
			}else{
				$this->pub=1;
			}
		}else{
			$this->pub=0;
			//$this->pubE=sprintf("<p style=\"padding:0 0 0 20px;\">只今、%sフォームのメンテナンス中です。<br />お客様には大変ご迷惑をお掛け致しまして、大変申し訳ございません。<br />閲覧可能までもうしばらくお待ちください。</p>",$this->info["subject"]);
			$this->pubE="";
		}
	}

	function formelement($n){
		$i=0;
		$sql=sprintf("select mail_.*,pm_.p1 as p1 from mail_,pm_ where mail_.cid=%s and mail_.flag=1 and mail_.lib=pm_.id order by n",$n);
		$this->o->query($sql);
		while($f=$this->o->fetch_array($i)){
			$this->m[$i][0]=$f["p1"];
			$this->m[$i][1]=$f["fname"];
			$this->m[$i][2]=($f["at"]==66)?1:0;
			if($this->m[$i][2]==1)$this->ER[]=1;
			$this->m[$i][3]="";
			$this->m[$i][4]=ereg(',',$f["fvalue"])?explode(",",$f["fvalue"]):$f["fvalue"];
			
			if($this->fid==15&&$f["fvalue"]=="radio2"&&strlen($f["fsize"])==0){
				function makekd(){
					$kr=array();
					$start=array(17,13);
					$today=date('w',mktime(0,0,0,date("m"),date("d"),date("Y")));
					if($today>=1&&$today<=5){
						$friday=5-$today;
						$sunday=7-$today;
						$f=date('n/j',mktime(0,0,0,date("m"),date("d")+2+$friday,date("Y")));
						$s=date('n/j',mktime(0,0,0,date("m"),date("d")+2+$sunday,date("Y")));	
					}elseif($today==6){
						$s=date('n/j',mktime(0,0,0,date("m"),date("d")+1,date("Y")));
						$f=date('n/j',mktime(0,0,0,date("m"),date("d")+6,date("Y")));
					}else{
						$s=date('n/j',mktime(0,0,0,date("m"),date("d"),date("Y")));
						$f=date('n/j',mktime(0,0,0,date("m"),date("d")+5,date("Y")));
					}
					$day=array($f,$s);
					$week=array("金","日");
					$flag=array(array(1,0,0),array(0,0,0,1,0,1,0));
					$tmp="%s(%s) %s時～%s時%s";
					
					for($i=0;$i<count($start);$i++){
						for($j=0;$j<count($flag[$i]);$j++){
							$kr[$i][]=sprintf($tmp,$day[$i],$week[$i],$start[$i]+$j,$start[$i]+$j+1,$flag[$i][$j]==1?"@":"");
						}
						$kr[$i]=implode("\n",$kr[$i]);
					}
					if($day[1]<$day[0])$kr=array_reverse($kr);
					$kr=implode("\n",$kr);
					$kr=explode("\n",$kr);
					return $kr;
				}
				$this->m[$i][5]=makekd();
			}elseif(($this->fid==17||$this->fid==18)&&$f["fvalue"]=="radio1"){

				function outstep($r,$i){
					$fp=fopen($r,"r");
					while($l=fgets($fp,1024)){
						$l=trim($l);
						$f=strtotime(str_replace(".","-",$l));
						if(strtotime(date("Y-m-d"))<$f){
							preg_match("/([0-9]+)\.([0-9]+)\.([0-9]+)/",$l,$m);
							return array(sprintf("%s年%s月%s日（土）%s",$m[1],$m[2],$m[3],$i==17?"15：00～17：00":"12：00～14：00"));
						}
					}
				}

				global $STEPTEXT;
				$this->m[$i][5]=outstep($STEPTEXT,$this->fid);

			}else{
				$f["fsize"]=ereg_replace("\n",",",$f["fsize"]);
				$this->m[$i][5]=ereg(',',$f["fsize"])?explode(",",$f["fsize"]):$f["fsize"];
			}
			
			$this->m[$i][6]=ereg(',',$f["pre"])?explode(",",$f["pre"]):$f["pre"];
			$this->m[$i][7]=ereg(',',$f["sep"])?explode(",",$f["sep"]):$f["sep"];
			$this->m[$i][8]=mod_HTML($f["cap"],1);
			$this->m[$i][9]=ereg(',',$f["msize"])?explode(",",$f["msize"]):$f["msize"];
			$this->m[$i][10]=$f["ndot"];
			$i++;
		}
	}

	function makeTitle($name){
		if($this->isSP){
			//return sprintf("<div class=\"explain\"><p>%s</p></div><div class=\"attsn\"><p>写真ファイルのアップロードに対応していない機種をお使いの方は、メールにてご応募ください。<br />詳しくは<a href=\"http://www.amos-style.com/sp/audition3.html\">応募方法ページ</a>をご覧ください。</p></div>",$name);
		}else{
			return sprintf("<div class=\"explain\"><p>%s</p></div>",$name);
		}
	}
	
	function makeTitle2($name){
		return sprintf("<dl><dt class=\"explain2\">%s</dt></dl>",$name);
	}

	function makeTextfield($name,$size,$msize,$pre=""){
		
		$df="\"text\"";
		if($this->isSP){
			$r=!is_array($name)?$name:$name[0];
			if(ereg('^email',$r))$df="\"email\" autocapitalize=\"off\"";
			if(ereg('^zip',$r))$df="\"tel\"";
			if(ereg('^tel',$r))$df="\"tel\"";
			if(ereg('^v1',$r))$df="\"number\"";
		}
		
		if(count($name)>1){
			$s=strlen($pre[0])>0?$pre[0]:"";
			for($i=0;$i<count($name);$i++){
				$s.=sprintf("<input name=\"p_%s\" type=%s id=\"p_%s\" value=\"%s\" size=\"%s\"%s>",$name[$i],$df,$name[$i],$this->v["p_".$name[$i]],$size[$i],(strlen($msize[$i])>0)?sprintf(" maxlength=\"%s\"",$msize[$i]):"");
				$s.=strlen($pre[($i+1)])>0?$pre[($i+1)]:"";
			}
			if(ereg("^zip",$name[0]))$s.='<input name="submit" type="button" value="　住所入力　" class="adinput">';
		}else{
			$s=strlen($pre[0])>0?$pre[0]:"";
			$s.=sprintf("<input name=\"p_%s\" type=%s id=\"p_%s\" value=\"%s\" size=\"%s\"%s />%s",$name,$df,$name,$this->v["p_".$name],($this->isSP&&ereg('^email',$name))?40:$size,(strlen($msize)>0)?sprintf(" maxlength=\"%s\"",$msize):"",strlen($pre[1])>0?$pre[1]:"");
			if(ereg("^zip",$name))$s.='<input name="submit" type="button" value="　住所入力　" class="adinput">';		
		}
		return $s;
	}

	function makeTextarea($name,$size){
		return sprintf("<textarea name=\"p_%s\" rows=\"%s\" id=\"p_%s\">%s</textarea>",$name,$size,$name,$this->v["p_".$name]);
	}

	function makeFilefield($name,$type){
		global $UPPATH;
		$s=sprintf("<input name=\"%s\" type=\"file\" id=\"p_%s\" size=\"30\">",$name,$name);
		if($_POST["del".$name]==1)return $s;
		if(strlen($this->v["p_".$name])>0){
			$ti=strlen($this->tmpfile[$name])>0?$this->tmpfile[$name]:$_POST[TMPFILENAME.$name];
			$s.=sprintf("<input type=\"hidden\" name=\"p_%s\" value=\"%s\">",$name,$this->v["p_".$name]);
			if($type=="img"){
				$ts=getimagesize($UPPATH.$this->v["p_".$name]);
				$size=$ts[0]<$this->imaxsize?$ts[0]:$this->imaxsize;
				$s.=sprintf("<div class=\"imgbox\"><img src='/shared/module/img.php?img=%s' width='%s' /><p class=\"filename\">%s　<input type='checkbox' name='del%s' value='1'><span style='color:#000;'> 削除する</span></p></div>",$this->v["p_".$name],$size,$ti,$name);
			}else{
				$s.=sprintf("<p class=\"filename\"><a href=\"/prg_img/tmp/%s\">%s</a>　<input type='checkbox' name='del%s' value='1'><span style='color:#000;'> 削除する</span></p>",$this->v["p_".$name],$ti,$name);
			}
			$s.=sprintf("<input type=\"hidden\" name=\"TMPFILENAME%s\" value=\"%s\" />",$name,$ti);
		}
		return $s;
	}

	function makeRadio($l,$n,$g){
		
		if(!is_array($n))$n=array($n);
		if($this->POST["back"]){
			if(ereg("^その他：",$this->v["p_".$l])){
				$this->v["p_".$l]="その他";
			}
		}
		$dispmsg=($this->fid==14)?"　（満員御礼）":"　（予約済み）";
		$ll="";
		for($i=0;$i<count($n);$i++){
			$q=0;
			if(strlen($this->v["p_".$l])>0){
				if($this->v["p_".$l]==$n[$i])$q=1;
			}
			if($n[$i]!="その他"){
				$ll.=sprintf("<input type=\"radio\" name=\"p_%s\" value=\"%s\" id=\"%s%s\" %s%s><label for=\"%s%s\">%s%s",$l,ereg_replace("@$","",$n[$i]),$l,$i,($q==1)?" checked":"",ereg("@$",$n[$i])?" disabled=\"disabled\"":"",$l,$i,ereg("@$",$n[$i])?sprintf("<s>%s</s>",ereg_replace("@$","",$n[$i])):$n[$i],ereg("@$",$n[$i])?$dispmsg:"");
			}else{
				if(!ereg("<br />$",$ll)&&$this->isSP==0)$ll.="<br />";
				$ll.=sprintf("<input type=\"radio\" name=\"p_%s\" value=\"%s\" id=\"%s%s\" %s><label for=\"%s%s0\">%s",$l,$n[$i],$l,$i,($q==1)?" checked":"",$l,$i,$n[$i]);
				$ll.=sprintf(" <input type=\"text\" name=\"etc%s\" value=\"%s\" size=\"30%s\">",$l,$this->POST["etc".$l],"%");
			}
			$ll.="</label>";
			
			if($g==1||$this->isSP==1)$ll.="<br />";
		}
		return $ll;
	}

	function makeCheckbox($l,$n,$g){
		if(!is_array($n))$n=array($n);
		if($this->POST["back"]){
			for($i=0;$i<count($this->v["p_".$l]);$i++){
				if(ereg("^その他",$this->v["p_".$l][$i]))$this->v["p_".$l][$i]="その他";
			}
		}
		$ll="";
		for($i=0;$i<count($n);$i++){
			$u="";
			for($j=0;$j<count($this->v["p_".$l]);$j++){
				if($this->v["p_".$l][$j]==$n[$i]){
					$u=" checked";
					break;
				}
			}
			
			if($n[$i]!="その他"){
				$ll.=sprintf("<input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\"%s><label for=\"%s%s\">%s",$l,$n[$i],$l,$i,$u,$l,$i,$n[$i]);
			}else{
				if(!ereg("<br />$",$ll)&&$this->isSP==0)$ll.="<br />";
				$ll.=sprintf("<input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\"%s><label for=\"%s%s0\">%s",$l,$n[$i],$l,$i,$u,$l,$i,$n[$i]);
				$ll.=sprintf(" <input type=\"text\" name=\"etc%s\" value=\"%s\" size=\"30%s\">",$l,$this->POST["etc".$l],"%");
			}
			$ll.="</label>";
			if(($g!=""&&$g==$i)||$this->isSP==1)$ll.="<br />";
		}
		return $ll;
	}

	function makePulldown($l,$n){
		$ll=sprintf("<select name=\"p_%s\" id=\"p_%s\">",$l,$l);
		$ll.=sprintf("<option%s>選択してください</option>",(strlen($this->v["p_".$l])==0)?" selected":"");
		for($i=0;$i<count($n);$i++){
			$ll.=sprintf("<option value=\"%s\"%s>%s</option>",$n[$i],($this->v["p_".$l]==$n[$i])?" selected":"",$n[$i]);
		}
		$ll.="</select>";
		return $ll;
	}
	
	function makeRef(){
		$s=(strlen($this->POST["p_refurl"])>0)?$this->POST['p_refurl']:$this->SERVER['HTTP_REFERER'];
		$l=sprintf("<input type=\"hidden\" name=\"p_refurl\" value=\"%s\">",$s);
		return $l;
	}

	function makeLabel($l,$f){
		if($f==1){
			return sprintf("<dt><span class=\"required\">%s</span></dt>",$l);
		}else{
			return sprintf("<dt><span class=\"optional\">%s</span></dt>",$l);
		}
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

	function makeDate($l){
	
		$FIELD=$l;
		//global $INCLUDEPATH;

/*	
		$_YY=date("Y");
		$_MM=date("m");
		$_DD=date("d");
		$_HH=10;
*/		
		//var_dump(array($_YY,$_MM,$_DD));
		
		$Y_CONDITION=array(date("Y"),date("Y")+1);
		$M_CONDITION=array(1,12);
	
		$_YY=strlen($this->v["p_".$FIELD[0]])>0?$this->v["p_".$FIELD[0]]:$_YY;
		$_MM=strlen($this->v["p_".$FIELD[1]])>0?$this->v["p_".$FIELD[1]]:$_MM;
		$_DD=strlen($this->v["p_".$FIELD[2]])>0?$this->v["p_".$FIELD[2]]:$_DD;
		$_HH=strlen($this->v["p_".$FIELD[3]])>0?$this->v["p_".$FIELD[3]]:$_HH;
		
		//var_dump(array($_YY,$_MM,$_DD,$_HH));
/*	
		$l="";
		$l.=sprintf("\n<div id=\"dateMess\"></div>\n<input type=\"text\" style=\"vertical-align:middle;\" name=\"p_%s\" value=\"%s\" size=\"5\" onclick=\"displayErr('dateMess','予約日時は上のカレンダーから選択してください。')\" /><span class=\"q\">年</span>\n",$FIELD[0],strlen($this->v["p_".$FIELD[0]])>0?$this->v["p_".$FIELD[0]]:"");
		$l.=sprintf("<input type=\"text\" name=\"p_%s\" style=\"vertical-align:middle;\" value=\"%s\" size=\"3\" onclick=\"displayErr('dateMess','予約日時は上のカレンダーから選択してください。')\" /><span class=\"q\">月</span>\n",$FIELD[1],strlen($this->v["p_".$FIELD[1]])>0?$this->v["p_".$FIELD[1]]:"");
		if(count($FIELD)>=3){
			$l.=sprintf("<input type=\"text\" name=\"p_%s\" style=\"vertical-align:middle;\" value=\"%s\" size=\"3\" onclick=\"displayErr('dateMess','予約日時は上のカレンダーから選択してください。')\" /><span class=\"q\">日</span>\n",$FIELD[2],strlen($this->v["p_".$FIELD[2]])>0?$this->v["p_".$FIELD[2]]:"");
		}
*/
		$l="";
		$l.=sprintf("<select name=\"p_%s\" id=\"p_%s\">",$FIELD[0],$FIELD[0]);
		$l.="<option value=\"\"></option>";
		for($i=$Y_CONDITION[0];$i<=$Y_CONDITION[1];$i++){
			$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_YY)? " selected=\"selected\"":"",$i);
		}
		$l.="</select><span class=\"q\">年</span>";
		$l.=sprintf("<select name=\"p_%s\" id=\"p_%s\">",$FIELD[1],$FIELD[1]);
		$l.="<option value=\"\"></option>";
		for($i=$M_CONDITION[0];$i<=$M_CONDITION[1];$i++){
			$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_MM)? " selected=\"selected\"":"",$i);
		}
		$l.="</select><span class=\"q\">月</span>";
		if(count($FIELD)>=3){
			$D_CONDITION=array(1,31);
			$l.=sprintf("<select name=\"p_%s\" id=\"p_%s\">",$FIELD[2],$FIELD[2]);
			$l.="<option value=\"\"></option>";
			for($i=$D_CONDITION[0];$i<=$D_CONDITION[1];$i++){
				$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_DD)? " selected=\"selected\"":"",$i);
			}
			$l.="</select><span class=\"q\">日</span>";
		}

		if(count($FIELD)>=4){
			$H_CONDITION=array(10,20);
			$l.=sprintf("<select name=\"p_%s\">",$FIELD[3]);
			$l.="<option value=\"\"></option>";
			for($i=$H_CONDITION[0];$i<=$H_CONDITION[1];$i++){
				$l.=sprintf("<option value=\"%s\"%s>%s</option>",$i,($i==$_HH)? " selected=\"selected\"":"",$i);
			}
			$l.="</select><span class=\"q\">時頃</span>";
		}

		return $l;
	}


	function makeCaption($txt,$title,$category){
		if($txt==""){
			return "";
		}else{
			$s=(strlen($txt)>0)?$txt:$title.sprintf("を%sしてください。",($category==0||$category==1)?"入力":"選択");
			return sprintf("<div class=\"modcaption\">%s</div>",$s);
		}
	}

	function makeCell($n,$j){
		switch($this->m[$n][0]){
			case 0:$r=$this->makeTextfield($this->m[$n][4],$this->m[$n][5],$this->m[$n][9],$this->m[$n][6]);break;
			case 1:$r=$this->makeTextarea($this->m[$n][4],$this->m[$n][5]);break;
			case 2:$r=$this->makeRadio($this->m[$n][4],$this->m[$n][5],$this->m[$n][6]);break;
			case 3:$r=$this->makePulldown($this->m[$n][4],$this->m[$n][5]);break;
			case 4:$r=$this->makeTitle2($this->m[$n][1]);break;
			case 5:$r=$this->makeCheckbox($this->m[$n][4],$this->m[$n][5],$this->m[$n][6]);break;
			case 6:$r=$this->makeTitle($this->m[$n][1]);break;
			case 7:$r=$this->makeFilefield($this->m[$n][4],"img");break;
			case 8:$r=$this->makeFilefield($this->m[$n][4],"doc");break;
			case 9:$r=$this->makeDate($this->m[$n][4]);break;
			default:$r="";break;
		}
		echo($this->m[$n][0]!=6&&$this->m[$n][0]!=4)?sprintf("<div class=\"fc%s\"><dl class=\"fbox clearfix\">%s<dd>%s%s</dd></dl></div>\n",$this->m[$n][10]==140?" noboder":"",$this->makeLabel($this->m[$n][1],$this->m[$n][2],0),$r,$this->makeCaption($this->m[$n][8],$this->m[$n][1],$this->m[$n][0])):$r."\n";
	}

	function chkErrorCharTxtNum($e,$fname,$ename1,$ename2,$flname,$n){
		if($e!=1)return;
		$this->ERMESSAGE[]=sprintf("%s%s%s",$ename1,$ename2,($fname<=1)?"が入力されておりません。":"が選択されておりません。");
		$this->ER[$n]=0;
		$this->errfield[]=sprintf("p_%s",$flname);
	}
	function chkErrorCharTelNum($e,$fname,$ename1,$ename2,$n){
		if($e!=1)return;
		if(!preg_match('/^[0-9]{2,5}$/',$this->v["p_".$fname])){
			$this->ERMESSAGE[]=sprintf("%s%sに入力間違いがあります。半角数字で入力してください。",$ename1,$ename2);
			$this->ER[$n]=0;
			$this->errfield[]=sprintf("p_%s",$fname);
		}
	}
	function chkErrorPulldown($e,$fname,$ename1,$ename2,$flname,$n){
		//echo $n;
		if($e!=1)return;
		if($this->v["p_".$flname]=="選択してください"){
			$this->ERMESSAGE[]=sprintf("%s%s%s",$ename1,$ename2,($fname<=1)?"が入力されておりません。":"が選択されておりません。");
			$this->ER[$n]=0;
			$this->errfield[]=sprintf("p_%s",$flname);
		}
	}
	function chkErrorCharZipNum($e,$fname,$ename1,$ename2,$n){
		if($e!=1)return;
		switch($fname){
			case "zip0":
			if(!preg_match('/^[0-9]{3}$/',$this->v["p_".$fname])){
				$this->ERMESSAGE[]=sprintf("%s%sに入力間違いがあります。半角数字で入力してください。",$ename1,$ename2);
				$this->ER[$n]=0;
				$this->errfield[]=sprintf("p_%s",$fname);
			}
			break;
			case "zip1":
			if(!preg_match('/^[0-9]{4}$/',$this->v["p_".$fname])){
				$this->ERMESSAGE[]=sprintf("%s%sに入力間違いがあります。半角数字で入力してください。",$ename1,$ename2);
				$this->ER[$n]=0;
				$this->errfield[]=sprintf("p_%s",$fname);
			}
			break;
		}
	}
	function chkFileupload($e,$fname,$ename,$fsize,$n){
		global $_FILES,$_POST,$MAXFILESIZE,$RAWD,$UPPATH;
		
		if($_POST["del".$fname]==1){
			$_POST["p_".$fname]=$this->v["p_".$fname]="";
			if($e==1){
				$this->ERMESSAGE[]=sprintf("%sが添付されておりません。",$ename);$this->ER[$n]=0;$this->errfield[]=sprintf("p_%s",$fname);
			}
			return;
		}
		if(strlen($_POST["p_".$fname])>0&&strlen($_FILES[$fname]["name"])==0){
			$this->v["TMPFILENAME".$fname]=$_POST["TMPFILENAME".$fname];
			return;
		}
		if($e!=1&&strlen($_FILES[$fname]["name"])==0)return;
		if(($_FILES[$fname]["error"]!=0)||($e==1&&strlen($_FILES[$fname]["name"])==0)){
			switch($_FILES[$fname]["error"]){
				case 4:case 6:$this->ERMESSAGE[]=sprintf("%sが添付されておりません。",$ename);break;
				case 1:case 2:$this->ERMESSAGE[]=sprintf("%sがアップロードサイズの制限を越えています。",$ename);break;
				default:$this->ERMESSAGE[]=sprintf("%sのアップロードに失敗しました。",$ename);break;
			}
			$this->ER[$n]=0;$this->errfield[]=sprintf("p_%s",$fname);return;
		}
		$fi=count($fsize)>1?implode("|",$fsize):$fsize;
		$fi=str_replace("jpg","jp[e]g",$fi);
		
		if(!preg_match(sprintf("/(%s)/",$fi),$_FILES[$fname]["type"])){
			$this->ERMESSAGE[]=sprintf("アップロードできるファイルは%sだけになります。",count($fsize)>1?implode(",",$fsize):$fsize);$this->ER[$n]=0;$this->errfield[]=sprintf("p_%s",$fname);return;		
		}else{
			preg_match("/(\.[^.]+$)/",$_FILES[$fname]["name"],$r);
			$ext=$r[1];	
		}
		$newfile=sprintf("%s%s%s",date("YmdHis"),substr(microtime(),2,6),$ext);
		if(!move_uploaded_file($_FILES[$fname]["tmp_name"],sprintf("%s%s",$UPPATH,$newfile))){
			$this->ERMESSAGE[]="ファイルがアップロードできませんでした。";$this->ER[$n]=0;$this->errfield[]=sprintf("p_%s",$fname);return;
		}
		$this->v["TMPFILENAME".$fname]=$_FILES[$fname]["name"];
		$this->v["p_".$fname]=$newfile;
		$this->tmpfile[$fname]=$_FILES[$fname]["name"];
	}
	function chkEmailAddr($e,$fname,$ename,$n){
		if($e!=1)return;
		if(!checkEmailAddress($this->v["p_".$fname])){
			$this->ER[$n]=0;
			$this->ERMESSAGE[]=sprintf("%sが無効な形式です。半角英数字で入力してください。",$ename);
			$this->errfield[]=sprintf("p_%s",$fname);
		}
	}
	function chkErrorInitialize(){
		$j=0;
		for($i=0;$i<count($this->m);$i++){
			if(is_array($this->m[$i][4])){
				for($k=0;$k<count($this->m[$i][4]);$k++){
					if(strlen($this->v["p_".$this->m[$i][4][$k]])==0){
						$this->chkErrorCharTxtNum($this->m[$i][2],$this->m[$i][0][$k],$this->m[$i][1],$this->m[$i][7][$k],$this->m[$i][4][$k],$n);
					}else{
						if(ereg('(tel|fax)',$this->m[$i][4][$k]))$this->chkErrorCharTelNum($this->m[$i][2],$this->m[$i][4][$k],$this->m[$i][1],$this->m[$i][7][$k],$j);
						elseif(ereg('zip',$this->m[$i][4][$k]))$this->chkErrorCharZipNum($this->m[$i][2],$this->m[$i][4][$k],$this->m[$i][1],$this->m[$i][7][$k],$j);
					}
				}
			}else{
				if($this->m[$i][0]==7||$this->m[$i][0]==8){
					$this->chkFileupload($this->m[$i][2],$this->m[$i][4],$this->m[$i][1],$this->m[$i][5],$j);
				}elseif($this->m[$i][0]==3){
					$this->chkErrorPulldown($this->m[$i][2],$this->m[$i][0],$this->m[$i][1],"",$this->m[$i][4],$n);
				}else{
					if(strlen($this->v["p_".$this->m[$i][4]])==0)$this->chkErrorCharTxtNum($this->m[$i][2],$this->m[$i][0],$this->m[$i][1],"",$this->m[$i][4],$n);
					else if(ereg('email',$this->m[$i][4]))$this->chkEmailAddr($this->m[$i][2],$this->m[$i][4],$this->m[$i][1],$j);
				}
			}
			$j++;
		}
		if(count($this->ERMESSAGE)==0)$this->mode="conf";
	}
	function checkFieldName($name,$needle){
		return gettype(strpos($name,$needle));
	}
	function dateSearch($y,$m,$d){

		global $HOLIDAYTEXT;
		if(file_exists($HOLIDAYTEXT)){
			$fp=fopen($HOLIDAYTEXT,"r");
			while($f=fgets($fp,1024)){
				if(trim($f)==sprintf("%s.%s.%s",$y,$m,$d)){
					return true;
				}
			}
			fclose($fp);
		}
		return false;
	}
	function makeError(){
		if(count($this->ERMESSAGE)>0){
			$l ="<div class=\"errArea\" id=\"errTitle\"><dl>\n";
			$l.="<dt>入力いただいた内容に不備があります。下記の項目をご確認ください。</dt>\n";
			$l.="<dd><ul>\n";
			for($i=0;$i<count($this->ERMESSAGE);$i++){
				if($this->errfield[$i]!="p_null"){
					if(ereg("(imgfile|pdffile)",$this->errfield[$i]))$this->errfield[$i]=ereg_replace("p_","",$this->errfield[$i]);
					$l.=sprintf("<li rel='%s'><span>%s</span></li>\n",ereg("(checkbox|radio)",$this->errfield[$i])?sprintf("%s0",ereg_replace("p_","",$this->errfield[$i])):$this->errfield[$i],$this->ERMESSAGE[$i]);
				}
			}
			$l.="</ul></dd>\n";
			if(count($this->errfield)>0){
				$RRI=sprintf("[name*='%s']",implode("'],[name*='",$this->errfield));
				$l.=sprintf("<script type=\"text/javascript\">\$(function(){\$(\"%s\").css(\"backgroundColor\",\"#ffefef\");\$(\"%s\").parents(\"dl\").css(\"backgroundColor\",\"#fff9fa\");});</script>",$RRI,$RRI,$RRI);
			}
			$l.="</dl></div>\n";
			echo $l;
		}
	}

	function p_hidden($f){
		$r="";
		while(list($k,$v)=each($f)){
		  if(!(int)$k){
			  if(!is_array($v))$r.="<input type=\"hidden\" name=\"".$k."\" value=\"".htmlspecialchars($v)."\">\n";
			  else for($j=0;$j<count($v);$j++)$r.="<input type=\"hidden\" name=\"".$k."[]\" value=\"".htmlspecialchars($v[$j])."\">\n";
		  }
		}
		return $r;
	}
	
	function fileMove($name){
		global $RAWDATA,$UPPATH;
		if(copy(sprintf("%s%s",$UPPATH,$this->POST["p_".$name]),sprintf("%s%s",$RAWDATA,$this->POST["p_".$name]))){
			$this->delfile[]=sprintf("%s%s",$UPPATH,$this->POST["p_".$name]);
			return $this->POST["TMPFILENAME".$name];
		}else{
			$this->ERRMSG="アップロードファイルの移動に失敗しました。<br />お手数ですが時間を空けてもう一度お試しください。";
		}
	}

	function makeMailBody($a,$b,$c="",$d=""){
		$max=0;
		
		if($c==""){		
			$l=sprintf("■フォーム送信情報\n└──────────────────────────────────\n送信日時　：%s\n送信Ｎｏ　：%s\n\n",$a,$b);
		}else{
			$l=sprintf("■フォーム送信情報\n└──────────────────────────────────\n送信日時　：%s\n送信Ｎｏ　：%s\nお客様ＩＤ：%s\n\n",$a,$b,$c);
		}
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]!=6&&$this->m[$i][0]!=4){
				$s=mb_strlen($this->m[$i][1]);
				if($s>$max)$max=$s;
			}
		}
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]==6){
				$l.=sprintf("\n■%s\n└──────────────────────────────────\n",$this->m[$i][1]);
			}elseif($this->m[$i][0]==4){

			}elseif($this->m[$i][0]==7){
				for($j=mb_strlen($this->m[$i][1]);$j<$max;$j++){
					$t.="　";
				}
				$l.=sprintf("%s%s：%s\n",$this->m[$i][1],$t,$this->fileMove($this->m[$i][4]));
			}elseif($this->m[$i][0]==8){
				for($j=mb_strlen($this->m[$i][1]);$j<$max;$j++){
					$t.="　";
				}
				$l.=sprintf("%s%s：%s\n",$this->m[$i][1],$t,$this->fileMove($this->m[$i][4]));
			}elseif($this->m[$i][0]==9){
				for($j=mb_strlen($this->m[$i][1]);$j<$max;$j++){
					$t.="　";
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
					$l.=sprintf("%s%s：%s\n",$this->m[$i][1],$t,str_replace(array("\r\n","\r","\n")," ",$this->v["p_".$this->m[$i][4]]));
				}else{
					if(gettype(strpos($this->m[$i][4][0],"name"))=="boolean"&&gettype(strpos($this->m[$i][4][0],"kana"))=="boolean"){
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

				$handle=md5($INSERTID);
				
				$sv[$sn[]="id"]=$INSERTID;
				$sv[$sn[]="handle"]=sprintf("'%s'",$handle);
				$sv[$sn[]="sessionid"]=sprintf("'%s'",$this->SESSIONID);
				$sv[$sn[]="fid"]=$this->fid;
				$sv[$sn[]="reftitle"]=sprintf("'%s'",addslashes($REFTITLE));
				$sv[$sn[]="flag"]=1;
				$sv[$sn[]="m_time"]=sprintf("'%s'",$DATE);
				$sv[$sn[]="u_time"]=sprintf("'%s'",$DATE);

				$sql="insert into ".$TN."(".implode(",",$sn).") values(".implode(",",$sv).")";
				//$this->o->query("begin");
				$this->o->query($sql);

				$sql="select max(id) as m from form";
				$this->o->query($sql);
				$f=$this->o->fetch_array(0);
				$e=1;

				if($e){

					$body=$this->info["body"];
					$body=str_replace($BEFOR,$AFTER,$body);
					$body=strs_split($body,140);
					$MAIL=$this->sendMail($this->v["p_email"],sprintf("【ジーピーアセット】%sありがとうございます",$this->info['subject']),$body);

					if($MAIL){

						$AFTER["infobody"]=$this->makeMailBody($DATE,$INSERTID,$handle);
						$body=$this->info["body"];
						$body=str_replace($BEFOR,$AFTER,$body);
						$body=strs_split($body,140);

						$fp=fopen(sprintf("%s%s.csv",$this->SESSIONFILEDIR,$this->SESSIONID),"r");
						$SESSDATA="";
						while($FFF=fgets($fp,2048)){
							$SESSDATA.=$FFF;
						}
						fclose($fp);

						$MAILS=$this->sendMail($this->info['mailto'],sprintf("【Webサイトからのメール】%s",$this->info['subject']),$body,$SESSDATA);
/*
						if($MAILS){

							$this->o->query("commit");
							if(strlen($e)==0){
								$this->ERRMSG="サーバが混雑していてデータベースに接続することができませんでした。お手数ですが時間を空けてもう一度お試しください。";
							}else{
								if(strlen($this->delfile)>0)unlink($this->delfile);
							}
							//メールマガジン解除
							//if($e)if($this->fid==6)$this->o->query(sprintf("delete from form where email='%s' and fid=5",$emailaddr));
						}else{
							//$this->o->query("abort");
							//$this->ERRMSG="お客さまのアドレス宛に自動返信メールをお送りしましたが、サーバ側が混雑していたためデータを処理できなかった可能性があります。<br />大変申し訳ございませんが、時間を空けてもう一度送信してください。";
						}
*/
					}else{
						//$this->o->query("abort");
						$this->ERRMSG="サーバが混雑しているか、メールアドレスに誤りがあるため、メールを送信することができませんでした。<br />お手数ですがご入力いただいたメールアドレスをご確認いただき、時間を空けてもう一度送信してください。";
					}
				}else{
					//$this->o->query("abort");
					$this->ERRMSG="データベースに接続することができませんでした。お手数ですがお問い合わせよりご連絡ください。";
				}
			}else{
				//$this->o->query("abort");
				$this->ERRMSG="データに不整合がありました。<br />お手数ですが、フォーム入力ページからデータを送信してください。";
			}
		}else{
			//$this->o->query("abort");
			$this->ERRMSG="不正なアクセスです。<br />フォーム入力ページからデータを送信してください。";
		}
	}
	
	function sendMail($to,$subject,$body,$f=""){

		global $SITE;
		$sbj=sprintf("=?iso-2022-jp?B?%s?=",base64_encode(mb_convert_encoding($subject,"JIS","UTF-8")));
		$msg=stripslashes($body);
		$msg=mb_convert_encoding($msg,"JIS","UTF-8");
		$header=sprintf("From:=?iso-2022-jp?B?%s?=<%s>\n",base64_encode(mb_convert_encoding($SITE."ウェブサイト","JIS","UTF-8")),$this->info["mailfrom"]);
		$header.=sprintf("Reply-To:%s\n",$this->info["mailfrom"]);
		$header.=sprintf("Return-Path:%s\n",$this->info["mailfrom"]);
		if(strlen($to)==0){
			$to=$this->info["mailto"];
		}
		$header.=sprintf("X-Mailer:PHP/%s\n",phpversion());
		$header.="MIME-Version:1.0\n";
		if(strlen($f)>0){
			$to="gp_hp_echo@gp-asset.co.jp";
			//$to="saegusa@hinata-company.jp";
			$boundary="----=_NextPart_".uniqid(rand(),1);
			$header.="Cc:hitosht@princess-square.co.jp, t-hagio@gp-asset.co.jp, mi-takahashi@gp-asset.co.jp, saegusa@hinata-company.jp\n";
			$header.=sprintf("Content-type:multipart/mixed;boundary=\"%s\"\n",$boundary);
			$body =sprintf("--%s\n",$boundary);
			$body.=sprintf("Content-Type:text/plain;charset=\"ISO-2022-JP\"\n\n%s\n",$msg);
			$body.=sprintf("--%s\n",$boundary);
			$body.=sprintf("Content-Type:application/octet-stream;name=\"%s.csv\"\n",$this->SESSIONID);
			$body.="Content-Transfer-Encoding:base64\n";
			$body.=sprintf("Content-Disposition:attachment;filename=\"%s.csv\"\n\n%s\n\n",$this->SESSIONID,chunk_split(base64_encode($f)));
			$body.=sprintf("--%s\n",$boundary);
			$msg=$body;
		}else{
			$header.="Bcc:psychsa@i.softbank.jp\n";
			$header.="Content-Type:text/plain;charset=\"ISO-2022-JP\"";
		}
		return @mail($to,$sbj,$msg,$header);
	}
	
	function csvDownload(){
		
		global $RAWDATA;
		
		$t[]="\"申し込みNO\"";
		for($i=0;$i<count($this->m);$i++){
			if($this->m[$i][0]!=6)$t[]=sprintf("\"%s\"",$this->m[$i][1]);
		}
		$t[]="\"申し込み日時\"";
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
						$L[]=sprintf("\"%s\"",($e)?implode(" ",$w):"なし");
					}else{
						$L[]=sprintf("\"%s\"",(strlen($f[$this->m[$j][4]])>0)?$f[$this->m[$j][4]]:"なし");
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
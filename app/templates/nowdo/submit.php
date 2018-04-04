<?php

function _sendmail($to,$subject,$body,$from,$reply,$bcc=null){

	$sbj="=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS","UTF-8"))."?=";
	$msg=stripslashes($body);
	$msg=addslashes($msg);
	$msg=mb_convert_encoding($msg,"JIS","UTF-8");
	$header="From:=?iso-2022-jp?B?".base64_encode(mb_convert_encoding("Now Do","JIS","UTF-8"))."?=<".$from.">\n";
  	$header.="Bcc: ".$bcc."\n";
	$header.="Reply-To:".$reply."\n";
	$header.="Return-Path:".$from."\n";
	$header.="Content-Type:text/plain;charset=\"ISO-2022-JP\"";
	return mail($to,$sbj,$msg,$header,sprintf("-f%s",$from));
}

$prefs=array("1"=>"北海道","2"=>"青森県","3"=>"岩手県","4"=>"宮城県","5"=>"秋田県","6"=>"山形県","7"=>"福島県",
			"8"=>"茨城県","9"=>"栃木県","10"=>"群馬県","11"=>"埼玉県","12"=>"千葉県","13"=>"東京都","14"=>"神奈川県",
			"15"=>"新潟県","16"=>"富山県","17"=>"石川県","18"=>"福井県","19"=>"山梨県","20"=>"長野県","21"=>"岐阜県",
			"22"=>"静岡県","23"=>"愛知県","24"=>"三重県","25"=>"滋賀県","26"=>"京都府","27"=>"大阪府","28"=>"兵庫県",
			"29"=>"奈良県","30"=>"和歌山県","31"=>"鳥取県","32"=>"島根県","33"=>"岡山県","34"=>"広島県","35"=>"山口県",
			"36"=>"徳島県","37"=>"香川県","38"=>"愛媛県","39"=>"高知県","40"=>"福岡県","41"=>"佐賀県","42"=>"長崎県",
			"43"=>"熊本県","44"=>"大分県","45"=>"宮崎県","46"=>"鹿児島県","47"=>"沖縄県");

if($_POST["ftype"]==="0"){

	$mail["from"] ="recruit_trainer@nowdo.jp";
	$mail["reply"]="recruit_trainer@nowdo.jp";
	$mail["bcc"]  ="recruit_trainer@nowdo.jp";

	foreach($_POST as $k=>$v){
		$v=preg_replace("/(\r\n|\r)/m","\n",$v);
		if(strlen($v)==0)$v="-";
		if($k=="license")$license=preg_replace("/\n/m","\n　　　　　　　　 ",trim($v));
		elseif($k=="history01")$history01=preg_replace("/\n/m","\n　　　　　　　　 ",trim($v));
		elseif($k=="history02")$history02=preg_replace("/\n/m","\n　　　　　　　　 ",trim($v));
		else ${$k}=$v;
	}

	$subject="【Now Do】トレーナーの応募をいただきありがとうございます";
	$contents="
		$name1 $name2 様

		この度は、Now Do トレーナー募集にご応募いただき、誠にありがとうございます。

		本メールは、応募フォームからご連絡いただいた方に自動で返信を差し上げています。

		以下の内容でご応募承りましたのでご確認お願いいたします。

		3営業日以内に担当者よりご返信いたしますので、今しばらくお待ちください。


		氏名　　　　　： $name1 $name2
		Ｅメール　　　： $email
		電話番号　　　： $tel
		性別　　　　　： $sex
		取得資格　　　： $license
		トレーナー歴　： $history01
		競技歴　　　　： $history02


		■━━━━━━━━━━━━━━━━━
		Now Do 株式会社
		E-mail: recruit_trainer@nowdo.jp
		HP    : http://nowdo.jp/
		━━━━━━━━━━━━━━━━━■
	";

}else{

	$mail["from"] ="contact_facility@nowdo.jp";
	$mail["reply"]="contact_facility@nowdo.jp";
	$mail["bcc"]  ="contact_facility@nowdo.jp";

	foreach($_POST as $k=>$v){
		$v=preg_replace("/(\r\n|\r)/m","\n",$v);
		if(strlen($v)==0)$v="-";
		if($k=="_prefectures")$pref=$prefs[$v];
		elseif($k=="note")$note=preg_replace("/\n/m","\n　　　　　　　　 ",trim($v));
		else ${preg_replace("/^_/","",$k)}=$v;
	}

	$subject="【Now Do】施設の応募をいただきありがとうございます";
	$contents="
		$name0 $name1 様

		この度は、Now Do 施設募集にご応募いただき、誠にありがとうございます。

		本メールは、応募フォームからご連絡いただいた方に自動で返信を差し上げています。

		以下の内容でご応募承りましたのでご確認お願いいたします。

		3営業日以内に担当者よりご返信いたしますので、今しばらくお待ちください。

		施設名称　　　： $name0
		担当者名　　　： $name1 $name2
		住所　　　　　： 〒$postcode $pref $city $address
		Ｅメール　　　： $email
		電話番号　　　： $tel
		備考　　　　　： $note


		■━━━━━━━━━━━━━━━━━
		Now Do 株式会社
		E-mail: contact_facility@nowdo.jp
		HP    : http://nowdo.jp/
		━━━━━━━━━━━━━━━━━■
	";
}

if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
	$res["error"]=1;
	$res["message"]="正しいメールアドレスを入力してください。";
}else{
	$mail["to"]=$email;
	$body=preg_replace("/\t/","",$contents);
	$e=_sendmail($mail["to"],$subject,$body,$mail["from"],$mail["reply"],$mail["bcc"]);
	if(!$e){
		$res["error"]=1;
		$res["message"]="有効なメールアドレスを入力してください。";
	}else{
		$res["error"]=0;
		$res["message"]="ご応募いただき、誠にありがとうございます。<br>自動返信メールを送信いたしましたので内容のご確認をお願いいたします。";
	}
}

print_json($res,"");

?>
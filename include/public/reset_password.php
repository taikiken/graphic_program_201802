<?php

include "conf/config.php";

$err="";
$complete=0;

if(isset($_POST["setting-form-mail"])){
		
	$email = trim($_POST["setting-form-mail"]);
	$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

	$o=new db;
	$o->connect();

	function mailreminder($email,$name,$site_url,$hash){

		$to=$email;
		$subject="【SPORTS BULL】パスワード再設定のお知らせ";
		$body=sprintf("%s様

		この度は SPORTS BULL をご利用いただきまして、誠にありがとうございます。

		お客様のパスワード再設定用URLをお送りいたしますので、下記URLより再設定をお願いいたします。
		%sreset_password/resetting/?m=%s

		ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
		info@sportsbull.jp

		[ご注意]
		こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name, $site_url, $hash);
		$from="noreply@sportsbull.jp";
		$reply="info@sportsbull.jp";
        $bcc="account@sportsbull.jp";

        return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply,$bcc);

	}

	if(strlen($email)==0){
		$err="メールアドレスは必須項目です。";
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$err="正しいメールアドレスを入力してください。";
	}else{

		$sql=sprintf("select id,title from u_member where t1='%s' and flag=1",bind($email));
		$o->query($sql);
		$f=$o->fetch_array();

		if(strlen($f["id"])>0){
			
			$hash=md5($email.date("YmdHis"));		
			$sql=sprintf("insert into u_reminder(userid,hash,regitime) values(%s,'%s',now());",$f["id"],$hash);
			$o->query($sql);
			$e=$o->affected_rows2();

			if($e){	
			
				$e=mailreminder($email,$f["title"], $page['site_url'], $hash);
				if($e){
					$complete=1;
				}else{
					$err="メールを送信できませんでした。時間をおいてもう一度お試しください。";
				}
			}else{
				$err="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
			}

		}else{
			$err=sprintf("入力されたメールアドレス %s では登録がございません。",$email);
		}
	}

}

?>
<?php

$err="";
$complete=0;

if(isset($_POST["setting-form-mail"])){

	$email=trim(htmlspecialchars($_POST["setting-form-mail"]));

	$o=new db;
	$o->connect();

	function mailreminder($email,$name,$site_url,$hash){

		$to=$email;
		$subject="【運動通信】パスワード再設定のお知らせ";
		$body=sprintf("%s様

		この度は運動通信 Crazy for sports をご利用いただきまして、誠にありがとうございます。

		お客様のパスワード再設定用URLをお送りいたしますので、下記URLより再設定をお願いいたします。
		%sreset_password/resetting/?m=%s

		ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
		info@undotsushin.com

		[ご注意]
		こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name, $site_url, $hash);
		$from="noreply@undotsushin.com";
		$reply="info@undotsushin.com";

		return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply);

	}

	if(strlen($email)==0){
		$err="メールアドレスは必須項目です。";
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$err="正しいメールアドレスを入力してください。";
	}else{

		$sql=sprintf("select id,title from repo_n where t1='%s' and flag=1",$email);
		$o->query($sql);
		$f=$o->fetch_array();

		if(strlen($f["id"])>0){

			$hash=md5($email.date("YmdHis"));
			$e=mailreminder($email,$f["title"], $page['site_url'], $hash);
			if($e){
				$sql=sprintf("insert into u_reminder(userid,hash,regitime) values(%s,'%s',now())",$f["id"],$hash);
				$o->query($sql);
				$e=$o->affected_rows2();

				if($e){
					$complete=1;
				}else{
					$err="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}

			}else{
				$err="メールを送信できませんでした。時間をおいてもう一度お試しください。";
			}
		}else{
			$err=sprintf("入力されたメールアドレス %s では登録がございません。",$email);
		}
	}

}

?>
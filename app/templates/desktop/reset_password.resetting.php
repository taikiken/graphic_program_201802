<?php

$o=new db;
$o->connect();

$err="";
$err2="";
$complete=0;

if(isset($_GET["m"])){

	$hash=preg_replace('/\s/','',$_GET["m"]);

	$sql=sprintf("select userid,case when regitime > now() - interval '24 hour' then 1 else 0 end as expire from u_reminder where hash='%s';",$hash);
	$o->query($sql);
	$f=$o->fetch_array();

	$userid=$f["userid"];

	if(strlen($f["userid"])>0){
		if($f["expire"]==1){

		}else{
			$err="パスワードリセットの有効期限が過ぎています。";
		}
	}else{
		$err="指定されたURLは無効です。";
	}

}elseif(isset($_POST["setting-form-pw1"])){

	$userid=$_POST["userid"];
	$passwd=trim($_POST["setting-form-pw1"]);
	$err2=check_passwd($passwd);

	if($err2==""){
		if($_POST["setting-form-pw1"]==$_POST["setting-form-pw2"]){

			include "conf/config.php";

			$sql=sprintf("select t1 from repo_n where id=%s",$userid);
			$o->query($sql);
			$f=$o->fetch_array();

			$pass1=md5($f["t1"].$passwd);
			$pass2=md5($MAGIC_STRING.$passwd);

			$sql=sprintf("update repo_n set a15='%s',passwd='%s' where id=%s",$pass1,$pass2,$userid);
			$o->query($sql);
			$e=$o->affected_rows2();

			if($e){
				$complete=1;
			}else{
				$err2="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
			}

		}else{
			$err2="パスワードが一致しません。";
		}
	}
}

if($complete==0){

?>
  <header class="signup-header">
    <h1 class="heading">運動通信</h1>
  </header><!-- /.signup-header -->

  <div class="body-sec">
    <div class="body-sec-inner">
      <div class="signup-heading">
        <h1>パスワードをリセットする</h1>
      </div><!-- /.signup-heading -->
      <div class="pw-reset setting-form">
<?php if($err==""){ ?>
        <p class="mt40"><?php echo $err2==""?"新しいパスワードを入力してください。":$err2; ?></p>
        <form action="/reset_password/resetting/" method="post" enctype="application/x-www-form-urlencoded">
          <div class="setting-form">
            <span class="form-parts">
              <span class="setting-form-pw">
                <input type="password" id="setting-form-pw1" name="setting-form-pw1" placeholder="新しいパスワードを入力 (半角英数8文字以上)" value="<?=htmlspecialchars(trim($_POST["setting-form-pw1"]))?>">
              </span>
            </span>
            <span class="form-parts">
              <span class="setting-form-pw">
                <input type="password" id="setting-form-pw2" name="setting-form-pw2" placeholder="再度パスワードを入力" value="<?=htmlspecialchars(trim($_POST["setting-form-pw2"]))?>">
        		  <input type="hidden" name="userid" value="<?=$userid?>">
              </span>
            </span>
            <div class="form-parts form-submit-parts">
              <span class="setting-form-submit mod-btnB01">
                <input type="submit" value="保存する">
              </span>
            </div>
          </div><!-- /.setting-form -->
        </form>
<?php }else{ ?>
		<p class="mt40"><?=$err?></p>
<?php } ?>
        </div><!-- /.pw-reset -->
    </div>
  </div><!-- /.body-sec -->
<?php

}else{

  include_once __DIR__."/reset_password.resetting.complete.php";

}

?>
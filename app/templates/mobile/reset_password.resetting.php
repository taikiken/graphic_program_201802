<?php
// --------------------------------------------------------
//  再設定 パスワードをリセットする
// --------------------------------------------------------

include "public/password_setting.php";

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

<?php if($err==""){ ?>

    <div class="pw-reset setting-form">
      <p class="lead t-center">
        <?php echo $err2==""?"新しいパスワードを入力してください。":$err2; ?>
      </p>
      <form action="/reset_password/resetting/" method="post" enctype="application/x-www-form-urlencoded">

        <div class="setting-form">
            <span class="setting-form-pw">
              <input type="password" id="setting-form-pw1" name="setting-form-pw1" placeholder="新しいパスワードを入力 (半角英数8文字以上)" value="<?=htmlspecialchars(trim($_POST["setting-form-pw1"]))?>">
            </span>
            <span class="setting-form-pw">
              <input type="password" id="setting-form-pw2" name="setting-form-pw2" placeholder="再度パスワードを入力" value="<?=htmlspecialchars(trim($_POST["setting-form-pw2"]))?>">
              <input type="hidden" name="userid" value="<?=$userid?>">
              <input type="hidden" name="hash" value="<?=$hash?>">
            </span>
            <span class="setting-form-submit mod-btnB01">
              <input type="submit" value="保存する">
            </span>

<?php }else{ ?>
          <p class="mt40"><?=$err?></p>
<?php } ?>

        </div><!-- /.setting-form -->
      </form>
    </div><!-- /.pw-reset -->
  </div>
</div><!-- /.body-sec -->
<?php

}else{
  include_once __DIR__."/reset_password.resetting.complete.php";
}

?>
<?php
// --------------------------------------------------------
//  パスワードをリセットする
// --------------------------------------------------------

/*


下記のコードを書き換える場合はpc/sp版も同様に修正すること


*/

include "public/reset_password.php";

if($complete==0){

?>
  <header class="signup-header">
    <h1 class="heading"><a href="/">SPORTS BULL</a></h1>
  </header><!-- /.signup-header -->

  <div class="body-sec">
    <div class="body-sec-inner">
      <div class="signup-heading">
        <h1>パスワードをリセットする</h1>
      </div><!-- /.signup-heading -->

      <div class="pw-reset setting-form">
        <p class="mt40">あなたのアカウントに登録されているメールアドレスにパスワード再発行の手順を送信します。下記のフォームにご登録のメールアドレスを入力して送信するボタンをクリックしてください。</p>
        <form action="/reset_password/" method="post" enctype="application/x-www-form-urlencoded">
          <div class="register-mail setting-form">
            <fieldset class="fieldset-step-1">
              <span class="form-parts">
                <span class="setting-form-mail">
                  <input type="text" id="setting-form-mail" name="setting-form-mail" placeholder="メールアドレスを入力" value="<?=$email?>">
                </span>
              </span>
              <span className="form-parts align-right">
                <span class="setting-form-submit mod-btnB02">
                  <input type="submit" value="送信">
                </span>
              </span>
            </fieldset>
          </div><!-- /.register-mail -->
  		<?php if($err!=""){ ?>
  		<p class="mt20"><?=$err?></p>
        <?php } ?>
        </form>
      </div><!-- /.pw-reset -->
    </div>
  </div><!-- /.body-sec -->
<?php
}else{

  include_once __DIR__."/reset_password.complete.php";

}
?>
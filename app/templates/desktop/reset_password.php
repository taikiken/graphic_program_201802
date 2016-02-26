<?php
// --------------------------------------------------------
//  パスワードをリセットする
// --------------------------------------------------------
/*


完了画面URLわけてますが処理的に同一でも問題ないかと思います。


*/
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
        <p class="mt40">あなたのアカウントに登録されているメールアドレスにパスワード再発行の手順を送信します。下記のフォームにご登録のメールアドレスを入力して送信するボタンをクリックしてください。</p>
        <form action="/reset_password/complete/" method="post" enctype="application/x-www-form-urlencoded">
          <div class="register-mail setting-form">
            <form action="">
              <fieldset class="fieldset-step-1">
                <span class="form-parts">
                  <span class="setting-form-mail">
                    <input type="text" id="setting-form-mail" name="setting-form-mail" placeholder="メールアドレスを入力">
                  </span>
                </span>
                <span className="form-parts align-right">
                  <span class="setting-form-submit mod-btnB01">
                    <input type="submit" value="送信">
                  </span>
                </span>
              </fieldset>
            </form>
          </div><!-- /.register-mail -->
        </form>
      </div><!-- /.pw-reset -->
    </div>
  </div><!-- /.body-sec -->

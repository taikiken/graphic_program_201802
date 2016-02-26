<?php
/*


完了画面URLわけてますが処理的に同一でも問題ないかと思います。


*/
?>
<div class="signup">
  <header class="signup-header">
    <h1 class="heading">運動通信</h1>
  </header><!-- /.signup-header -->

  <div class="body-sec">
    <div class="body-sec-inner">
      <div class="signup-heading">
        <h1>パスワードをリセットする</h1>
      </div><!-- /.signup-heading -->

      <div class="pw-reset setting-form">
        <p class="mt40">新しいパスワードを入力してください。</p>
        <form action="/reset_password/resetting/complete/" method="post" enctype="application/x-www-form-urlencoded">
          <div class="setting-form">
            <form action="">
              <span class="form-parts">
                <span class="setting-form-pw">
                  <input type="password" id="setting-form-pw1" name="setting-form-pw1" placeholder="新しいパスワードを入力 (半角英数8文字以上)">
                </span>
              </span>
              <span class="form-parts">
                <span class="setting-form-pw">
                  <input type="password" id="setting-form-pw2" name="setting-form-pw2" placeholder="再度パスワードを入力">
                </span>
              </span>
              <div class="form-parts form-submit-parts">
                <span class="setting-form-submit mod-btnB01">
                  <input type="submit" value="保存する">
                </span>
              </div>
            </form>
          </div><!-- /.setting-form -->
        </form>
      </div><!-- /.pw-reset -->
    </div>
  </div><!-- /.body-sec -->
</div>
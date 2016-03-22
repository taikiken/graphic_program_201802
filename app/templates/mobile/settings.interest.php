<?php
/*
 * SP アカウント設定, 興味のある競技
 */
?>
<div class="body-sec">
  <div class="body-sec-inner setting-bg">
    <div class="category-heading">
      <h1>アカウント設定</h1>
    </div><!-- /.category-heading -->

    <section class="main-sec">

      <div class="setting-sec">
        <nav class="setting-side-nav">
          <ul class="setting-side-nav-list">
            <li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-basic" href="/settings/"><span>基本情報設定</span></a></li>
            <li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-interest current" href="/settings/interest/"><span>パーソナライズ設定</span></a></li>
            <?php //<li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-sns" href="/settings/social/"><span>ソーシャル連携</span></a></li> ?>
          </ul>
        </nav><!-- /.setting-side-nav -->

        <div class="setting-main">
          <p class="interest-setting-lead">興味のある競技を選択してください。<br>
            設定内容はあなたの一面に反映されます。</p>

          <div id="setting-form-container"></div>

        </div><!-- /.setting-main -->

    </section><!-- /.main-sec -->

  </div>
</div><!-- /.body-sec -->
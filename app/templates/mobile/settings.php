<?php
/*
 * SP アカウント設定
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
            <li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-basic current" href="/settings/"><span>基本情報設定</span></a></li>
            <li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-interest" href="/settings/interest/"><span>パーソナライズ設定</span></a></li>
            <?php //<li class="setting-side-nav-item"><a class="setting-side-nav-link setting-side-nav-sns" href="/settings/social/"><span>ソーシャル連携</span></a></li> ?>
          </ul>
        </nav><!-- /.setting-side-nav -->

        <div class="setting-main">

          <div id="setting-form-container"></div>

          <p class="setting-form-btn-withdraw"><a href="/settings/deactivate/">退会する</a></p>

        </div><!-- /.setting-main -->

    </section><!-- /.main-sec -->

  </div>
</div><!-- /.body-sec -->
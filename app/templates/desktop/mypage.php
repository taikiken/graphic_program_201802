<?php
// ユーザーページのブックマーク一覧
?>
<div class="user-config">
  <div id="mypage-profile-container"></div>

  <div class="user-config-control">
    <nav class="user-config-nav">
      <a class="user-config-nav-bookmark current" href="/mypage/"><span>ブックマーク</span></a>
      <a class="user-config-nav-activity" href="/mypage/activities/"><span>アクティビティ</span></a>
      <a class="user-config-nav-info" href="/notifications/"><span>お知らせ</span></a>
    </nav>

    <a class="user-config-btn-setting" href="/settings/">アカウント設定</a>
  </div>
</div><!-- /.user-config -->

<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">

      <div id="board-container"></div><!--/archive-->

      <div id="board-container-more"></div><!--/archive-more-->

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->
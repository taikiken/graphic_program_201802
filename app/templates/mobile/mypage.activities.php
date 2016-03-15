<?php
// マイページの自分のアクティビティ一覧
?>

<div class="body-sec">
  <div class="body-sec-inner">

    <div class="category-heading">
      <h1>マイページ</h1>
      <a class="user-btn-setting" href="/settings/">設定</a>
    </div><!-- /.category-heading -->

    <div class="user-config">
      <div id="mypage-profile-container-extend"></div>

      <div class="user-config-control">
        <nav class="user-config-nav">
          <a class="user-config-nav-bookmark" href="/mypage/"><span>ブックマーク</span></a>
          <a class="user-config-nav-activity current" href="/mypage/activities/"><span>アクティビティ</span></a>
        </nav>
      </div>
    </div><!-- /.user-config -->

    <section class="main-sec activity-container">

      <div id="board-container"></div><!--/archive-->

      <div id="board-container-more"></div><!--/archive-more-->

    </section><!-- /.main-sec -->


  </div>
</div><!-- /.body-sec -->
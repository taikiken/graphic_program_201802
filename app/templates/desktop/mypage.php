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
      <div class="sponsor-link">
        <?php
        /*
        #680 https://github.com/undotsushin/undotsushin/issues/680#issuecomment-217601849
        Adsense 差し替え
        */
        ?>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- デスクトップ - サイドバー - 上 -->
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:250px"
             data-ad-client="ca-pub-8613117509675807"
             data-ad-slot="8203159173"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 運動通信をアプリでサクサク楽しむ！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->
      <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div id="widget-recommend-container"></div><!--/videos-->
      <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div class="sponsor-link nadir">
        <?php
        /*
        #680 https://github.com/undotsushin/undotsushin/issues/680#issuecomment-217601849
        Adsense 差し替え
        */
        ?>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- デスクトップ - サイドバー - 下 -->
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:600px"
             data-ad-client="ca-pub-8613117509675807"
             data-ad-slot="5110091971"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->
<div class="dialogue-notice error">
  <div class="dialogue-notice-inner">
    <div class="dialogue-notice-info">
      <p>パスワードが違います</p>
    </div>
    <div class="dialogue-notice-btn-close"><a href="#">CLOSE</a></div>
  </div>
</div><!-- /.dialogue-notice -->

<div class="category-heading">
  <h1>
    <?php echo $page['title']; ?>
  </h1>
</div><!-- /.category-heading -->

<?php
echo '<!--';
var_dump($page);
echo '-->';
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

        <div class="post-content">
          <?php
          // PHP 出力対象
          echo '<p style="color: red">php で 出力</p>';
          ?>
        </div><!-- /.post-content -->

        <div class="sponsor-link">
          <a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-710x78.jpg" alt=""></a>
        </div>

        <div id="single-footer-container"></div>

        <div class="post-sns">
          <ul class="post-sns-list">
            <li class="post-sns-tw"><a href="hoge">twitter</a></li>
            <li class="post-sns-fbshare"><a href="hoge">facebook</a></li>
            <li class="post-sns-fbgood"><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></li>
            <li class="post-sns-gt"><div class="g-plusone" data-size="tall"></div></li>
          </ul>
        </div><!-- /.post-sns -->

      </div><!-- /.post-detail -->
      <div class="comment">

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->

      <div id="single-related-container"></div>

    </section><!-- /.main-sec -->

    <section class="side-sec">
      <div class="sponsor-link"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_1.jpg" alt=""></a></div>

      <div class="app-bnr"><a href="hoge"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 データ先読みで、電車でもサクサク記事が読める！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->

      <div id="widget-recommend-container"></div><!--/videos-->

      <div class="sponsor-link nadir"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_2.jpg" alt=""></a></div>
    </section><!-- /.side-sec -->
  </div>
</div><!-- /.body-sec -->

<?php
// --------------------------------------------------------
//  記事詳細
// --------------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">

      <div id="single-visual-container"></div>

      <div class="post-kv">
        <img src="/assets/images/dummy/kv-710x400.jpg" alt="">
      </div><!-- /.post-kv -->

      <div class="post-detail">

        <div id="single-header-container"></div>


        <?php if (0): ?>
          <div class="post-heading">
            <h1>ダミータイトルダミータイトルダミータイトルダミータイトル</h1>
          </div><!-- /.post-heading -->

          <div class="post-data">
            <div class="f-left">
              <p class="post-author">運動通信編集部</p>
              <p class="post-category">海外サッカー オリンピック</p>
              <p class="post-date">12月18日(金) 22:04</p>
            </div>

            <div class="f-right">
              <div class="btn-bookmark"><a class="enable" href="#"><span>ブックマークする</span></a></div>
            </div>
          </div><!-- /.post-data -->

        <?php endif ?>

        <div class="post-sns_upper">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fb"><a href="http://www.facebook.com/share.php" target="_blank"><span>facebook</span></a></li>
            <li class="post-sns-item post-sns-item_tw"><a href="http://twitter.com/share?&text=【ツイート文】" target="_blank"><span>ツイート</span></a></li>
            <li class="post-sns-item post-sns-item_gt"><a href="https://plus.google.com/share" target="_blank"><span>Google+</span></a></li>
            <li class="post-sns-item post-sns-item_line"><a href="http://line.me/R/msg/text/" target="_blank"><span>LINEへ送る</span></a></li>
          </ul>
        </div>

        <div class="post-content">
          <?php print_r($page['post']['body']); ?>
        </div><!-- /.post-content -->

        <div class="sponsor-link">
          <a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-710x78.jpg" alt=""></a>
        </div>

        <div class="post-sns_lower">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-tw"><a href="hoge">twitter</a></li>
            <li class="post-sns-item post-sns-fbshare"><a href="hoge">facebook</a></li>
            <li class="post-sns-item post-sns-fbgood"><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></li>
            <li class="post-sns-item post-sns-gt"><div class="g-plusone" data-size="tall"></div></li>
          </ul>
        </div><!-- /.post-sns -->
      </div><!-- /.post-detail -->

      <div class="comment">

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->


    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

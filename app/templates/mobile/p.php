<?php
// --------------------------------------------------------
//  記事詳細
// --------------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">

      <div id="single-visual-container"></div>

      <div class="post-detail">

        <div id="single-header-container"></div>

        <div class="post-sns_upper">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fb"><a href="http://www.facebook.com/share.php" target="_blank"><span>facebook</span></a></li>
            <li class="post-sns-item post-sns-item_tw"><a href="http://twitter.com/share?&text=【ツイート文】" target="_blank"><span>ツイート</span></a></li>
            <li class="post-sns-item post-sns-item_gt"><a href="https://plus.google.com/share" target="_blank"><span>Google+</span></a></li>
            <li class="post-sns-item post-sns-item_line"><a href="http://line.me/R/msg/text/" target="_blank"><span>LINEへ送る</span></a></li>
          </ul>
        </div>

        <div id="post-content-container" class="post-content excerpt">
          <?php print_r($page['post']['body']); ?>
        </div><!-- /.post-content -->
        <div id="post-content-read-more"></div>

        <div class="sponsor-link">
          <a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-710x78.jpg" alt=""></a>
        </div>

        <div class="post-sns_lower">
          <div class="post-sns-list">
            <div class="post-sns-fixed">
              <div class="post-sns-item_fbgood"><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></div>
            </div>

            <div class="post-sns-flex">
              <div class="post-sns-flex-inner">
                <ul class="post-sns-flex-list">
                  <li class="post-sns-item post-sns-item_fb"><a href="http://www.facebook.com/share.php" target="_blank"><span>facebook</span></a></li>
                  <li class="post-sns-item post-sns-item_tw"><a href="http://twitter.com/share?&text=【ツイート文】" target="_blank"><span>ツイート</span></a></li>
                  <li class="post-sns-item post-sns-item_gt"><a href="https://plus.google.com/share" target="_blank"><span>Google+</span></a></li>
                  <li class="post-sns-item post-sns-item_line"><a href="http://line.me/R/msg/text/" target="_blank"><span>LINEへ送る</span></a></li>
                </ul>
              </div>
            </div>
          </div><!-- /.post-sns-list -->

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt><span>運動通信を<strong>いいね</strong>して<br>最新ニュースをチェック！</span></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
          </div><!-- /.post-sns-pr -->
        </div><!-- /.post-sns_lower -->
      </div><!-- /.post-detail -->

      <div class="comment">

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->

      <div class="related-post">
        <div class="comment-heading">
          <h2>関連ニュース</h2>
        </div><!-- /.comment-heading -->

        <ul class="board-small column2">
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb"><img src="/assets/images/dummy/thumb-70x70_1.jpg" alt=""></figure>
              <div class="post-data">
                <p class="post-category">野球</p>
                <h3 class="post-heading">全角３６文字タイトルが入りますタイトルが入りますタイトルが入りますタイ…</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb"><img src="/assets/images/dummy/thumb-70x70_2.jpg" alt=""></figure>
              <div class="post-data">
                <p class="post-category">MLB</p>
                <h3 class="post-heading">タイトル１行の場合タイトルが入ります</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb"><img src="/assets/images/dummy/thumb-70x70_3.jpg" alt=""></figure>
              <div class="post-data">
                <p class="post-category">格闘技</p>
                <h3 class="post-heading">全角３６文字タイトルが入りますタイトルが入りますタイトルが入りますタイ…</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb"><img src="/assets/images/dummy/thumb-70x70_4.jpg" alt=""></figure>
              <div class="post-data">
                <p class="post-category">ラグビー</p>
                <h3 class="post-heading">全角３６文字タイトルが入りますタイトルが入りますタイトルが入りますタイ…</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb"><img src="/assets/images/dummy/thumb-70x70_5.jpg" alt=""></figure>
              <div class="post-data">
                <p class="post-category">モータースポーツ</p>
                <h3 class="post-heading">全角３６文字タイトルが入りますタイトルが入りますタイトルが入りますタイ…</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
          <li class="board-item">
            <a class="post" href="hoge">
              <figure class="post-thumb">&nbsp;</figure>
              <div class="post-data">
                <p class="post-category">海外サッカー</p>
                <h3 class="post-heading">全角３６文字タイトルが入りますタイトルが入りますタイトルが入りますタイ…</h3>
                <p class="post-date">12月18日(金) 22:04</p>
              </div><!-- /.post-data -->
            </a>
          </li>
        </ul>

      </div><!-- /.related-post -->

    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

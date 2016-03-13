<div class="category-heading">
  <h1>
    <?php echo $page['category']['label']; ?>
  </h1>
</div><!-- /.category-heading -->

<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

        <div class="post-content">
          <?php print_r($page['post']['body']); ?>
        </div><!-- /.post-content -->

        <div class="sponsor-link">
          <a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-710x78.jpg" alt=""></a>
        </div>

        <div id="single-footer-container"></div>

        <div class="post-sns">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fbgood"><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></li>
            <li class="post-sns-item post-sns-item_tw"><a href="http://twitter.com/share?&text=【ツイート文】" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow"><span>ツイート</span></a></li>
            <li class="post-sns-item post-sns-item_fb"><a href="http://www.facebook.com/share.php" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow">facebook</a></li>
            <li class="post-sns-item post-sns-item_gt"><a href="https://plus.google.com/share" onClick="window.open(encodeURI(decodeURI(this.href)), 'GooglePluswindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">Google+</a></li>
            <li class="post-sns-item post-sns-item_line"><a href="http://line.me/R/msg/text/" onClick="window.open(encodeURI(decodeURI(this.href)), 'LINEwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow"><span>LINEへ送る</span></a></li>
          </ul>

          <dl class="post-sns-pr">
            <dt><img src="/assets/images/detail/post-sns-lead.png" alt="運動通信を いいね して最新ニュースをチェック！"></dt>
            <dd>
              <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
            </dd>
          </dl><!-- /.post-sns-pr -->
        </div><!-- /.post-sns -->

      </div><!-- /.post-detail -->
      <div class="comment">

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->

      <?php
      /*
      必要ないとのことなので front からの出力をやめる
      静的HTMLに置きかえる
      <div id="single-related-container"></div>
      */ ?>

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

    <section class="side-sec">
      <div class="sponsor-link"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_1.jpg" alt=""></a></div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 データ先読みで、電車でもサクサク記事が読める！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->

      <div id="widget-recommend-container"></div><!--/videos-->

      <div class="sponsor-link nadir"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_2.jpg" alt=""></a></div>
    </section><!-- /.side-sec -->
  </div>
</div><!-- /.body-sec -->

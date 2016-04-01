<div class="category-heading">
  <h1>
    <?php echo $page['category']['label']; ?>
    <?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
      <span class="category-heading-image">
        <img src="<?php echo $page['category']['title_img']; ?>" alt="" />
      </span>
    <?php endif; ?>
  </h1>
</div><!-- /.category-heading -->

<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

        <div class="sponsor-link">
          <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35118&targetID=adg_35118&displayid=1&adType=PC&width=728&height=90&sdkType=3&async=false&tagver=2.0.0"></script>
        </div>

        <div id="comment-normal-container"></div>

        <div class="post-sns">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fbgood">
              <div class="fb-like" data-href="<?php echo $page['og_url']; ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
            </li>
            <?php

            // PC版はjsで行うのでTwitter textをencodeしない = 「/」対策

            ?>
            <li class="post-sns-item post-sns-item_tw">
              <a href="http://twitter.com/share?text=<?php echo $page['og_title']; ?>&url=<?php echo $page['og_url']; ?>&via=undotsushin" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">
                <span>ツイート</span>
              </a>
            </li>
            <li class="post-sns-item post-sns-item_fb">
              <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow">facebook</a>
            </li>
            <li class="post-sns-item post-sns-item_gt">
              <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" onClick="window.open(encodeURI(decodeURI(this.href)), 'GooglePluswindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">Google+</a>
            </li>
            <li class="post-sns-item post-sns-item_line" style="line-height:0;">
              <div class="line-it-button" style="display: none;" data-type="share-e" data-lang="ja"></div>
            </li>
          </ul>

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt>運動通信を<strong>いいね</strong>して<br />
                最新ニュースをチェック！</dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
          </div><!-- /.post-sns-pr -->
        </div><!-- /.post-sns -->

        <div class="sponsor-link">
          <div class="sponsor-link column2">
            <div class="sponsor-link-item">
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35119&targetID=adg_35119&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
            </div>
            <div class="sponsor-link-item">
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35120&targetID=adg_35120&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
            </div>
          </div>
        </div>

      </div><!-- /.post-detail -->

    </section><!-- /.main-sec -->

    <section class="side-sec">
      <div class="sponsor-link">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=34749&targetID=adg_34749&displayid=1&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 データ先読みで、電車でもサクサク記事が読める！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->
      <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div id="widget-recommend-container"></div><!--/videos-->
      <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div class="sponsor-link nadir">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35117&targetID=adg_35117&displayid=3&adType=PC&width=300&height=600&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>
    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

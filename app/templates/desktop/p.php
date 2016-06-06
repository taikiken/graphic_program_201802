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
    <?php
    // ----------------------------------------------------
    // 記事詳細: pc
    // response.theme.images.pc
    // response.description
    if ( !empty( $page[ 'post' ] ) && !empty( $page[ 'post' ][ 'theme' ] ) && !empty( $page[ 'post' ][ 'theme' ][ 'images' ] ) && !empty( $page[ 'post' ][ 'theme' ][ 'images' ][ 'pc' ] ) ) : ?>
      <div class="special-summary" style="<?php echo $page[ 'post' ][ 'theme' ][ 'background_color' ] ? 'background-color: ' . $page[ 'post' ][ 'theme' ][ 'background_color' ] : ''; ?>">
        <h1 class="special-summary-heading"><img src="<?php echo $page[ 'post' ][ 'theme' ][ 'images' ][ 'pc' ]; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
      </div>
    <?php endif;
    // eof: 記事詳細: pc
    // ---------------------------------------------------- ?>
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

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

        <div class="sponsor-link w728">

          <?php
          /*
          # pc_single_top
          */
          ?>
          <script type='text/javascript'>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/pc_single_top', [728, 90], 'div-gpt-ad-pc_single_top').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.pubads().collapseEmptyDivs();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-pc_single_top' style='height:90px; width:728px;'>
          <script type='text/javascript'>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_single_top'); });
          </script>
          </div>

        </div>

        <?php /* div.post-kv */ ?>
        <div id="single-visual-container"></div>

        <div class="post-content">
          <?php if ( empty($page['post']['body']) ) {
            // empty の時に 404表示
            ?>
            <h2 class="mt50 bold f20">お探しのページは見つかりません</h2>
            <p>お探しのページは一時的にアクセスができない状況にあるか、移動もしくは削除された可能性があります。</p>

            <div class="mod-btnA01 mt30">
              <a href="/">TOPに戻る</a>
            </div><!-- /.mod-btnA01 -->
          <?php
          } else {
            print_r($page['post']['body']);
          }
          ?>
        </div><!-- /.post-content -->

        <?php
        // ----------------------------------------------------
        // 記事詳細: pc 媒体ロゴ
        if ( !empty( $page['post'] ) && !empty( $page['post']['user'] ) ) :
        ?>
        <div class="provider mt30">
          <?php
          // user.logo.image
          if ( !empty( $page['post']['user']['logo'] ) && !empty( $page['post']['user']['logo']['img'] ) ) :
          ?>
            <i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i>
          <?php endif;
          //----[image] ?>
          <div class="provider-data">
            <?php
            // user.name
            if ( !empty($page['post']['user']['name']) ) :
            ?>
            <p class="provider-name"><?php echo $page['post']['user']['name']; ?></p>
            <?php
            endif;
            //----[name]

            // user.logo.link
            if ( !empty( $page['post']['user']['logo'] ) && !empty( $page['post']['user']['logo']['link'] ) ) :
            ?>
            <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" target="_blank"><?php echo $page['post']['user']['logo']['link']; ?></a></p>
            <?php
            endif;
            //----[link] ?>
          </div>
        </div><!-- /.provider -->
        <?php
        endif;
        // eof: 記事詳細: pc 媒体ロゴ
        // ---------------------------------------------------- ?>
        <div id="single-footer-container"></div>

        <div class="post-sns">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fbgood">
              <div class="fb-like" data-href="<?php echo $page['og_url']; ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
            </li>
            <?php

            // PC版はjsで行うのでTwitter textをencodeしない = 「/」対策

            ?>
            <li class="post-sns-item post-sns-item_tw">
              <a href="http://twitter.com/share?text=<?php echo $page['og_title']; ?>&url=<?php echo $page['og_url']; ?>&via=undotsushin" onClick="ga('send', 'event', 'Share_twitter', 'twitter_tap', <?php echo $page['og_url']; ?>); window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">
                <span>ツイート</span>
              </a>
            </li>
            <li class="post-sns-item post-sns-item_fb">
              <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow">facebook</a>
            </li>
            <li class="post-sns-item post-sns-item_gt">
              <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" onClick="ga('send', 'event', 'Share_facebook', 'facebook_tap', <?php echo $page['og_url']; ?>); window.open(encodeURI(decodeURI(this.href)), 'GooglePluswindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">Google+</a>
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

      pop in 始まったようなのでコメントにする
      ToDo: 削除可能確認できたらブロックごと削除する

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
*/ ?>

      <!-- #310 popin ebmed code  -->
      <?php if ( $page['category']['label'] ) : ?>
      <div id="_popIn_category" style="display:none;"><?php echo $page['category']['label']; ?></div>
      <?php endif; ?>
      <div id="_popIn_recommend"></div>
      <script type="text/javascript">
        (function() {
          var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
              pa.src = window.location.protocol + "//api.popin.cc/searchbox/undotsushin.js";
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
        })();
      </script>
      <!-- //#310 popin ebmed code  -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

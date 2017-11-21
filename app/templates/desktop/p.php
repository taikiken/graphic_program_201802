<?php

// @since 2016-09-30 省略された
//include_once __DIR__.'/_category-heading.php';

?>

<div class="body-sec">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事詳細: pc
    // response.theme.images.pc
    // response.description
    if ( $page['theme']['images']['pc'] ) :
    // 記事詳細で冒頭バナーにリンク設定
    // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616 ?>
      <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['theme']['background_color'] : ''; ?>">
        <a href="/category/<?php echo $page['category']['slug']; ?>"><h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['pc']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1></a>
      </div>
    <?php endif;
    // eof: 記事詳細: pc
    // ---------------------------------------------------- ?>
    <section class="main-sec">
      <div id="js-current-post" class="current-post">
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
              <li class="post-sns-item post-sns-item_fb">
                <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow">facebook</a>
              </li>
              <li class="post-sns-item post-sns-item_tw">
                <a href="http://twitter.com/share?text=<?php echo $page['og_title']; ?>&url=<?php echo $page['og_url']; ?>&via=<?php echo $page['sns']['twitter']; ?>" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">
                  <span>ツイート</span>
                </a>
              </li>
              <li class="post-sns-item post-sns-item_gt">
                <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" onClick="window.open(encodeURI(decodeURI(this.href)), 'GooglePluswindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">Google+</a>
              </li>
              <li class="post-sns-item post-sns-item_line">
                <div class="line-it-button" style="display: none;" data-type="share-d" data-lang="ja"></div><script src="//scdn.line-apps.com/n/line_it/thirdparty/loader.min.js" async="async"　defer="defer"></script>
              </li>
            </ul>

            <div class="post-sns-pr">
              <dl class="post-sns-pr-inner">
                <dt><img src="/assets/images/detail/post-sns-lead.png" alt="SPORTS BULLをいいねして最新ニュースをチェック！"></dt>
                <dd>
                  <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
                </dd>
              </dl><!-- /.post-sns-pr-inner -->
            </div><!-- /.post-sns-pr -->
          </div><!-- /.post-sns -->


          <?php
          /*
           * https://github.com/undotsushin/undotsushin/issues/720
           * 広告 / PC版画像バナー広告をDFP管理下にする
           */
          if ( $page['ad']['pc']['single_top'] ) :
          // ------------------------------------
          // single top
          ?>
          <div class="sponsor-link w728">

            <?php
            /*
            # pc_single_top
            */
            ?>
            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/<?php echo $page['ad']['pc']['single_top']; ?>', [728, 90], 'div-gpt-ad-pc_single_top').addService(googletag.pubads());
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
          <?php endif; ?>

          <?php
            // #1602 - VK brightcove
          ?>
          <?php if ( isset($page['post']['media_vk_refid']) && $page['post']['media_vk_refid'] ) : ?>

          <div class="post-content">
            <div class="cms_widget">
              <?php include_once __DIR__."/../specific/_player.php"; ?>
            </div>
          </div>

          <?php else : ?>

          <?php /* 通常画像 or 動画 div.post-kv */ ?>

              <?php if(!isset($_GET['id'])):?>
                  <div id="single-visual-container"></div>
              <?php endif;?>

          <?php endif; ?>

          <div class="post-content">
          <?php if ( $page['post']['is_readmore'] ) : ?>

            <p>
              <?php echo $page['post']['description']; ?>
            </p>

            <p>
              <a id="readMore-external" class="post-content-btn-readMore" href="<?php echo $page['post']['readmore']['url']; ?>" target="_blank">続きを読む(外部サイトへ)</a>
            </p>

          <?php
          else :
              if(count($page['photo']) > 0):
                  // メンテナンス性が悪いのでフォトアルバムファイルを外出し
                  include_once __DIR__ . '/p_photo.php';
              else:
                  print_r($page['post']['body']);
              endif;
          endif;
          ?>
          </div><!-- /.post-content -->

          <?php
          // ----------------------------------------------------
          // 記事詳細: pc 媒体ロゴ
          if ( !empty( $page['post'] ) && !empty( $page['post']['user'] ) ) :

            $is_post_usr_logo = !empty( $page['post']['user']['logo'] );

            $post_user_logo_link = '';
            if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['link'] ) ) {
              $post_user_logo_link = $page['post']['user']['logo']['link'];
            }
            ?>
            <div class="provider mt30">
              <?php
              // user.logo.image
              if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['img'] ) ) :
                if ( empty($post_user_logo_link) ) :
                  // link が存在しないので画像だけ表示します ?>
                  <i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i>
                <?php else: // link + image を表示 ?>
                  <a href="<?php echo $post_user_logo_link; ?>" target="_blank" onclick="UT.Ga.click('provider-logo', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', true);"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i></a>
                <?php endif; ?>
              <?php endif; //----[image] ?>
              <div class="provider-data">
                <?php
                // user.name
                if ( !empty($page['post']['user']['name']) ) : ?>
                  <p class="provider-name"><?php echo $page['post']['user']['name']; ?></p>
                <?php endif; //----[name]

                // user.logo.link
                // link が存在する時のみ表示します
                if ( !empty( $page['post']['user']['logo'] ) && !empty( $page['post']['user']['logo']['link'] ) ) : ?>
                  <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" target="_blank" onclick="UT.Ga.click('provider-url', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', true);">ウェブサイト</a></p>
                <?php endif; //----[link] ?>
              </div>
            </div><!-- /.provider -->
          <?php endif;
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
              <li class="post-sns-item post-sns-item_fb">
                <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow">facebook</a>
              </li>
              <li class="post-sns-item post-sns-item_tw">
                <a href="http://twitter.com/share?text=<?php echo $page['og_title']; ?>&url=<?php echo $page['og_url']; ?>&via=<?php echo $page['sns']['twitter']; ?>" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">
                  <span>ツイート</span>
                </a>
              </li>
              <li class="post-sns-item post-sns-item_gt">
                <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" onClick="window.open(encodeURI(decodeURI(this.href)), 'GooglePluswindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow">Google+</a>
              </li>
              <li class="post-sns-item post-sns-item_line">
                <div class="line-it-button" style="display: none;" data-type="share-d" data-lang="ja"></div>
              </li>
            </ul>

            <div class="post-sns-pr">
              <dl class="post-sns-pr-inner">
                <dt><img src="/assets/images/detail/post-sns-lead.png" alt="SPORTS BULLSPORTS BULLをいいねして最新ニュースをチェック！"></dt>
                <dd>
                  <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
                </dd>
              </dl><!-- /.post-sns-pr-inner -->
            </div><!-- /.post-sns-pr -->
          </div><!-- /.post-sns -->


          <?php
          /*
           * https://github.com/undotsushin/undotsushin/issues/720
           * 広告 / PC版画像バナー広告をDFP管理下にする
           */
          // ------------------------------------
          // single bottom
          if ( $page['ad']['pc']['single_bottom_left'] || $page['ad']['pc']['single_bottom_right'] ) : ?>
          <div class="sponsor-link">
            <div class="sponsor-link column2">

              <?php if ( $page['ad']['pc']['single_bottom_left'] ) : ?>
              <div class="sponsor-link-item">
                <?php
                /*
                # 保険のために original を残します
                # ToDo: いつか削除
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35119&targetID=adg_35119&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
                */ ?>
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['pc']['single_bottom_left']; ?>&targetID=adg_<?php echo $page['ad']['pc']['single_bottom_left']; ?>&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
              </div>
              <?php endif; ?>


              <?php if ( $page['ad']['pc']['single_bottom_right'] ) : ?>
              <div class="sponsor-link-item">

                <!-- 531683568/syn_marketplace/viewable -->
                <script>
                  googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/syn_marketplace/viewable', [300, 250], 'div-gpt-ad-1498628891915-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.pubads().collapseEmptyDivs();
                    googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1498628891915-0' style='height:250px; width:300px;'>
                <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1498628891915-0'); });
                </script>
                </div>
                <!-- //531683568/syn_marketplace/viewable -->

                <?php
                /*
                # 保険のために original を残します
                # ToDo: いつか削除
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35120&targetID=adg_35120&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
                */ ?>
                <?php /*
                #2058 のため一旦非表示に
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['pc']['single_bottom_right']; ?>&targetID=adg_<?php echo $page['ad']['pc']['single_bottom_right']; ?>&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
                */ ?>
              </div>
              <?php endif; ?>

            </div>
          </div>
          <?php
          endif;
          // eof: single bottom
          // ------------------------------------ ?>

        </div><!-- /.post-detail -->
        <div class="comment">

          <div id="comment-self-container"></div>

          <div id="comment-official-container"></div>

          <div id="comment-normal-container"></div>

          <div id="comment-form-container"></div>

        </div><!-- /.comment -->
      </div><!-- /.current-post-->

      <?php
      /*
      @since 2016-09-28
      記事詳細の次の記事
      div#js-singles-container 内に「記事一覧」「オススメ記事」「人気記事」「関連記事」を記入
       */
      ?>
      <div class="singles-next">
        <div id="js-singles-container"></div>
        <div id="js-singles-more"></div>
      </div>

      <?php
      /*
       @since 2016-09-39 記事詳細の次の記事のために以下削除します
      */
      if (0):
      ?>
      <!-- #310 popin ebmed code  -->
      <?php if ( $page['category']['label'] ) : ?>
      <div id="_popIn_category" style="display:none;"><?php echo $page['category']['label']; ?></div>
      <?php endif; ?>
      <div id="_popIn_recommend" class="recommend_articles"></div>
      <script type="text/javascript">
        (function() {
          var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
              pa.src = window.location.protocol + "//api.popin.cc/searchbox/undotsushin.js";
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
        })();
      </script>
      <!-- //#310 popin embed code  -->
      <?php
      endif;
      // 削除 eof
      ?>
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

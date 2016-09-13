<?Php if ( !$page['theme']['images']['pc'] ) : ?>
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
<?php endif; ?>

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
      <div class="post-detail">

        <div id="single-header-container"></div>

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
              <dt><img src="/assets/images/detail/post-sns-lead.png" alt="SPORTS BULLSPORTS BULLをいいねして最新ニュースをチェック！"></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
          </div>
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
              <?php
              /*
              # 保険のために original を残します
              # ToDo: いつか削除
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35120&targetID=adg_35120&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
              */ ?>
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['pc']['single_bottom_right']; ?>&targetID=adg_<?php echo $page['ad']['pc']['single_bottom_right']; ?>&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=false&tagver=2.0.0"></script>
            </div>
            <?php endif; ?>

          </div>
        </div>
        <?php
        endif;
        // eof: single bottom
        // ------------------------------------ ?>

        <br /><br />

      </div><!-- /.post-detail -->

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

<?php
// --------------------------------------------------------
//  記事詳細
// --------------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">

    <?php
    // ----------------------------------------------------
    // 記事詳細: sp
    // response.theme.images.pc
    // response.description
    if ( $page['theme']['images']['sp'] ) : ?>
      <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['theme']['background_color'] : ''; ?>">
        <a href="/category/<?php echo $page['category']['slug']; ?>"><h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1></a>
      </div>
    <?php endif;
    // eof: 記事詳細: sp
    // ---------------------------------------------------- ?>

    <section class="main-sec">

      <div id="single-visual-container"></div>

      <div class="post-detail">

        <div id="single-header-container"></div>

        <div class="post-sns_upper">
          <ul class="post-sns-list">
            <li class="post-sns-item post-sns-item_fb">
              <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" target="_blank">
                <span>facebook</span>
              </a>
            </li>
            <?php

            // スマホ版はTwitter textをencodeする

            ?>
            <li class="post-sns-item post-sns-item_tw">
              <a href="http://twitter.com/share?text=<?php echo urlencode($page['og_title']); ?>&url=<?php echo $page['og_url']; ?>&via=undotsushin" target="_blank">
                <span>ツイート</span>
              </a>
            </li>
            <li class="post-sns-item post-sns-item_gt">
              <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" target="_blank">
                <span>Google+</span>
              </a>
            </li>
            <li class="post-sns-item post-sns-item_line">
              <a href="http://line.me/R/msg/text/?<?php echo rawurlencode($page['og_title'].' '.$page['og_url']); ?>" target="_blank">
                <span>LINEへ送る</span>
              </a>
            </li>
          </ul>
        </div>


        <?php if ( isset($page['post']['readmore']) && $page['post']['readmore']['is_readmore'] && $page['post']['readmore']['url'] ) : ?>

          <div id="post-content-container" class="post-content">

            <p>
              <?php echo $page['post']['description']; ?>
            </p>

            <p>
              <a id="readMore-external" class="post-content-btn-readMore" href="<?php echo $page['post']['readmore']['url']; ?>" target="_blank">続きを読む(外部サイトへ)</a>
            </p>

          </div>

        <?php else : ?>

          <div id="post-content-container" class="post-content excerpt hidden">
            <?php print_r($page['post']['body']); ?>
          </div><!-- /.post-content -->
          <div id="post-content-read-more"></div>

        <?php endif; ?>

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
                <a href="<?php echo $post_user_logo_link; ?>" target="_blank"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i></a>
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
                <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" target="_blank"><?php echo $page['post']['user']['logo']['link']; ?></a></p>
              <?php endif; //----[link] ?>
            </div>
          </div><!-- /.provider -->
        <?php endif;
        // eof: 記事詳細: pc 媒体ロゴ
        // ---------------------------------------------------- ?>

        <div id="post-content-banner"></div>

        <div class="post-sns_lower">
          <div class="post-sns-list">
            <div class="post-sns-fixed">
              <div class="post-sns-item_fbgood"><div class="fb-like" data-href="<?php echo $page['og_url']; ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></div>
            </div>

            <div class="post-sns-flex">
              <div class="post-sns-flex-inner">
                <ul class="post-sns-flex-list">
                  <li class="post-sns-item post-sns-item_fb">
                    <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" target="_blank">
                      <span>facebook</span>
                    </a>
                  </li>
                  <?php

                  // スマホ版はTwitter textをencodeする

                  ?>
                  <li class="post-sns-item post-sns-item_tw">
                    <a href="http://twitter.com/share?text=<?php echo urlencode($page['og_title']); ?>&url=<?php echo $page['og_url']; ?>&via=undotsushin" target="_blank">
                      <span>ツイート</span>
                    </a>
                  </li>
                  <li class="post-sns-item post-sns-item_gt">
                    <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" target="_blank">
                      <span>Google+</span>
                    </a>
                  </li>
                  <li class="post-sns-item post-sns-item_line">
                    <a href="http://line.me/R/msg/text/?<?php echo rawurlencode($page['og_title'].' '.$page['og_url']); ?>" target="_blank">
                      <span>LINEへ送る</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div><!-- /.post-sns-list -->

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt><span>運動通信をいいねして<br>最新ニュースをチェック！</span></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/undotsushin/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
          </div><!-- /.post-sns-pr -->
        </div><!-- /.post-sns_lower -->
      </div><!-- /.post-detail -->

      <div class="comment">

        <?php
        /*
         * https://github.com/undotsushin/undotsushin/issues/720
         * 広告 / PC版画像バナー広告をDFP管理下にする
         */
        // ------------------------------------
        if ( $page['ad']['sp'] ) :
        ?>
        <div class="sponsor-link_commentUpper">
          <?php
          /*
           # 保険のために original を残します
           # ToDo: いつか削除
          <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35245&targetID=adg_35245&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
          */ ?>
          <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['sp']; ?>&targetID=adg_<?php echo $page['ad']['sp']; ?>&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
        </div>
        <?php endif; ?>


        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->
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
  </div>
</div><!-- /.body-sec -->

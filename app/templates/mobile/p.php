<?php
// --------------------------------------------------------
//  記事詳細
// --------------------------------------------------------
?>
<style type="text/css">
  #ima-ad-container{
    /*z-index:-99;*/
  }
  #content_video{
    position: relative;
  }
  #content_video_html5_api_html5_api{
    /*display: none;*/
  }
</style>
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

        <?php if ( isset($page['post']['media_vk_refid']) && $page['post']['media_vk_refid'] ) :
          // #985 - バーチャル高校野球動画記事の場合
          include_once __DIR__."/../specific/_vk_brightcove.php";
        else :
          // 通常画像 or 動画 ?>
          <div id="single-visual-container"></div>
        <?php endif; ?>

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


        <?php if ( $page['post']['is_readmore'] ) : ?>

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
                <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" target="_blank" onclick="UT.Ga.click('provider-logo', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', true);">ウェブサイト</a></p>
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

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

        <?php
        /*
         * https://github.com/undotsushin/undotsushin/issues/720
         * 広告 / PC版画像バナー広告をDFP管理下にする
         */
        // ------------------------------------
        if ( $page['ad']['sp'] ) :
          ?>
          <div class="sponsor-link_commentLower">
            <?php
            /*
             # 保険のために original を残します
             # ToDo: いつか削除
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35245&targetID=adg_35245&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
            */ ?>
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['sp']; ?>&targetID=adg_<?php echo $page['ad']['sp']; ?>&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
          </div>
        <?php endif; ?>

      </div><!-- /.comment -->

      <div id="widget-recommend-list-container"></div><!--/recommend-->
      <div id="widget-ranking-container"></div><!--/ranking-->

      <?php
      #1023 - このコードのままproductionだしてもヨイように検証完了まで分岐かいとく
      ?>
      <?php if ( UT_ENV !== 'PRODUCTION' ) : ?>
      <!-- #1023 Syn.extension  -->
      <div id="logly-lift-4227758" class="recommend_articles"></div>
      <script charset="UTF-8">
        (function(){
          var _lgy_lw = document.createElement("script");
          _lgy_lw.type = "text/javascript";
          _lgy_lw.charset = "UTF-8";
          _lgy_lw.async = true;
          _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4227758";
          var _lgy_lw_0 = document.getElementsByTagName("script")[0];
          _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
        })();
      </script>
      <script type="text/javascript" src="//i.socdm.com/s/so_dmp.js?service_id=un_sports"></script>
      <!-- //#1023 Syn.extension  -->

      <?php else : ?>

      <!-- #310 popin embed code  -->
      <?php if ( $page['category']['label'] ) : ?>
      <div id="_popIn_category" style="display:none;"><?php echo $page['category']['label']; ?></div>
      <?php endif; ?>
      <div id="_popIn_recommend" class="recommend_articles"></div>
      <script type="text/javascript">
        (function() {
          var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
              pa.src = window.location.protocol + "//api.popin.cc/searchbox/undotsushin.js";
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
        })();render

        $('')
      </script>
      <!-- //#310 popin ebmed code  -->

      <?php endif; ?>

    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

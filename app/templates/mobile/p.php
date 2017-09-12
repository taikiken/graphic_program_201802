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
      <?php
      // パンくずメニュー
      // @since 2017-09-11
      include_once __DIR__ . '/p_breadcrumb.php';
      // ---------------------------------------------------- ?>
      <?php
      /*
        @since 2016-11-10
        History API + snap scroll するために現在記事をすべてラップするコンテナ追加
        div.current-post
      */
      ?>
      <div id="js-current-post" class="current-post">

        <?php if ( isset($page['post']['media_vk_refid']) && $page['post']['media_vk_refid'] ) :
          // #1602 - VK brightcove
          include_once __DIR__."/../specific/_player.php";
        else :
          // 通常画像 or 動画 ?>
          <?php if(!isset($_GET['id'])):
            // メインイメージ
            ?>
            <div id="single-visual-container"></div>
          <?php endif;?>
        <?php endif; ?>

        <div class="post-detail">

          <div id="single-header-container"></div>

          <div class="post-sns">
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
                      <a href="http://twitter.com/share?text=<?php echo urlencode($page['og_title']); ?>&url=<?php echo $page['og_url']; ?>&via=<?php echo $page['sns']['twitter']; ?>" target="_blank">
                        <span>ツイート</span>
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
            </div>
          </div>

          <?php if ( $page['post']['is_readmore'] ) : ?>

            <div id="post-content-container" class="post-content">

              <p>
                <?php echo $page['post']['description']; ?>
              </p>

              <p class="post-content-readMore">
                <a id="readMore-external" class="post-content-readMore-btn" href="<?php echo $page['post']['readmore']['url']; ?>" target="_blank">続きを読む(外部サイトへ)</a>
              </p>

            </div>

          <?php else : ?>

            <?php
            /*
            // https://github.com/undotsushin/undotsushin/issues/1115#issuecomment-251271866
            // `記事詳細での「続きを読む」を廃止` の対応でお願いします！
            // @since 2016-10-04
            <div id="post-content-container" class="post-content excerpt hidden">
              <?php print_r($page['post']['body']); ?>
            </div><!-- /.post-content -->
            <div id="post-content-read-more" class="post-content-read-more"></div>
            */
            ?>
            <div id="post-content-container" class="post-content">
              <?php if(count($page['photo']) > 0):
                // @since 2017-09-11 - メンテナンス性を上げるため `photo` 別ファイルにします
                include_once __DIR__ . '/p_photo.php';
              ?>
              <?php else:?>
                <?php print_r($page['post']['body']); ?>
              <?php endif;?>
            </div><!-- /.post-content -->

            <?php // ref. #1876 ?>
            <!-- /531683568/mobile/mobile_detail_body_bottom -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/mobile/mobile_detail_body_bottom', [300, 50], 'div-gpt-ad-1496897689545-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1496897689545-0' style='height:50px; width:300px; text-align: center; margin: 20px auto;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1496897689545-0'); });
            </script>
            </div>
            <!-- // /531683568/mobile/mobile_detail_body_bottom -->

          <?php endif; ?>

          <?php
          // ----------------------------------------------------
          // 記事詳細: pc 媒体ロゴ
          // @since 2017-09-11 別ファイルにします
          include_once __DIR__ . '/p_provider_logo.php';
          // eof: 記事詳細: pc 媒体ロゴ
          // ---------------------------------------------------- ?>

          <div id="post-content-banner"></div>

          <div class="post-sns">
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
                      <a href="http://twitter.com/share?text=<?php echo urlencode($page['og_title']); ?>&url=<?php echo $page['og_url']; ?>&via=<?php echo $page['sns']['twitter']; ?>" target="_blank">
                        <span>ツイート</span>
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
          </div><!-- /.post-sns -->

          <div class="post-pr_app">
            <div class="post-pr_app-inner">
              <h3 class="post-pr_app-heading">毎日500記事以上の最新ニュースやスポーツ速報を完全無料で見放題!</h3>
              <ul class="post-pr_app-list">
                <li class="post-pr_app-item"><a class="post-pr_app-link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/detail/pr_app-btn-ios.png" alt="App Store"></a></li>
                <li class="post-pr_app-item"><a class="post-pr_app-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/detail/pr_app-btn-android.png" alt="Google play"></a></li>
              </ul><!-- /.post-pr_app-list -->
            </div><!-- /.post-pr_app-inner -->
          </div><!-- /.post-pr_app -->

        </div><!-- /.post-detail -->

        <div class="comment">

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

              <!-- /531683568/mobile/mobile_detail_comment_top -->
              <script>
                googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/mobile/mobile_detail_comment_top', [300, 250], 'div-gpt-ad-1501838642824-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.pubads().collapseEmptyDivs();
                  googletag.enableServices();
                });
              </script>
              <div id='div-gpt-ad-1501838642824-0' style='text-align: center; margin: 20px auto; height:250px; width:300px;'>
              <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1501838642824-0'); });
              </script>
              </div>
              <!-- // /531683568/mobile/mobile_detail_comment_top -->
            </div>
          <?php endif; ?>

          <div id="comment-form-container"></div>

        </div><!-- /.comment -->
      </div><!-- /.current-post-->
      <?php
      // --------------------------------------------------------------
      // 改修 - 2017-09-11
      // #ref https://github.com/undotsushin/undotsushin/pull/2440
      ?>
      <?php
      // ------------------------------------
      // TODO: よく読まれている記事 carousel - sidebar: ranking
      ?>
      <?php
      // ------------------------------------
      // Facebook 「いいね」
      ?>
      <div class="pr_fb">
        <h4 class="pr_fb-heading"><span class="pr_fb-heading-item">毎日500本以上の最新スポーツニュースを配信 Facebookにいいね!して情報を受け取ろう!</span></h4>
        <div class="pr_fb-btn">
          <div class="fb-like" data-href="https://www.facebook.com/sportsbull/" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="false"></div>
        </div>
      </div>
      <?php
      // ------------------------------------
      // TODO: おすすめの記事 - sidebar: recommend
      ?>
      <?php
      // --------------------------------------------------------------
      ?>
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
       @since 2016-09-28 記事詳細の次の記事のために以下削除します
      */
      if (0):
      ?>
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
          })();
        </script>
        <!-- //#310 popin ebmed code  -->

        <?php endif; ?>

      <?php
      endif;
      // 削除 eof
      ?>

    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

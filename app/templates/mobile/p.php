<?php
// --------------------------------------------------------
//  記事詳細
// --------------------------------------------------------
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <?php
    // since 2017-12-18
    // お知らせ表示
    // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
    ?>
    <?php if ( !$page['ua_app'] ) : ?>
      <div id="js-announce-container"></div>
    <?php else: ?>
      <div id="js-announce-container" onclick="window.JsInterface.onInformationTap();"></div>
    <?php endif; ?>
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
      /*
        @since 2016-11-10
        History API + snap scroll するために現在記事をすべてラップするコンテナ追加
        div.current-post
      */
      ?>
      <div id="js-current-post" class="current-post">
        <div class="post-detail">
        <div class="sp-single-header">
          <div class="post-heading">
            <h1><?php echo $page['post']['title']; ?></h1>
          </div>
          <div class="post-data">
            <p class="post-text">
              <span class="post-date"><?php echo $page['post']['display_date'] ?></span>
              <span class="post-category"><?php echo $page['post']['category']['label'] ?></span>
            </p>
            <?php if ( $page['post']['user']['logo']['link'] ) : ?>
              <p class="post-logo"><a href="<?php echo $page['post']['user']['logo']['link']; ?>"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt="<?php echo $page['post']['user']['name']; ?>"></i></a></p>
            <?php else: ?>
              <p class="post-logo"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt="<?php echo $page['post']['user']['name']; ?>"></i></p>
            <?php endif; ?>
          </div>
        </div>
        <!-- <div id="single-header-container"></div> -->
          <?php
          // ----------------------------------------------------
          // 記事詳細: pc 媒体ロゴ
          // @since 2017-09-11 別ファイルにします
          // include_once __DIR__ . '/p_provider_logo.php';
          // eof: 記事詳細: pc 媒体ロゴ
          // ---------------------------------------------------- ?>

          <?php if ( !$page['ua_app'] ) : ?>
            <div class="post-sns">
              <div class="post-sns-list">
                <div class="post-sns-flex">
                  <div class="post-sns-flex-inner">
                    <ul class="post-sns-flex-list">
                      <li class="post-sns-item post-sns-item_fb">
                        <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" target="_blank">
                          <span>facebook</span>
                        </a>
                      </li>
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
            </div><!-- /.post-sns -->
          <?php else: ?>
            <div class="post-sns">
              <div class="post-sns-list">
                <div class="post-sns-flex">
                  <div class="post-sns-flex-inner">
                    <ul class="post-sns-flex-list">
                      <li class="post-sns-item post-sns-item_fb">
                        <a href="javascript:void(0);" onclick="window.JsInterface.onFacebookShare();">
                          <span>facebook</span>
                        </a>
                      </li>
                      <li class="post-sns-item post-sns-item_tw">
                      <a href="javascript:void(0);" onclick="window.JsInterface.onTwitterShare();">
                          <span>ツイート</span>
                        </a>
                      </li>
                      <li class="post-sns-item post-sns-item_line">
                      <a href="javascript:void(0);" onclick="window.JsInterface.onLineShare();">
                          <span>LINEへ送る</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div><!-- /.post-sns -->
          <?php endif; ?>

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

          <?php if ( !$page['ua_app'] ) : ?>
            <div id="post-content-container" class="post-content restricted">
          <?php else:?>
            <div id="post-content-container" class="post-content">
          <?php endif;?>

            <?php if(count($page['photo']) > 0):
              // @since 2017-09-11 - メンテナンス性を上げるため `photo` 別ファイルにします
              include_once __DIR__ . '/p_photo.php';
            ?>

            <?php else:?>
              <?
              /*

              # is_readmoe : 一部の記事ではサマリのみで詳細は外部サイトで

              */?>
              <?php if ( $page['post']['is_readmore'] ) : ?>
                <?php if ( $page['post']['description'] ) : ?>
                <p>
                  <?php echo $page['post']['description']; ?>
                </p>
                <?php endif; ?>
                <?php
                if ( !$page['ua_app'] ) :
                  $onExternalLinkTapEvents = "ga('send', 'event', 'external_link', 'click', '".$page['post']['readmore']['url']."', 0, {nonInteraction: true});";
                else :
                  $onExternalLinkTapEvents = "window.JsInterface.onExternalLinkTap();";
                endif;
                ?>
                <p style="text-align: center; font-weight: bold;">
                  <a id="readMore-external" class="post-content-btn-readMore" href="<?php echo $page['post']['readmore']['url']; ?>" onclick="<?php echo $onExternalLinkTapEvents; ?>">
                    続きを読む(外部サイトへ)
                  </a>
                </p>
              <?php else : ?>
                <?php print_r($page['post']['body']); ?>
              <?php endif; ?>
            <?php endif;?>

            <?php if ( !$page['ua_app'] ) : ?>
              <div class="post-sns">
                <div class="post-sns-list">
                  <div class="post-sns-flex">
                    <div class="post-sns-flex-inner">
                      <ul class="post-sns-flex-list">
                        <li class="post-sns-item post-sns-item_fb">
                          <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" target="_blank">
                            <span>facebook</span>
                          </a>
                        </li>
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
              </div><!-- /.post-sns -->
            <?php else: ?>
              <div class="post-sns">
                <div class="post-sns-list">
                  <div class="post-sns-flex">
                    <div class="post-sns-flex-inner">
                      <ul class="post-sns-flex-list">
                        <li class="post-sns-item post-sns-item_fb">
                          <a href="javascript:void(0);" onclick="window.JsInterface.onFacebookShare();">
                            <span>facebook</span>
                          </a>
                        </li>
                        <li class="post-sns-item post-sns-item_tw">
                        <a href="javascript:void(0);" onclick="window.JsInterface.onTwitterShare();">
                            <span>ツイート</span>
                          </a>
                        </li>
                        <li class="post-sns-item post-sns-item_line">
                        <a href="javascript:void(0);" onclick="window.JsInterface.onLineShare();">
                            <span>LINEへ送る</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div><!-- /.post-sns -->
            <?php endif; ?>

            <?php if(!empty($page['related_links'])) { ?>
              <div class="external-link">
                <div class="external-link-heading">
                  <h2>外部リンク</h2>
                  <p class="provider-name"><a href="<?= $page['post']['user']['logo']['link'] ?>" target="_blank"><?= $page['post']['user']['name'] ?></a></p>
                </div>
                <ul>
                  <?php
                  foreach ($page['related_links'] as $row) {
                    echo '<li>'. $row .'</li>';
                  }
                  ?>
                </ul>
              </div>
            <?php } ?>

            <div id="single-footer-container"></div>

            <?php if ( !$page['ua_app'] ) : ?>
              <div id="post-content-banner"></div>
            <?php else: ?>
              <div id="post-content-banner" onclick="window.JsInterface.onBannerClick();"></div>
            <?php endif; ?>

            <?php if ( !$page['ua_app'] ) : ?>
              <div class="single-more-container">
                <p id="btn-more-app"><a href="https://app.adjust.com/y06cg3?deep_link=sportsbull://action?url=https%3A%2F%2Fsportsbull.jp%2Fp%2F<?php echo $page['post']['id']; ?>%2F">アプリで読む</a></p>
                <?php if ( !$page['ua_app'] ) : ?>
                  <p id="btn-more-web"><span>ウェブで読む</span></p>
                <?php else: ?>
                  <p id="btn-more-web"><span>ウェブで読む</span></p>
                <?php endif; ?>
              </div>
            <?php endif; ?>
          </div><!-- /.post-content -->

        </div><!-- /.post-detail -->


        <?php /*
        DFP - mobile / 記事詳細本文下 ( フォロー上 ) レクタングル
        */ ?>
        <div id='ad-gpt-article-detail-body-bottom' class="bnr-dfp"></div>


      <?php
        // ------------------------------------
        // Facebook 「いいね」
        ?>
          <div class="pr_fb <?php if ( $page['ua_app'] ) echo 'app'; ?>">
            <h4 class="pr_fb-heading">
              <img src="/assets/sp/images/detail/post-sns-logo.png" alt="SPORTS BULL">
              <small class="pr_f b-heading-item" style="white-space: nowrap;">いいねして最新ニュースをチェック！</small>
            </h4>
            <?php if ( !$page['ua_app'] ) : ?>
              <div class="post-sns-fixed">
                <div class="post-sns-item_fbgood"><div class="fb-like" data-href="<?php echo $page['og_url']; ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></div>
              </div>
            <?php endif; ?>
          </div>

        <?php
        // --------------------------------------------------------------
        // 各SNSの公式ページへのリンク
        ?>
        <div class="link-sns">
          <ul>
            <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
            <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
            <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
            <li class="sns-ig"><a href="https://www.imgrum.one/sportsbull_official" target="_blank">instagram</a></li>
          </ul>
        </div>
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
      <div id="widget-ranking-container"></div>

      <?php
      // ------------------------------------
      // TODO: ヘッドライン
      ?>
      <!-- <div id="headline-container"></div> -->
      <div id="js-headline" data-adgene-id="35245,42707"></div>

      <?php
      // ------------------------------------
      // TODO: おすすめの記事 - sidebar: recommend
      ?>
      <?php if ( $page['category']['slug'] == 'crazy' ) : ?>
        <div class="widget-recommend">
          <div class="widget-postList widget-postList_popular">
            <div class="mod-headingA01">
              <h2>
                <img src="/assets/sp/images/detail/ttl_recommend.png" alt="RECOMMEND"/>
                あなたにおすすめの記事
              </h2>
            </div>
            <div id="widget-recommend-list-container"></div>
          </div>
        </div>
      <?php else: ?>
        <?php
        /*

        # popin
        - 収益計算用にSPとWebViewでタグ異なる
        - 同一カテゴリのみ表示するため、`<div id="_popIn_category"></div>` でカテゴリー情報を付与する

        */
        ?>
        <?php if ( $page['category']['label'] ) : ?>
          <div id="_popIn_category" style="display:none;"><?php echo $page['category']['label']; ?></div>
        <?php endif; ?>
        <div class="widget-recommend">
          <div class="widget-postList widget-postList_popular">
            <div class="mod-headingA01">
              <h2>
                <img src="/assets/sp/images/detail/ttl_recommend.png" alt="RECOMMEND"/>
                あなたにおすすめの記事
              </h2>
            </div>
            <?php if ( !$page['ua_app'] ) : ?>
              <div id="_popIn_recommend_2"></div>
              <script type="text/javascript">
                  (function() {
                      var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
                      pa.src = window.location.protocol + "//api.popin.cc/searchbox/undotsushin.js";
                      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
                  })();
              </script>
            <?php else : ?>
              <div id="_popIn_recommend"></div>
              <script type="text/javascript">
                  (function() {
                      var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
                      pa.src = window.location.protocol + "//api.popin.cc/searchbox/sportsbull_app.js";
                      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
                  })();
              </script>
            <?php endif; ?>
          </div>
        </div>
      <?php endif; ?>

      <?php /*
      DFP - mobile / 記事詳細おすすめ記事下レクタングル
      */ ?>
      <div id='ad-gpt-article-detail-recommend-bottom' class="bnr-dfp"></div>

      <?php
      // ----------------------------------------------------
      // アプリ導線
      ?>
      <?php if ( !$page['ua_app'] ) : ?>
        <div class="post-pr_app">
          <a href="https://app.adjust.com/lac3f2?deep_link=sportsbull%3A%2F%2F" target="_blank">
            <div class="post-pr_app-inner">
              <h3 class="post-pr_app-heading">40種類を超えるスポーツニュースや速報を完全無料でアプリで見放題！</h3>
              <ul class="post-pr_app-list">
                <li class="post-pr_app-item"><img src="/assets/sp/images/detail/pr_app-btn-ios.png" alt="App Store"></li>
                <li class="post-pr_app-item"><img src="/assets/sp/images/detail/pr_app-btn-android.png" alt="Google play"></li>
              </ul><!-- /.post-pr_app-list -->
            </div><!-- /.post-pr_app-inner -->
          </a>
        </div><!-- /.post-pr_app -->
      <?php endif; ?>

      <?php
      // ------------------------------------
      // TODO: 新着記事
      ?>
      <div id="widget-news-list-container">
        <div class="mod-headingA01">
          <h2>
            <img src="/assets/sp/images/detail/ttl_news.png" alt="NEWS"/>
            <?php print_r($page['post']['category']['label']); ?>の新着記事
          </h2>
        </div>
        <div class="board">
          <div id="board-container" data-adgene-id="54993,54994,35245,42707"></div>
          <div id="board-container-more"></div>
        </div>
      </div>


      <?php /*
      DFP - mobile / 記事詳細おすすめ記事下レクタングル
      */ ?>
      <div id='ad-gpt-article-detail-footer' class="bnr-dfp"></div>

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
<script>
  var bodyElement = document.getElementById('post-content-container');
  var bodyP = document.querySelectorAll('#post-content-container > p');
  var bodyLen = bodyP.length;
  var halfIndex = Math.round(bodyLen / 2) - 1;
  var btnContainer = bodyElement.querySelector('.single-more-container');
  var btnMore = bodyElement.querySelector('#btn-more-web');
  var showContentDFP = function() {
    if(bodyLen >= 6) {
      var div = document.createElement('div');
      var target = bodyP[halfIndex];
      div.setAttribute('id', 'ad-gpt-article-detail-body-insert');
      div.classList.add('bnr-dfp');
      target.parentNode.insertBefore(div, target.nextSibling);
    }
  }
  if(btnMore) {
    bodyElement.classList.add('noevent');
    btnMore.addEventListener('touchend', function(){
      bodyElement.classList.remove('restricted');
      setTimeout(() => {
        bodyElement.classList.remove('noevent');
      }, 300);
      btnContainer.parentNode.removeChild(btnContainer);
    });
  }
  showContentDFP();

  <?php if ( $page['ua_app'] ) : ?>

    var visual = document.getElementById('single-visual-container');
    visual.addEventListener('touchstart', function(){
      var video = visual.querySelector('.video-wrapper');
      if(video) {
        window.JsInterface.onMovieTap();
      }
    })


    // WebView load 検証用
    var WebViewCallback = function() {
      // hide loading for app
      window.JsInterface.onDocumentReady();
    };
    if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll) ) {
      WebViewCallback();
    } else {
      document.addEventListener("DOMContentLoaded", WebViewCallback);
    }

  <?php endif; ?>

</script>
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

        <div id="post-content-container" class="post-content excerpt hidden">
          <?php if ( empty($page['post']['body']) ) {
          // empty の時に 404表示
          ?>
            <div class="errorPage-sec">
              <h2 class="mt20 bold">お探しのページは見つかりません</h2>
              <p class="f12">お探しのページは一時的にアクセスができない状況にあるか、移動もしくは削除された可能性があります。</p>

              <div class="mod-btnA01">
                <a href="/">TOPに戻る</a>
              </div><!-- /.mod-btnA01 -->
            </div>
          <?php
          } else {
            print_r($page['post']['body']);
          }?>
        </div><!-- /.post-content -->
        <div id="post-content-read-more"></div>

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
        <div class="sponsor-link_commentUpper">
          <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35245&targetID=adg_35245&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
        </div>

        <div id="comment-form-container"></div>

        <div id="comment-self-container"></div>

        <div id="comment-official-container"></div>

        <div id="comment-normal-container"></div>

      </div><!-- /.comment -->

      <?php /*
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

      */?>

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

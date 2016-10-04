<div class="body-sec">

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

  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="post-detail">

        <div id="single-header-container"></div>

        <div id="comment-normal-container"></div>

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
                    <a href="http://twitter.com/share?text=<?php echo urlencode($page['og_title']); ?>&url=<?php echo $page['og_url']; ?>&via=<?php echo $page['sns']['twitter']; ?>" target="_blank">
                      <span>ツイート</span>
                    </a>
                  </li>
                  <li class="post-sns-item post-sns-item_gt">
                    <a href="https://plus.google.com/share?url=<?php echo $page['og_url']; ?>" target="_blank">
                      <span>Google+</span>
                    </a>
                  </li>
                  <li class="post-sns-item post-sns-item_line">
                    <a href="http://line.me/R/msg/text/?<?php echo urlencode($page['og_title'].' '.$page['og_url']); ?>" target="_blank">
                      <span>LINEへ送る</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div><!-- /.post-sns-list -->

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt><span>いいねして最新ニュースをチェック！</span></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
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

      </div>


    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->
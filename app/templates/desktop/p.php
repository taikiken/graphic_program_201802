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
              <li class="post-sns-item post-sns-item_line">
                <a href="http://line.me/R/msg/text/?<?php echo rawurlencode($page['og_title'].' '.$page['og_url']); ?>" target="_blank">
                  <span>LINEへ送る</span>
                </a>
              </li>
            </ul>
          </div><!-- /.post-sns -->

          <div class="sponsor-link w728"><script type='text/javascript'>
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
          <script>
            var bodyP = document.querySelectorAll('.post-detail .post-content > p');
            var bodyLen = bodyP.length;
            var halfIndex = Math.round(bodyLen / 2) - 1;
            if(bodyLen >= 6) {
              var div_wrapper = document.createElement('div');
              var target = bodyP[halfIndex];
              div_wrapper.setAttribute('id', 'ad-gpt-article-detail-body-wrapper');
              target.parentNode.insertBefore(div_wrapper, target.nextSibling);
              var wrap = document.getElementById('ad-gpt-article-detail-body-wrapper');
              wrap.insertAdjacentHTML('afterbegin','<div id="ad-gpt-article-detail-body-insert-left"></div><div id="ad-gpt-article-detail-body-insert-right"></div>');
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-body-insert-left').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-body-insert-left");
              });
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-body-insert-right').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-body-insert-right");
              });
            }
          </script>
          </div><!-- /.post-content -->

          <div class="post-sns">
            <ul class="post-sns-list">
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
              <li class="post-sns-item post-sns-item_line">
                <a href="http://line.me/R/msg/text/?<?php echo rawurlencode($page['og_title'].' '.$page['og_url']); ?>" target="_blank">
                  <span>LINEへ送る</span>
                </a>
              </li>
            </ul>
          </div><!-- /.post-sns -->

          <div class="post-sns-pr">
            <dl class="post-sns-pr-inner">
              <dt><img src="/assets/images/detail/post-sns-lead.png" alt="SPORTS BULLSPORTS BULLをいいねして最新ニュースをチェック！"></dt>
              <dd>
                <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
              </dd>
            </dl><!-- /.post-sns-pr-inner -->
            <div class="link-sns">
              <ul>
                <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
                <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
                <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
                <li class="sns-ig"><a href="https://www.imgrum.one/sportsbull_official" target="_blank">instagram</a></li>
              </ul>
            </div>
          </div><!-- /.post-sns-pr -->

          <?php if(!empty($page['post']['related_links'])) { ?>
            <div class="external-link">
                <div class="external-link-heading">
                  <h2>外部リンク</h2>
                  <p class="provider-name"><a href="<?= $page['post']['user']['logo']['link'] ?>" target="_blank"><?= $page['post']['user']['name'] ?></a></p>
                </div>
                <ul>
                  <?php
                  foreach ($page['post']['related_links'] as $related_link) {
                    echo '<li><a href="' . $related_link['url'] . '">' . $related_link['label'] . '</a></li>';
                  }
                  ?>
                </ul>
              </div>
          <?php } ?>

          <!-- タグの表示 -->
          <div id="single-footer-container"></div>


          <div class="sponsor-link w728"><script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/pc_single_bottom', [728, 90], 'div-gpt-ad-pc_single_bottom').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-pc_single_bottom' style='height:90px; width:728px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_single_bottom'); });
            </script>
            </div>
          </div>

          <!-- ヘッドラインの表示 -->
          <div id="js-headline"></div>


          <div id="ad-gpt-article-detail-headlinebottom-wrapper">
            <div id="ad-gpt-article-detail-headlinebottom-insert-left"></div>
            <div id="ad-gpt-article-detail-headlinebottom-insert-right"></div>
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-headlinebottom-insert-left').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-headlinebottom-insert-left");
              });
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-headlinebottom-insert-right').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-headlinebottom-insert-right");
              });
            </script>
          </div>

          <div class="board-large">
            <div id="board-container"></div><!--/archive-->
          </div><!-- /.board-large -->


          <div id="ad-gpt-article-detail-boardbottom-wrapper">
            <div id="ad-gpt-article-detail-boardbottom-insert-left"></div>
            <div id="ad-gpt-article-detail-boardbottom-insert-right"></div>
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-boardbottom-insert-left').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-boardbottom-insert-left");
              });
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/article-detail/article-detail-body-insert', [300, 250], 'ad-gpt-article-detail-boardbottom-insert-right').addService(googletag.pubads());
                googletag.enableServices();
                googletag.pubads().collapseEmptyDivs();
                googletag.display("ad-gpt-article-detail-boardbottom-insert-right");
              });
            </script>
          </div>

        </div><!-- /.post-detail -->
      </div><!-- /.current-post-->




      <?php
      /*
       @since 2018-01-23 無限スクロール廃止のために以下削除します
      */
      if (0):
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

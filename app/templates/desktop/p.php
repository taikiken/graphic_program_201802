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

          <?php
          /*
          DFP - desktop / タイトル下
          */
          ?>
          <?php if ( !$page['post']['is_sponserd'] ) : ?>
          <div class="sponsor-link w728">
            <div id='div-gpt-ad-article-deital-desktop-bigbanner-A' class="bnr-dfp" style='height:90px; width:728px;'></div>
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

          <?php
          /*
          DFP - 記事本文中差し込み広告
          - Teadsで代替 ref. UNDO_SPBL-478
          <?php if ( !$page['post']['is_sponserd'] ) : ?>
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
                wrap.insertAdjacentHTML('afterbegin','<div id="div-gpt-ad-article-detail-desktop-rectangle-A" class="bnr-dfp"></div><div id="div-gpt-ad-article-detail-desktop-rectangle-B" class="bnr-dfp"></div>');
              }
            </script>
          <?php endif; ?>
          */ ?>
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
                <li class="sns-ig"><a href="https://www.instagram.com/sportsbull_official" target="_blank">instagram</a></li>
              </ul>
            </div>
          </div><!-- /.post-sns-pr -->

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

          <!-- タグ & 記事下バナーの表示 -->
          <div id="single-footer-container"></div>


          <!-- ヘッドラインの表示 -->
          <div id="js-headline"></div>


          <?php
          /*
          DFP - headline bottom ダブルレクタングル
          */
          ?>
          <?php if ( !$page['post']['is_sponserd'] ) : ?>
            <div id="ad-gpt-article-detail-headlinebottom-wrapper">
              <div id="div-gpt-ad-article-detail-desktop-rectangle-C" class="bnr-dfp"></div>
              <div id="div-gpt-ad-article-detail-desktop-rectangle-D" class="bnr-dfp"></div>
            </div>
          <?php endif; ?>

          <div class="board-large">
            <div id="board-container" data-adgene-id=""></div><!--/archive-->
          </div><!-- /.board-large -->


          <?php
          /*
          DFP - bottom ダブルレクタングル
          */
          ?>
          <?php if ( !$page['post']['is_sponserd'] ) : ?>
          <div id="ad-gpt-article-detail-boardbottom-wrapper">
            <div id="div-gpt-ad-article-detail-desktop-rectangle-E" class="bnr-dfp"></div>
            <div id="div-gpt-ad-article-detail-desktop-rectangle-F" class="bnr-dfp"></div>
          </div>
          <?php endif; ?>


          <?php
          /*

          # popin - desktop用

          */
          ?>
          <?php if ( $page['category']['label'] ) : ?>
          <div id="_popIn_category" style="display:none;"><?php echo $page['category']['label']; ?></div>
          <?php endif; ?>
          <div class="board-large">
            <div id="_popIn_recommend_2"></div>
            <script type="text/javascript">
                (function() {
                    var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
                    pa.src = window.location.protocol + "//api.popin.cc/searchbox/undotsushin.js";
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
                })();
            </script>
          </div><!-- /.board-large -->

        </div><!-- /.post-detail -->
      </div><!-- /.current-post-->

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->

<?php
/*

ref. UNDO_SPBL-478 【課題管理】記事詳細本文中差し込み広告をTeadsにする
- 記事詳細本文差し込みの代わりにTeadsを表示

*/
if ( !$page['post']['is_sponserd'] ) : ?>
<script src="//a.teads.tv/page/80647/tag" async="true"></script>
<?php endif; ?>
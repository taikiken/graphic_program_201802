<?php

// footer 表示条件 start
$template_name = $page['template'];

if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'comment' ||
  $template_name == 'search' ||
  $template_name == 'settings' ||
  $template_name == 'settings.social' ||
  $template_name == 'settings.account' ||
  $template_name == 'settings.interest' ||
  $template_name == 'settings.deactivate' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications' ||
  $template_name == 'logout' ||
  // mortorsports 条件を追加 - `/public/motorsports/motorsports_model.php` on 2017-07-06
  $template_name == 'motorsports' ||
  $template_name == 'crazy'
) {
  ?>
  <footer id="footer-container" class="foot-sec">
    <div class="foot-sec-inner">
      <?php
      // SEO対策 / パンくずリストを設置する #776
      include_once __DIR__."/../_breadcrumb.php"; ?>
      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure><img src="/assets/images/common/footer-overview-figure.png" alt=""></figure>

          <div class="text-block">
            <h3 class="foot-pr-logo"><img src="/assets/images/common/footer-overview-logo.png" alt="SPORTS BULL アプリ版(iPhone/Android)"></h3>
            <ul class="foot-pr-btn">
              <li><a href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
            <p class="foot-pr-text">話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「スポーツ・ブル」。高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。スマートフォンアプリをダウンロードして今日のニュースをチェックしましょう。</p>
          </div><!-- /.text-block -->

          <div class="fb-page-plugin">
            <div class="fb-page" data-href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-width="400" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
          </div>
        </div><!-- /.foot-pr-inner -->
      </div><!-- /.foot-pr -->

      <div id="pageTop" class="pagetop fixed blind"><a href="#"><span>このページの先頭へ<img src="/assets/images/sprite/sprite-footer.png" role="presentation"></span></a></div>

      <div class="fnav-block">
        <nav class="fnav">
          <h3 class="fnav-logo"><img src="/assets/images/common/footer-fnav-logo.png" alt="SPORTS BULL"></h3>
          <ul>
            <?php // <li><a href="/about/ads/">広告掲載について</a></li> ?>
            <li><a href="/about/">サービス紹介</a></li>
            <li><a href="/about/company/">会社概要</a></li>
            <li><a href="/about/privacy/">プライバシーポリシー</a></li>
            <li><a href="/about/terms/">利用規約</a></li>
            <?php // <li><a href="/about/faq/">FAQ</a></li> ?>
            <?php // <li><a href="/about/contact/">お問い合せ</a></li> ?>
          </ul>
        </nav><!-- /.fnav -->

        <div class="sns-block">
          <ul>
            <li class="sns-fb"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" target="_blank">facebook</a></li>
            <li class="sns-tw"><a href="https://twitter.com/<?php echo $page['sns']['twitter']; ?>" target="_blank">twitter</a></li>
            <li class="sns-yt"><a href="https://www.youtube.com/channel/<?php echo $page['sns']['youtube']; ?>" target="_blank">youtube</a></li>
          </ul>
        </div><!-- /.sns-block -->

        <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
      </div><!-- /.fnav-block -->
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->
<?php
} elseif (
  $template_name == 'signup' ||
  $template_name == 'login' ||
  $template_name == 'logout' ||
  $template_name == 'reset_password' ||
  $template_name == 'reset_password.resetting'
) {
?>
  <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
  <?php
}// end if
// footer 表示条件 end
// ------------------------------------------------------
?>
</div><!-- /.whole -->
<div id="modal-container"></div>
<div id="logout-modal-container"></div>
<div id="deactivate-modal-container"></div>
<div id="flush-modal-container"></div>
<?php
/*
 * $page['apiRoot'] を元に API request 先を決定します
 * php側で任意の apiRoot が 設定されている時に
 * UT.app.App.develop(); を行います
 *
*/
if ( $page['apiRoot'] != '' ) :
  // develop mode
  // dev, stg, local から起動の時のみ script tag を有効にします
?>
<script>
( function () {

  'use strict';

  var UT = self.UT;
  // リクエスト先を変更します
//  UT.app.App.develop( 'https://dev.sportsbull.jp' );
  UT.app.App.develop();

}() );
</script>
<?php endif; ?>
<script id="js-exe"<?php echo !empty($page['category']['label']) ? ' data-label="' . $page['category']['label'] . '" ' : ''; ?>src="/assets/js/bundle/exe.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
?>
<script src="/assets/js/bundle/banners_with_json.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php
// ------------------------------------------------------------
?>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
<script src="//scdn.line-apps.com/n/line_it/thirdparty/loader.min.js" async="async" defer="defer"></script>


<?php // #1992 - Teads
if ( $page['template'] == 'p' || $page['template'] == 'comment') :
  if ( $page['post']['is_sponserd'] === false ) :
    echo <<<__EOL__
<script type="text/javascript">
    var amp_med = '2000801';
    var amp_site = '2001028';
    var amp_frame = '2009107';
    var amp_rurl = document.referrer;
    var amp_send = location.protocol + '//ads.adjust-net.jp/adserver/ad/ads_v.js?' + Math.random();
    document.write("<scr" + "ipt type='text/javascript' src='" + amp_send + "'></scr" + "ipt>");
</script>
__EOL__;
  endif;
endif;
?>

</body>
</html>

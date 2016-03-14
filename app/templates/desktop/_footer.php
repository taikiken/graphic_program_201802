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
  $template_name == 'logout'
) {
  ?>
  <footer class="foot-sec">
    <div class="foot-sec-inner">
      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure><img src="/assets/images/common/footer-overview-figure.png" alt=""></figure>

          <div class="text-block">
            <h3><img src="/assets/images/common/footer-overview-logo.png" alt="運動通信 CRAZY FOR SPORTS"></h3>
            <p>話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「運動通信」。高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。スマートフォンアプリをダウンロードして今日のニュースをチェックしましょう。</p>
            <ul>
              <li><a href="https://itunes.apple.com/us/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div><!-- /.text-block -->

          <div class="fb-page-plugin">
            <div class="fb-page" data-href="https://www.facebook.com/undotsushin/" data-width="400" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/undotsushin/"><a href="https://www.facebook.com/undotsushin/">運動通信（undotsushin）</a></blockquote></div></div>
          </div>
        </div><!-- /.foot-pr-inner -->
      </div><!-- /.foot-pr -->

      <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <nav class="fnav">
        <ul>
          <?php // <li><a href="/about/ads/">広告掲載について</a></li> ?>
          <li><a href="/about/">運動通信アプリの紹介</a></li>
          <li><a href="/about/privacy/">個人情報の取り扱いについて</a></li>
          <li><a href="/about/terms/">利用規約</a></li>
          <li><a href="/about/company/">運営会社</a></li>
          <?php // <li><a href="/about/faq/">FAQ</a></li> ?>
          <?php // <li><a href="/about/contact/">お問い合せ</a></li> ?>
        </ul>
      </nav><!-- /.fnav -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="https://www.facebook.com/undotsushin/" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="https://twitter.com/undotsushin" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; UNDO TSUSHIN inc. All rights reserved.</p>
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->
<?php
} else if (
  $template_name == 'signup' ||
  $template_name == 'login' ||
  $template_name == 'logout' ||
  $template_name == 'reset_password' ||
  $template_name == 'reset_password.resetting'
) {
?>
  <p class="copyright">Copyright &copy; UNDO TSUSHIN inc. All rights reserved.</p>
<?php
}// end if
// footer 表示条件 end
// ------------------------------------------------------
?>
</div><!-- /.whole -->
<div id="modal-container"></div>
<?php
/*
 * $page['apiRoot'] を元に API request 先を決定します
 * apiRoot が http://www.undotsushin.com の時に
 * UT.app.App.develop(); を行います
 *
 * それ以外の時は default '/api/...' へアクセスします
 * protocol, hostname それぞれ持たないので http|https どちらでも問題ないかと思います
*/
if ( $page['apiRoot'] != '' ) :
  // develop mode
  // dev, stg, local から起動の時のみ script tag を有効にします
?>
<script>
( function () {

  'use strict';

  var UT = self.UT;
  // API request 先頭に http://www.undotsushin.com を追加します
  UT.app.App.develop();

}() );
</script>
<?php endif; ?>
<script src="/assets/js/bundle/exe.bundle.js"></script>
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
</body>
</html>
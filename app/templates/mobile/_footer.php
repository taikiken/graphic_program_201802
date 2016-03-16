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
  $template_name == 'signup_login' ||
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
<div id="side-menu-container">
  <div id="side-menu-bg"></div>
  <div id='side-menu'>
    <ul id="side-menu-list">
      <li class="ad"><img src="/assets/sp/images/dummy/side-bnr.jpg" alt=""></li>

      <li id="side-menu-service">
        <ul>
          <!-- Service Specific Menu -->
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-home" href="#"><i></i>運動通信トップへ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-mypage" href="#"><i></i>マイページ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-config" href="#"><i></i>設定</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-logout" href="#"><i></i>ログアウト</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-about" href="#"><i></i>運動通信とは</a></li>
        </ul>
      </li>

      <li>
        <!-- Syn. Service List -->
        <div id='synapse-service-list-outer-box' style='display: none'>
          <ul id='synapse-service-list'>
            <li id="synapse-service-list-title">おすすめサービス</li>
          </ul>
        </div>

        <!-- Syn. Logo -->
        <div id="synapse-logo-box" class="synapse_logo" style='display: none'></div>
      </li>

    </ul>
  </div><!--/#side-menu-->
</div><!--/#side-menu-container-->

<footer class="foot-sec">
  <div class="foot-sec-inner">
    <div class="foot-pr">
      <div class="foot-pr-inner">
        <figure class="foot-pr-logo"><img src="/assets/sp/images/common/footer-overview-logo.png" alt="運動通信 CRAZY FOR SPORTS"></figure>
        <div class="text-block">
          <h3 class="foot-pr-heading">運動通信アプリをダウンロード</h3>
          <ul class="foot-pr-list">
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://itunes.apple.com/us/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
          </ul>
        </div>
      </div><!-- /.foot-pr-inner -->

      <div class="fb-page-plugin">
        <div class="fb-page" data-href="https://www.facebook.com/undotsushin/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/undotsushin/"><a href="https://www.facebook.com/undotsushin/">運動通信（undotsushin）</a></blockquote></div></div>
      </div>
    </div><!-- /.foot-pr -->

    <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

    <nav class="fnav">
      <ul>
        <?php if (0): ?>
          <li><a href="/about/ads/">広告掲載について</a></li>
        <?php endif; ?>
        <li><a href="/about/">運動通信アプリの紹介</a></li>
        <li><a href="/about/privacy/">個人情報の取り扱いについて</a></li>
        <li><a href="/about/terms/">利用規約</a></li>
        <li><a href="/about/company/">運営会社</a></li>
        <?php if (0): ?>
          <li><a href="/about/faq/">FAQ</a></li>
          <li><a href="/about/contact/">お問い合せ</a></li>
        <?php endif; ?>
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
<script src="/assets/sp/js/bundle/sp-exe.bundle.js"></script>
<?php
// 遅延読み込みにするために fb-video.js へ変更する on 2016-03-14
// 実機で FB Video 生成が空振りする
// Dom 構築が FB sdk 走査に間に合っていない様子
//
/*
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
 */
?>
<script src="/assets/js/fb-video.js"></script>
<?php
/* fb delay 実行を有効へ */
?>
</body>
</html>
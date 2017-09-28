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
  $template_name == 'logout' ||
  // mortorsports 条件を追加 - `/public/motorsports/motorsports_model.php` on 2017-07-06
  $template_name == 'motorsports'
) {
?>
<div id="side-menu-container">
  <div id="side-menu-bg"></div>
  <div id='side-menu'>
    <ul id="side-menu-list">
      <li id="side-menu-service">
        <ul>
          <!-- Service Specific Menu -->
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-home" href="#"><i></i>スポーツブルトップへ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-mypage" href="#"><i></i>マイページ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-config" href="#"><i></i>設定</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-logout" href="#"><i></i>ログアウト</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-about" href="#"><i></i>スポーツブルとは</a></li>
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
    <?php
    // SEO対策 / パンくずリストを設置する #776
    include_once __DIR__."/../_breadcrumb.php"; ?>
    <div class="foot-pr">
      <div class="foot-pr-inner">
        <figure class="foot-pr-logo"><img src="/assets/sp/images/common/footer-overview-logo.png" alt="SPORTS BULL"></figure>
        <div class="text-block">
          <h3 class="foot-pr-heading">スポーツブルアプリをダウンロード</h3>
          <ul class="foot-pr-list">
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
          </ul>
        </div>
      </div><!-- /.foot-pr-inner -->

      <div class="fb-page-plugin">
        <div class="fb-page" data-href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><?php echo $page['site_name']; ?></a></blockquote></div></div>
      </div>
<?php
// 六大学 / 広告表示 調整（Web） #1546
// > アドネットワーク関連の広告（ネイティブアド？）を消したい
// @see https://github.com/undotsushin/undotsushin/issues/1546
// category.slug 'big6tv' search
global $template_big6tb;
$in_big6tv = $template_big6tb;
// 記事詳細 + big6tv でも広告非表示
/*
今回でいうと、一覧、詳細ともに

$page['category']['slug'] == 'big6tv'

プライマリカテゴリーが big6tv = big6tvテーマが適応される一覧&詳細
で広告非表示としていただいてよいかと思いますー
@see https://github.com/undotsushin/undotsushin/pull/1731#pullrequestreview-28563047
*/
if ($template_name == 'category' || $template_name == 'p') {
  $page_category = $page['category'];
  if (isset($page_category) && $page_category['slug'] == 'big6tv') {
    $in_big6tv = true;
  }
}
// @see https://github.com/undotsushin/undotsushin/issues/1546#issuecomment-290283445
// @since 2017-03-29
?>
    </div><!-- /.foot-pr -->

    <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

    <nav class="fnav">
      <ul>
        <?php if (0): ?>
          <li><a href="/about/ads/">広告掲載について</a></li>
        <?php endif; ?>
        <li><a href="/about/">サービス紹介</a></li>
        <li><a href="/about/company/">会社概要</a></li>
        <li><a href="/about/privacy/">プライバシーポリシー</a></li>
        <li><a href="/about/terms/">利用規約</a></li>
        <?php if (0): ?>
          <li><a href="/about/faq/">FAQ</a></li>
          <li><a href="/about/contact/">お問い合せ</a></li>
        <?php endif; ?>
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
 * それ以外の時は default '/api/...' へアクセスします
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
<script src="/assets/sp/js/bundle/sp-exe.bundle.js?v=<?php echo $page['version']; ?>"></script>
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
<script src="/assets/js/fb-video.js?v=<?php echo $page['version']; ?>"></script>
<?php
if ( $page['template'] == 'p' && $page['post']['media']['video']['player'] == 'brightcove' ) :
?>
<script>
  $(window).on('resize',function(){
    var player = videojs.getPlayers().content_video;
    player.width(window.innerWidth);
    player.height(Math.ceil( window.innerWidth / 16 * 9 ));
  });
</script>
<?php
endif;
?>

<?php // #1992 - Teads
if ( $page['template'] == 'p' || $page['template'] == 'comment') :
  if ( $page['post']['is_sponserd'] === false ) :
    echo <<<__EOL__
<script type="text/javascript">
    var amp_med = '2000801';
    var amp_site = '100000667';
    var amp_frame = '100004185';
    var amp_rurl = document.referrer;
    var amp_send = location.protocol + '//afs.adjust-net.jp/adserver/sp/ads_v.js?' + Math.random();
    document.write("<scr" + "ipt type='text/javascript' src='" + amp_send + "'></scr" + "ipt>");
</script>
__EOL__;
  endif;
endif;
?>

</body>
</html>

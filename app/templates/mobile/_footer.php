<?php

// footer 表示条件 start
$template_name = $page['template'];

// TODO : in_array()判定など

if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
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

      <?php if (!empty($page['side-menu'])) : ?>
      <li>
          <ul>
              <?php foreach ($page['side-menu'] as $list) : ?>
                  <li class="sidemenu-list-title"><?php echo $list['header'];?></li>
                  <?php foreach($list['items'] as $side_item) : ?>
                      <li>
                          <?php if ($side_item['type'] === 1 && false === empty($side_item['caption'])):?>
                              <div class="sidemenu_container">
                                  <a href="<?php echo $side_item['link']; ?>">
                                      <img src="<?php echo $side_item['image']['sp']; ?>" class="sidemenu_icon">
                                      <div class="sidemenu_title">
                                          <?php echo $side_item['title']; ?>
                                      </div>
                                      <div class="sidemenu_caption">
                                          <?php echo $side_item['caption'];?>
                                      </div>
                                  </a>
                              </div>
                          <?php else: ?>
                              <div class="sidemenu_container_single">
                                  <a href="<?php echo $side_item['link']; ?>">
                                      <img src="<?php echo $side_item['image']['sp']; ?>" class="sidemenu_icon">
                                      <div class="sidemenu_title_single">
                                          <?php echo $side_item['title']; ?>
                                      </div>
                                  </a>
                              </div>
                          <?php endif;?>
                      </li>
                  <?php endforeach; ?>
              <?php endforeach; ?>
          </ul>
      </li>
      <?php endif; ?>

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
  <?php include_once __DIR__.'/_footer-sec-inner.php'; ?>
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
if ( $page['template'] == 'p') :
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

<!-- #2737 対応 -->
<?php if ($template_name == 'index') : ?>
<script type="text/javascript" class="microad_blade_track">
<!--
var microad_blade_jp = microad_blade_jp || { 'params' : new Array(), 'complete_map' : new Object() };
(function() {
var param = {'co_account_id' : '17645', 'group_id' : '', 'country_id' : '1', 'ver' : '2.1.0'};
microad_blade_jp.params.push(param);
var src = (location.protocol == 'https:')
? 'https://d-cache.microad.jp/js/blade_track_jp.js' : 'http://d-cache.microad.jp/js/blade_track_jp.js';
var bs = document.createElement('script');
bs.type = 'text/javascript'; bs.async = true;
bs.charset = 'utf-8'; bs.src = src;
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(bs, s);
})();
-->
</script>
<?php endif; ?>

</body>
</html>

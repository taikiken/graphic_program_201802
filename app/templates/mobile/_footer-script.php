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
<script src="<?php echo $page['site_url_uts']; ?>/assets/sp/js/bundle/sp-exe.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
//
// WebView 記事詳細の時は不要
?>
<?php if ( !$page['ua_app'] && $page['template'] !== 'p' ) : ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/bundle/banners_with_json.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php endif; ?>


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
      version    : 'v2.11'
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
<?php if ( $page['ua_app'] ) : ?>
  <?php if ( $page['template'] == 'p' && $page['post']['media']['video']['player'] == 'facebook' ) : ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/fb-video.js?v=<?php echo $page['version']; ?>"></script>';
  <?php endif; ?>
<?php else : ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/fb-video.js?v=<?php echo $page['version']; ?>"></script>
<?php endif; ?>

<?php
if ( $page['template'] == 'p' && $page['post']['media']['video']['player'] == 'brightcove' ) :
?>
<script>
  window.addEventListener('resize', function () {
    if ( videojs ) {
      var player = videojs.getPlayers().content_video;
      if ( player ) {
        player.width(window.innerWidth);
        player.height(Math.ceil( window.innerWidth / 16 * 9 ));
      }
    }
  });
</script>
<?php
endif;
?>


<?php if ($template_name == 'index') : ?>
<!-- #2737 対応 -->
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


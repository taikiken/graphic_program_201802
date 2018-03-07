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
    <?php include_once __DIR__.'/_footer-sec-inner.php'; ?>
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
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<script src="//scdn.line-apps.com/n/line_it/thirdparty/loader.min.js" async="async" defer="defer"></script>


<?php // #1992 - Teads
if ( $page['template'] == 'p' ) :
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

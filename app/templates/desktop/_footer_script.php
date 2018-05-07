<script src="<?php echo $page['site_url_uts']; ?>/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
<script src="<?php echo $page['site_url_uts']; ?>/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
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
<script id="js-exe"<?php echo !empty($page['category']['label']) ? ' data-label="' . $page['category']['label'] . '" ' : ''; ?>src="<?php echo $page['site_url_uts']; ?>/assets/js/bundle/exe.bundle.js?v=<?php echo $page['version']; ?>"></script>


<?php
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
?>
<script src="<?php echo $page['site_url_uts']; ?>/assets/js/bundle/banners_with_json.bundle.js?v=<?php echo $page['version']; ?>"></script>

<script src="<?php echo $page['site_url_uts']; ?>/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

<script src="<?php echo $page['site_url_uts']; ?>/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<script src="//scdn.line-apps.com/n/line_it/thirdparty/loader.min.js" async="async" defer="defer"></script>


<?php if ($page['template'] === 'index') : ?>
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
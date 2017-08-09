<?php
/**
 * top: stats banner x 4 - top for webview
 * User: @taikiken
 * Date: 2017/06/26
 * Time: 16:20
 */
// アプリ専用
// top page stats banner x 4
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>"></script>
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
</head>
<body>
<div class="whole">
<?php
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
include_once dirname(dirname(dirname(dirname(__FILE__))) ). '/mobile/_stats_banner.php';
// ------------------------------------------------------------
?>
</div>
<script src="/assets/js/bundle/banners_with_json.bundle.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>

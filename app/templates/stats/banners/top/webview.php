<?php
/**
 * top: top for webview - アプリ専用WebView
 * リニューアルアプリプレビュー用に一旦画像貼付け
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <style>
  * {
    margin: 0;
    padding: 0;
  }
  .wrapper img {
    width: 100%;
    height: auto;
    line-height: 0;
  }
  </style>
</head>
<body>

<div class="wrapper">
  <img src="http://sportsbull.jp.s3.amazonaws.com/_/stats/stats.png" />
</div>

</body>
</html>

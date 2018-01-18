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
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">

  <style>
  html,body {
    width: 100%;
    height: auto;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  .stats_banner {
    padding: 0 2vw;
    border: none;
  }

  .stats_banner a {
    font-weight: bold;
    text-decoration: none;
    color: #0f3580;
    padding: 3.575vw 0;
  }

  .stats_banner__heading {
    width: 10.5vw;
    padding: 2.5vw 0;
    text-align: left;
  }

  .stats_banner__heading__title {
    font-size: 2.7vw;
    line-height: 1.2em;
  }

  .stats_banner__list {
    width: 77vw; /*  100 - header(速報&データ) - p(すべて) */
    padding-left: 2vw;
    padding-right: 2vw;
  }

  .stats_banner__item {
    width: auto;
  }

  .stats_banner__item a {
    padding: 3.575vw 0;
  }

  .stats_banner__item a i {
    display: flex;
    width: 25px;
    height: 25px;
    margin-right: .8vw;
  }

  .stats_banner__item a svg {
    width: 15px;
    height: 15px;
    margin-left: 0;
  }

  .stats_banner__item a span {
    display: block;
    font-size: 2.2vw;
  }

  .stats_banner__btn {
    margin-left: auto;
    width: 12.5vw;
  }

  .stats_banner__btn__link {
    border: .3vw solid #0f3580;
  }

  .stats_banner__btn__link span {
    font-size: 2vw;
    line-height: 1;
    font-weight: bold;
    font-style: normal;
  }
  </style>
</head>
<body>

<?php include_once __DIR__.'/_stats_banner.php'; ?>

</body>
</html>

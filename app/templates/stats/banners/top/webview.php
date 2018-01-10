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
<?php if ( $page['ua'] === 'desktop' ) : ?>
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
<?php else : ?>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
<?php endif; ?>

  <style>
  html,body {
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  .wrapper {
    overflow:hidden;
    overflow-x:scroll;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2vw;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    color: #0f3580;
  }

  .wrapper header {
    width: 10.5vw;
    text-align: left;
    border-right: 1px solid #ddd;
    padding: 2.5vw 0;
  }

  .wrapper header h1 {
    font-size: 2.7vw;
    line-height: 1.2em;
    color: #0f3580;
  }

  .wrapper a {
    padding: 3.575vw 0;
  }

  .wrapper ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    width: 77vw; /*  100 - header(速報&データ) - p(すべて) */
    padding-left: 2vw;
    padding-right: 2vw;
  }


  .wrapper ul a {
    display: flex;
    align-items: center;
  }

  .wrapper ul a i {
    display: flex;
    background: #0f3580;
    align-items: center;
    justify-content: center;
    width: 6.45vw;
    height: 6.45vw;
    border-radius: 50%;
    margin-right: .8vw;
    line-height: 0;
  }

  .wrapper ul a i svg {
    margin: 0;
    padding: 0;
    width: 3.9vw;
    height: 3.9vw;
    fill: transparent;
    stroke-width: 0;
    stroke: #fff;
    line-height: 0;
  }

  .wrapper ul a i svg.icon--fill  {
    fill: #fff;
  }

  .wrapper ul a span {
    display: block;
    line-height: 1.2em;
    font-size: 2.2vw;
  }

  .wrapper p {
    margin-left: auto;
    width: 12.5vw;
  }

  .wrapper p a {
    display: block;
    margin-left: auto;
  }

  .wrapper p a span {
    display: flex;
    border: .3vw solid #0f3580;
    align-items: center;
    justify-content: center;
    height: 6vw;
    border-radius: 1vw;
  }

  .wrapper p a span em {
    font-size: 2vw;
    line-height: 1;
    font-weight: bold;
    font-style: normal;
  }

  .stats_banner__item svg.icon--fill {
    fill : #fff;
  }
  </style>
</head>
<body>

<?php include_once __DIR__.'/_stats_banner.php'; ?>

</body>
</html>

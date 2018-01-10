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

  .dummy img {
    width: 100%;
    height: auto;
    line-height: 0;
  }

  </style>
</head>
<body>

<div class="wrapper">
  <header>
    <h1>
      速報&<br />データ
    </h1>
  </header>
  <ul>
    <li>
      <a href="https://sportsbull.jp/stats/npb/">
        <i>
          <svg class="icon icon--fill">
            <use xlink:href="#icon-baseball" />
          </svg>
        </i>
        <span>
          プロ野球
        </span>
      </a>
    </li>
    <li>
      <a href="https://sportsbull.jp/sokuhou/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-soccer" />
          </svg>
        </i>
        <span>
          サッカー<br />日本代表
        </span>
      </a>
    </li>
    <li>
      <a href="https://sportsbull.jp/stats/bleague/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-basketball" />
          </svg>
        </i>
        <span>
          Bリーグ
        </span>
      </a>
    </li>
    <li>
      <a href="https://sportsbull.jp/stats/sumo/">
        <i>
          <svg class="icon icon--fill">
            <use xlink:href="#icon-sumo" />
          </svg>
        </i>
        <span>
          相撲
        </span>
      </a>
    </li>
  </ul>
  <p>
    <a href="/stats/">
      <span>
        <em>
          すべて
        </em>
      </span>
    </a>
  </p>
</div>

<?php include_once __DIR__.'/../../../_svg.php'; ?>


</body>
</html>

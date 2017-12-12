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
    box-sizing: border-box;
  }

  .wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    align-items: center;
    padding: 0.5vw 0;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    color: #0f3580;
  }

  .wrapper header {
    width: 12vw;
    text-align: center;
    border-right: 1px solid #ccc;
    padding: 1vw 0;
  }

  .wrapper header h1 {
    font-size: 2.5vw;
    line-height: 1.2em;
    color: #0f3580;
  }

  .wrapper ul {
    display: flex;
    align-items: center;
    list-style: none;
  }

  .wrapper li {
    margin-left: 1.8vw;
  }

  .wrapper ul a {
    display: flex;
    align-items: center;
    padding: 2vw 0;
  }

  .wrapper ul a i {
    display: block;
    background: #0f3580;
    width: 6.6666667vw;
    height: 6.6666667vw;
    border-radius: 50%;
    margin-right: .8vw;
  }

  .wrapper ul a span {
    display: block;
    line-height: 1.2em;
    font-size: 2vw;
  }

  .wrapper p {
    margin-left: auto;
    padding-right: 2vw;
  }

  .wrapper p a {
    display: flex;
    border: .3vw solid #0f3580;
    align-items: center;
    justify-content: center;
    width: 12.5vw;
    height: 6vw;
    border-radius: 1vw;
  }

  .wrapper p a span {
    font-size: 2vw;
    font-weight: bold;
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
      <a href="/stats/npb/">
        <i></i>
        <span>
          プロ野球
        </span>
      </a>
    </li>
    <li>
      <a href="/sokuhou/">
        <i></i>
        <span>
          サッカー<br />日本代表
        </span>
      </a>
    </li>
    <li>
      <a href="/stats/u_rugby/kantou/">
        <i></i>
        <span>
          関西学生<br />
          アメフト
        </span>
      </a>
    </li>
    <li>
      <a href="https://sportsbull.jp/stats/bleague/">
        <i></i>
        <span>
          Bリーグ
        </span>
      </a>
    </li>
  </ul>
  <p>
    <a href="/stats/">
      <span>
        すべて
      </span>
    </a>
  </p>
</div>


<!--
<div class="dummy">
  <img src="https://sportsbull.jp/_/stats/stats.png" />
</div>
-->

</body>
</html>

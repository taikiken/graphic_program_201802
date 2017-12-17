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
    border-right: 1px solid #ddd;
    padding: 1.8vw 0;
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
    margin-left: 2vw;
  }

  .wrapper ul a {
    display: flex;
    align-items: center;
    padding: 2.5vw 0;
  }

  .wrapper ul a i {
    display: flex;
    background: #0f3580;
    align-items: center;
    justify-content: center;
    width: 6.2vw;
    height: 6.2vw;
    border-radius: 50%;
    margin-right: .8vw;
    line-height: 0;
  }

  .wrapper ul a i svg {
    margin: 0;
    padding: 0;
    width: 3.6vw;
    fill: transparent;
    stroke-width: 0;
    stroke: #fff;
    line-height: 0;
  }

  .wrapper ul a span {
    display: block;
    line-height: 1.2em;
    font-size: 2.25vw;
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
    line-height: 1;
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
      <a href="https://sportsbull.jp/stats/npb/">
        <i>
          <svg class="icon">
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
      <a href="https://sportsbull.jp/stats/u_rugby/kantou/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-baseball" />
          </svg>
        </i>
        <span>
          関西学生<br />
          アメフト
        </span>
      </a>
    </li>
    <li>
      <a href="https://sportsbull.jp/stats/bleague/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-soccer" />
          </svg>
        </i>
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


<div class="dummy">
  <img src="https://sportsbull.jp/_/stats/stats.png" />
</div>

<svg style="position: absolute; width: 0; height: 0; overflow: hidden; left: 0; top: 0;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-baseball" viewBox="0 0 32 32">
<title>baseball</title>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M30.946 15.972c0 8.27-6.704 14.974-14.974 14.974s-14.974-6.704-14.974-14.974c0-8.27 6.704-14.974 14.974-14.974s14.974 6.704 14.974 14.974z"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M25.178 23.792v0"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M23.515 20.908c-0.61-1.497-0.943-3.161-0.943-4.88 0-2.329 0.61-4.548 1.719-6.378"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M25.178 8.208v0"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M6.766 23.792v0"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M8.485 20.908c0.61-1.497 0.943-3.161 0.943-4.936 0-2.329-0.61-4.548-1.719-6.378"></path>
<path stroke-width="2.773" stroke-miterlimit="4" stroke-linecap="round" stroke-linejoin="round" d="M6.766 8.208v0"></path>
</symbol>
<symbol id="icon-soccer" viewBox="0 0 32 32">
<title>soccer</title>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M12.201 21.407l-2.385-7.265 6.156-4.492 6.211 4.492-2.385 7.265z"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M12.478 4.049l3.494 1.386 3.494-1.386"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M26.842 10.204l-0.499 3.494 2.107 2.939"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M25.456 24.125l-3.716 0.721-2.163 3.050"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M6.766 24.125l3.494 0.721 1.941 2.773"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M3.549 16.86l2.107-3.161-0.555-3.716"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M15.972 5.435v4.215"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M26.343 13.698l-4.159 0.444"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M21.74 24.846l-1.941-3.438"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M10.26 24.846l1.941-3.438"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M5.657 13.698l4.159 0.444"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M30.946 15.972c0 8.263-6.711 14.974-14.974 14.974s-14.974-6.711-14.974-14.974c0-8.263 6.711-14.974 14.974-14.974 8.319 0 14.974 6.711 14.974 14.974z"></path>
</symbol>
</defs>
</svg>

</body>
</html>

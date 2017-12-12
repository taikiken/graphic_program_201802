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
    overflow: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  .wrapper {
    overflow: none;
    overflow-x: auto;
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
    display: flex;
    background: #0f3580;
    align-items: center;
    justify-content: center;
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    margin-right: .8vw;
    line-height: 0;
  }

  .wrapper ul a i svg {
    margin: 0;
    padding: 0;
    width: 3.5vw;
    fill: transparent;
    stroke-width: 0;
    stroke: #fff;
    line-height: 0;
  }

  .wrapper ul a span {
    display: block;
    line-height: 1.2em;
    font-size: 2.3vw;
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
      <a href="https://sportsbull.jp/stats/u_rugby/kantou/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-football" />
          </svg>
        </i>
        <span>
          関西学生<br />
          アメフト
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

<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-basketball" viewBox="0 0 32 32">
<title>basketball</title>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M30.946 15.972c0 8.263-6.711 14.974-14.974 14.974s-14.974-6.711-14.974-14.974c0-8.263 6.711-14.974 14.974-14.974 8.319 0 14.974 6.711 14.974 14.974z"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M5.435 26.565c-0.832-0.832 3.217-6.267 9.040-12.146 3.549-3.549 6.988-6.433 9.262-7.986"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M26.565 26.565c-1.719 1.719-7.82-1.664-13.698-7.487-3.438-3.438-6.045-6.988-7.21-9.65"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M28.007 15.972c-3.993 0.111-10.981 0.887-13.976 4.215-2.107 2.329-1.22 5.435-0.055 7.709"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M13.865 4.27c-0.665 3.272-2.052 8.263-4.88 10.704-1.775 1.553-3.716 1.83-5.213 1.719"></path>
</symbol>
<symbol id="icon-football" viewBox="0 0 32 32">
<title>football</title>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M20.631 1.276c3.938 2.496 7.653 6.156 10.094 10.094-0.666 4.714-2.828 9.262-6.433 12.922-5.047 5.047-11.813 7.21-18.412 6.544-1.22-0.111-2.773-0.499-3.494-1.22-0.776-0.776-1.109-2.274-1.22-3.494-0.055-0.444-0.055-0.832-0.111-1.276"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M30.946 7.043c0-0.388-0.055-0.776-0.111-1.165-0.111-1.22-0.499-2.773-1.22-3.494-0.776-0.776-2.329-1.109-3.549-1.276-6.544-0.61-13.366 1.553-18.357 6.6-3.66 3.66-5.823 8.208-6.489 12.922 2.496 3.938 6.156 7.653 10.149 10.094"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M21.518 10.426l-11.092 11.147"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M17.414 10.759l3.771 3.771"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M10.759 17.414l3.771 3.771"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M14.087 14.087l3.771 3.771"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M15.695 2.496c5.601 2.773 10.981 8.152 13.754 13.754"></path>
<path stroke-width="2.0477" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M2.496 15.75c2.773 5.601 8.152 10.981 13.754 13.754"></path>
</symbol>
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

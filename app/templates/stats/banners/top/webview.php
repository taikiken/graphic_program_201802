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

  .wrapper ul a i svg.icon--baseball  {
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
          <svg class="icon icon--baseball">
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
        <em>
          すべて
        </em>
      </span>
    </a>
  </p>
</div>

<?php if ( isset($_GET['debug']) ) : ?>
<div class="dummy">
  <img src="https://sportsbull.jp/_/stats/stats.png" />
</div>
<?php endif; ?>

<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-baseball" viewBox="0 0 64 64">
<title>baseball</title>
<path d="M32 64c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zM32 4.096c-15.387 0-27.904 12.517-27.904 27.904s12.517 27.904 27.904 27.904 27.904-12.517 27.904-27.904-12.517-27.904-27.904-27.904z"></path>
<path d="M50.423 50.365c-0.188 0-0.366-0.011-0.544-0.055-0.177-0.034-0.355-0.089-0.521-0.155s-0.333-0.155-0.477-0.255c-0.155-0.1-0.3-0.222-0.421-0.344-0.133-0.133-0.244-0.266-0.344-0.421s-0.188-0.311-0.255-0.477c-0.077-0.166-0.122-0.344-0.166-0.521-0.034-0.178-0.044-0.366-0.044-0.544s0.011-0.366 0.044-0.543c0.044-0.178 0.089-0.344 0.166-0.522 0.067-0.166 0.155-0.322 0.255-0.477 0.1-0.144 0.211-0.288 0.344-0.421 0.122-0.122 0.266-0.244 0.421-0.344 0.144-0.1 0.311-0.177 0.477-0.255 0.166-0.067 0.344-0.122 0.521-0.155 0.355-0.067 0.721-0.067 1.076 0 0.178 0.033 0.355 0.088 0.522 0.155 0.166 0.078 0.333 0.155 0.477 0.255 0.155 0.1 0.3 0.222 0.421 0.344 0.133 0.133 0.244 0.277 0.344 0.421 0.1 0.155 0.188 0.311 0.255 0.477 0.078 0.178 0.122 0.344 0.167 0.522 0.033 0.177 0.044 0.366 0.044 0.543s-0.011 0.366-0.044 0.544c-0.044 0.177-0.089 0.355-0.167 0.521-0.067 0.166-0.155 0.322-0.255 0.477s-0.211 0.288-0.344 0.421c-0.122 0.122-0.266 0.244-0.421 0.344-0.144 0.1-0.31 0.188-0.477 0.255s-0.344 0.122-0.522 0.155c-0.178 0.044-0.355 0.055-0.532 0.055z"></path>
<path d="M44.51 42.854v0 0c-0.588-1.409 0.089-3.039 1.509-3.616v0c1.42-0.588 3.040 0.089 3.617 1.509v0c0.588 1.42-0.089 3.039-1.509 3.616v0c-0.344 0.145-0.699 0.211-1.054 0.211v0c-1.087 0-2.119-0.644-2.563-1.72zM42.613 35.7v0 0c-0.188-1.52 0.876-2.918 2.396-3.106v0c1.519-0.199 2.917 0.876 3.106 2.396v0c0.2 1.52-0.876 2.907-2.396 3.106v0c-0.122 0.011-0.233 0.022-0.355 0.022v0c-1.375 0-2.573-1.020-2.751-2.418zM45.009 31.406c-1.52-0.189-2.585-1.587-2.396-3.095v0c0.2-1.52 1.587-2.596 3.106-2.407v0c1.52 0.199 2.596 1.586 2.396 3.106v0c-0.178 1.398-1.375 2.419-2.751 2.419v0c-0.111 0-0.233 0-0.355-0.022zM46.018 24.761c-1.42-0.577-2.096-2.196-1.509-3.616v0c0.577-1.42 2.196-2.097 3.617-1.509v0c1.42 0.576 2.096 2.196 1.509 3.616v0c-0.433 1.076-1.475 1.719-2.563 1.719v0c-0.355 0-0.71-0.066-1.054-0.211z"></path>
<path d="M50.423 19.181c-0.188 0-0.366-0.022-0.544-0.056s-0.355-0.088-0.521-0.155-0.333-0.155-0.477-0.255c-0.155-0.1-0.3-0.222-0.421-0.344-0.133-0.133-0.244-0.267-0.344-0.421s-0.188-0.311-0.255-0.477c-0.077-0.166-0.122-0.344-0.166-0.522-0.034-0.177-0.044-0.366-0.044-0.543s0.011-0.366 0.044-0.544c0.044-0.177 0.089-0.355 0.166-0.521 0.067-0.166 0.155-0.322 0.255-0.477 0.1-0.144 0.211-0.288 0.344-0.421 0.122-0.122 0.266-0.244 0.421-0.344 0.144-0.1 0.311-0.188 0.477-0.255s0.344-0.122 0.521-0.155c0.355-0.067 0.721-0.067 1.076 0 0.178 0.034 0.355 0.089 0.522 0.155s0.333 0.155 0.477 0.255c0.155 0.1 0.3 0.222 0.421 0.344 0.133 0.133 0.244 0.277 0.344 0.421 0.1 0.155 0.188 0.311 0.255 0.477 0.078 0.166 0.122 0.344 0.167 0.521 0.033 0.178 0.044 0.366 0.044 0.544s-0.011 0.366-0.044 0.543c-0.044 0.178-0.089 0.355-0.167 0.522-0.067 0.166-0.155 0.322-0.255 0.477s-0.211 0.288-0.344 0.421c-0.122 0.122-0.266 0.244-0.421 0.344-0.144 0.1-0.31 0.189-0.477 0.255s-0.344 0.122-0.522 0.155c-0.178 0.034-0.355 0.056-0.532 0.056z"></path>
<path d="M13.582 50.365c-0.732 0-1.442-0.3-1.964-0.81-0.51-0.521-0.81-1.231-0.81-1.964s0.3-1.442 0.81-1.964c1.032-1.031 2.895-1.031 3.927 0 0.51 0.522 0.81 1.231 0.81 1.964s-0.3 1.442-0.81 1.964c-0.522 0.51-1.231 0.81-1.964 0.81z"></path>
<path d="M15.867 44.363c-1.409-0.577-2.086-2.196-1.509-3.616v0c0.588-1.42 2.208-2.085 3.628-1.509v0c1.409 0.588 2.086 2.207 1.509 3.616v0c-0.444 1.076-1.476 1.72-2.574 1.72v0c-0.344 0-0.71-0.067-1.054-0.211zM18.285 38.095c-1.519-0.199-2.596-1.586-2.407-3.106v0c0.2-1.52 1.587-2.596 3.106-2.396v0c1.519 0.188 2.596 1.587 2.396 3.106v0c-0.177 1.398-1.375 2.418-2.74 2.418v0c-0.122 0-0.244-0.011-0.355-0.022zM15.878 29.010c-0.188-1.52 0.888-2.907 2.407-3.106v0c1.509-0.189 2.907 0.887 3.095 2.396v0c0.2 1.531-0.876 2.918-2.396 3.106v0c-0.122 0.022-0.244 0.022-0.355 0.022v0c-1.375 0-2.563-1.020-2.751-2.419zM14.358 23.253c-0.577-1.42 0.1-3.040 1.509-3.616v0c1.42-0.588 3.039 0.088 3.628 1.509v0c0.577 1.42-0.1 3.039-1.52 3.616v0c-0.344 0.145-0.699 0.211-1.043 0.211v0c-1.098 0-2.13-0.643-2.574-1.719z"></path>
<path d="M13.582 19.181c-0.732 0-1.442-0.3-1.964-0.81-0.122-0.133-0.244-0.267-0.344-0.421s-0.188-0.311-0.255-0.477-0.122-0.344-0.155-0.522c-0.033-0.177-0.055-0.366-0.055-0.543 0-0.732 0.3-1.442 0.81-1.964 1.032-1.032 2.895-1.032 3.927 0 0.51 0.521 0.81 1.231 0.81 1.964 0 0.178-0.022 0.366-0.056 0.543s-0.088 0.355-0.155 0.522-0.155 0.322-0.255 0.477c-0.1 0.155-0.222 0.288-0.344 0.421-0.522 0.51-1.231 0.81-1.964 0.81z"></path>
</symbol>
<symbol id="icon-basketball" viewBox="0 0 64 64">
<title>basketball</title>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M61.893 31.945c0 16.527-13.421 29.948-29.948 29.948s-29.948-13.421-29.948-29.948c0-16.527 13.421-29.948 29.948-29.948 16.638 0 29.948 13.421 29.948 29.948z"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M10.87 53.13c-1.664-1.664 6.433-12.534 18.080-24.291 7.099-7.099 13.976-12.867 18.523-15.972"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M53.13 53.13c-3.438 3.438-15.639-3.328-27.397-14.974-6.877-6.877-12.090-13.976-14.419-19.3"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M56.014 31.945c-7.986 0.222-21.962 1.775-27.951 8.43-4.215 4.659-2.44 10.87-0.111 15.418"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M27.73 8.541c-1.331 6.544-4.104 16.527-9.761 21.407-3.549 3.106-7.432 3.66-10.426 3.438"></path>
</symbol>
<symbol id="icon-football" viewBox="0 0 64 64">
<title>football</title>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M41.262 2.551c7.875 4.991 15.307 12.312 20.187 20.187-1.331 9.428-5.657 18.523-12.867 25.844-10.094 10.094-23.626 14.419-36.825 13.088-2.44-0.222-5.546-0.998-6.988-2.44-1.553-1.553-2.218-4.548-2.44-6.988-0.111-0.887-0.111-1.664-0.222-2.551"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M61.893 14.087c0-0.776-0.111-1.553-0.222-2.329-0.222-2.44-0.998-5.546-2.44-6.988-1.553-1.553-4.659-2.218-7.099-2.551-13.088-1.22-26.731 3.106-36.714 13.199-7.321 7.321-11.646 16.416-12.977 25.844 4.991 7.875 12.312 15.307 20.298 20.187"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M43.036 20.853l-22.184 22.295"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M34.828 21.518l7.542 7.542"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M21.518 34.828l7.542 7.542"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M28.173 28.173l7.542 7.542"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M31.39 4.991c11.203 5.546 21.962 16.305 27.508 27.508"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M4.991 31.501c5.546 11.203 16.305 21.962 27.508 27.508"></path>
</symbol>
<symbol id="icon-soccer" viewBox="0 0 64 64">
<title>soccer</title>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M24.402 42.815l-4.77-14.53 12.312-8.984 12.423 8.984-4.77 14.53z"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M24.957 8.097l6.988 2.773 6.988-2.773"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M53.685 20.409l-0.998 6.988 4.215 5.879"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M50.912 48.25l-7.432 1.442-4.326 6.1"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M13.532 48.25l6.988 1.442 3.882 5.546"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M7.099 33.719l4.215-6.322-1.109-7.432"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M31.945 10.87v8.43"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M52.686 27.397l-8.319 0.887"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M43.48 49.691l-3.882-6.877"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M20.52 49.691l3.882-6.877"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M11.314 27.397l8.319 0.887"></path>
<path stroke-width="4.0953" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M61.893 31.945c0 16.527-13.421 29.948-29.948 29.948s-29.948-13.421-29.948-29.948c0-16.527 13.421-29.948 29.948-29.948 16.638 0 29.948 13.421 29.948 29.948z"></path>
</symbol>
</defs>
</svg>


</body>
</html>

<?php
/**
 * User: @taikiken
 * Date: 2017/06/26
 * Time: 22:57
 */
// 一面タブからの導線を増やす #2080
// https://img.sportsbull.jp/json/bnr-sokuhou.json の topBanners の値を出力する
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
// @since 2017-12-18 completely update
?>
<aside class="stats_banner">
  <div class="stats_banner__heading">
    <h2 class="stats_banner__heading__title">速報&amp;<br />データ</h2>
  </div><!-- /.stats_banner__heading -->

  <ul class="stats_banner__list">
    <li class="stats_banner__item">
      <a href="/stats/npb/">
        <i>
          <svg class="icon icon--baseball">
            <use xlink:href="#icon-baseball" />
          </svg>
        </i>
        <span>プロ野球</span>
      </a>
    </li>
    <li class="stats_banner__item">
      <a href="/sokuhou/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-soccer" />
          </svg>
        </i>
        <span>サッカー<br />日本代表</span>
      </a>
    </li>
    <li class="stats_banner__item">
      <a href="/stats/bleague/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-basketball" />
          </svg>
        </i>
        <span>Bリーグ</span>
      </a>
    </li>
    <li class="stats_banner__item">
      <a href="/stats/u_rugby/kantou/">
        <i>
          <svg class="icon">
            <use xlink:href="#icon-football" />
          </svg>
        </i>
        <span>関西学生<br />アメフト</span>
      </a>
    </li>
  </ul><!-- /.stats_banner__list -->

  <div class="stats_banner__btn">
    <a class="stats_banner__btn__link" href="/stats/"><span>すべて</span></a>
  </div><!-- /.stats_banner__btn -->

  <?php include_once __DIR__.'/../_svg.php'; ?>

</aside><!-- /.stats_banner -->
<?php
// ------------------------------------------------------------
?>

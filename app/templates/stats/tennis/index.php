<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">
      <div class="stats__tennis__header">
        <a href="./" class="stats__tennis__header__title">
          <h1>
            <img class="responsive" src="/assets/images/stats/tennis/heading@2x.png" alt="テニス 速報&スタッツ" />
          </h1>
        </a>
      </div><!-- /.stats__tennis__header -->

      <div class="stats__tennis__banner">
        <a href="./?sj_page=tournament_2017001_men_singles_today">
          <img class="responsive" src="/assets/images/stats/tennis/bnr_hero@2x.png" alt="xxxxx">
        </a>
      </div>

      <div class="stats__nav">
        <ul class="stats__nav__list">
          <li class="stats__nav__item_1"><a href="./">トップ</a></li>
          <li class="stats__nav__item_2"><a href="./?sj_page=schedule_men_top">日程・結果</a></li>
          <li class="stats__nav__item_3"><a href="./?sj_page=ranking_21">ランキング</a></li>
          <li class="stats__nav__item_4"><a href="./?sj_page=players_men_a">選手情報</a></li>
          <li class="stats__nav__item_5"><a href="./?sj_page=player_395610_result">錦織 圭 最新結果</a></li>
        </ul>
      </div>

      <?php
      /*
        <?php if ( $page['ua'] === 'desktop' ) : ?>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common.css" />
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis.css" />
        <?php else : ?>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />
        <?php endif; ?>
      */
      ?>

      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />

      <script src="http://sports.stats-japan.jp/tennis/sjparts/js/main/tennis.js"></script>
      <script>
        sj_Tennistour.instance.render({
          'hideBcl' : true
        });
      </script>
    </section><!-- /.main-sec -->

    <section class="side-sec show-for-large">
      side section - PC版サイドカラム
    </section>
  </div>
</div><!-- /.body-sec -->

<?php
/*

# `*.instance.render( option );`

initスクリプト。以下のオプションがとれる

option = {
  'page'    : 'ranking_21', // 表示するページ
  'hideBcl' : true | false, // SJヘッダーの表示非表示 - trueで隠す
};

# `*.instance.callbackPage`

callback。ウィジェットinit後に処理を行いたい場合

```
*.instance.callbackPage = function() {
  // callback - do something
};
```

*/
?>

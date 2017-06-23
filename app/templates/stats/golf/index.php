<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">
      <div class="stats__header stats__header--golf">
        <h1 class="stats__header__title"><a href="./"><img class="responsive" src="/assets/images/stats/golf/heading@2x.png" alt="ゴルフ 速報&スタッツ" /></a></h1>
      </div><!-- /.stats__header -->

      <div class="stats__nav stats__nav--golf">
        <ul class="stats__nav__list">
          <li class="stats__nav__item_1"><a href="./?sj_PageID=pc_2017_schedule_21">国内ゴルフ</a></li>
          <li class="stats__nav__item_2"><a href="./?sj_PageID=pc_2017_schedule_11">海外ゴルフ(海外男子)</a></li>
          <li class="stats__nav__item_3"><a href="./?sj_PageID=pc_2017_schedule_13">海外ゴルフ(海外女子)</a></li>
        </ul>
      </div>

      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
      <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />

      <?php
      /*
        <?php if ( $page['ua'] === 'desktop' ) : ?>
        <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf.css" />
        <?php else : ?>
        <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />
        <?php endif; ?>
      */
      ?>

      <script src="http://golf.stats-japan.jp/parts/sportsbull/main.js"></script>
      <script>
        sj_golf.instance.render({
          'hideBcl' : true,
          'page'    :'pc_2017_schedule_21'
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

<style>
.stats {
  padding-bottom: 100px;
}
/*
.stats__nav ul {
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #0e357f;
  line-height: 1;
}

.stats__nav ul li {
  width: 20%;
  padding: 5px 5px 0;
}

.stats__nav ul li a {
  display: block;
  padding: 10px;
  font-size: 15px;
  border: 2px solid #0e357f;
  border-bottom: none;
  text-align: center;
}
*/
</style>
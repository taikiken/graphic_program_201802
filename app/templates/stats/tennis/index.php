<div class="stats__tennis__header">
  <a href="./" class="stats__tennis__header__title">
    <figure>
      <img src="//user-images.githubusercontent.com/971124/27073330-6a8bb4ae-505e-11e7-9a89-2f3f38f02177.png" style="height: auto; max-width:80%;"/>
    </figure>
    <h1>
      最新テニス情報(仮)
    </h1>
  </a>
</div>

<div class="stats__tennis__banner">
  <a href="./?sj_page=tournament_2017001_men_singles_today" style="background:url(http://media.istockphoto.com/photos/kei-nishikori-backhand-in-melbourne-picture-id505340344?s=2048x2048);">
    <h2>ウインブルドン / 7/3～16</h2>
    <small>( 特定の大会への誘導 ) </small>
  </a>
</div>


<div class="stats__tennis__nav">
  <ul>
    <li><a href="./">トップ</a></li>
    <li><a href="./?sj_page=schedule_men_top">日程・結果</a></li>
    <li><a href="./?sj_page=ranking_21">ランキング</a></li>
    <li><a href="./?sj_page=players_men_a">選手情報</a></li>
    <li><a href="./?sj_page=player_395610_result">錦織 圭 最新結果</a></li>
  </ul>
</div>


<?php
/*

# SJコードのJSエラー回避
- jsでは、$('#SJ_Tennis_header') を呼ばれてるがSJコードが生成するHTMLは、 $('.SJ_Tennis_header')である

*/
?>
<div id="SJ_Tennis_header"></div>

<?php if ( $page['ua'] === 'desktop' ) : ?>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common.css" />
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis.css" />
<?php else : ?>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />
<?php endif; ?>
<script src="http://sports.stats-japan.jp/tennis/sjparts/js/main/tennis.js"></script>


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
?><script>
sj_Tennistour.instance.render({
  'hideBcl' : true
});
</script>

<style>
.stats {
  padding-bottom: 100px;
}

/*  SJ header 非表示 */
.SJ_Tennis_header { display: none !important; }

/*  header  */
.stats__tennis__header__title {
  text-align:center; margin: 0 auto; border:1px solid #ccc;
  display: table;
  width: 100%;
}

.stats__tennis__header__title figure {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 30%;
}

.stats__tennis__header__title h1 {
  display: table-cell;
  vertical-align: middle;
  padding: 20px;
  font-size: 6vw;
}


.stats__tennis__banner {
  margin: 1em 0;
  text-align: center;
  position: relative;
  background: #fff;
}

.stats__tennis__banner a {
  display: block;
  padding: 20px;
  font-size: 5vw;
  font-weight: 700;
  color: #fff;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.stats__tennis__nav {
  margin: 1em 0;
}

.stats__tennis__nav ul {
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #0e357f;
  line-height: 1;
}

.stats__tennis__nav ul li {
  width: 20%;
  padding: 5px 5px 0;
}

.stats__tennis__nav ul li a {
  display: block;
  padding: 10px;
  font-size: 15px;
  border: 2px solid #0e357f;
  border-bottom: none;
  text-align: center;
}

<a href="./" class="stats__tennis__header__title">
  <div style="text-align:center; margin: 0 auto; border:1px solid #ccc;">
    <img src="//user-images.githubusercontent.com/971124/27073646-79e184a0-505f-11e7-8145-71f4a4237659.png" style="height: auto; max-width:80%;"/>
  </div>
</a>


<div class="stats__nav">
  <ul>
    <li><a href="./?sj_PageID=pc_2017_schedule_21">国内ゴルフ</a></li>
    <li><a href="./?sj_PageID=pc_2017_schedule_11">海外ゴルフ(海外男子)</a></li>
    <li><a href="./?sj_PageID=pc_2017_schedule_13">海外ゴルフ(海外女子)</a></li>
  </ul>
</div>


<?php if ( $page['ua'] === 'desktop' ) : ?>
<link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf.css" />
<?php else : ?>
<link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />
<?php endif; ?>
<script src="http://golf.stats-japan.jp/parts/sportsbull/main.js"></script>

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
sj_golf.instance.render({
  'hideBcl' : true,
  'page'    :'pc_2017_schedule_21'
});
</script>


<style>
.stats {
  padding-bottom: 100px;
}

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

</style>
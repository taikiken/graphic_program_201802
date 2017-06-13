<div style="text-align:center; margin: 0 auto; border:1px solid #ccc;">
  <img src="//user-images.githubusercontent.com/971124/27073646-79e184a0-505f-11e7-8145-71f4a4237659.png" style="height: auto; max-width:80%;"/>
</div>

<?php
/*

# SJコードのJSエラー回避
- jsでは、$('#SJ_Tennis_header') を呼ばれてるがSJコードが生成するHTMLは、 $('.SJ_Tennis_header')である

*/
?>
<?php if ( $page['ua'] === 'desktop' ) : ?>
<link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf.css" />
<?php else : ?>
<link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />
<?php endif; ?>
<script src="http://golf.stats-japan.jp/parts/sportsbull/main.js"></script>

  <div id="sj_contents_div"></div>

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
  'hideBcl' : true
});
</script>


<style>
.stats {
  padding-bottom: 100px;
}
</style>
<div style="text-align:center; margin: 0 auto; border:1px solid #ccc;">
  <img src="https://user-images.githubusercontent.com/971124/27073330-6a8bb4ae-505e-11e7-9a89-2f3f38f02177.png" style="height: auto; max-width:80%;"/>
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
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis.css" />
<?php else : ?>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />
<?php endif; ?>
<script src="http://sports.stats-japan.jp/tennis/sjparts/js/main/tennis.js"></script>


<?php
/*

# `sj_Tennistour.instance.render( option );`

initスクリプト。以下のオプションがとれる

option = {
  'sj_page' : 'ranking_21', // 表示するページ
  'hideBcl' : true | false, // SJヘッダーの表示非表示 - trueで隠す
};

# `sj_Tennistour.instance.callbackPage`

callback。ウィジェットinit後に処理を行いたい場合

```
sj_Tennistour.instance.callbackPage = function() {
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
/*  SJ header 非表示 */
.SJ_Tennis_header { display: none !important; }

.stats {
  padding-bottom: 100px;
}
</style>
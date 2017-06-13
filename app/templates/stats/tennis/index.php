<!-- #tennis -->

<?php if ( $app['ua'] === 'desktop' ) : ?>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common.css" />
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/fonts/css/fontawesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis.css" />
<?php else : ?>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/fonts/css/fontawesome.min.css"/>
<link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />
<?php endif; ?>
<script src="http://sports.stats-japan.jp/tennis/sjparts/js/main/tennis.js"></script>

<script>
sj_Tennistour.instance.render({
  'hideBcl' : true
});
</script>
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
?>
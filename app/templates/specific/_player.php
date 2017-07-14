<?php

# 外部プレイヤー

// webview本文取得時はautoplayしない
if ( isset($_GET['get']) && $_GET['get'] == 'body' ) :
  $is_autoplay = 'false';
else :
  $is_autoplay = 'true';
endif;

// 対象判定
// user.id :50 - TBS世界陸上
if ( $page['post']['user']['id'] == '50' ) :
  include_once __DIR__.'/_seriku_player.php';
endif;

// user.id : 26 - バーチャル広告野球
if ( $page['post']['user']['id'] == '26' ) :
  include_once __DIR__.'/_vk_brightcove_2017.php';
endif;

?>

<?php
/*

```html
<div id="single-visual-container"></div>
```

がDOM上にないとSPで

```html
# 本文下部バナー
<div id="post-content-banner"></div>
```

が表示されないようなので追加

*/
?>
<div id="single-visual-container" style="display:none !important;"></div>

<?php
/*

# レスポンシブ用フッター
- .show-for-large : Desktop用 / mobileサイズでも表示する場合はこのクラスつけちゃダメ
- .show-for-small : Mobile用 / 上に同じ

## ぱんくず出力

読み込み元で `$BREADCRUMB` を定義する
$BREADCRUMB = array(
  array(
    'label' => '海外サッカー',
    'path'  => '../'
  ),
);

*/
?>
<footer id="footer-container" class="foot-sec show-for-large">
  <?php include_once __DIR__.'/desktop/_footer-sec-inner.php'; ?>
</footer><!-- /.foot-sec -->

<footer class="foot-sec show-for-small">
  <?php include_once __DIR__.'/mobile/_footer-sec-inner.php'; ?>
</footer><!-- /.foot-sec -->

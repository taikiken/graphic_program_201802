<?php
// https://github.com/undotsushin/undotsushin/issues/1210
// CMS から一面・すべてのバナーを設定できるようにする #1210
// - 一面・すべての記事一覧の表示オプションを実装する
// - 日本代表速報の時のような利用を想定
// - 対象は、カルーセル下バナー（#1163 で実装したものと同じ仕様）
// - #1163 ではウェブのみの対応でしたが、アプリも対応をしたい
/*
 * <div class="focus-bnr">
      <a href="https://sportsbull.jp/sokuhou/?utm_source=SPORTS%20BULL&utm_content=20161011&utm_campaign=sokuhou&utm_medium=banner">
        <img src="https://dev-img.sportsbull.jp/raw/img2016102612371714779100.png" alt="サッカー日本代表リアルタイム速報">
      </a>
    </div><!-- /.focus-bnr -->
 */
// @since 2016-11-02
?>
<?php
// $category
$banner_title = $page['category']['title_banner']['pc'];

if (!empty($banner_title['image'])) :
  $banner_title_link = false;
?>
  <div class="focus-bnr">
    <?php
    // link check
    if (!empty($banner_title['link'])) :
      $banner_title_link = true;
      // link 有効時のみ a tag output
    ?>
      <a href="<?php echo $banner_title['link']; ?>">
    <?php
    endif;
    ?>
        <img src="<?php echo $banner_title['image'] ?>" alt="<?php echo $banner_title['text'] ?>">
    <?php
    if ($banner_title_link) :
      // anchor tag 閉じる
    ?>
      </a>
    <?php
    endif;
    ?>
  </div>
<?php
endif;
?>
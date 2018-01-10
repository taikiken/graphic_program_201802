<?php
/**
 * User: @taikiken
 * Date: 2017/06/26
 * Time: 22:57
 */
// 一面タブからの導線を増やす #2080
// @see https://github.com/undotsushin/undotsushin/issues/2080
// @since 2017-06-26
// @since 2017-12-18 update

/*

$statsItem = array(
  array(
    'title' => 'サッカー日本代表', // マウスオーバー時のtooltipタイトル
    'label' => 'サッカー<br />日本代表', // 実表記
    'path'  => '/sokuhou/', // リンク先
    'icon'  => array(
      'slug'    => 'soccer', // 表示アイコン
      'is_fill' => false // svgをfillするか
    )
  ),
);

*/
$statsItem = array(
  array(
    'title' => 'プロ野球',
    'label' => 'プロ野球',
    'path'  => '/stats/npb/',
    'icon'  => array(
      'slug'    => 'baseball',
      'is_fill' => true,
    )
  ),

  array(
    'title' => 'サッカー日本代表',
    'label' => 'サッカー<br />日本代表',
    'path'  => '/sokuhou/',
    'icon'  => array(
      'slug'    => 'soccer',
      'is_fill' => false,
    )
  ),

  array(
    'title' => 'Bリーグ',
    'label' => 'Bリーグ',
    'path'  => '/stats/bleague/',
    'icon'  => array(
      'slug'    => 'basketball',
      'is_fill' => false,
    )
  ),

  array(
    'title' => '相撲',
    'label' => '相撲',
    'path'  => '/stats/sumo/',
    'icon'  => array(
      'slug'    => 'sumo',
      'is_fill' => true,
    )
  ),

);

?>
<aside class="stats_banner">
  <div class="stats_banner__heading">
    <h2 class="stats_banner__heading__title">速報&amp;データ</h2>
  </div><!-- /.stats_banner__heading -->

  <ul class="stats_banner__list">
    <?php foreach( $statsItem as $key => $value ) : ?>
    <li class="stats_banner__item">
      <a href="<?php echo $value['path']; ?>" title="<?php echo $value['title']; ?>">
        <i>
          <svg class="icon <?php echo ($value['icon']['is_fill']) ? 'icon--fill' : ''; ?>">
            <use xlink:href="#icon-<?php echo $value['icon']['slug']; ?>" />
          </svg>
        </i>
        <span><?php echo $value['label']; ?></span>
      </a>
    </li>
    <?php endforeach; ?>
  </ul><!-- /.stats_banner__list -->

  <div class="stats_banner__btn">
    <a class="stats_banner__btn__link" href="/stats/"><span>すべて</span></a>
  </div><!-- /.stats_banner__btn -->

  <?php include_once __DIR__.'/../_svg.php'; ?>

</aside><!-- /.stats_banner -->
<?php
// ------------------------------------------------------------
?>

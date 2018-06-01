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

# ホームのスタッツ導線

- @require : /assets/css/ui.css
- PC / SP / WebView 共通


## 表示定義

```
$statsItem = array(
  array(
    'title' => 'サッカー日本代表', // マウスオーバー時のtooltipタイトル
    'label' => 'サッカー<br />日本代表', // 実表記
    'path'  => '/sokuhou/', // リンク先
    'icon'  => array(
      'slug'    => 'soccer', // 表示アイコン
      'is_fill' => false // svgをfillするか - アイコンによって異なる。「よくわかんないけどアイコン表示されない..」という方はtrueにしてみてください。
    )
  ),
);
```

*/
$statsItem = array(
  array(
    'title' => 'プロ野球',
    'label' => 'プロ野球',
    'path'  => '/stats/npb/',
    'icon'  => array(
      'slug'    => 'baseball',
      'is_fill' => true,
      'style'   => '',
    )
  ),

  array(
    'title' => 'MLB',
    'label' => 'MLB',
    'path'  => '/stats/mlb/',
    'icon'  => array(
      'slug'    => 'baseball',
      'is_fill' => true,
      'style'   => '',
    )
  ),

  array(
    'title' => 'Jリーグ',
    'label' => 'Jリーグ',
    'path'  => '/jleague/match/',
    'icon'  => array(
      'slug'    => 'soccer',
      'is_fill' => false,
      'style'   => '',
    )
  ),

  // array(
  //   'title' => 'サッカー日本代表',
  //   'label' => 'サッカー<br />日本代表',
  //   'path'  => '/sokuhou/',
  //   'icon'  => array(
  //     'slug'    => 'soccer',
  //     'is_fill' => false,
  //     'style'   => '',
  //   )
  // ),

  // array(
  //   'title' => 'テニス全豪OP',
  //   'label' => 'テニス<br />全豪OP',
  //   'path'  => '/stats/tennis/',
  //   'icon'  => array(
  //     'slug'    => 'tennis',
  //     'is_fill' => false,
  //     'style'   => '',
  //   )
  // ),

  array(
    'title' => 'Bリーグ',
    'label' => 'Bリーグ',
    'path'  => '/stats/bleague/',
    'icon'  => array(
      'slug'    => 'basketball',
      'is_fill' => false,
      'style'   => '',
    )
  ),

  // array(
  //   'title' => '大相撲',
  //   'label' => '大相撲',
  //   'path'  => '/stats/sumo/',
  //   'icon'  => array(
  //     'slug'    => 'sumo',
  //     'is_fill' => true,
  //     'style'   => 'margin-top: -2px; margin-left: 1px;',
  //   )
  // ),

);


// 一覧リンク
$stats_link = '/stats/';
if ( $page['ua'] !== 'desktop' ) :
  $stats_link = '/nav/stats/';
endif;


?>


<?php
/* バナーを複数追加

<style>
  .focus-bnr img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
</style>

<?php if ($page['ua'] === 'desktop') : ?>
<div class="focus-bnr">
  <a href="https://sportsbull.jp/toj-2018/">
    <img src="https://sportsbull.jp/_/toj/banner/ToJ2018-pc.png" alt="">
  </a>
</div>
<?php else : ?>
<div class="focus-bnr">
  <a href="https://sportsbull.jp/toj-2018/">
    <img src="https://sportsbull.jp/_/toj/banner/ToJ2018-sp.png" alt="">
  </a>
</div>
<?php endif; ?>
*/
?>
<aside class="stats_banner">
  <div class="stats_banner__heading">
    <h2 class="stats_banner__heading__title">
      速報&amp;<?php echo ( $page['ua'] !== 'desktop' ) ? '<br />' : ''; ?>データ
    </h2>
  </div><!-- /.stats_banner__heading -->

  <ul class="stats_banner__list">
    <?php foreach( $statsItem as $key => $value ) : ?>
    <li class="stats_banner__item">
      <a href="<?php echo $value['path']; ?>" title="<?php echo $value['title']; ?>">
        <i>
          <svg class="icon <?php echo ($value['icon']['is_fill']) ? 'icon--fill' : ''; ?>" style="<?php echo $value['icon']['style']; ?>">
            <use xlink:href="#icon-<?php echo $value['icon']['slug']; ?>" />
          </svg>
        </i>
        <span><?php echo $value['label']; ?></span>
      </a>
    </li>
    <?php endforeach; ?>
  </ul><!-- /.stats_banner__list -->

  <div class="stats_banner__btn">
    <a class="stats_banner__btn__link" href="<?php echo $stats_link; ?>"><span>すべて</span></a>
  </div><!-- /.stats_banner__btn -->

  <?php include_once __DIR__.'/../../../_svg.php'; ?>

</aside><!-- /.stats_banner -->
<?php
// ------------------------------------------------------------
?>

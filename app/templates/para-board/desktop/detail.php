<?php
/**
 * パラボード 試合詳細 - desktop
 * @since 2018-01-30
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

<?php include_once __DIR__."/../../_head.php"; ?>

  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php include_once __DIR__.'/../../_head_bottom.php'; ?>


<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'../../desktop/_category-heading.php';
?>

<?php
// eof brightcove
// ---------------------------------------------------------------------------

// header 表示条件 & template_classname に使用する template 名称を $template_name へ
$template_name = $page['template'];

// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}
// 記事詳細
if ( $template_name == 'p' || $template_name == 'comment' ) {

  // 記事詳細へ識別 CSS class 追加
  $whole_classes[] = 'post-single';

  // theme 設定 class を追加
  // JSON レスポンスの theme.base を CSS class へ追加します
  if ( $page['theme']['base'] ) {
    $whole_classes[] = $page['theme']['base'];
  }
}

// in category
if ( $template_name == 'category' ) {

    //crazy athletes除外
    if($page['category']['slug'] != 'crazy') {
      // @since 2016-09-01
      // https://github.com/undotsushin/undotsushin/issues/1053
      $whole_classes[] = 'layout-list';
      // ---[end 2016-09-01]---

      // template_classname があれば
      if ( !empty($page['template_classname']) && !in_array($page['template_classname'], $whole_classes) ) {
        $whole_classes[] = $page['template_classname'];
      }

  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
        $whole_classes[] = $page['category']['slug'];
    }
} elseif ( $template_name == 'search' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'layout-list';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'index' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'home';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'p' ) {
  // @since 2016-09-30
  $whole_classes[] = 'layout-detail';
  // 記事詳細 `big6tv` の時に `theme_big6` を whole へ追加する
  // @since 2017-03-24
  $page_category = $page['category'];
  if (isset($page_category) && $page_category['slug'] == 'big6tv' && !in_array('theme_big6', $whole_classes)) {
    $whole_classes[] = 'theme_big6';
  }

  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
    if($page_category['slug'] != 'crazy')
    {
        $whole_classes[] = $page_category['slug'];
    }
}
?>
</head>
<body>
<div id="whole" class="whole <?php echo join( ' ', $whole_classes);?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<?php
$competition_response = $page['competition_response'];

// [A]
if (!empty($competition_response)) :
  $competition_response_file = $competition_response['file'];
  $competition_response_file_enable = !empty($competition_response_file);
  $competition_response_file_class = $competition_response_file_enable ? ' result_enable' : '';
?>

<div class="body-sec">

<div class="paraboard__detail__logo_block">
  <div class="paraboard__detail__logo_block__inner">
    <p class="paraboard__detail__logo_block__logo"><a href="/para-board/"><img src="/assets/images/para-board/detail-heading.png" alt="PARA BOARD"></a></p>
    <div class="paraboard__detail__logo_block__btn">
      <a class="paraboard__detail__logo_block__btn__link" href="/para-board/">日程・結果一覧</a>
    </div><!-- /.paraboard__detail__logo_block__btn -->
  </div><!-- /.paraboard__detail__logo_block__inner -->
</div><!-- /.paraboard__detail__logo_block -->

<header class="paraboard__detail__header<?php echo $competition_response_file_class; ?>">
  <div class="paraboard__detail__header__outer">
    <div class="paraboard__detail__header__inner">
      <h1 class="paraboard__detail__header__heading"><?php echo $competition_response['competition_name']; ?></h1>
      <p class="paraboard__detail__header__category">
        <span class="paraboard__detail__header__category__icon"><img src="<?php echo $competition_response['icon']; ?>" alt=""></span>
        <span class="paraboard__detail__header__category__label"><?php echo $competition_response['sport_name']; ?></span>
      </p>

      <?php
      // [B]
      if ($competition_response_file_enable) :
      ?>
      <div class="paraboard__detail__btn__result">
        <a class="paraboard__detail__btn__result__link" href="<?php echo $competition_response_file; ?>" target="_blank">結果を見る</a>
      </div>
      <?php
      endif;
      // [/B]
      ?>
    </div>
  </div>
</header>

<?php
$competition_response_pc = $competition_response['pc'];

// ハイライト動画
$competition_response_highlight = $competition_response_pc['highlight_movie'];
// 記事
$competition_response_news = $competition_response_pc['news'];
// フォトギャラリー
$competition_response_photo = $competition_response_pc['photo_gallery'];
?>
<div class="paraboard__gallery">
  <?php
  // ハイライト動画
  if (is_array($competition_response_highlight) && count($competition_response_highlight) > 0) :
  ?>
    <div class="gallery--highlight">
      <header class="gallery__header">
        <h2 class="gallery__heading">ハイライト動画</h2>
        <p class="gallery__link hide"><a href="/pyeongchang2018/movie/">すべての動画を見る</a></p>
      </header><!-- /.gallery__header -->

      <ul class="gallery__list">
        <?php
        foreach ($competition_response_highlight as $gallery) :
        ?>
        <li class="gallery__list__item">
          <a href="<?php echo $gallery['url']; ?>" class="gallery__list__link">
            <figure class="gallery__list__figure">
              <img src="<?php echo $gallery['media']['images']['medium']; ?>" alt="">
            </figure>
          </a>
        </li>
        <?php
        endforeach;
        ?>
      </ul>
    </div>
  <?php
  endif;
  ?>
  <?php
  // 記事
  if (is_array($competition_response_news) && count($competition_response_news) > 0) :
  ?>
    <div class="gallery--post">
      <header class="gallery__header">
        <h2 class="gallery__heading">記事</h2>
        <p class="gallery__link hide"><a href="/pyeongchang2018/">すべての記事を見る</a></p>
      </header><!-- /.gallery__header -->

      <ul class="gallery__list">
        <?php
        foreach ($competition_response_highlight as $gallery) :
        ?>
        <li class="gallery__list__item">
          <a href="<?php echo $gallery['url']; ?>" class="gallery__list__link">
            <figure class="gallery__list__figure">
              <img src="<?php echo $gallery['media']['images']['medium']; ?>" alt="">
            </figure>
            <div class="gallery__list__data">
              <h3 class="gallery__list__heading"><?php echo $gallery['title']; ?></h3>
              <?php
              $gallery_categories = $gallery['categories'];
              if (is_array($gallery_categories) && count($gallery_categories) > 0) :
                $category_labels = array();
                foreach ($gallery_categories as $gallery_category) {
                  $category_labels[] = $gallery_category['label'];
                }
              ?>
              <p class="gallery__list__category">
                <?php
                echo join(', ', $category_labels);
                ?>
              </p>
              <?php
              endif;
              ?>
            </div>
          </a>
        </li>
        <?php
        endforeach;
        ?>
      </ul>
    </div>
  <?php
  endif;
  ?>
  <?php
  // フォトギャラリー
  if (is_array($competition_response_photo) && count($competition_response_photo) > 0) :
  ?>
    <div class="gallery--photo">
      <header class="gallery__header">
        <h2 class="gallery__heading">フォトギャラリー</h2>
        <p class="gallery__link hide"><a href="/pyeongchang2018/photo/">すべてのフォトギャラリーを見る</a></p>
      </header><!-- /.gallery__header -->

      <ul class="gallery__list">
        <?php
        foreach ($competition_response_photo as $gallery) :
          ?>
          <li class="gallery__list__item">
            <a href="<?php echo $gallery['url']; ?>" class="gallery__list__link">
              <figure class="gallery__list__figure">
                <img src="<?php echo $gallery['media']['images']['medium']; ?>" alt="">
              </figure>
              <div class="gallery__list__data">
                <h3 class="gallery__list__heading"><?php echo $gallery['title']; ?></h3>
                <?php
                $gallery_categories = $gallery['categories'];
                if (is_array($gallery_categories) && count($gallery_categories) > 0) :
                  $category_labels = array();
                  foreach ($gallery_categories as $gallery_category) {
                    $category_labels[] = $gallery_category['label'];
                  }
                  ?>
                  <p class="gallery__list__category">
                    <?php
                    echo join(', ', $category_labels);
                    ?>
                  </p>
                <?php
                endif;
                ?>
              </div>
            </a>
          </li>
        <?php
        endforeach;
        ?>
      </ul>
    </div>
  <?php
  endif;
  ?>
</div>

<?php
endif;
// [/A]
?>

<?php
// 大会概要
function competition_summary_tr($provider_name, $title, $option_name = null) {
  $tr = '';
  if (!empty($provider_name) || !empty($option_name)) :
    $tr .= '<tr>';
    $tr .= '<th class="paraboard__detail__overview__th">' . $title . '</th>';
    $tr .= '<td class="paraboard__detail__overview__td">';
    if (!empty($provider_name)) :
      $tr .= $provider_name;
      if (!empty($option_name)) :
        $tr .= ' / ' . $option_name;
      endif;
    else:
      if (!empty($option_name)) :
        $tr .= $option_name;
      endif;
    endif;
    if (!empty($option_name)) :
      $tr .= '' . $option_name;
    endif;
    $tr .= '</td>';
    $tr .= '</tr>';
  endif;
  return $tr;
}
?>

<div class="body-sec-inner">
  <div class="paraboard__detail__overview">
    <h2 class="paraboard__detail__overview__heading">大会概要</h2>
    <table class="paraboard__detail__overview__table">
      <tbody>
      <?php
      echo competition_summary_tr($competition_response['competition_name'],'大会名');
      echo competition_summary_tr($competition_response['sport_name'],'競技名');
      echo competition_summary_tr($competition_response['period'],'開催日');
      echo competition_summary_tr($competition_response['organizer'],'主催者');
      echo competition_summary_tr($competition_response['collaborator'],'協力者');
      echo competition_summary_tr($competition_response['sponsor'],'後援', $competition_response['cosponsor']);
      echo competition_summary_tr($competition_response['venue'],'会場名');
      echo competition_summary_tr($competition_response['qualification'],'参加資格');
      echo competition_summary_tr($competition_response['regulation'],'規定');
      // [提供団体]
      $competition_response_provider_name = $competition_response['provider_name'];
      $competition_response_provider_url = $competition_response['provider_url'];
      if (!empty($competition_response_provider_name)) :
      ?>
      <tr>
        <th class="paraboard__detail__overview__th">提供団体</th>
        <td class="paraboard__detail__overview__td">
          <?php
          if (!empty($competition_response_provider_url)) :
          ?>
            <a href="<?php echo $competition_response_provider_url; ?>" target="_blank">
          <?php
          endif;
          ?>
          <?php
          echo $competition_response_provider_name;
          ?>
          <?php
          if (!empty($competition_response_provider_url)) :
          ?>
            </a>
          <?php
          endif;
          ?>
        </td>
      </tr>
      <?php
      endif;
      // [/提供団体]
      ?>
      </tbody>
    </table>
  </div><!-- /.paraboard__detail__overview -->

  <div class="paraboard__detail__powerdby">
    <p>Powered by<br />
    <strong>一般社団法人日本FIDバスケットボール連盟</strong></p>
  </div><!-- /.paraboard__detail__powerdby -->
</div><!-- /.body-sec-inner -->

</div><!-- /.body-sec -->
<script>
(function(window) {
  'use strict';
  var UT = window.UT;
  var SPBL_ENV = window.SPBL_ENV || {};
  UT.ui.NavCurrent.init(SPBL_ENV.category, SPBL_ENV.platform === 'web_mobile');
}(window));
</script>
<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>

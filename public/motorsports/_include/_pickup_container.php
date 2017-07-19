<?php
/**
 * モータースポーツ - カルーセル
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 17:11
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
// property
// ==============================
// default 設定を確認する
if (!isset($option_directory)) {
  exit(0);
}

// JSON: PICKUP
// ==============================
$pickup = $page['pickup'];
if (!isset($pickup)) {
  return;
}
$pickup_response = $pickup->response;
if (!isset($pickup_response)) {
  return;
}
$pickup_response_articles = $pickup_response->articles;
if (!isset($pickup_response_articles) || count($pickup_response_articles) == 0) {
  return;
}

$pickup_response_articles_length = count($pickup_response_articles);
?>
<div id="pickup-container">
  <div class="hero-sec">
    <div class="hero-slider pickup-container">
      <?php
      // slideshow
      // --------------------------------------------------------------
      ?>
      <div class="hero-slider-inner">
        <div class="pickup-slider-wrapper" id="js-pickup-slider-wrapper">
          <ul class="pickup-slider" id="js-pickup-slider">
<?php
// current mark
$is_current = true;
// output slider container
foreach ($pickup_response_articles as $pickup_response_article) :
  // {string} - image | video
  $media_type = $pickup_response_article->media_type;
  // thumbnail: large 無いときは代替画像
  $media_images_large = $pickup_response_article->media->images->large;
  if (!isset($media_images_large)) {
    $media_images_large = '/assets/images/common/thumb-pickup-empty.png';
  }
  $media_background = 'background: url(' . $media_images_large . ') 50% 50% / cover no-repeat;';
  // category
  $categories = $pickup_response_article->categories;
?>
  <li class="js-pickup pickup<?php
  // JS で設定するためにコメントする
//  // first article -> current
//  if ($is_current) {
//    echo ' current';
//    $is_current  = false;
//  }
  ?>">
    <a href="<?php echo $pickup_response_article->url; ?>" style="<?php echo $media_background; ?>">
      <img src="/assets/images/index/kv-overlay.png" alt="" class="overlay">
      <?php
      // video mark
      if ($media_type == 'video') :
      ?>
        <img src="/assets/images/common/thumb-640x400-play.png" alt="" class="overlay overlay-play">
      <?php
      endif;
      ?>
      <div class="post-overview">

        <?php
        if (isset($categories) && count($categories) > 0) :
        ?>
          <div class="post-category">
          <span class="category-label-wrapper">
            <?php
            // recommend flag
            if ($pickup_response_article->is_recommend) :
            ?>
              <i class="post-label_recommend">おすすめ記事</i>
            <?php
            endif;
            // recommend
            ?>
            <?php
            // video mark
            if ($media_type == 'video') :
            ?>
              <i class="post-label_movie">動画</i>
            <?php
            endif;
            // video
            ?>
          <?php
          // output category label
          foreach ($categories as $category) :
          ?>
            <span class="category-label"><?php echo $category->label; ?></span>
          <?php
          endforeach;
          ?>
          </span>
          </div><!--/.post-category-->
        <?php
        endif;
        // eof: category output condition
        ?>
        <h2 class="post-heading"><?php echo $pickup_response_article->title; ?></h2>
        <div class="post-date"><?php echo $pickup_response_article->display_date; ?></div>
      </div>
    </a>
  </li>
<?php
endforeach;
?>
          </ul>
        </div>
      </div><!--/.hero-slider-inner-->
      <?php
      // --------------------------------------------------------------
      ?>

      <div class="hero-slider-control">
        <?php
        // prev / next | pager
        // ------------
        if ($pickup_response_articles_length > 1) :
        ?>
          <div id="js-direction-container" class="direction"></div>
          <div id="js-pager-container"></div>
        <?php
        endif;
        // ------------
        ?>
      </div>
    </div><!--/.hero-slider-->
  </div><!--/.hero-sec-->
</div>
<?php
// carousel JS
// ------------------------------------
?>
<script src="/assets/js/carousel_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

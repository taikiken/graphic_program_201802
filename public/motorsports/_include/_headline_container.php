<?php
/**
 * モータースポーツ - HEADLINE
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 19:04
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
// headline-container - carousel
// ===========================================
// default 設定を確認する
if (!isset($option_directory)) {
  exit(0);
}

// JSON: PICKUP
// ==============================
$headline = $page['headline'];
if (!isset($headline)) {
  return;
}
$headline_response = $headline->response;
if (!isset($headline_response)) {
  return;
}
$headline_response_articles = $headline_response->articles;
if (!isset($headline_response_articles) || count($headline_response_articles) == 0) {
  return;
}

$headline_response_articles_length = count($headline_response_articles);
?>
<div class="headline-section">
  <div class="headline-outer">
    <div id="headline-container">
      <div class="headline">
        <div class="headline-heading">
          <h2 class="headline-heading-title"><img src="/assets/images/common/headline-heading.png" alt="HEADLINE NEWS"></h2>
          <span class="headline-heading-ruby">注目のニュース</span>
        </div>
        <ul class="board-small column2">
        <?php
        // -------------------------------------------------------------
        foreach ($headline_response_articles as $headline_response_article) :
          // {string} - image | video
          $media_type = $headline_response_article->media_type;
          // thumbnail: 無いときは代替画像
          $media_images_thumbnail = $headline_response_article->media->images->thumbnail;
          if (!isset($media_images_thumbnail)) {
            $media_images_thumbnail = '/assets/images/common/thumb-noimage-70x70.png';
          }
          // category
          $categories = $headline_response_article->categories;
        ?>
          <li class="board-item">
            <a href="<?php echo $headline_response_article->url; ?>" class="post">
              <figure class="post-thumb post-thumb-headline">
                <img src="<?php echo $media_images_thumbnail; ?>" alt="">
                <?php
                // video play mark - if need
                if ($media_type == 'video') :
                ?>
                  <img src="/assets/images/common/thumb-1x1-play-s.png" alt="" class="post-thumb-overlay-movie type-movie"/>
                <?php
                endif;
                ?>
              </figure>
              <div class="post-data">
                <?php
                if (isset($categories) && count($categories) > 0) :
                ?>
                  <div class="post-category">
                  <span class="category-label-wrapper">
                    <?php
                    // recommend flag
                    if ($headline_response_article->is_recommend) :
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
                  <h3 class="post-heading"><?php echo $headline_response_article->title ?></h3>
                  <div class="post-date"><?php echo $headline_response_article->display_date; ?></div>
                <?php
                endif;
                // eof: category output condition
                ?>
              </div>
            </a>
          </li>
        <?php
        endforeach;
        // -------------------------------------------------------------
        ?>
          <li class="board-item sponsor-link">
            <div>
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=34481&targetID=adg_34481&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
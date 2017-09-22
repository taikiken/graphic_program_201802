<?php
/**
 * パンくず - SP 記事詳細上部
 * 記事ページの最適化 #2381
 * #ref https://github.com/undotsushin/undotsushin/issues/2381
 * author: @taikiken
 * Date: 2017/09/12
 * Time: 15:09
 */
?>

<?php
$content_count = 1;
?>
<nav class="post-breadCrumb">
  <ol itemscope itemtype="http://schema.org/breadCrumbList">
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
    <?php
    // ----------------------------------------------------------------
    // category label
    // categories 値が空 or NULL の記事がある
    $post_categories = $page['post']['categories'];
    if (is_array($post_categories)) :
      $post_categories_first = $post_categories[0];

      if (isset($post_categories_first)) :
        $post_categories_first_slug = $post_categories_first['slug'];
        $post_categories_first_label = $post_categories_first['label'];

        if (isset($post_categories_first_slug) && isset($post_categories_first_label)) :
          // area 除外
          if ($post_categories_first_slug != 'area') :
            $content_count += 1;
    ?>
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/category/<?php echo $post_categories_first_slug; ?>"><span itemprop="name"><?php echo $post_categories_first_label; ?></span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
    <?php
          endif;// not area
        endif;// isset $post_categories_first_slug
      endif;// isset $post_categories_first
    endif;// is_array($post_categories)
    ?>
    <?php
    // ----------------------------------------------------------------
    // another_categories - 地域
    $post_another_categories_area = $page['post']['another_categories']['area'];
    // another_categories.area check
    if (is_array($post_another_categories_area)) :
      // found another_categories.area
      // region を集める
      $area_regions = array();
      foreach ($post_another_categories_area as $area) :
        if (isset($area['region'])) {
          $area_regions[] = $area['region'];
        }
      endforeach;
      if (count($area_regions) >= 1) :
        // found region
    ?>
        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
          <?php
          $area_region_first = true;
          foreach ($area_regions as $area_region) :
            if (!$area_region_first) {
              echo ', ';
            }
            $content_count += 1;
          ?>
          <a itemprop="item" href="<?php echo '/area/' . $area_region . '/'; ?>">
            <span itemprop="name"><?php echo $area_region; ?></span><meta itemprop="position" content="<?php echo $content_count; ?>" />
          </a>
          <?php
            $area_region_first = false;
          endforeach;
          ?>
        </li>
    <?php
      endif;
    endif;
    ?>
    <?php
    // ----------------------------------------------------------------
    // last - this article
    // count up
    $content_count += 1;
    ?>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $page['post']['url']; ?>"><span itemprop="name"><?php echo $page['post']['title']; ?></span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
  </ol>
</nav>

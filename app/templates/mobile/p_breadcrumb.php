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
<nav class="main-sec">
  <ol itemscope itemtype="http://schema.org/breadCrumbList">
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
    <?php
    // categories 値が空の記事がある
    $post_categories = $page['post']['categories'];
    if (is_array($post_categories)) :
      $post_categories_first = $post_categories[0];

      if (isset($post_categories_first)) :
        $post_categories_first_slug = $post_categories_first['slug'];
        $post_categories_first_label = $post_categories_first['label'];

        if (isset($post_categories_first_slug) && isset($post_categories_first_label)) :
          $content_count += 1;
    ?>
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/category/<?php echo $post_categories_first_slug; ?>"><span itemprop="name"><?php echo $post_categories_first_label; ?></span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
    <?php
        endif;
      endif;
    endif;
    // count up
    $content_count += 1;
    ?>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $page['post']['url']; ?>"><span itemprop="name"><?php echo $page['post']['title']; ?></span><meta itemprop="position" content="<?php echo $content_count; ?>" /></a></li>
  </ol>
</nav>

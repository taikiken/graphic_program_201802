<?php
/**
 * Date: 2016/06/21
 * Time: 18:23
 * SEO対策 / パンくずリストを設置する #776
 */
?>
<nav class="foot-breadCrumb">
  <ol itemscope itemtype="http://schema.org/breadCrumbList">
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
    <?php if ($page['template'] == 'category') :
    // category ?>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/category/<?php echo $page['category']['slug']; ?>"><span itemprop="name"><?php echo $page['category']['label']; ?></span><meta itemprop="position" content="2" /></a></li>

    <?php elseif ($page['template'] == 'p') :
    // single ?>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/category/<?php echo $page['post']['categories'][0]['slug']; ?>"><span itemprop="name"><?php echo $page['post']['categories'][0]['label']; ?></span><meta itemprop="position" content="2" /></a></li>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $page['post']['url'] ?>"><span itemprop="name"><?php echo $page['post']['title'] ?></span><meta itemprop="position" content="3" /></a></li>

    <?php endif; ?>
  </ol>
</nav>

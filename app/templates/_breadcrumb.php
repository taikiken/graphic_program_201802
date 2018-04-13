<?php
/**
 * Date: 2016/06/21
 * Time: 18:23
 * SEO対策 / パンくずリストを設置する #776
 */

// TODO : controller or model で定義する
if ( !isset($BREADCRUMB) ) :

  if ($page['template'] == 'category') :
    $BREADCRUMB = array(
      array(
        'label' => $page['category']['label'],
        'path'  => '/category/'.$page['category']['slug'].'/',
      ),
    );

  elseif ($page['template'] == 'p') :
    $BREADCRUMB = array(
      array(
        'label' => $page['post']['categories'][0]['label'],
        'path'  => '/category/'.$page['post']['categories'][0]['slug'].'/',
      ),
      array(
        'label' => $page['post']['title'],
        'path'  => $page['post']['url'],
      ),
    );

  elseif ($page['template'] == 'motorsports') :
    $BREADCRUMB = array(
      array(
        'label' => $page['motorsports']['label'],
        'path'  => '/category/motorsports/',
      ),
      array(
        'label' => strtoupper($page['motorsports']['url']),
        'path'  => '/motorsports/'.$page['motorsports']['url'],
      ),
    );

  endif;

endif;
?>
<nav class="<?php echo $page['html_prefix']; ?>foot-breadCrumb">
  <ol itemscope itemtype="http://schema.org/breadCrumbList">
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
    <?php
    if ( isset($BREADCRUMB) ) :
      foreach( $BREADCRUMB as $key => $value ) :
    ?>
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $value['path']; ?>"><span itemprop="name"><?php echo $value['label']; ?></span>
      <meta itemprop="position" content="<?php echo $key + 2; ?>" /></a></li>
    <?php
      endforeach;
    endif;
    ?>
    <?php
    // @since 2018-02-13 - /para-board/ イレギュラー breadcrumb を使用するので追加する
    // https://aws-plus.backlog.jp/view/UNDO_SPBL-307#comment-1189460146
    if (isset($page['para_breadcrumbs'])) :
      $crumb_key = $key + 2;
      foreach ($page['para_breadcrumbs'] as $para_breadcrumb) :
        $crumb_key += 1;
    ?>
        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $para_breadcrumb['path']; ?>"><span itemprop="name"><?php echo $para_breadcrumb['label']; ?></span>
        <meta itemprop="position" content="<?php echo $crumb_key; ?>" /></a></li>
    <?php
      endforeach;
    endif;
    // para_breadcrumbs
    ?>
  </ol>
</nav>
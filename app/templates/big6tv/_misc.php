<?php


$misc = array(

  array(
    'slug'    => 'rikkio',
    'label'   => '立教大学'
  ),

  array(
    'slug'    => 'waseda',
    'label'   => '早稲田大学'
  ),

  array(
    'slug'    => 'keio',
    'label'   => '慶応大学'
  ),

  array(
    'slug'    => 'meiji',
    'label'   => '明治大学'
  ),

  array(
    'slug'    => 'hosei',
    'label'   => '法政大学'
  ),

  array(
    'slug'    => 'tokyo',
    'label'   => '東京大学'
  ),

);

$misc_Keyword_prefix = '東京六大学 ';


?>
  <section class="misc">
    <h2 class="misc-heading">各大学の動画・ニュース</h2>
    <ul class="misc-list">
      <?php foreach( $misc as $key => $value ) : ?>
      <li class="misc-item">
        <a href="<?php echo "{$page['site_url']}search/".rawurlencode($misc_Keyword_prefix.$value['label']); ?>">
          <img src="/assets/images/big6/icon-<?php echo $value['slug']; ?>.png" alt="<?php echo $value['label']; ?>">
        </a>
      </li>
      <?php endforeach; ?>
    </ul>
  </section><!-- /.misc -->

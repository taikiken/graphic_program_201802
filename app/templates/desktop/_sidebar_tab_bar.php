<?php
/**
 * 速報・データ ページ - desktop
 * 競技・種目 ページ - desktop
 * sidebar に表示する
 * @since 2018-04-11
 */
?>
<?php
include_once __DIR__."/../tab-bar/module/functions.php";

// /api/v1/bottomtab
$tab_data = @file_get_contents($app->model->property('file_get_url') . '/api/v1/bottomtab/');
$tab_response = json_decode($tab_data, true)['response'];

// 出力条件 - all [A]
if (isset($tab_response)) :
  $livescore_list = $tab_response['livescore'];
  $ctagory_list =  $tab_response['category'];
  // 出力条件 - data exist [B]
  if (
    isset($livescore_list) && is_array($livescore_list['parent']) && count($livescore_list['parent']) &&
    isset($ctagory_list) && is_array($ctagory_list['parent']) && count($ctagory_list['parent'])
  ) :
?>
    <div class="side-menu">
    <?php
    // 出力条件 - category [C]
    if (isset($ctagory_list) && is_array($ctagory_list['parent']) && count($ctagory_list['parent'])) :
      $categories = $ctagory_list['parent'];
      // loop - category
      foreach ($categories as $category) :
        $category_children = $category['child'];
        // 出力条件 - category - child [D]
        if (is_array($category_children) && count($category_children)) :
          $category_slug = tab_category_slug_by_label($category['dispName']);
          // pickup only
          if ($category_slug != 'pickup') {
            continue;
          }
    ?>
      <div class="menu-container category-<?php echo $category_slug; ?>">
        <h2 class="menu-heading"><?php echo $category['dispName']; ?></h2>
        <ul class="menu-list">
        <?php
        // category loop
        foreach ($category_children as $child) :
        ?>
          <li class="menu-item">
            <a href="<?php echo $child['link']; ?>" class="menu-item">
              <span class="menu-item-icon"><img src="<?php echo $child['icon']; ?>" alt=""></span>
              <span class="menu-item-label"><?php echo $child['dispName']; ?></span>
            </a>
          </li>
        <?php
        endforeach;
        // eof - category loop
        ?>
        </ul>
      </div>
    <?php
        endif;
        // 出力条件 - category - child [/D]
      endforeach;
      // eof loop - category
    endif;
    // 出力条件 - category [/C]
    ?>
    <?php
    // 出力条件 - livescore [D]
    if (isset($livescore_list) && is_array($livescore_list['parent']) && count($livescore_list['parent'])) :
      $live_scores = $livescore_list['parent'];
      // loop -live
      foreach ($live_scores as $live) :
        $live_children = $live_scores['child'];
        // 出力条件 - category - child [E]
        if (is_array($live_children) && count($live_children)) :
    ?>
          <div class="menu-container category-<?php echo tab_live_slug_by_label($child['dispName']); ?>">
            <h2 class="menu-heading"><?php echo $child['dispName']; ?>　速報・データ</h2>
            <ul class="menu-list">
            <?php
            // loop - live - child
            foreach ($live_children as $child) :
            ?>
              <li class="menu-item">
                <a href="<?php echo $child['link']; ?>" class="menu-item">
                  <span class="menu-item-icon"><img src="<?php echo $child['icon']; ?>" alt=""></span>
                  <span class="menu-item-label"><?php echo $child['dispName']; ?></span>
                </a>
              </li>
            <?php
            endforeach;
            // eof - loop - live - child
            ?>
            </ul>
          </div>
        <?php
        endif;
        // 出力条件 - category - child [/E]
         ?>
    <?php
      endforeach;
      // loop - live
    endif;
    // 出力条件 - livescore [/D]
    ?>
    </div><!--/.side-menu-->
  <?php
  endif;
  // 出力条件 - data exist [/B]
  ?>
<?php
endif;
// 出力条件 - all [/A]
?>

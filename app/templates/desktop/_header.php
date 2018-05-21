<?php if ( $page['conditional']['html_start'] ) : ?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
<?php endif; ?>


<?php
if ( $page['conditional']['head'] ) :
  include_once __DIR__."/../_head.php";
endif;
?>


<?php if ( $page['conditional']['head_assets'] ) : ?>
  <?php if(count($page['photo']) > 0):?>
    <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/css/style_pc.css?v=<?php echo $page['version']; ?>">
    <script src="<?php echo $page['site_url_uts']; ?>/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
  <?php endif;?>
  <?php if ( $page['template'] === 'inc' ) : ?>
    <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/inc/assets/<?php echo $page['directory']; ?>/desktop/inc.css/?v=<?php echo $page['version']; ?>">
  <?php else : ?>
    <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <?php endif; ?>

  <?php
  // VK出力用script
  if ( $page['template'] === 'inc' ) :
    include_once __DIR__.'./../_inc_vk_script.php';
  endif;
  ?>

<?php endif; ?>


<?php
if ( $page['conditional']['head_bottom'] ) :
  include_once __DIR__."/../_head_bottom.php";
endif;
?>


<?php if ( $page['conditional']['head_video'] ) :
  include_once __DIR__."/_head_video.php";
endif;
?>


<?php if ( $page['conditional']['body_start'] ) : ?>
  </head>
  <body>
<?php endif; ?>


<?php if ( $page['conditional']['whole'] ) :
  include_once __DIR__."/_whole.php";
endif;
?>


<?php
// header & gnav 表示条件
// TODO - model側でやりたい
$conditional_header = array(
  'index',
  '404',
  'category',
  'p',
  'search',
  'settings',
  'settings.social',
  'settings.account',
  'settings.interest',
  'settings.deactivate',
  'mypage',
  'mypage.activities',
  'notifications',
  'logout',
  'crazy',
  'inc'
);

if ( !in_array($page['template'], $conditional_header, true) ) :
  $page['conditional']['header'] = false;
  $page['conditional']['gnav']   = false;
endif;

?>

<?php if ( $page['conditional']['header'] ) :

  # SEO対策 - 外部向けテンプレの時 h1 (ロゴ) は pタグに
  $seo_h1 = ( $page['template'] !== 'inc' ) ? 'h1' : 'p';

?>
  <header id="<?php echo $page['html_prefix']; ?>header-container" class="SPBL_common <?php echo $page['html_prefix']; ?>head-sec">
    <div class="<?php echo $page['html_prefix']; ?>head-sec-inner">
      <?php if ( $page['conditional']['header_search'] ) : ?>
      <aside class="<?php echo $page['html_prefix']; ?>head-sec-left">
        <div id="<?php echo $page['html_prefix']; ?>head-search-container"></div><!-- /.head-search -->
      </aside>
      <?php endif; ?>

      <?php echo '<'.$seo_h1.'>'; ?><a href="<?php echo $page['site_url_uts']; ?>/">スポーツブル（スポブル）</a><?php echo '</'.$seo_h1.'>'; ?>

      <?php if ( $page['conditional']['header_user'] ) : ?>
      <aside class="<?php echo $page['html_prefix']; ?>head-sec-right">
        <div id="<?php echo $page['html_prefix']; ?>user-profile-container"></div><!--/.user-profile-container-->
      </aside>
      <?php endif; ?>

    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
<?php endif; ?>


<?php if ( $page['conditional']['gnav'] ) : ?>
  <nav id="<?php echo $page['html_prefix']; ?>global-nav-container" class="SPBL_common <?php echo $page['html_prefix']; ?>gnav-sec">
    <ul>
      <li id="<?php echo $page['html_prefix']; ?>home"><a href="<?php echo $page['site_url_uts']; ?>/">TOP</a></li>

      <?php foreach( $page['site_tabs'] as $tab ) {
        // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
        // タブの表示順はAPI通りにする
        ?>
        <li id="<?php echo $tab['slug']; ?>" class="gnav-<?php echo $tab['slug']; ?>">
            <?php if($tab['slug'] !== "vk"){ ?>
                <a href="<?php echo $page['site_url_uts']; ?>/category/<?php echo $tab['slug']; ?>/"><?php echo $tab['label']; ?></a>
            <?php }
            else{?>
                <a href="<?php echo "http://vk.sportsbull.jp/koshien"; ?>/"><?php echo $tab['label']; ?></a>
            <?php } ?>
        </li>
      <?php }//foreach ?>
    </ul>
  </nav><!-- /.gnav-sec -->
<?php endif; ?>


<?php if ( $page['conditional']['announce'] ) :?>
  <?php
  // since 2017-12-18
  // お知らせ表示
  // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
  ?>
  <div id="js-announce-container"></div>
<?php endif; ?>


<?php /*

#205 - backend フラッシュメッセージ対応完までview側の表示コメントアウト

<div id="dialogue-notice" class="dialogue-notice">
  <div class="dialogue-notice-inner">
    <div id="dialogue-notice-info" class="dialogue-notice-info">
      <p>パスワードが違います</p>
    </div>
    <div id="dialogue-notice-btn-close" class="dialogue-notice-btn-close"><a href="#dialogue-notice">CLOSE</a></div>
  </div>
</div><!-- /.dialogue-notice -->

*/?>

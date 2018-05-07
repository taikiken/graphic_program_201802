<?php

$conditional_footer = array(
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
  'motorsports', // mortorsports 条件を追加 - `/public/motorsports/motorsports_model.php` on 2017-07-06
  'crazy',
  'inc',
);

if ( !in_array($page['template'], $conditional_footer, true) ) :
  $page['conditional']['footer'] = false;
endif;


$conditional_copyright = array(
  'signup',
  'login',
  'logout',
  'reset_password',
  'reset_password.resetting',
);

if ( in_array($page['template'], $conditional_copyright, true) ) :
  $page['conditional']['footer_copyright'] = true;
endif;

?>

<?php if ( $page['conditional']['footer'] ) : ?>
  <footer id="<?php echo $page['html_prefix']; ?>footer-container" class="SPBL_common <?php echo $page['html_prefix']; ?>foot-sec">
    <?php include_once __DIR__.'/_footer-sec-inner.php'; ?>
  </footer><!-- /.foot-sec -->
<?php endif; ?>


<?php if ( $page['conditional']['footer_copyright'] ) : ?>
  <p class="SPBL_common <?php echo $page['html_prefix']; ?>copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
<?php endif; ?>


<?php if ( $page['conditional']['whole'] ) : ?>
</div><!-- /.whole -->
<?php endif; ?>


<?php if ( $page['conditional']['footer_modal'] ) : ?>
<div id="modal-container"></div>
<div id="logout-modal-container"></div>
<div id="deactivate-modal-container"></div>
<div id="flush-modal-container"></div>
<?php endif; ?>


<?php
if ( $page['conditional']['footer_script'] ) :
  include_once __DIR__.'/_footer_script.php';
endif;
?>


<?php
// VK用script
if ( $page['template'] === 'inc' && $page['directory'] === 'vk' ) :
  include_once __DIR__.'./../_footer_vk_script.php';
endif;
?>


<?php if ( $page['conditional']['html_end'] ) : ?>
</body>
</html>
<?php endif; ?>
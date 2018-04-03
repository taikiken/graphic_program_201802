<?php

// footer 表示条件 start
$template_name = $page['template'];

$conditional_sidemenu = array(
  'index',
  '404',
  'category',
  'p',
  'search',
  'signup_login',
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
  'inc',
);


if ( !in_array($page['template'], $conditional_sidemenu, true) ) :
  $page['conditional']['footer']   = false;
  $page['conditional']['sidemenu'] = false;
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

<?php if ( $page['conditional']['sidemenu'] ) : ?>
<div id="side-menu-container">
  <div id="side-menu-bg"></div>
  <div id='side-menu'>
    <ul id="side-menu-list">
      <li id="side-menu-service">
        <ul>
          <!-- Service Specific Menu -->
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-home" href="#"><i></i>スポーツブルトップへ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-mypage" href="#"><i></i>マイページ</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-config" href="#"><i></i>設定</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-logout" href="#"><i></i>ログアウト</a></li>
          <li class="side-menu-ut-nav"><a class="side-menu-ut-nav-link side-menu-ut-nav-about" href="#"><i></i>スポーツブルとは</a></li>
        </ul>
      </li>

      <?php if (!empty($page['side-menu'])) : ?>
      <li>
          <ul>
              <?php foreach ($page['side-menu'] as $list) : ?>
                  <li class="sidemenu-list-title"><?php echo $list['header'];?></li>
                  <?php foreach($list['items'] as $side_item) : ?>
                      <li>
                          <?php if ($side_item['type'] === 1 && false === empty($side_item['caption'])):?>
                              <div class="sidemenu_container">
                                  <a href="<?php echo $side_item['link']; ?>">
                                      <img src="<?php echo $side_item['image']['sp']; ?>" class="sidemenu_icon">
                                      <div class="sidemenu_title">
                                          <?php echo $side_item['title']; ?>
                                      </div>
                                      <div class="sidemenu_caption">
                                          <?php echo $side_item['caption'];?>
                                      </div>
                                  </a>
                              </div>
                          <?php else: ?>
                              <div class="sidemenu_container_single">
                                  <a href="<?php echo $side_item['link']; ?>">
                                      <img src="<?php echo $side_item['image']['sp']; ?>" class="sidemenu_icon">
                                      <div class="sidemenu_title_single">
                                          <?php echo $side_item['title']; ?>
                                      </div>
                                  </a>
                              </div>
                          <?php endif;?>
                      </li>
                  <?php endforeach; ?>
              <?php endforeach; ?>
          </ul>
      </li>
      <?php endif; ?>

      <li>
        <!-- Syn. Service List -->
        <div id='synapse-service-list-outer-box' style='display: none'>
          <ul id='synapse-service-list'>
            <li id="synapse-service-list-title">おすすめサービス</li>
          </ul>
        </div>

        <!-- Syn. Logo -->
        <div id="synapse-logo-box" class="synapse_logo" style='display: none'></div>
      </li>

    </ul>
  </div><!--/#side-menu-->
</div><!--/#side-menu-container-->
<?php endif; ?>


<?php if ( $page['conditional']['footer'] ) : ?>
<footer class="foot-sec">
  <?php include_once __DIR__.'/_footer-sec-inner.php'; ?>
</footer><!-- /.foot-sec -->
<?php endif; ?>


<?php if ( $page['conditional']['footer_copyright'] ) : ?>
  <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
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


<?php if ( $page['conditional']['footer_script'] ) :
  include __DIR__.'/_footer-bottom.php';
endif; ?>


<?php if ( $page['conditional']['html_end'] ) : ?>
</body>
</html>
<?php endif; ?>
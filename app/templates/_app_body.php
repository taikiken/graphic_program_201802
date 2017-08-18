 <?php if ( $page['post']['is_readmore'] ) :
          // -------------------------- [記事本文] --------------------------
          ?>
          <div id="post-content-container" class="post-content post-content_app">
            <p><?php echo $page['post']['description']; ?></p>
            <p><a id="readMore-external" class="post-content-btn-readMore" href="<?php echo $page['post']['readmore']['url']; ?>" onclick="ga('send', 'event', 'external_link', 'click', '<?php echo $page['post']['readmore']['url']; ?>', 0, {nonInteraction: true});">続きを読む(外部サイトへ)</a></p>
          </div>
        <?php else : ?>
          <div id="post-content-container" class="post-content post-content_app">

            <?php
              // #1602 - VK brightcove
              if ( isset($page['post']['media_vk_refid']) && $page['post']['media_vk_refid'] ) :
                echo '<br />';
                include_once __DIR__."/specific/_player.php";
              endif;
            ?>

              <?php
              if(count($page['photo']) > 0):
                  if(!isset($_GET['id'])):
                      ?>
                      <div id="list-photoalbum">
                          <p class="lead"><?php echo $page['post']['description'];?></p>
                          <ul>
                              <?php foreach($page['photo'] as $id => $photo) :?>
                                  <li>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $id?>&viewhead=1">
                                          <img class="lazyload" data-src="<?php echo $photo['sp_thumb']?>" style="height:50px;">
                                      </a>
                                  </li>
                              <?php endforeach;?>
                          </ul>
                      </div>
                  <?php else:?>
                      <div id="detail-photoalbum">
                          <nav class="nav-photoalbum">
                              <p class="prev">
                                  <?php if($_GET['id'] == 1):?>
                                  <a href="<?php echo $page['og_url_with_param']?>id=<?php echo count($page['photo'])?>&viewhead=1">
                                      <?php else:?>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $_GET['id'] - 1?>&viewhead=1">
                                          <?php endif;?>
                                          <i></i>前の写真
                                      </a>
                              </p>
                              <p class="list">
                                  <a href="<?php echo $page['og_url_with_param']?>viewhead=1">
                                      <i></i>写真一覧</a>
                              </p>
                              <p class="next">
                                  <?php if($_GET['id'] == count($page['photo'])):?>
                                  <a href="<?php echo $page['og_url_with_param']?>id=1&viewhead=1">
                                      <?php else:?>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $_GET['id'] + 1?>&viewhead=1">
                                          <?php endif;?>
                                          次の写真
                                          <i></i>
                                      </a>
                              </p>
                          </nav>
                          <figure>
                              <img src="<?php echo $page['photo'][$_GET['id']]['sp_main']?>" alt="">
                              <figcaption><?php echo $page['photo'][$_GET['id']]['title']?></figcaption>
                          </figure>
                          <p class="page">
                              <span><?php echo $_GET['id']?>/<?php echo count($page['photo'])?></span>
                          </p>
                          <nav class="nav-photoalbum">
                              <p class="prev">
                                  <?php if($_GET['id'] == 1):?>
                                  <a href="<?php echo $page['og_url_with_param']?>id=<?php echo count($page['photo'])?>&viewhead=1">
                                      <?php else:?>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $_GET['id'] - 1?>&viewhead=1">
                                          <?php endif;?>
                                          <i></i>前の写真</a>
                              </p>
                              <p class="list">
                                  <a href="<?php echo $page['og_url_with_param']?>viewhead=1">
                                      <i></i>写真一覧</a>
                              </p>
                              <p class="next">
                                  <?php if($_GET['id'] == count($page['photo'])):?>
                                  <a href="<?php echo $page['og_url_with_param']?>id=1&viewhead=1">
                                      <?php else:?>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $_GET['id'] + 1?>&viewhead=1">
                                          <?php endif;?>
                                          次の写真
                                          <i></i>
                                      </a>
                              </p>
                          </nav>
                          <ul class="list-photo">
                              <?php
                              $start = 1;
                              if($_GET['id'] >= 3 && (count($page['photo']) - $_GET['id']) >= 2):
                                  $start = $_GET['id'] - 2;
                              elseif($_GET['id'] < 3):
                                  $start = 1;
                              elseif((count($page['photo']) - $_GET['id']) < 2):
                                  $start = count($page['photo']) - 4;
                              endif;
                              for($i = $start; $i < $start + 5; $i++):
                                  $current = '';
                                  if($i == $_GET['id']):
                                      $current = 'class="current"';
                                  endif;
                                  ?>

                                  <li <?php echo $current?>>
                                      <a href="<?php echo $page['og_url_with_param']?>id=<?php echo $i?>&viewhead=1">
                                          <img class="lazyload" data-src="<?php echo $page['photo'][$i]['sp_thumb']?>"> </a>
                                  </li>
                                  <?php
                              endfor;
                              ?>
                          </ul>
                      </div>
                  <?php endif;?>
              <?php else:?>
                  <?php print_r($page['post']['body']); ?>
              <?php endif;?>

          </div><!-- /.post-content -->
        <?php
        // -------------------------- [/記事本文] --------------------------
        endif; ?>
        <?php
        // ----------------------------------------------------
        // 記事詳細: pc 媒体ロゴ
        if ( !empty( $page['post'] ) && !empty( $page['post']['user'] ) ) :

          $is_post_usr_logo = !empty( $page['post']['user']['logo'] );

          $post_user_logo_link = '';
          if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['link'] ) ) {
            $post_user_logo_link = $page['post']['user']['logo']['link'];
          }
          ?>
          <div class="provider mt30">
            <?php
            // user.logo.image
            if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['img'] ) ) :
              if ( empty($post_user_logo_link) ) :
                // link が存在しないので画像だけ表示します ?>
                <i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i>
              <?php else: // link + image を表示 ?>
                <a href="<?php echo $post_user_logo_link; ?>" onclick="ga('send', 'event', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', 0, {nonInteraction: true});"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i></a>
              <?php endif; ?>
            <?php endif; //----[image] ?>
            <div class="provider-data">
              <?php
              // user.name
              if ( !empty($page['post']['user']['name']) ) : ?>
                <p class="provider-name"><?php echo $page['post']['user']['name']; ?></p>
              <?php endif; //----[name]

              // user.logo.link
              // link が存在する時のみ表示します
              if ( !empty( $page['post']['user']['logo'] ) && !empty( $page['post']['user']['logo']['link'] ) ) : ?>
                <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" onclick="ga('send', 'event', 'provider_link', 'click', '<?php echo $page['post']['user']['logo']['link']; ?>', 0, {nonInteraction: true});">ウェブサイト</a></p>
              <?php endif; //----[link] ?>
            </div>
          </div><!-- /.provider -->
        <?php endif;
        // eof: 記事詳細: pc 媒体ロゴ
        // ---------------------------------------------------- ?>
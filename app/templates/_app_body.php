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
                  include_once __DIR__ . '/_app_photo_body.php';
              else:?>
                  <div style="font-size:0.8em">
                    <?php print_r($page['post']['body']); ?>

                  </div>
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
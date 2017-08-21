<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
<?php
// ---------------------------------------------------------------------------
// VideojsImaNode
if ( $page['post']['media']['video']['player'] == 'brightcove' ) :
  // brightcove code をここに
  // JS で非同期で読み込むと付随コードの読み込みが行われない様子
?>
  <style>
    body.vjs-full-window {
      padding: 0;
      margin: 0;
      height: 100%;
    }
    .video-js.vjs-fullscreen {
      position: fixed;
      overflow: hidden;
      z-index: 1000;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100% !important;
      height: 100% !important;
    }
    .video-js:-webkit-full-screen {
      width: 100% !important;
      height: 100% !important;
    }
    .video-js.vjs-fullscreen.vjs-user-inactive {
      cursor: none;
    }
    .video-js .vjs-remaining-time-display {
      line-height:3em;
    }
    .video-js .vjs-ima3-ad-container iframe {
      pointer-events: auto;
    }
  </style>
<!--
  <script src="//players.brightcove.net/3948005094001/rJL6q0az_default/index.min.js"></script>
  <script src="//players.brightcove.net/videojs-ima3/videojs.ima3.min.js"></script>
  <script src="/assets/js/libs/hls/videojs-contrib-hls.min.js?v=<?php /*echo $page['version']; */?>"></script>-->



    <link href="//vjs.zencdn.net/5.3/video-js.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ads.css" />
    <link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ima.css" />
    <link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" />

    <script src="//vjs.zencdn.net/5.3/video.min.js"></script>
    <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

    <script src="/assets/ima_plugin/js/videojs.hls.js"></script>
    <script src="/assets/ima_plugin/js/videojs.ads.js"></script>
    <script src="/assets/ima_plugin/js/videojs.ima.js"></script>

<?php endif; ?>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-74679267-1', 'auto');
    ga('require', 'linkid');
    ga('require', 'displayfeatures');

    // provider
    ga('send', 'event', 'provider', 'view', '<?php echo $page['post']['user']['name']; ?>', 0, {nonInteraction: true} );

    // category
<?php
    if ( $page['post']['categories'] && is_array($page['post']['categories']) ) :
      foreach ( $page['post']['categories'] as $key => $value ) :
?>
    ga('send', 'event', 'category', 'view', '<?php echo $value['label']; ?>', 0, {nonInteraction: true} );
<?php
      endforeach;
    endif;
?>

    // pageview
    ga('send', 'pageview');
  </script>

    <?php if(count($page['photo']) > 0):?>

        <link rel="stylesheet" href="/assets/css/style_sp.css?v=<?php echo $page['version']; ?>">
        <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
    <?php endif;?>
</head>
<body>
<div id="page" class="whole post-single ">
<div class="body-sec" style="margin: 0;">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事詳細: sp
    // response.theme.images.pc
    // response.description
    if ( $page['theme']['images']['sp'] ) : ?>
          <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['theme']['background_color'] : ''; ?>">
            <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
          </div>
    <?php endif;
    // eof: 記事詳細: sp
    // ---------------------------------------------------- ?>
    <div class="main-sec">

      <?php
      // #985 - バーチャル高校野球動画記事の場合
      if ( isset($page['post']['media_vk_refid']) && $page['post']['media_vk_refid'] ) :
        include_once __DIR__."/specific/_vk_brightcove.php";
      else :
        $post_kv_class = '';
        if ( $page['post']['media_type'] === 'video' ) {
          $post_kv_class .= ' post-video-kv';

          if ( $page['post']['media']['video']['player'] == 'facebook' ) {
            $post_kv_class .= ' post-video-fb';
          } elseif ( $page['post']['media']['video']['player'] == 'youtube' ) {
            $post_kv_class .= ' post-video-yt';
          } elseif ( $page['post']['media']['video']['player'] == 'brightcove' ) {
            $post_kv_class .= ' phone-post-kv';
          }
        }
        ?>
        <div class="post-kv<?php echo $post_kv_class; ?>" style="position:relative;">
          <?php if ( $page['post']['media_type'] === 'video' ) :
            // -------------------------- [メインビジュアル] --------------------------
            // ========= video ?>
            <?php if ( $page['post']['media']['video']['player'] == 'facebook' ) :
              // ---------- {facebook} ?>
              <div className="post-kv post-video-kv post-video-fb">
                <div class="fb-video" data-href="<?php echo $page['post']['media']['video']['facebook']; ?>" data-allowfullscreen="true" data-width="500"></div>
              </div>
            <?php elseif ( $page['post']['media']['video']['player'] == 'youtube' ) :
              // ---------- {youtube} ?>
              <img class="yt-video-size" src="/assets/images/common/thumb-16x9.png" alt="">
              <iframe class="yt-video" width="640" height="360" src="https://www.youtube.com/embed/<?php echo $page['post']['media']['video']['youtube']; ?>?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen style="width:100%;"></iframe>

            <?php elseif ( $page['post']['media']['video']['player'] == 'brightcove' ) :
              // ---------- {brightcove} ?>
              <div class="video-container">
                <img class="phone-video-guide" src="/assets/images/common/thumb-16x9.png" alt="">
                <video
                  id="video_content"
                  data-embed="default"
                  class="video-js"
                  preload="auto"
                  controls
                >
                </video>
              </div>
            <?php endif; ?>

            <?php if ( $page['post']['media']['video']['caption'] ) : ?>
              <figcaption class="caption">
                <?php echo $page['post']['media']['video']['caption']; ?>
              </figcaption>
            <?php endif; ?>

          <?php else :
          // ========= not video ?>
            <?php
            if ($page['post']['is_show_image']) :
              $post_kv_img = '';
              // original から large と medium と順に探していく
              if ($page['post']['media']['images']['original']) {

                $post_kv_img = $page['post']['media']['images']['original'];

              } elseif ($page['post']['media']['images']['large']) {

                $post_kv_img = $page['post']['media']['images']['large'];

              } elseif ($page['post']['media']['images']['medium']) {

                $post_kv_img = $page['post']['media']['images']['medium'];
              }
            ?>
              <?php if ($post_kv_img) :
              // ========= image ?>
                <figure class="post-single-figure">
                    <?php if(!isset($_GET['id'])):?>
                  <img src="<?php echo $post_kv_img; ?>" class="post-single-image" />
                    <?php endif;?>
                  <?php if ( $page['post']['media']['images']['caption'] ) : ?>
                    <figcaption class="caption">
                      <?php echo $page['post']['media']['images']['caption']; ?>
                    </figcaption>
                  <?php endif; ?>
                </figure>
              <?php endif; ?>
          <?php
            endif;// $page['post']['is_show_image']
          // -------------------------- [/メインビジュアル] --------------------------
          endif; ?>
        </div><?php //.post-kv ?>
      <?php endif; ?>

      <div class="post-detail">

        <div class="post-heading">
          <h1>
            <?php echo $page['title']; ?>
          </h1>
        </div>
        <div class="post-data">
          <div class="f-left">
            <p class="post-author">
              <?php echo $page['post']['user']['name']; ?>
            </p>
            <p class="post-category">
              <?php if ( $page['post']['categories'] ) : ?>
                <?php foreach( $page['post']['categories'] as $key => $value ) : ?>
                  <span class="category-label">
                  <?php echo $value['label']; ?>
                </span>
                <?php endforeach; ?>
              <?php endif; ?>
            </p>
            <p class="post-date">
              <?php echo $page['post']['display_date']; ?>
            </p>
          </div>
        </div><?php //.post-data ?>


        <?php include_once __DIR__."/_app_body.php"; ?>


      </div><?php //.post-detail ?>

      <div class="comment">
        <?php
        /*
         * https://github.com/undotsushin/undotsushin/issues/720
         * 広告 / PC版画像バナー広告をDFP管理下にする
         */
        // ------------------------------------
        if ( $page['ad']['sp'] ) : ?>
            <div class="sponsor-link_commentLower">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=<?php echo $page['ad']['sp']; ?>&targetID=adg_<?php echo $page['ad']['sp']; ?>&displayid=2&adType=INFEED&async=false&tagver=2.0.0"></script>
            </div><?php //.sponsor-link_commentLower ?>
        <?php endif; ?>
      </div><?php //.comment ?>
    </div><?php //.main-sec ?>
  </div><?php //.body-sec-inner ?>
</div><?php //.body-sec ?>
</div><?php //#page ?>

  <?php if ( $page['post']['media']['video']['player'] == 'facebook' ) :
  // facebook ?>
  <script>
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '842032129256034',
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/ja_JP/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  </script>
  <?php endif; ?>

  <?php if ( $page['post']['media']['video']['player'] == 'brightcove' ) :
  // brightcove ?>
  <script>
  (function () {
      var poster;
      var player = videojs('video_content');
      player.src( {
          'type': 'application/x-mpegURL',
          'src': "<?php echo $page['post']['media']['video']['url']['sd']; ?>"
      } );

      <?php if ($page['post']['media']['images']['medium']) : ?>
      poster = '<?php echo $page['post']['media']['images']['medium']; ?>';
      <?php elseif ($page['post']['media']['images']['thumbnail']) : ?>
      poster = '<?php echo $page['post']['media']['images']['thumbnail']; ?>';
      <?php endif; ?>

      if ( !!poster ) {
          player.poster(poster);
      }
      player.width( '100%', false );
      player.height( 'auto', false );


      var option = {
          id: 'video_content',
          adTagUrl: '<?php echo $page['post']['media']['video']['ad_url']['sp']; ?>' + '?' + Date.now()
      };
      player.ima(option);
      player.on('play', function(){
          ga('send', 'event', 'video', 'begin', '<?php echo $page['post']['media']['video']['url']['sd']; ?>',0);
      });
      player.on('ended', function () {
          if (navigator.userAgent.match(/iPhone/i)) {
            player.ima.onContentResumeRequested_();
            player.src('<?php echo $page['post']['media']['video']['url']['sd']; ?>');
          }
          ga('send', 'event', 'video', 'complete', '<?php echo $page['post']['media']['video']['url']['sd']; ?>',0);
      });
      if (navigator.userAgent.match(/iPhone/i)) {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        var adContainer = document.getElementById('video_content_ima-ad-container');
        player.on( 'adstart', function(){
          adContainer.setAttribute('style', 'z-index: 99; position: absolute;');
        });
        player.on( 'adend', function(){
          adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
        });
        adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
      }

      player.one('click', function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
      });

  }());
  </script>
  <?php endif; ?>

</body>
</html>

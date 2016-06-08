<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
  <link rel="stylesheet" href="/assets/sp/css/ui.css">

  <style>
    .webview-env {
      display:block;
      text-align:right;
      font-size:12px;
      color:#999;
    }

    .webview-media-video  {
      position: relative;
      width:100%;
      padding-top:56.25%;
      height:0;
    }

    .webview-media-video > *,
    .webview-media-video > * > span,
    .webview-media-video > * > span > iframe {
      display:block !important;
      position:absolute !important;
      width:100% !important;
      height:100% !important;
      top:0;
      right:0;
      bottom:0;
      left:0;
    }

    .webview-media-image > div {
      text-align:center;
    }

    .webview-media-image img {
      display:block;
      max-width:100%;
      height:auto;
      margin:0 auto;
    }

    #single-header-container {
      margin-bottom:2em;
      font-size:1.2em;
    }

    .post-content {
      padding-bottom:2em;
    }


  </style>

<?php
// ---------------------------------------------------------------------------
// brightcove
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
  </style>

  <script src="//players.brightcove.net/3948005094001/rJL6q0az_default/index.min.js"></script>
  <script src="//players.brightcove.net/videojs-ima3/videojs.ima3.min.js"></script>
  <script src="/assets/js/libs/hls/videojs-contrib-hls.min.js"></script>
<?php endif; ?>

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('set', 'dimension1', navigator.userAgent);
   ga('send', 'pageview');
   ga('send', 'event', 'ua', 'view', navigator.userAgent );
  </script>

</head>

<body class="post-detail">

  <div id="single-header-container">
    <div class="sp-single-header">
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
      </div>
    </div>
  </div>

  <div class="webview-media">

  <?php if ( $page['post']['media_type'] === 'video' ) : ?>

    <figure class="webview-media-video">

      <?php if ( $page['post']['media']['video']['player'] == 'facebook' ) : ?>
        <div class="fb-video" data-href="<?php echo $page['post']['media']['video']['facebook']; ?>" data-allowfullscreen="true" data-width="500"></div>

      <?php elseif ( $page['post']['media']['video']['player'] == 'youtube' ) : ?>
        <iframe width="640" height="360" src="https://www.youtube.com/embed/<?php echo $page['post']['media']['video']['youtube']; ?>?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

      <?php elseif ( $page['post']['media']['video']['player'] == 'brightcove' ) : ?>
        <video
          id="webview-brightcove"
          data-account="3948005094001"
          data-player="rJL6q0az"
          data-embed="default"
          class="video-js"
          preload="auto"
          controls
          >
        </video>
      <?php endif; ?>

      <?php if ( $page['post']['media']['video']['caption'] ) : ?>
      <figcaption>
        <small><?php echo $page['post']['media']['video']['caption']; ?></small>
      </figcaption>
      <?php endif; ?>

    </figure>

  <?php else : ?>

    <?php if ( $page['post']['media']['images']['original'] && $page['post']['is_show_image']) : ?>

    <figure class="webview-media-image">
      <div>
        <img src="<?php echo $page['post']['media']['images']['original']; ?>" />
      </div>
      <?php if ( $page['post']['media']['images']['caption'] ) : ?>
      <figcaption>
        <small><?php echo $page['post']['media']['images']['caption']; ?></small>
      </figcaption>
      <?php endif; ?>
    </figure>

    <?php endif; ?>

  <?php endif; ?>

  </div>


  <div class="post-content">
    <?php echo $page['post']['body']; ?>
  </div>


<?php if ( $page['post']['media']['video']['player'] == 'facebook' ) : ?>
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

<?php if ( $page['post']['media']['video']['player'] == 'brightcove' ) : ?>
<script>
(function () {

  var myPlayer;
  videojs('webview-brightcove').ready(function() {
    myPlayer = this;

    myPlayer.src(
      {"type":"application/x-mpegURL",
      "src":"<?php echo $page['post']['media']['video']['url']['sd']; ?>"}
    );

    myPlayer.poster('<?php echo $page['post']['media']['images']['medium']; ?>');

    <?php if ( $page['post']['media']['video']['vast'] ) : ?>
    myPlayer.ima3({
      debug: false,
      adTechOrder: [
        'html5'
      ],
      postrollTimeout: 2000,
      prerollTimeout: 1000,
      requestMode: 'onload',
      serverUrl: '<?php echo $page['post']['media']['video']['vast']; ?>' + Date.now(),
      timeout: 5000
    });
    <?php endif; ?>

  });
}());
</script>
<?php endif; ?>

</body>
</html>
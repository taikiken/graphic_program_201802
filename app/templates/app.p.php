<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <title><?php echo $page['title']; ?></title>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
  <style>

    body {
      padding:30px;
      font-size:3.5vw;
    }

    h1 {
      font-size:1.7em;
    }

    hr {
      margin:2em 0;
    }

    p {
      margin:1.5em 0;
      font-size:1.1em;
      line-height:1.8;
    }

    figure {
      padding:0;
      margin-left:0;
      margin-right:0;
    }

    figcaption {
      margin-top:10px;
      color:#666;
      text-align:left;
    }

    .webview-env {
      display:block;
      text-align:right;
      font-size:12px;
      color:#999;
    }

    .webview-categories {
      list-style:none;
      margin:0;
      padding:0;
    }

    .webview-categories li {
      display:inline;
      font-weight:bold;
      padding-right:5px;
      color:#e1438b;
    }

    .webview-meta {
    }

    .webview-meta time {
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

    .webview-media-image {
    }

    .webview-media-image > div {
      text-align:center;
      padding:20px;
      border:1px solid #ccc;
      -webkit-border-radius: 10px;
              border-radius: 10px;
    }

    .webview-media-image img {
      display:block;
      max-width:100%;
      height:auto;
      margin:0 auto;
    }


  </style>
</head>

<body>

<?php if ( $page['is_app'] ) : ?>
  <em class="webview-env">
    for 運動通信 <?php echo $page['is_app']; ?>
  </em>
<?php endif; ?>

  <h1>
    <?php echo $page['title']; ?>
  </h1>

  <div class="webview-meta">
    <?php echo $page['post']['user']['name']; ?><br />

    <?php if ( $page['post']['categories'] ) : ?>
    <ul class="webview-categories">
      <?php foreach( $page['post']['categories'] as $key => $value ) : ?>
      <li>
        <?php echo $value['label']; ?>
      </li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>

    <time><?php echo $page['post']['display_date']; ?></time>
  </div>

  <hr />


  <div class="webview-media">

  <!-- video -->
  <?php if ( $page['post']['media_type'] === 'video' ) : ?>

    <figure class="webview-media-video">

      <?php if ( $page['post']['media']['video']['facebook'] ) : ?>
        <div class="fb-video" data-href="<?php echo $page['post']['media']['video']['facebook']; ?>" data-allowfullscreen="true" data-width="500"></div>

      <?php elseif ( $page['post']['media']['video']['youtube'] ) : ?>
        <iframe width="640" height="360" src="https://www.youtube.com/embed/<?php echo $page['post']['media']['video']['youtube']; ?>?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

      <?php elseif ( $page['post']['media']['video']['url'] ) : ?>
        <video width="710" height="400" preload="none" controls="">
          <source src="<?php echo $page['post']['media']['video']['url']; ?>" type="video/mp4">
        </video>

      <?php endif; ?>

      <?php if ( $page['post']['media']['video']['caption'] ) : ?>
      <figcaption>
        <small><?php echo $page['post']['media']['video']['caption']; ?></small>
      </figcaption>
      <?php endif; ?>
    </figure>
  <!-- //video -->

  <?php else : ?>
    <?php if ( $page['post']['media']['images']['original'] ) : ?>

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


  <?php echo $page['post']['body']; ?>


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

</body>
</html>
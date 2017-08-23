<?php include __DIR__."/inc.php"; ?>
<!DOCTYPE html>
<html dir="ltr" lang="ja" style="height: auto;">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title> WebView | SPORTS BULL</title>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <link rel="stylesheet" href="/assets/css/photo/parts_sp.css">
  <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
  <script>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
  </script>
</head>

<body style="height: auto;">
                       
<!-- section_highlight_movie -->                      
<section class="section_interhigh_highlight">
  <div class="ttl-wrapper">
    <h2 class="ttl highlight"><i></i>動画特集</h2>
  </div>

  <div class="article_list">
    <article class="highlight_article">
       <ul class="thumb_area">
<?php echo $movie; ?>
      </ul>
    </article>
  </div>
</section>
                               
<!-- section_photogallery -->
<section class="section_interhigh_photo">
  <div class="ttl-wrapper">
    <h2 class="ttl photo"><i></i>フォトギャラリー</h2>
  </div>
    
  <div id="js-current-post" class="current-post photo_gallery">
    <ul class="photo_list">
<?php echo $photo; ?>
    </ul>
  </div>

  <p class="section_btn"><a href="/stats/ur_kansai/photo/"><i></i>すべてのフォトギャラリーを見る</a></p>  
</section>


</body>
</html>
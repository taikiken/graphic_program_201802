<?php include __DIR__."./../inc.php"; ?>
<link rel="stylesheet" href="/assets/css/photo/parts_sp.css">

<div class="sub_head_wrapper">
  <h2 class="sub_head_title"><i></i>関西学生アメリカンフットボールリーグ</h2>  
</div>

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

  <p class="section_btn"><a href="/stats/ua_kansai/photo/"><i></i>すべてのフォトギャラリーを見る</a></p>  
</section>

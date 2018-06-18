<?php include __DIR__."./../inc.php"; ?>
<!-- インターハイ css -->
<link rel="stylesheet" href="/assets/css/inhigh/parts_pc.css">
<!-- / インターハイ css -->

<!-- <div style="width: 728px; margin: 0 auto;"> -->     
<!--  インターハイ トップ　パーツ ---------------------------------------------------------->
    <section class="section_interhigh_highlight">
        <div class="ttl-wrapper">
            <h2 class="ttl highlight"><i></i>動画特集</h2>
            <p class="ttl_link"><a href="/inhigh/highlight/">すべての動画を見る</a></p>
        </div>

        <div class="article_list">
            <article class="highlight_article">
                <ul class="thumb_area">
<?php echo $movie; ?>
                </ul>
            </article>
        </div>
    </section>
                       
                       
                       
    <!--------------  section_photogallery  -------------->
    <section class="section_interhigh_photo">
        <div class="ttl-wrapper">
            <h2 class="ttl photo"><i></i>フォトギャラリー</h2>
            <p class="ttl_link"><a href="/inhigh/photo/">すべてのフォトギャラリーを見る</a></p>
        </div>
        
        <div id="js-current-photo-post" class="current-photo-post photo_gallery">
            <ul class="photo_list">
<?php echo $photo; ?>
            </ul>
        </div>
    </section>

<!-- / インターハイ トップ　パーツ ---------------------------------------------------------->
<!-- </div> -->
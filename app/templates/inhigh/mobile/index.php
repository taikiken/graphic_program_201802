<?php include __DIR__."./../inc.php"; ?>
<!-- インターハイ css -->
<link rel="stylesheet" href="/assets/css/inhigh/parts_sp.css">
<!-- / インターハイ css -->

<!--  インターハイ トップ　パーツ ---------------------------------------------------------->
                       
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

    <p class="section_btn"><a href="/inhigh/highlight/"><i></i>すべての動画を見る</a></p>
</section>

                                     
<!--------------  section_photogallery  -------------->
<section class="section_interhigh_photo">
    <div class="ttl-wrapper">
        <h2 class="ttl photo"><i></i>フォトギャラリー</h2>
    </div>
    
    <div id="js-current-post" class="current-post photo_gallery">
        <ul class="photo_list">
<?php echo $photo; ?>
        </ul>
    </div>
    <p class="section_btn"><a href="/inhigh/photo/"><i></i>すべてのフォトギャラリーを見る</a></p>
    
</section>

<div class="interhigh_bnr">
    <a class="show-for-small" href="http://www.inter-high-school.tv/" target="_blank">
        <img src="/assets/images/inhigh/SP_Banner_01B.jpg">
    </a>
</div>

<!-- / インターハイ トップ　パーツ ---------------------------------------------------------->

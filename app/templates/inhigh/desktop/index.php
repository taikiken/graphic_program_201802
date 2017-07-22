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
        
        <div id="js-current-post" class="current-post photo_gallery">
			<ul class="photo_list">
<?php echo $photo; ?>
            </ul>
        </div>
    </section>

    <div class="interhigh_bnr">
        <!-- /531683568/inhigh-ad/inhigh_pc_big_banner -->
        <script>
            googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/inhigh-ad/inhigh_pc_big_banner', [728, 90], 'div-gpt-ad-1500594913073-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            });
        </script>
        <div id='div-gpt-ad-1500594913073-0' style='height:90px; width:728px;'>
            <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1500594913073-0'); });
            </script>
        </div>
        <!-- // /531683568/inhigh-ad/inhigh_pc_big_banner -->
    </div>

<!-- / インターハイ トップ　パーツ ---------------------------------------------------------->
<!-- </div> -->
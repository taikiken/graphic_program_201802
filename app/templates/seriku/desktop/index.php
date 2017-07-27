<?php include __DIR__."./../inc.php"; ?>
<!-- インターハイ css -->
<link rel="stylesheet" href="/assets/css/seriku/parts_pc.css">
<!-- / インターハイ css -->

<!-- <div style="width: 728px; margin: 0 auto;"> -->     
<!--  インターハイ トップ　パーツ ---------------------------------------------------------->
    <section class="section_interhigh_highlight">
        <div class="ttl-wrapper">
            <h2 class="ttl highlight"><i></i>世界陸上で生まれた世界記録</h2>
            <p class="ttl_link"><a href="/seriku/world-record/">すべての動画を見る</a></p>
        </div>

        <div class="article_list">
            <article class="highlight_article">
                <ul class="thumb_area">
<?php echo get_entries("record",4,$db); ?>
                </ul>
            </article>
        </div>
    </section>
                       
    <section class="section_interhigh_highlight">
        <div class="ttl-wrapper">
            <h2 class="ttl highlight"><i></i>北京大会ハイライト</h2>
            <p class="ttl_link"><a href="/seriku/beijing/">すべての動画を見る</a></p>
        </div>

        <div class="article_list">
            <article class="highlight_article">
                <ul class="thumb_area">
<?php echo get_entries("beijing",4,$db); ?>
                </ul>
            </article>
        </div>
    </section>                   

<!-- / インターハイ トップ　パーツ ---------------------------------------------------------->
<!-- </div> -->
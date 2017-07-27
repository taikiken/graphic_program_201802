<?php include __DIR__."./../inc.php"; ?>
<!-- インターハイ css -->
<link rel="stylesheet" href="/assets/css/seriku/parts_sp.css">
<!-- / インターハイ css -->

<!--  インターハイ トップ　パーツ ---------------------------------------------------------->
                       
<section class="section_interhigh_highlight">
    <div class="ttl-wrapper">
        <h2 class="ttl highlight"><i></i>世界陸上で生まれた世界記録</h2>
    </div>

    <div class="article_list">
        <article class="highlight_article">

            <ul class="thumb_area">
<?php echo get_entries("record",4,$db); ?>
            </ul>
        </article>
    </div>

    <p class="section_btn"><a href="/seriku/world-record/"><i></i>すべての動画を見る</a></p>
</section>

<section class="section_interhigh_highlight">
    <div class="ttl-wrapper">
        <h2 class="ttl highlight"><i></i>北京大会ハイライト</h2>
    </div>

    <div class="article_list">
        <article class="highlight_article">

            <ul class="thumb_area">
<?php echo get_entries("beijing",4,$db); ?>
            </ul>
        </article>
    </div>

    <p class="section_btn"><a href="/seriku/beijing/"><i></i>すべての動画を見る</a></p>
</section>

<!-- / インターハイ トップ　パーツ ---------------------------------------------------------->

<!DOCTYPE html>
<html dir="ltr" lang="ja">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
        <meta charset="UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
        <title>インターハイ WebView | SPORTS BULL</title>
        <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
        <!-- インターハイ css -->
        <link rel="stylesheet" href="/assets/css/inhigh/parts_sp.css">
        <!-- / インターハイ css -->
        <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
        <script>
            var googletag = googletag || {};
            googletag.cmd = googletag.cmd || [];
        </script>
    </head>
    <body>
                       
        <!--  インターハイ トップ　パーツ ---------------------------------------------------------->
<?php include __DIR__."/inc.php"; ?>
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
            <p class="section_btn"><a href="/seriku/peking/"><i></i>すべての動画を見る</a></p>
        </section>

        <!-- / インターハイ トップ　パーツ ---------------------------------------------------------->

        <!-- for facebook -->
        <script src="/assets/js/global.bundle.js"></script>
    </body>
</html>
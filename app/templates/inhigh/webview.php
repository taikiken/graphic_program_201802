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
<?php

include __DIR__."/inc.php";

var_dump(__DIR__);

?>
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
         <!-- /531683568/inhigh-ad/inhigh_sp -->
            <script>
                googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/inhigh-ad/inhigh_sp', [320, 50], 'div-gpt-ad-1500595161892-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });
            </script>
            <div id='div-gpt-ad-1500595161892-0' style='display:inline-block; height:50px; width:100%;'>
                <script>
                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1500595161892-0'); });
                </script>
            </div>
            <!-- // /531683568/inhigh-ad/inhigh_sp -->
        </div>
        <!-- / インターハイ トップ　パーツ ---------------------------------------------------------->

        <!-- for facebook -->
        <script src="/assets/js/global.bundle.js"></script>
    </body>
</html>
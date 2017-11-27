<!DOCTYPE html>
<html dir="ltr" lang="ja" style="height: auto;">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
        <meta charset="UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
        <title>インターハイ WebView | SPORTS BULL</title>
        <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
        <!-- インターハイ css -->
        <link rel="stylesheet" href="/assets/css/crazy.css">
        <!-- / インターハイ css -->
        <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
        <script>
            var googletag = googletag || {};
            googletag.cmd = googletag.cmd || [];
        </script>
    </head>
    <body style="height: auto;">

    <section class="section_crazy_pickup">
        <div class="ttl-wrapper">
            <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
        </div>

        <div class="pickup_player_list">
            <ul class="thumb_area">
                <?php foreach($page['list'] as $player):?>
                <li><a href="/athlete/<?php echo $player->body->no?>/">
                        <div class="img"><img src="/prg_img/img/<?php echo $player->body->img?>" alt=""></div>
                        <div class="txt_area">
                            <h3 class="name"><?php echo $player->body->name?></h3>
                            <p class="genre"><?php echo $player->body->competition?></p>
                        </div>
                    </a></li>
                <?php endforeach;?>
            </ul>
        </div>

        <div class="more_btn pc_hide"><a href="/crazy/list/"><i></i>すべての選手を見る</a></div>
    </section>
    <section class="section_crazy_popular pc_hide">
        <div class="ttl-wrapper pc_hide">
            <h2 class="ttl popular"><i></i>人気の記事</h2>
        </div>
        <div id="Widget_articles-2" class="Widget_articles" data-category="crazy" data-type="ranking"></div>
    </section>
    <script src="/assets/widgets/articles-index/Widget_articles.js"></script>
    </body>
</html>
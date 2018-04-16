<?php
/*
 * CMS画面の上部メニュー定義
 *
 *   getSorC("is_external")で「authentic」テーブルの「is_external」値を判定
 */
?>
<li class="pl0"><a href="/editdm/">TOP</a></li>
<?php if(getSorC('is_carousel_headline')==1){
    //dews特別対応
    if(empty(getSorC('u_media')) === false && getSorC('u_media') == '67'){ ?>
            <li><a href="/editdm/repo_n/?cid=49&rid=7">ダンス_カルーセル</a></li>
    <?php } else { ?>
        <li><a href="/editdm/repo_n/?cid=8&rid=7">TOPカルーセル</a></li>
        <li><a href="/editdm/repo_n/?cid=9&rid=7">TOPピックアップ</a></li>
    <?php } //endif ?>
<?php }elseif(getSorC("usr")!="inhigh" && getSorC("usr")!="kansaifootball"){ ?>
    <?php if(getSorC("is_external")!=1){ ?>
        <li><a href="/editdm/ad/?cid=0&nid=0">広告設定</a></li>
        <li><a href="/editdm/repo_n/?cid=8&rid=7">TOPカルーセル</a></li>
        <li><a href="/editdm/repo_n/?cid=9&rid=7">TOPピックアップ</a></li>
        <li><a href="/editdm/repo_s/?rid=7">TOP以外ピックアップ</a></li>
    <?php } ?>
    <li><a href="/editdm/repo_n/?cid=1">記事</a></li>
    <?php if(getSorC("is_external")!=1){ ?>
        <li><a href="/editdm/photo/">フォトアルバム</a></li>
        <li><a href="/editdm/repo_n/?cid=10">カテゴリー</a></li>
    <?php } ?>
    <?php if(getSorC("is_external")!=1){ ?>
        <li><a href="/editdm/repo_n/?cid=94">選手</a></li>
        <li><a href="/editdm/repo_s/?rid=95">注目の選手</a></li>
        <li><a href="/editdm/repo_s/?rid=2">メディア</a></li>
        <li><a href="/editdm/company_news/">プレスリリース</a></li>
        <li><a href="/editdm/repo_n/?cid=6">会員</a></li>
        <li><a href="/editdm/comment/">コメント</a></li>
        <li><a href="/editdm/link/">記事取得</a></li>
        <li><a href="/editdm/bulls_picks/">BULL'S PICKS</a></li>
        <li><a href="/editdm/ads/edit">ads.txt設定</a></li>
        <li><a href="/editdm/user/status">会員ステータス</a></li>
        <li><a href="/editdm/notice/">お知らせ設定</a></li>
        <li><a href="/editdm/tabs">メニュータブ設定</a></li>
        <li><a href="/editdm/bottom_tabs_category">競技タブ設定</a></li>
        <li><a href="/editdm/bottom_tabs_livescore">速報タブ設定</a></li>
        <li><a href="/editdm/sidemenu/edit">サイドメニュー設定</a></li>
        <li><a href="/editdm/stats_pickup">サッカー代表戦バナー設定</a></li>
        <li><a href="/editdm/tour_of_japan/">TOUR OF JAPAN</a></li>
         <li><a href="/editdm/big6_live/">BIG6 LIVE</a></li>
  <?php } ?>
<?php }else{ ?>
    <li><a href="/editdm/photo/">フォトアルバム</a></li>
<?php } ?>
<!--
<li><a href="/editdm/repo_s/?rid=48">番組マスタ</a></li>
<li class="pickup"><a href="/editdm/pickup/">ピックアップ</a></li>
<li><a href="/editdm/repo_n/?cid=24">ホーム動画</a></li>
<li><a href="/editdm/repo_n/?cid=6">ライター設定</a></li>
<li><a href="/editdm/repo_s/?rid=2">LOCATION/CATEGORY設定</a></li>
-->

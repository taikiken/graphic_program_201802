<?php
/*

# レスポンシブ用フッター
- .show-for-large : Desktop用
- .show-for-small : Mobile用

## ぱんくず出力

読み込み元で ``$BREADCRUMB` を定義する
$BREADCRUMB = array(
  array(
    'label' => '海外サッカー',
    'path'  => '../'
  ),
);

*/
?>
<footer id="footer-container" class="foot-sec show-for-large">
  <div class="foot-sec-inner">

    <nav class="foot-breadCrumb">
      <ol itemscope itemtype="http://schema.org/breadCrumbList">
        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
        <?php
        if ( isset($BREADCRUMB) ) :
          foreach( $BREADCRUMB as $key => $value ) :
        ?>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $value['path']; ?>"><span itemprop="name"><?php echo $value['label']; ?></span>
          <meta itemprop="position" content="<?php echo $key + 2; ?>" /></a></li>
        <?php
          endforeach;
        endif;
        ?>
      </ol>
    </nav><!-- /.foot-breadCrumb -->

    <div class="foot-pr">
      <div class="foot-pr-inner">
        <figure><img src="/assets/images/common/footer-overview-figure.png" alt=""></figure>

        <div class="text-block">
          <h3 class="foot-pr-logo"><img src="/assets/images/common/footer-overview-logo.png" alt="SPORTS BULL アプリ版(iPhone/Android)"></h3>
          <ul class="foot-pr-btn">
            <li><a href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
            <li><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
          </ul>
          <p class="foot-pr-text">話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「SPORTS BULL」。高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。</p>
        </div><!-- /.text-block -->

        <div class="fb-page-plugin">
          <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="400" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
        </div>
      </div><!-- /.foot-pr-inner -->
    </div><!-- /.foot-pr -->

    <div class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

    <div class="fnav-block">
      <nav class="fnav">
        <ul>
          <li><a href="/about/">サービス紹介</a></li>
          <li><a href="/about/company/">会社概要</a></li>
          <li><a href="/about/privacy/">プライバシーポリシー</a></li>
          <li><a href="/about/terms/">利用規約</a></li>
        </ul>
      </nav><!-- /.fnav -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
    </div><!-- /.fnav-block -->
  </div><!-- /.foot-sec-inner -->
</footer><!-- /.foot-sec -->



<footer class="foot-sec show-for-small">
  <div class="foot-sec-inner">

    <nav class="foot-breadCrumb">
      <ol itemscope itemtype="http://schema.org/breadCrumbList">
        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
        <?php
        if ( isset($BREADCRUMB) ) :
          foreach( $BREADCRUMB as $key => $value ) :
        ?>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="<?php echo $value['path']; ?>"><span itemprop="name"><?php echo $value['label']; ?></span>
          <meta itemprop="position" content="<?php echo $key + 2; ?>" /></a></li>
        <?php
          endforeach;
        endif;
        ?>
      </ol>
    </nav><!-- /.foot-breadCrumb -->

    <div class="foot-pr">
      <div class="foot-pr-inner">
        <figure class="foot-pr-figure"><img src="/assets/sp/images/common/footer-overview-figure.png" alt="無料スポーツニュース&amp;動画アプリの決定版！"></figure>

        <div class="text-block">
          <h3 class="foot-pr-text"><img src="/assets/sp/images/common/footer-overview-text.png" alt=""></h3>
          <ul class="foot-pr-list">
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
            <li class="foot-pr-item"><a class="foot-pr-link" href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
          </ul>
        </div>
      </div><!-- /.foot-pr-inner -->

      <div class="foot-pr-btn">
        <a href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank">今すぐダウンロード</a>
      </div><!-- /.foot-pr-btn -->

      <div class="fb-page-plugin">
        <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
      </div>
    </div><!-- /.foot-pr -->

    <div class="sns-block">
      <ul>
        <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
        <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
        <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
      </ul>
    </div><!-- /.sns-block -->

    <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
  </div><!-- /.foot-sec-inner -->
</footer><!-- /.foot-sec -->

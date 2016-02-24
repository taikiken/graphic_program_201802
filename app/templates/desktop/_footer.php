<?php
// footer 表示条件 start
$template_name = $page['template'];

if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'search' ||
  $template_name == 'setting' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications'
) :
?>
  <footer class="foot-sec">
    <div class="foot-sec-inner">
      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure>
            <figcaption><img src="/assets/images/common/footer-overview-logo.png" alt="運動通信 CRAZY FOR SPORTS"></figcaption>
            <img src="/assets/images/common/footer-overview-figure.png" alt="">
          </figure>

          <div class="text-block">
            <h3>運動通信とは</h3>
            <p>話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「運動通信」。<br />
            高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。スマートフォンアプリをダウンロードして今日のニュースをチェックしましょう。</p>
            <ul>
              <li><a href="hoge" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li><a href="hoge" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div><!-- /.text-block -->
        </div><!-- /.foot-pr-inner -->
      </div><!-- /.foot-pr -->

      <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <nav class="fnav">
        <ul>
          <li><a href="hoge">広告掲載について</a></li>
          <li><a href="hoge">運動通信アプリの紹介</a></li>
          <li><a href="hoge">個人情報の取り扱いについて</a></li>
          <li><a href="hoge">利用規約</a></li>
          <li><a href="hoge">運営会社</a></li>
          <li><a href="hoge">ヘルプ</a></li>
          <li><a href="hoge">お問い合せ</a></li>
        </ul>
      </nav><!-- /.fnav -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="hoge" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="hoge" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="hoge" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; UNDO TSUSHIN inc. All rights reserved.</p>
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->
<?php
endif;
// footer 表示条件 end
// ------------------------------------------------------
?>
</div><!-- /.whole -->
<script>
( function () {

  'use strict';

  // -------------------------------------------
  // dev code
  // ToDo: 本番で削除
  // -------------------------------------------
  var UT = self.UT;

  // local develop mode
  UT.app.App.develop();

  // sign in
  // UT.app.User.login();

}() );
</script>
<script src="/assets/js/bundle/exe.bundle.js"></script>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
</body>
</html>
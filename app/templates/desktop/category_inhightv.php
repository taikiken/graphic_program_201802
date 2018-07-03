<!-- assets -->
<?php
/*

- DS指定のassets読み込み
- 広告用のGTM読み込み
- 一部スタイル調整

*/
?>
<link rel="stylesheet" href="<?php echo $page['parts']['endpoint']; ?>/renew_css/part-spbl.css" media="all" />
<script>window.jQuery || document.write('<script src="<?php echo $page['parts']['endpoint']; ?>/renew_js/jquery.min.js"><\/script>');</script>
<script src="<?php echo $page['parts']['endpoint']; ?>/renew_js/slick.min.js"></script>
<script src="<?php echo $page['parts']['endpoint']; ?>/renew_js/slickSetting.js"></script>
<!-- Ad / DFP - GTM -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N7WLDK9');</script>
<!-- // Ad / DFP - GTM -->

<style>
.inhightv__index__part-01 .modal {
  display: none;
}
.inhightv__index__part-04 {
  margin-top: 40px;
}
</style>
<!-- //assets -->


<div class="body-sec">

  <!-- part-01 -->
  <div class="inhightv__index__part-01">
    <?php echo $page['parts']['part-01']; ?>
  </div>
  <!-- //part-01 -->

  <!-- adslider -->
  <div class="inhightv__index__adslider">
    <?php echo $page['parts']['adslider']; ?>
  </div>
  <!-- //adslider -->

  <!-- part-02 -->
  <div class="inhightv__index__part-02">
    <?php echo $page['parts']['part-02']; ?>
  </div>
  <!-- //part-02 -->


  <div class="body-sec-inner">
    <section class="main-sec">


      <!-- part-03 -->
      <div class="inhightv__index__part-03">
        <?php echo $page['parts']['part-03']; ?>
      </div>
      <!-- //part-03 -->

      <div id="js-headline"></div>

      <aside class="sns-pr">
        <dl class="sns-pr-inner">
          <dt>
          <p><img src="/assets/images/index/sns-pr-logo.png" alt="SPORTS BULL"><span>を<strong>いいね</strong>して最新ニュースをチェック！</span></p>
          </dt>
          <dd>
            <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
          </dd>
        </dl><!-- /.sns-pr-inner -->
      </aside><!-- /.sns-pr -->

      <div class="board-large">
        <div id="board-container"></div><!--/archive-->
        <div id="board-container-more" data-afterclick="true"></div><!--/archive-more-->
      </div><!-- /.board-large -->


      <!-- part-04 -->
      <div class="inhightv__index__part-04">
        <?php echo $page['parts']['part-04']; ?>
      </div>
      <!-- //part-04 -->

    </section><!-- /.main-sec -->

    <section class="side-sec">
      <?php include_once __DIR__."/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->

  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/widgets/articles-index/Widget_articles_tag.js"></script>

<?php

include_once __DIR__."/_header.php";

?>


<div class="category-heading" style="height:auto;">
  <h1>
    <?php echo $page['title']; ?>
  </h1>
</div><!-- /.category-heading -->


<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="sponsor-link mt30 w728">


        <?php
        /*
        # pc_404_top
        */
        ?>
        <script type='text/javascript'>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/pc_404_top', [728, 90], 'div-gpt-ad-pc_404_top').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
          });
        </script>
        <!-- /531683568/pc_404_top -->
        <div id='div-gpt-ad-pc_404_top' style='height:90px; width:728px;'>
        <script type='text/javascript'>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_404_top'); });
        </script>
        </div>


      </div>

      <h2 class="mt50 bold f20">お探しのページは見つかりません</h2>
      <p>お探しのページは一時的にアクセスができない状況にあるか、移動もしくは削除された可能性があります。</p>

      <div class="mod-btnA01 mt30">
        <a href="/">TOPに戻る</a>
      </div><!-- /.mod-btnA01 -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->


<?php

include_once __DIR__."/_footer.php";

?>
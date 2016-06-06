<div class="category-heading">
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
        # pc_search_top
        */
        ?>
        <script type='text/javascript'>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/pc_search_top', [728, 90], 'div-gpt-ad-pc_search_top').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
          });
        </script>
        <!-- /531683568/pc_search_top -->
        <div id='div-gpt-ad-pc_search_top' style='height:90px; width:728px;'>
        <script type='text/javascript'>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_search_top'); });
        </script>
        </div>

      </div>

      <div class="board-large mt20">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->
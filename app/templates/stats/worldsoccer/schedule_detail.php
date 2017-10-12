<?php include __DIR__.'/_common_header.php'; ?>

<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">

      <?php include __DIR__.'/_header.php'; ?>

      <?php include __DIR__.'/_banner.php'; ?>

      <?php include __DIR__.'/_nav.php'; ?>

      <!-- 詳細埋め込み　ここから -->
        <div class="stats-worldsoccer-widget">
            <script src="//widgets.sports.gracenote.com/gns.widget.loader.js?c=1323" data-widget_id="kyodo_sportsbull-fb-matchdetail" data-match_id="<?php echo $page['match_id']; ?>"></script>
        </div>
      <!-- 詳細埋め込み　ここまで -->

    </section><!-- /.main-sec -->

    <?php include __DIR__.'/_sidebar.php'; ?>

  </div>
</div><!-- /.body-sec -->

<?php include __DIR__.'/_footer.php'; ?>

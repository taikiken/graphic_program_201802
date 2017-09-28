<?php include __DIR__.'/_common_header.php'; ?>

<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">

      <?php include __DIR__.'/_header.php'; ?>

      <?php include __DIR__.'/_banner.php'; ?>

      <?php include __DIR__.'/_nav.php'; ?>

      <div id="Widget_worldsoccer_team" data-league="<?php echo $page['league']; ?>" data-editionid="<?php echo $page['edition_id']; ?>"></div>
      <script src="/stats/assets/worldsoccer/js/Widget_worldsoccer_team.js"></script>

    </section><!-- /.main-sec -->

    <?php include __DIR__.'/_sidebar.php'; ?>

  </div>
</div><!-- /.body-sec -->

<?php include __DIR__.'/_footer.php'; ?>

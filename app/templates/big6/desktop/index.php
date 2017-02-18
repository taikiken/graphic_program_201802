<?php

include_once __DIR__."/../../desktop/_header_simple.php";

?>

<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">
      <div class="board-large">
        <h2>日程表</h2>
        <?php print_r($page['big6']['scheduleData']); ?>

        <hr />

        <h2>順位表</h2>
        <table>
        <?php foreach( $page['big6']['rankingData']['ranking'] as $key => $value ) : ?>
          <tr>
            <td><?php echo $value['rank']; ?></td>
            <td><?php echo $value['name']; ?></td>
            <td><?php echo $value['game']; ?></td>
            <td><?php echo $value['win']; ?></td>
            <td><?php echo $value['lose']; ?></td>
            <td><?php echo $value['draw']; ?></td>
            <td><?php echo $value['point']; ?></td>
            <td><?php echo $value['winningPercentage']; ?></td>
          </tr>
        <?php endforeach; ?>
        </table>

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">
      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->


  </div>
</div><!-- /.body-sec -->



<?php

include_once __DIR__."/../../desktop/_footer.php";
include_once __DIR__."/../../_debug.php";

?>
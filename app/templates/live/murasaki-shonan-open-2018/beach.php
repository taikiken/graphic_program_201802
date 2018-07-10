<?php
// app webview かを `?app=(ios|android)` から判定します
// ==============================
  $from_webview = false;
  if (isset($_GET['app'])) {
    if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
      $from_webview = true;
    }
  }
?>

<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

  <?php include_once __DIR__."/../../_head.php"; ?>

  <?php
  // static_contents
  // ===========================================
    include_once dirname(__DIR__) . '/murasaki-shonan-open-2018/_include/_static_contents_top.php';
  // ===========================================
  ?>


        <?php /* パークをデフォルトにする
        <div class="live--movie">
          <ul class="live--movie__beach">
            <li>
              <a href="/live/murasaki-shonan-open-2018/">
                <img src="/assets/images/live/murasaki-shonan-open-2018/txt_park_event.png" alt="PARK EVENT">
              </a>
            </li>
            <li>
              <a href="/live/murasaki-shonan-open-2018/beach/">
                <img src="/assets/images/live/murasaki-shonan-open-2018/txt_beach_event.png" alt="BEACH EVENT">
              </a>
            </li>
          </ul>
          <div class="embed--movie">
            <iframe src="https://www.youtube.com/embed/7uTZn_hGq4o?modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
        */ ?>

        <div class="live--movie">
          <ul class="live--movie__beach">
            <li>
              <a href="/live/murasaki-shonan-open-2018/park/">
                <img src="/assets/images/live/murasaki-shonan-open-2018/txt_park_event.png" alt="PARK EVENT">
              </a>
            </li>
            <li>
              <a href="/live/murasaki-shonan-open-2018/">
                <img src="/assets/images/live/murasaki-shonan-open-2018/txt_beach_event.png" alt="BEACH EVENT">
              </a>
            </li>
          </ul>
          <div class="embed--movie">
            <iframe src="https://www.youtube.com/embed/7uTZn_hGq4o?modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>

  <?php
  // static_contents
  // ===========================================
    include_once dirname(__DIR__) . '/murasaki-shonan-open-2018/_include/_static_contents_bottom.php';
  // ===========================================
  ?>

<?php

#2171 世界陸上

?>
<!--jQuery必須-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!--jQuery必須-->

<script src="https://sportsbull.jp/assets/seriku_player/js/sportsbull_player.js"></script>
<div
  class="playerArea"
  data-video-id="<?php echo $page['post']['media_vk_refid']; ?>"
  data-vast-type="sportsbull"
  data-auto-play="<?php echo $is_autoplay; ?>"
></div>


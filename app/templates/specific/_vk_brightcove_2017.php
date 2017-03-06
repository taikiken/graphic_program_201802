<?php

#958 バーチャル高校野球2016用 brightcove埋め込みコード

?>
<link href="/assets/vk_brightcove_2017/css/Player.css" rel="stylesheet"/>

<div style="display: block; position: relative;">
  <div style="padding-top: 56.25%;">
    <video
      id="ABCplayer"
      data-account="4802324450001"
      data-player="Bymj9RCx"
      data-embed="default"
      class="video-js"
      style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"
      preload="none"
      controls></video>
  </div>
</div>

<script src="//players.brightcove.net/4802324450001/Bymj9RCx_default/index.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/assets/vk_brightcove_2017/js/bc-mapi.js"></script>
<script src="/assets/vk_brightcove_2017/js/Player.js"></script>
<script type="text/javascript">
  videojs('ABCplayer').PlayerControl({
    "videoId" : "<?php echo $page['post']['media_vk_refid']; ?>",
    //"videoId" : "test97_kantoku1_mobile",
    "stillImageUrl" : "<?php echo $page['post']['media']['images']['large']; ?>",
    //"stillImageUrl" : "http://www.asahicom.jp/koshien/97/digest/20150808_1d.jpg",
    "autoPlay" : true,
    "showRelatedVideos" : true,
    "relatedVideosTags": ['hls_vod'],
  });
</script>


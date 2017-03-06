<?php

#958 バーチャル高校野球2016用 brightcove埋め込みコード

// webview本文取得時はautoplayしない
if ( isset($_GET['get']) && $_GET['get'] == 'body' ) :
  $is_autoplay = 'false';
else :
  $is_autoplay = 'true';
endif;

?>
<link href="/demo/vk_brightcove_2017/css/Player.css" rel="stylesheet"/>

<div style="display: block; position: relative;">
  <div style="padding-top: 56.25%;">
    <video
      id="ABCplayer"
      data-account="4802324450001"
      data-player="rJIcYM98"
      data-embed="default"
      class="video-js"
      style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"
      preload="none"
      controls></video>
  </div>
</div>

<script src="//players.brightcove.net/4802324450001/rJIcYM98_default/index.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/demo/vk_brightcove_2017/js/bc-mapi.js"></script>
<script src="/demo/vk_brightcove_2017/js/Player.js"></script>
<script type="text/javascript">
  videojs('ABCplayer').PlayerControl({
    "videoId" : "<?php echo $page['post']['media_vk_refid']; ?>",
    //"videoId" : "test97_kantoku1_mobile",
    "stillImageUrl" : "<?php echo $page['post']['media']['images']['large']; ?>",
    //"stillImageUrl" : "http://www.asahicom.jp/koshien/97/digest/20150808_1d.jpg",
    "autoPlay" : <?php echo $is_autoplay; ?>
    "showRelatedVideos" : true,
    "relatedVideosTags": ['hls_vod'],
  });

  //AdobeAnalyics再生開始計測メソッド
  sc_asa_digi_koshien_videotype = null;

  function videoStartTracking(videoType) {
    sc_asa_digi_koshien_videotype = videoType;
    console.log("VideoStartTracking, videoType=" + videoType);
    if("_satelite" in window){
      _satellite.track("trackKoshienVideoStart");
    }
  }

</script>


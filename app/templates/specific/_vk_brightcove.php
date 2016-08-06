<?php

#958 バーチャル高校野球2016用 brightcove埋め込みコード

?>
<link href="/assets/vk_brightcove/css/Player.css" rel="stylesheet"/>

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
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/assets/vk_brightcove/js/bc-mapi.js"></script>
<script src="/assets/vk_brightcove/js/Player.js"></script>
<script type="text/javascript">
  videojs('ABCplayer').PlayerControl({
    "videoId" : "<?php echo $page['post']['media_vk_refid']; ?>",
    //"videoId" : "koya98_homerun1_hls",
    "stillImageUrl" : "<?php echo $page['post']['media']['images']['large']; ?>",
    //"stillImageUrl" : "",
    "autoPlay" : true,
    "showRelatedVideos" : true,
    "relatedVideosTags": ['koya98_other'],
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


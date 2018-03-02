<?php

#2221 バーチャル高校野球2017-07版 brightcove埋め込みコード

?>
<link href="/assets/vk_brightcove_2017-07/css/Player.css" rel="stylesheet"/>

<div id="BCcontainer">
  <div style="display: block; position: relative; max-width: 100%;">
    <div style="padding-top: 56.25%;">
      <video
        id="ABCplayer"
        data-account="4802324450001"
        data-player="BJRhLxLRg"
        data-embed="default"
        class="video-js"
        style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"
        controls>
      </video>
    </div>
  </div>
</div>

<script src="//players.brightcove.net/4802324450001/BJRhLxLRg_default/index.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<script src="/assets/vk_brightcove_2017-07/js/bc-mapi.js"></script>
<script src="/assets/vk_brightcove_2017-07/js/Player.js"></script>
<script type="text/javascript">
  videojs('ABCplayer').PlayerControl({
    videoId : "<?php echo $page['post']['media_vk_refid']; ?>",
    stillImageUrl : "<?php echo $page['post']['media']['images']['large']; ?>",
    autoPlay : <?php echo $is_autoplay; ?>
  });

  //AdobeAnalyics再生開始計測メソッド
  var sc_asa_digi_koshien_videotype = null;
  var sc_asa_digi_koshien_videoadtype = null;

  function videoStartTracking(videoType) {
   sc_asa_digi_koshien_videotype = videoType;
   console.log("VideoStartTracking, videoType=" + videoType);
   if("_satellite" in window){
     _satellite.track("trackKoshienVideoStart");
   }
  }

  function adStartTracking(videoType, adType) {
   sc_asa_digi_koshien_videotype = videoType;
   sc_asa_digi_koshien_videoadtype = adType;
   console.log("adStartTracking, videoType=" + videoType + ", adType=" + adType);
   if("_satellite" in window){
     _satellite.track("trackKoshienVideoAdStart");
   }
  }
</script>
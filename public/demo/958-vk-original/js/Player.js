videojs.plugin('PlayerControl', function (settings) {
  var player = this;

  //console.log("plugin loaded!");

  var PLAY_IMG_URL = "http://www.asahicom.jp/sp/koshien/virtualbaseball/images/btn_play.png";
  var ADTAG_XML_URL = "http://98-live-koshien.s3.amazonaws.com/98/adtag.xml";
  var DEFAULT_STILL_IMAGE_URL = "http://www.asahicom.jp/koshien/virtualbaseball/images/98/player/default_image.jpg";

  var myMediaInfo = null;　
  var infoIsAd = false;　
  var infoIsLive = false;
  var infoAdCategory = "";
  var infoStillImageUrl = "";
  var beaconUrl = "";
  var beaconTrackPoint = 0.5;
  var isBeaconSent = false;
  var currentVideoId = null;
  var deviceType, browserType;
  var adUrl_preroll = "";
  var adUrl_postroll = "";
  var prerollPlayed = false;
  var postrollPlayed = false;
  var overlay, overlay2, overlay3, overlay4, _overlayContent;

  //動画エンベッドパラメータ取得
  //指定動画ID（参照ID）
  var videoRefId =  settings.videoId;
  //console.log('videoRefId =' + videoRefId);
  //スチル画像URL
  var stillImageUrl = "";
  if(settings.stillImageUrl != undefined){
    stillImageUrl = settings.stillImageUrl;
  }
  //自動再生フラグ
  var isAutoPlay = false;
  if(settings.autoPlay != undefined && settings.autoPlay == true){
    isAutoPlay = true;
  }
  //関連動画リスト表示フラグ
  var isShowRelatedVideos = false;　//関連動画を表示するかのフラグ
  var isPlayedRelatedVideo = false; //関連動画からの再生かどうかを示すフラグ
  var relatedVideosLoaded;
  if(settings.showRelatedVideos != undefined && settings.showRelatedVideos == true){
    isShowRelatedVideos = true;
  }

  //UserAgent・現在時刻取得、UUID生成
  var agent = navigator.userAgent;
  var currentTime = getCurrentTime();
  var uuid = getUuid();

  function initializeAdTag(){
    $.ajax({
      url: ADTAG_XML_URL,
      dataType:"xml",
      success: function(xml){
        var functionA = readAdtagXml;
        functionA(xml);
      },
      error: function(xml) {
        console.error("[Error]Adtag XML cannot be loaded.");
        if(isAutoPlay || isPlayedRelatedVideo){
          player.play();
        }
      }
    });
  }

  function readAdtagXml(xml){
    adUrl_preroll = "";
    adUrl_postroll = "";
    $(xml).find('adtag').each(function(adtagxml){
      if($(this).attr('id') == infoAdCategory){
        var adtagxml = "";
        if(infoIsLive){
          adtagxml = $(this).find('live');
        }else{
          adtagxml = $(this).find('vod');
        }
        //console.log("Adtag XML=" , adtagxml);

        //Preroll URL取得
        var adtag = $(adtagxml).find('preroll').text();
        adUrl_preroll = genAdTag(adtag);
        console.log("Preroll URL=" , adUrl_preroll);
        if(!isPlayedRelatedVideo){
          //serverUrlにPrerollのURLを設定
          player.ima3.settings.serverUrl = adUrl_preroll;
        }else{
          //関連動画から再生の場合は、serverUrlを空に設定
          player.ima3.settings.serverUrl = "";
        }

        //Postroll URL取得
        var adtag2 = $(adtagxml).find('postroll').text();
        adUrl_postroll = genAdTag(adtag2);
        console.log("Postroll URL=" , adUrl_postroll);
      }
    });

    if(isAutoPlay || isPlayedRelatedVideo){
      //console.log("Adtag XML is loaded correctly, so video autoPlay starts.");
      player.play();
    }
  }

  function _handleMediaPlaying(event){
    //console.log("Media is playing");
    //関連動画からの再生（PC）で、Preroll有りの場合
    if(isPlayedRelatedVideo && adUrl_preroll != ""){
      player.ima3.settings.requestMode = "ondemand";
      player.ima3.adrequest(adUrl_preroll);
      //console.log("preroll is requested");
    //初回再生＆Preroll無しの場合
    }else if(adUrl_preroll == ""){
      //スチル画像を非表示
      hidePlayerOverlay();
      //ボリュームを1に戻す
      player.volume(1);
    }else if(!isAutoPlay || deviceType != "pc"){
      //Preroll再生時は一旦本編再生をPauseする(PCの自動再生時を除く)
      player.pause();
    }
  }

  function _handleMediaEnded(event){
    //console.log("Media is ended");
    if(adUrl_postroll != "" && !postrollPlayed){
      //Postroll広告を再生
      postrollPlayed = true;
      player.ima3.settings.requestMode = "ondemand";

      if(deviceType == "ios_mweb"){
        player.one('ended', function(event) {
          player.currentTime(0);
          player.pause();
          //console.log("The currentTime was moved to 0 because the browser is iOS_Web.");
        });
      }
      player.ima3.adrequest(adUrl_postroll);
      //console.log("postoll is requested");
    }
    else {
      if(relatedVideosLoaded){
        //関連動画リストを読み込み済みの場合は表示を行う
        showRelatedVideos();
      }
    }
  }

  function _handleMediaProgress(event){
    if(!isBeaconSent){
      if(prerollPlayed || adUrl_preroll == ""){
        //console.log("[MediaProgress] currentTime = " + player.currentTime());
        if(player.currentTime() > beaconTrackPoint){
          //ABC Beaconログ計測
          var eve = document.createElement("img");
          eve.setAttribute("src", beaconUrl);
          eve.setAttribute("width", 0);
          eve.setAttribute("height", 0);
          eve.style.display = "none";
          document.getElementsByTagName('body')[0].appendChild(eve);
          console.log("Track ABC BeaconUrl =" + beaconUrl);

          //VideoStart Tracking for AdobeAnalytics
          var videoType = "";
          if(infoIsLive){
            videoType = "LIVE";
          }else{
            videoType = "VOD";
          }
          //視聴ページ側のJSメソッドを実行
          videoStartTracking(videoType);

          isBeaconSent = true;
        }
      }
    }
  }

  function _handleAdClick(event){
    //console.log("Ad is clicked, ad playback will be paused.");
    //広告再生を一時停止
    if(player.ima3.settings.adTechOrder[0] == 'flash') {
      player.ima3.adPlayer.pause();
    }
    else{
      player.ima3.adsManager.pause();
    }
    //[AndroidWebのみ]広告再生をリジュームするためのボタンを表示
    if(deviceType == "android_mweb"){
      overlayAdPlayBtn();
    }
  }

  function _handleAdstart(event){
    //console.log("Ad started");
    //[AndroidWebのみ]Preroll再生開始時は動画再生を一時停止する＋広告用コントロールパネルを非表示化
    if(deviceType == "android_mweb"){
      player.pause();
      var element = document.getElementsByClassName("vjs-ad-control-bar");
        for (var i=0;i<element.length;i++) {
        element[i].style.display = "none";
      }
      overlayClickBlock();
    }
    if(!postrollPlayed){
      //スチル画像を非表示
      hidePlayerOverlay();
    }
  }

  function _handleAdend(event){
    //console.log("Ad ended");
    //ボリュームを1に戻す
    player.volume(1);

    if(postrollPlayed){
      //Postrollの終了
      if(relatedVideosLoaded){
        //関連動画リストを読み込み済みの場合は表示を行う
        showRelatedVideos();
      }
    }else{
      //Prerollの再生終了
      prerollPlayed = true;
    }

    //[AndroidWebのみ]Preroll再生終了時は動画再生を再開する
    if(deviceType == "android_mweb" && !postrollPlayed){
      //console.log("Hide ClickBlock");
      hidePlayerOverlay();
      player.play();
    }
 }

  function _handleAderror(event){
    //console.log("Ad Error");
    //スチル画像を非表示
    hidePlayerOverlay();
    //ボリュームを1に戻す
    player.volume(1);
    prerollPlayed = true;
  }

  function overlayStillImage(){

    if(stillImageUrl == "") {
      console.log("Overlay is shown, still image url is null.");
      _overlayContent = "<div id=\"overlayContent\" >"+
                        "<span id=\"playButton\" style=\"background-image: url('"+PLAY_IMG_URL+"');"+
                              "z-index:1;position:absolute;width:100%;height:100%;"+
                              "display:block; background-position: center center; background-repeat: no-repeat;\" >"+
                        "</span>" +
                        "</div>";
    }else {
      console.log("Overlay is shown, still image url is " + stillImageUrl);
      _overlayContent = "<div id=\"overlayContent\" >"+
                        "<span id=\"playButton\" style=\"background-image: url('"+PLAY_IMG_URL+"');"+
                              "z-index:2;position:absolute;width:100%;height:100%;"+
                              "display:block;background-position: center center;background-repeat: no-repeat;\" >"+
                        "</span>"+
                        "<span id=\"stillImage\" style=\"background-image: url('"+stillImageUrl+"');"+
                              "z-index:1;position:absolute;width:100%;height:100%;"+
                              "display:block;background-color: #000;background-position: center center;background-repeat: no-repeat;background-size: contain;\" >"+
                        "</span>"+
                        "</div>";
    }
    overlay = document.createElement('div');
    overlay.className = 'vjs-overlay';
    overlay.innerHTML = _overlayContent;
    player.el().appendChild(overlay);
    overlay.addEventListener("click", function(event) {
      player.play();
    },false);
  }

  function overlayAdPlayBtn(){
    _overlayContent = "<div id=\"overlayContent\" >"+
                        "<span id=\"adClickBlock\" style=\"z-index:2;position:absolute;width:100%;height:100%;display:block;\" >"+
                        "</span>" +
                        "<span id=\"playButton\" style=\"background-image: url('"+PLAY_IMG_URL+"');"+
                              "z-index:1;position:absolute;width:100%;height:100%;"+
                              "display:block;background-position: center center;background-repeat: no-repeat;\" >"+
                        "</span>"+
                        "</div>";
    overlay2 = document.createElement('div');
    overlay2.className = 'ad-overlay';
    overlay2.innerHTML = _overlayContent;
    player.el().insertBefore(overlay2, player.el().getElementsByClassName("vjs-ad-control-bar")[0]);
    overlay2.addEventListener("click", function(event) {
      player.ima3.adsManager.resume();
      hideAdPlayBtn();
      overlayClickBlock();
    },false);
  }

  function overlayClickBlock(){
    _overlayContent = "<div id=\"overlayContent\" >"+
                        "<span id=\"adClickBlock\" style=\"z-index:1;position:absolute;top:30px;width:100%;height:100%;display:block;\" >"+
                        "</span>" +
                      "</div>";
    overlay3 = document.createElement('div');
    overlay3.className = 'ad-overlay2';
    overlay3.innerHTML = _overlayContent;
    player.el().insertBefore(overlay3, player.el().getElementsByClassName("vjs-ad-control-bar")[0]);
  }

  function overlayBlackImage(){
    _overlayContent = "<div id=\"overlayContent\" >"+
                        "<span id=\"stillImage\" style=\"z-index:1;position:absolute;width:100%;height:100%;" +
                              "display:block;background-color: #000;\" >"+
                        "</span>"+
                      "</div>";
    overlay4 = document.createElement('div');
    overlay4.className = 'vjs-overlay2';
    overlay4.innerHTML = _overlayContent;
    player.el().appendChild(overlay4);
  }

  function hideAdPlayBtn(){
    if(overlay2 != null){
      player.el().removeChild(overlay2);
    }
    overlay2 = null;
  }

  function hidePlayerOverlay(){
    if(overlay != null){
      player.el().removeChild(overlay);
    }
    overlay = null;
    if(overlay2 != null){
      player.el().removeChild(overlay2);
    }
    overlay2 = null;
    if(overlay3 != null){
      player.el().removeChild(overlay3);
    }
    overlay3 = null;
    if(overlay4 != null){
      player.el().removeChild(overlay4);
    }
    overlay4 = null;
  }
  // Utilities
  function getCurrentTime(){
    var date = new Date();
    var currentTime = "";
    var yy = (date.getFullYear() + '').slice(-2);
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    var h = ("0" + date.getHours()).slice(-2);
    var m = ("0" + date.getMinutes()).slice(-2);
    var s = ("0" + date.getSeconds()).slice(-2);
    currentTime = yy + mm + dd + h + m + s;

    //console.log("currentTime = " + currentTime);
    return currentTime;
  }

  //広告URL整形Funtion
  function genAdTag (adtag) {
    var ret = adtag;
    ret = ret.replace(/\s+/g, "");
    ret = ret.replace("{device}", deviceType);
    return ret;
  }

  //乱数生成Function
  function create_random( n ){
    var CODE_TABLE = "0123456789";
    var r = "";
    for (var i = 0, k = CODE_TABLE.length; i < n; i++)
        r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
    return r;
  }
  //UUID生成Function
  function getUuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  player.on("loadstart",function(){
    //console.log("loadstart!");

    // 多重に処理しないための制御
    var currentId = player.mediainfo.id;
    if (currentId === currentVideoId ) {
      return;
    }
    currentVideoId = currentId;

    //##MediaInfoからカスタムフィールド情報を取得
    myMediaInfo = player.mediainfo;

    //Custom Field取得（is_ad）
    if(myMediaInfo.custom_fields.is_ad != undefined && myMediaInfo.custom_fields.is_ad == "true"){
      infoIsAd = true;
    }
    console.log("[custom_field] is_ad=" + infoIsAd);
    //Custom Field取得（is_live）
    if(myMediaInfo.custom_fields.is_live!= undefined && myMediaInfo.custom_fields.is_live == "true"){
      infoIsLive = true;
    }
    console.log("[custom_field] is_live=" + infoIsLive);
    //Custom Field取得（ad_category）
    if(myMediaInfo.custom_fields.ad_category != undefined && myMediaInfo.custom_fields.ad_category != ""){
      infoAdCategory = myMediaInfo.custom_fields.ad_category;
    }
    console.log("[custom_field] ad_category=" + infoAdCategory);
    //Custom Field取得（still_image_url）
    if(myMediaInfo.custom_fields.still_image_url != undefined && myMediaInfo.custom_fields.still_image_url != ""){
      infoStillImageUrl = myMediaInfo.custom_fields.still_image_url;
    }
    console.log("[custom_field] still_image_url=" + infoStillImageUrl);

    if(stillImageUrl == "" && infoStillImageUrl != ""){
      //プレイヤー設定項目にはスチル画像URLが無いため、カスタムフィールドの値を設定
      stillImageUrl = infoStillImageUrl;
    }

    //デバイス判定・ABC再生開始ビーコンURL設定
    beaconUrl = 'http://koshien-l1.asahi.co.jp/bplayer/log1.txt?p=' + videoRefId + '&t=' + currentTime + '&id=' + uuid; //デフォルトはAndroid
    deviceType = "pc";
    if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 ){
      //iOS
      beaconUrl = 'http://koshien-l4.asahi.co.jp/bplayer/log4.txt?p=' + videoRefId + '&t=' + currentTime + '&id=' + uuid;
      deviceType = "ios_mweb";
    }else if( agent.search(/Android/) != -1){
      //Android
      beaconUrl = 'http://koshien-l5.asahi.co.jp/bplayer/log5.txt?p=' + videoRefId + '&t=' + currentTime + '&id=' + uuid;
      deviceType = "android_mweb";
    }

    //スチル画像をオーバレイ表示、自動再生時、または関連動画からの再生の場合は表示しない
    if(isPlayedRelatedVideo){
      if(browserType == "ie10" || browserType == "ie11"){
        //IE10 or IE11の場合はオーバレイさせない
        //console.log("This browser is IE10 or IE11, so black image overlay wasn't shown.");
      }else{
        overlayBlackImage();
      }
    }else if(!isAutoPlay || deviceType != "pc"){
      //自動再生なし or PC以外からの再生の場合はスチル画像を表示
      overlayStillImage();
    }else if(infoIsAd){
      //PC再生で広告有り＆自動再生の場合は黒画像を表示
      overlayBlackImage();
    }

    if(infoIsAd){
      //広告ONの場合は、AdTagXMLより広告タグ情報取得
      initializeAdTag();
    }else{
      //広告OFFの場合 or 関連動画からの再生の場合は本編再生開始
      if(isAutoPlay || isPlayedRelatedVideo){
        player.play();
      }
    }

    //各種イベントリスナーを設定
    player.on('ads-click', _handleAdClick);
    player.on('ads-ad-started',   _handleAdstart);
    player.on('ads-ad-ended',   _handleAdend);
    player.on('ima3-ad-error', _handleAderror);
    player.one('playing', _handleMediaPlaying);
    player.on('timeupdate', _handleMediaProgress);
    player.one('ended', _handleMediaEnded);

    // 関連動画の取得
    relatedVideosLoaded = false;
    if(isShowRelatedVideos && deviceType == "pc"){
      //PCデバイス(IE10以外) & 関連動画表示ONの場合のみ関連動画リストを取得
      getRelatedVideos();
    }
  });

  player.ready(function() {
    //console.log("Load Player");

    //ブラウザ判定
    browserType = "";
    if(agent.match(/MSIE/)) {
      browserType = "ie10";
    }else if(agent.match(/Trident/)){
      browserType = "ie11";
    }else{
      browserType = "non-ie";
    }
    console.log("Browser Type= " + browserType + ", userAgent= " + agent);
    var ima_setting = "";
    if(browserType == "non-ie" ){
      //non-ie用のIMA設定（HTML5優先）
      ima_setting = {
        "vpaidMode": "ENABLED",
        "timeout": 5000,
        "prerollTimeout": 1000,
        "postrollTimeout": 2000,
        "requestMode": "onplay",
        "adTechOrder": [
          "html5",
          "flash"
        ],
        "serverUrl": ""
      };
    }else{
      //ie用のIMA設定（flash優先）
      ima_setting = {
        "vpaidMode": "ENABLED",
        "timeout": 5000,
        "prerollTimeout": 1000,
        "postrollTimeout": 2000,
        "requestMode": "onplay",
        "adTechOrder": [
          "flash",
          "html5"
        ],
        "serverUrl": ""
      };
    }
    player.ima3(ima_setting);

    var _videoRefId = "ref:" + videoRefId;
    player.catalog.getVideo(_videoRefId, function(error, video) {
      player.catalog.load(video);
      //console.log("Load Video, VideoID=" + _videoRefId);
    });
    //音量を一度Muteに変更
    player.volume(0);
  });

  // グローバル変数
  __bcplayer = player;
  // 定数
  var MAX_RELATED_VIDEOS_COUNT = 3;
  var MEDIA_API_TOKEN = 'QYRAY7Cd2_j4nqf-N0qI_jTDYPS2_R6Z47yOH4FLzTobg-8Jn8GmoQ..';
  // 変数
  var overlayRelatedVideos;

  /**
   * 関連動画の取得
   */
  function getRelatedVideos() {
    // パラメータ設定
    var params = {};
    params.reference_id = player.mediainfo.reference_id;
    params.video_fields = 'referenceId,name,customFields,tags';

    // 検索実行
    BCMAPI.token = MEDIA_API_TOKEN;
    BCMAPI.callback = '__bcplayer.onFindRelatedVideosCompleted';
    BCMAPI.find('find_related_videos', params);
  }

  /**
   * 関連動画の更新処理
   */
  function filterRelatedVideoByTags(response) {
    // 設定されたタグを取得
    var tags = [];
    if (settings.relatedVideosTags instanceof Array) {
      tags = settings.relatedVideosTags;
    }

    // 0件の場合、全部を対象とする
    if (tags.length == 0) {
      return response.items.slice(0, MAX_RELATED_VIDEOS_COUNT);
    }

    // 設定されたタグを含むアイテムだけをまとめる
    var count = 0;
    var videos = [];
    for (var i = 0; i < response.items.length && count < MAX_RELATED_VIDEOS_COUNT; i++) {
      var video = response.items[i];

      var found = false;
      for (var j = 0; j < tags.length; j++) {
        for (var k = 0; k < video.tags.length; k++) {
          if (tags[j].toLowerCase() === video.tags[k].toLowerCase()) {
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      if (found) {
        videos.push(video);
        count++;
      }
    }

    return videos;
  }

  /**
   * 関連動画の表示
   */
  function showRelatedVideos() {
    if (overlayRelatedVideos != null) {
      player.el().appendChild(overlayRelatedVideos);
    }
  }

  /**
   * 関連動画の削除
   */
  function hideRelatedVideos() {
    if (overlayRelatedVideos != null) {
      if (overlayRelatedVideos.parentNode != null) {
        overlayRelatedVideos.parentNode.removeChild(overlayRelatedVideos);
      }
      overlayRelatedVideos = null;
    }
  }

  /**
   * HTMLのエスケープ処理
   */
  function escapeHtml(content) {
    if (typeof content !== 'string') {
      return '';
    }
    var ESCAPE_MAP = {
      '&': '&amp;',
      '\'': '&#39;',
      '\"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    };
    return content.replace(/[&'"<>]/g, function(char) {
      return ESCAPE_MAP.hasOwnProperty(char) ? ESCAPE_MAP[char] : char;
    });
  }

  /**
   * 関連動画の更新処理
   */
  __bcplayer.onFindRelatedVideosCompleted = function (response) {

    // 既存の要素を削除
    hideRelatedVideos();

    // タグでフィルタリング
    var videos = filterRelatedVideoByTags(response);
    if (videos.length == 0) {
      return;
    }
    //console.log("related videos are", videos);
    // 関連動画オーバーレイの作成
    var html = "";

    if(stillImageUrl != "") {
      html += '<span id="stillImage" style="background-image: url(' + stillImageUrl + ');' +
              'position:absolute;width:100%;height:100%;'+
              'display:block;background-color: #000;background-position: center center;background-repeat: no-repeat;background-size: contain;" >'+
              '</span>';
    }

    html += '<div class="related-video-container">';
    html += '<ul class="related-video-list">';

    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];

      // スチル画像URLをカスタムフィールドから取得。なければデフォルトを使用
      var _stillImageUrl = DEFAULT_STILL_IMAGE_URL;
      if (video.customFields != null && video.customFields.still_image_url != null) {
          _stillImageUrl = video.customFields.still_image_url;
      }

      html += '<li class="related-video">';
      html += '<div class="related-video-thumbnail">';
      html += '<img src="' + _stillImageUrl + '" onclick="__bcplayer.loadRelatedVideo(\'' + video.referenceId + '\');"/>';
      html += '</div>';
      html += '<div class="related-video-title">';
      html += '<p>' + escapeHtml(video.name) + '</p>';
      html += '</div>';
      html += '</li>';
    }
    html += '</ul>';
    html += '</div>';

    overlayRelatedVideos = document.createElement('div');
    //overlayRelatedVideos.className = 'related-video-container';
    overlayRelatedVideos.className = 'related-video-overlay';
    overlayRelatedVideos.innerHTML = html;

    //関連動画読み込み完了フラグをセット
    relatedVideosLoaded = true;
    //console.log("relatedVideos will be loaded, relatedVideosLoaded is " + relatedVideosLoaded);
  };

  /**
   * 関連動画読み込み
   */
  __bcplayer.loadRelatedVideo = function (referenceId) {
    // オーバーレイ削除
    hideRelatedVideos();

    //先に設定していたイベントリスナーを一度Offにする
    player.off('ads-click', _handleAdClick);
    player.off('ads-ad-started',   _handleAdstart);
    player.off('ads-ad-ended',   _handleAdend);
    player.off('ima3-ad-error', _handleAderror);
    player.off('timeupdate', _handleMediaProgress);

    // 動画読み込み
    videoRefId = referenceId;
    player.catalog.getVideo('ref:'+referenceId, function(error, video) {
      //各種フラグをリセット
      isPlayedRelatedVideo = true;
      prerollPlayed = false;
      postrollPlayed = false;
      isBeaconSent = false;

      if(infoIsAd){
        player.ima3.adsManager.destroy(); //adsManagerを初期化
      }
      player.catalog.load(video);
      //console.log("Load Video, VideoID=" + referenceId);
    });
  }
});

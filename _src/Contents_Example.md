# コンテンツ (contents-)
[WiKi](https://github.com/undotsushin/undotsushin/wiki#%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84-contents-)

タグ example 備忘録

## 動画
issue 147: [記事本文（通常 / YouTube / Facebook 動画）: 開発 (Backend, API)](https://github.com/undotsushin/undotsushin/issues/147)


    "video": {
        "player":"" /*  brightcove | youtube | facebook */
        "url": "" /* brightcove *.mp4 path */
        "youtube": "",  /* YouTube ID */
        "facebook":"", /* facebook Video ID */
        "caption": ""
    }

### Brightcove

#### Player URL
[http://players.brightcove.net/3948005094001/default_default/index.html](http://players.brightcove.net/3948005094001/default_default/index.html)

#### Advanced Embed Code (developers only)

    <video data-account="3948005094001"
    data-player="default"
    data-embed="default"
    class="video-js"
    controls
    style="width: 640px; height: 360px;"></video>
    <script src="//players.brightcove.net/3948005094001/default_default/index.min.js"></script> 

### Facebook

[sample](http://f-navigation.jp/trend/detail/3574173)

[Embedded Video Player - Social Plugins](https://developers.facebook.com/docs/plugins/embedded-video-player?locale=ja_JP)

** fb SDKコードの読み込み **

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
    
**表示するDOMを出力 `{your-video-post-url}` が APIの facebookの中身 **

    <div class="fb-video" data-href="{your-video-post-url}"  
      data-allowfullscreen="true" data-width="500"></div>
      
### YouTube


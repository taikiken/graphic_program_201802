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


**fb SDKコードの読み込み**  

[issues/151](https://github.com/undotsushin/undotsushin/issues/151#issuecomment-188093173)

    <script src="/assets/facebook/init.js"></script>
    
**表示するDOMを出力 `{your-video-post-url}` が APIの facebookの中身**

    <div class="fb-video" data-href="https://www.facebook.com/facebook/videos/10153231379946729/"
      data-allowfullscreen="true" data-width="500"></div>

### YouTube

    <iframe width="640" height="360" src="https://www.youtube.com/embed/Ro-_cbfdrYE?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

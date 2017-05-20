<style type="text/css">
  .live-streaming-sns {
    width: 100%;
    overflow: hidden;
    padding-top: 28px;
    background-color: #000;
  }

  .live-streaming-sns-big6 {
    float: right;
  }

  .live-streaming-sns-big6 p {
    width: 175px;
    float: left;
    color: #fff;
    font-size: 15px;
    font-weight: 800;
  }

  .live-streaming-sns-big6 p span {
    font-size: 14px;
  }

  .live-streaming-sns-fb-like {
    float: left;
    margin-right: 10px;
  }

  a.tw-follow-btn {
    width: 160px;
    height: 40px;
    margin-right: 10px;
    float: left;
    background: #00aced;
    font-size: 12px;
    color: #fff;
    font-weight: 800;
    border-radius: 3px;
    background-image: url(../../assets/images/big6/btn_follow.png); 
    background-size: auto 15px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .live-streaming-sns-list {
    border-radius: 3px;
    overflow: hidden;
    height: 40px;
    width: 300px;
    float: right;
  }

  .live-streaming-sns-item {
    width: 33.33333333%;
    width: calc(100%/3); 
    float: left;
    height: 100%;
    background-size: auto 15px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .live-streaming-sns-item a {
    display: block;
    color: #fff !important;
    font-weight: 800;
    height: 100%;
  }

  .live-streaming-sns-item-fb {
    background-color: #305097;
    background-image: url(../../assets/images/big6/btn_fb.png);
  }

  .live-streaming-sns-item-tw {
    background-color: #00aced;
    background-image: url(../../assets/images/big6/btn_tw.png);
  }

  .live-streaming-sns-item-line {
    background-color: #1dcd00;
    background-size: auto 20px;
    background-image: url(../../assets/images/big6/btn_line.png);
  }

  @media screen and (max-width: 768px) {

    .live-streaming-sns {
      padding: 3px 0 5px 0;
    }

    .live-streaming-sns-big6 {
      float: left;
      width: 100%;
      padding: 0 10px;
      margin: 7px 0;
    }

    .live-streaming-sns-list {
      float: left;
      width: 100%;
      padding: 0 10px;
      margin: 7px 0;
    }

    .live-streaming-sns-big6 p {
      width: 120px;
      font-size: 11px;
      padding-top: 3px;
    }

    .live-streaming-sns-big6 p span {
      font-size: 10px;
    }

    a.tw-follow-btn {
      width: 110px;
      background-size: auto 13px;
      margin: 0;
    }

    .live-streaming-sns-item {
      background-size: auto 18px;
    }

    .live-streaming-sns-item-fb {
      background-image: url(../../assets/images/big6/icon_fb.png);
    }

    .live-streaming-sns-item-tw {
      background-image: url(../../assets/images/big6/icon_tw.png);
    }

    .live-streaming-sns-item-line {
      background-size: auto 20px;
      background-image: url(../../assets/images/big6/icon_line.png);
    }
  }

  @media screen and (max-width: 320px) {
    a.tw-follow-btn {
      width: 90px;
      background-size: auto 13px;
      margin: 0;
    }
  }
</style>

<div class="live-streaming-sns">

  <ul class="live-streaming-sns-list">
    <li class="live-streaming-sns-item live-streaming-sns-item-fb">
      <a href="http://www.facebook.com/share.php?u=<?php echo $page['og_url']; ?>&t=<?php echo $page['og_title']; ?>" onclick="window.open(encodeURI(decodeURI(this.href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes'); return false;" rel="nofollow"></a>
    </li>
    <li class="live-streaming-sns-item live-streaming-sns-item-tw">
      <a href="http://twitter.com/share?text=<?php echo $page['og_title']; ?>&url=<?php echo $page['og_url']; ?>&via=big6_tv" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow"></a>
    </li>
    <li class="live-streaming-sns-item live-streaming-sns-item-line">
      <a class="line btn" href="http://line.me/R/msg/text/?<?php echo $page['og_url']; ?>"></a>

      <?php if (false) : ?><div class="line-it-button" style="display: none;" data-type="share-d" data-lang="ja"></div> <?php endif; ?>
    </li>
  </ul>

  <div class="live-streaming-sns-big6">
    <p>BIG6.TVをいいねして<br /><span>最新ニュースをチェック!</span></p>
    <div class="fb-like live-streaming-sns-fb-like" data-href="https://www.facebook.com/BIG6.TV/?ref=ts&amp;fref=ts" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
    <a class="tw-follow-btn" href="https://twitter.com/intent/follow?screen_name=big6_tv" target="_blank" onclick="window.open(this.href, 'window', 'width=600, height=400, menubar=no, toolbar=no, scrollbars=yes'); return false;"></a>
  </div>

</div><!-- /.live-streaming-sns -->
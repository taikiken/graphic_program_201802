<?php
/**
 * Author: kakoi
 * Date: 2017/08/17
 * Time: 22:16
 * RedBull - Holy Ride ライブ配信 #2279
 * https://github.com/undotsushin/undotsushin/issues/2279
 */
?>
<div class="holyride__container holyride__container--odd holyride--intro">
  <p class="intro__catch">一般公道を疾走する、型破りなMTBダウンヒル・レースが今年も尾道で開催！<br />
  高低差100メートル、約300段の階段を含む、過去最長約1,400メートルのコースを走り抜ける。</p>

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <div class="intro__link__app"><a href="https://app.adjust.com/rpt1kl?deep_link=sportsbull%3A%2F%2F" target="_blank">アプリでライブ配信開始の通知を受け取る</a></div>
  <?php
  endif;
  // -----------------------------------------
  ?>

  <div class="intro__timetable">
    <table>
      <tbody>
        <tr>
          <th>08:45 – 10:15</th>
          <td>コース下見・試走</td>
        </tr>
        <tr>
          <th>10:30 – 10:45</th>
          <td>開会式・必勝祈願の祈祷</td>
        </tr>
        <tr>
          <th>11:00 – 12:30</th>
          <td>予選</td>
        </tr>
        <tr>
          <th>12:30 – 13:30</th>
          <td>昼休憩、予選結果集計・発表</td>
        </tr>
        <tr>
          <th>13:30 – 14:00</th>
          <td>決勝トーナメント:1回戦</td>
        </tr>
        <tr>
          <th>14:30 – 14:50</th>
          <td>決勝トーナメント:2回戦</td>
        </tr>
        <tr>
          <th>15:20 – 15:30</th>
          <td>準決勝</td>
        </tr>
        <tr>
          <th>16:00 – 16:10</th>
          <td>決勝</td>
        </tr>
        <tr>
          <th>16:10 – 16:30</th>
          <td>表彰式</td>
        </tr>
        <tr>
          <th>16:30</th>
          <td>閉会</td>
        </tr>
      </tbody>
    </table>
  </div><!-- /.intro__schedule -->

  <?php
  // <div class="intro__banner">
  //   <a href="https://www.redbull.com/jp-ja/events/red-bull-holy-ride-2017/" target="_blank"><img src="/assets/images/red-bull-holy-ride/intro-banner.jpg" alt="Red Bull TV"></a>
  // </div>
  ?>

  <div class="intro__widjet_twitter">
    <?php
    //<a class="twitter-timeline" href="https://twitter.com/redbulljapan" data-height="400" data-chrome="noheader nofooter" data-link-color="#be0940" data-border-color="#282d35">Tweets by redbulljapan</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    /*
    <a class="twitter-timeline" href="https://twitter.com/hashtag/RedBullHolyRide" data-widget-id="898165035398160384" data-chrome="noheader nofooter" data-dnt="true">#RedBullHolyRide のツイート</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    */
    ?>
  </div><!-- /.widjet_twitter -->
</div><!-- /.holyride--intro -->

<div class="holyride__container holyride__container--even holyride--course">
  <h2 class="course__heading"><img src="/assets/images/red-bull-holy-ride/course-heading.png" alt="レース概要"></h2>

  <figure class="course__map">
    <img src="/assets/images/red-bull-holy-ride/course-figure-map.png" alt="会場マップ">
    <figcaption>
      <p>通常は山中にて行うMTBダウンヒルレースを、聖なる（ホーリーな）場所で行うRed Bull Holy Ride。<br />
      6度目を迎える今大会は、昨年に続いて日本遺産のまち・尾道市千光寺山周辺で開催します。<br />
      今大会は、千光寺公園展望台→尾道城→土堂小学校の高低差約100メートル、最大斜度約30度、石段300段の一般公道を含む大会史上最長となる全長約1,400メートルのコースを設ける予定です。</p>
      <p>予選は1名ずつのタイムトライアル、決勝トーナメントは1レース4名で走る4クロス形式で行います。</p>
      <p class="note">（その他、UCI Cycling Regulations及びJCF Edition 2017に準ずる）</p>
    </figcaption>
  </figure><!-- /.course__map -->

  <div class="course__staff">
    <h3 class="course__staff__heading"><img src="/assets/images/red-bull-holy-ride/course-staff1-heading.png" alt="コースディレクター"></h3>

    <div class="course__staff__container">
      <div class="course__staff__data">
        <h4 class="course__staff__data__heading">Y.YANAGIHARA（YANS）</h4>
        <p class="course__staff__data__text">1972年 ７月20日生まれ。<br />
        ’93 全日本シーリズ チャンピオンを始め数々の大会で優勝。<br />
        本大会ではコースディレクター、スポーツディレクターを兼任する。</p>
      </div><!-- /.course__staff__data -->
    </div><!-- /.course__staff__container -->

    <h3 class="course__staff__heading"><img src="/assets/images/red-bull-holy-ride/course-staff2-heading.png" alt="イベントアンバサダー"></h3>

    <div class="course__staff__container">
      <div class="course__staff__data">
        <h4 class="course__staff__data__heading">DAN TAKUMA</h4>
        <p class="course__staff__data__text">19XX年 ３月12日生まれ。<br />
        ’98 ハワイアンマウンテンツアー第2スーテージ優勝など輝かしい戦歴をもつ。<br />
        本大会ではアンバサダーの他、解説もつとめる。</p>
      </div><!-- /.course__staff__data -->
    </div><!-- /.course__staff__container -->
  </div><!-- /.course__staff -->
</div><!-- /.holyride--course -->

<div class="holyride__container holyride__container--odd holyride--overview">
  <h2 class="overview__heading"><img src="/assets/images/red-bull-holy-ride/overview-heading.png" alt="イベント概要"></h2>

  <table class="overview__data">
    <tbody>
      <tr>
        <th>タイトル</th>
        <td>Red Bull Holy Ride 2017（レッドブル・ホーリーライド2017）</td>
      </tr>
      <tr>
        <th>日時</th>
        <td>8月27日（日）10：30〜16：30（予定）※荒天時は中止</td>
      </tr>
      <tr>
        <th>会場</th>
        <td>広島県尾道市千光寺山周辺（千光寺公園展望台→尾道城→土堂小学校）</td>
      </tr>
      <tr>
        <th>内容</th>
        <td>マウンテンバイク ダウンヒルレース（オープンクラス）</td>
      </tr>
      <tr>
        <th>イベント観戦</th>
        <td>無料</td>
      </tr>
      <tr>
        <th>賞金</th>
        <td>優勝：¥100,000、準優勝：¥50,000、第3位：¥30,000</td>
      </tr>
      <tr>
        <th>主催</th>
        <td>レッドブル・ジャパン株式会社</td>
      </tr>
      <tr>
        <th>後援</th>
        <td>尾道市</td>
      </tr>
      <tr>
        <th>協力</th>
        <td>特定非営利活動法人 市民・自転車フォーラム</td>
      </tr>
    </tbody>
  </table><!-- /.overview__data -->
</div><!-- /.holyride--overview -->

<div class="holyride--related holyride__container--even holyride__container">
  <h2 class="related__heading"><img src="/assets/images/red-bull-holy-ride/related-heading.png" alt="関連記事"></h2>

  <div class="related__post">
    <a href="https://sportsbull.jp/p/178733/">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-holy-ride/related-post-figure1.png" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">【ハイライト動画】Red Bull Holy Ride Japan 2016</h3>
        <h4 class="related__post__category">アクションスポーツ</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="https://sportsbull.jp/p/178732/">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-holy-ride/related-post-figure2.png" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">【ハイライト動画】Red Bull Holy Ride Japan 2014</h3>
        <h4 class="related__post__category">アクションスポーツ</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="https://sportsbull.jp/p/178731/">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-holy-ride/related-post-figure3.png" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">【ハイライト動画】Red Bull Holy Ride Japan 2013</h3>
        <h4 class="related__post__category">アクションスポーツ</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="https://sportsbull.jp/p/177307/">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-holy-ride/related-post-figure4.png" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">【ハイライト動画】Red Bull Holy Ride Japan 2010</h3>
        <h4 class="related__post__category">アクションスポーツ</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->
</div><!-- /.holyride--related -->

<?php
/**
 * Author: kakoi
 * Date: 2017/10/10
 * Time: 00:00
 * Red Bull Box Cart Race ライブ配信 #2415
 * https://github.com/undotsushin/undotsushin/issues/2415
 */
?>
<div class="boxcart--intro boxcart__container boxcart__container--odd">
  <p class="intro__catch">おバカなレースに大まじめ！<br />
  重力だけを頼りに手作りカートが赤坂の坂を駆け降りる、クリエイティビティ溢れるイベントが日本で3回目の開催！一体何チームがゴールまでたどり着けるのか？！<br />
  笑いあり、ドラマありのお祭り騒ぎを見逃すな！</p>

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <div class="intro__link__app"><a href="https://app.adjust.com/paf496?deep_link=sportsbull%3A%2F%2F" target="_blank">アプリでライブ配信開始の通知を受け取る</a></div>
  <?php
  endif;
  // -----------------------------------------
  ?>

  <div class="intro__timetable">
    <table>
      <tbody>
        <tr>
          <th>11:45 －</th>
          <td>MCオープニング、ルール、コース説明、MC、レポーター紹介</td>
        </tr>
        <tr>
          <th>12:00 －</th>
          <td>レーススタート / キッズ体験コーナー<span>（サカス広場 / レース終了まで）</span></td>
        </tr>
        <tr>
          <th>13:00 －</th>
          <td>CATCH &amp; FLOW決勝ラウンドト<span>（サカス広場）</span></td>
        </tr>
        <tr>
          <th>14:00 －</th>
          <td>九州男児 スペシャルダンスステージ<span>（サカス広場）</span></td>
        </tr>
        <tr>
          <th>15:00 －</th>
          <td>TEMPURA KIDZ パフォーマンス<span>（サカス広場）</span></td>
        </tr>
        <tr>
          <th>16:30 －</th>
          <td>レース終了予定 / 表彰式<span>（サカス広場）</span></td>
        </tr>
      </tbody>
    </table>

    <p class="intro__timetable__note">※ スケジュールは、当日の進行により変更になる可能性があります。</p>
  </div><!-- /.intro__schedule -->

  <div class="intro__banner">
    <a href="http://www.redbullsoapboxrace.com/jp/ja/" target="_blank"><img class="show-for-pc" src="/assets/images/red-bull-box-cart-2017/intro-banner.jpg" alt="Red Bull TV"><img class="show-for-sp" src="/assets/sp/images/red-bull-box-cart-2017/intro-banner.jpg" alt="Red Bull TV"></a>
  </div>

  <div class="intro__widjet_twitter">
    <a class="twitter-timeline"  href="https://twitter.com/hashtag/%E3%83%AC%E3%83%83%E3%83%89%E3%83%96%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%E3%82%AB%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B9" data-widget-id="918128676847337472">#レッドブルボックスカートレース のツイート</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
  </div><!-- /.widjet_twitter -->

</div><!-- /.holyride--intro -->

<div class="boxcart--course boxcart__container boxcart__container--even">
  <h2 class="course__heading"><img src="/assets/images/red-bull-box-cart-2017/course-heading.png" alt="レース概要"></h2>

  <figure class="course__map">
    <img class="show-for-pc" src="/assets/images/red-bull-box-cart-2017/course-figure-map.png" alt="会場マップ">
    <img class="show-for-sp" src="/assets/sp/images/red-bull-box-cart-2017/course-figure-map.png" alt="会場マップ">
  </figure><!-- /.course__map -->

  <div class="course__rule">
    <dl class="course__rule--1">
      <dt><img src="/assets/images/red-bull-box-cart-2017/course-icon-rule1.png" alt="1"></dt>
      <dd>ボックスカートは人力だけで動作するようにしてください。エンジンや電池、その他の外部動力は使用できません。<br />
      ボックスカートのサイズは全幅1.5m・全長4m以内に収める必要があります。また、地上高（地面から車体の最低部までの高さ）は18cm以上とし、車高（地面から車体の頂点までの高さ）は2m未満とします。<br />
      ボックスカートには正常に動作するブレーキとステアリングホイールを搭載してください。<br />
      最大車重は80kgとなります（ドライバーの重量は含まれません）。</dd>
    </dl>
    <dl class="course__rule--2">
      <dt><img src="/assets/images/red-bull-box-cart-2017/course-icon-rule2.png" alt="2"></dt>
      <dd>チームメンバー4人全員が18歳以上である必要があります。<br />
      ボックスカートの最大乗車人数は2名です。ドライバーと共に副操縦士を乗せて、ボックスカートの方向転換やドライバーのエナジー補給をアシストすることが可能です。ドライバーのみの出走も可能です。<br />
      コスチュームはボックスカート内に引っかかったり、ドライバーの視線を遮ったりしないようなデザインにしてください。</dd>
    </dl>
    <dl class="course__rule--3">
      <dt><img src="/assets/images/red-bull-box-cart-2017/course-icon-rule3.png" alt="3"></dt>
      <dd>レッドブル・ボックスカート・レースは、クリエイティビティ、ショーマンシップ、スピードという3つの基準から採点されます。<br />
      各チームは、ユニークなデザインのボックスカートを用意し、コスチュームと共にパフォーマンスを披露して、コースをスピーディーに駆け抜ける必要があります。</dd>
    </dl>
  </div><!-- /.course__rule -->

  <div class="course__guest">
    <dl class="course__guest__wrap course__guest__wrap--1">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest1-heading.png" alt="JUDGES"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest1-figure1.jpg" alt=""></figure>
            <h3>ISSEI</h3>
            <p class="ruby">Issei</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest1-figure2.jpg" alt=""></figure>
            <h3>野中 生萌</h3>
            <p class="ruby">Miho Nonaka</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest1-figure3.jpg" alt=""></figure>
            <h3>TEMPURA KIDZ</h3>
            <p class="ruby">Tempura Kidz</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest1-figure4.jpg" alt=""></figure>
            <h3>ほんこん</h3>
            <p class="ruby">Honkon</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

    <dl class="course__guest__wrap course__guest__wrap--2">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest2-heading.png" alt="MC"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest2-figure1.jpg" alt=""></figure>
            <h3>MC マムシ</h3>
            <p class="ruby">MC Mamushi</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

    <dl class="course__guest__wrap course__guest__wrap--3">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest3-heading.png" alt="DJ"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest3-figure1.jpg" alt=""></figure>
            <h3>DJ IKU</h3>
            <p class="ruby">DJ IKU</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

    <dl class="course__guest__wrap course__guest__wrap--4">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest4-heading.png" alt="GOAL REPORTER"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest4-figure1.jpg" alt=""></figure>
            <h3>インパルス<br />
            板倉 俊之</h3>
            <p class="ruby">Impulse / <br />
            Toshiyuki Itakura</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest4-figure2.jpg" alt=""></figure>
            <h3>キングコング<br />
            梶原 雄太</h3>
            <p class="ruby">King Kong / <br />
            Yuta Kajiwara</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

    <dl class="course__guest__wrap course__guest__wrap--5">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest5-heading.png" alt="SPORTS BULL 中継コメンテーター"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest5-figure1.jpg" alt=""></figure>
            <h3>やまだひさし</h3>
            <p class="ruby">Hisashi Yamada</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest5-figure2.jpg" alt=""></figure>
            <h3>ざわちん</h3>
            <p class="ruby">Zawachin</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

    <dl class="course__guest__wrap course__guest__wrap--6">
      <dt class="course__guest__heading"><img src="/assets/images/red-bull-box-cart-2017/course-guest6-heading.png" alt="EVENT REPORTERS"></dt>
      <dd>
        <ul class="course__guest__list">
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest6-figure1.jpg" alt=""></figure>
            <h3>BUTCH</h3>
            <p class="ruby">BUTCH a.k.a. BIGWAVE</p>
          </li>
          <li class="course__guest__item">
            <figure><img src="/assets/images/red-bull-box-cart-2017/course-guest6-figure2.jpg" alt=""></figure>
            <h3>全力じじぃ</h3>
            <p class="ruby">Zenryoku Jiji</p>
          </li>
        </ul>
      </dd>
    </dl><!-- /.course__guest__wrap -->

  </div><!-- /.course__guest -->
</div><!-- /.boxcart--course -->

<div class="boxcart--overview boxcart__container boxcart__container--odd">
  <h2 class="overview__heading"><img src="/assets/images/red-bull-box-cart-2017/overview-heading.png" alt="イベント概要"></h2>

  <table class="overview__data">
    <tbody>
      <tr>
        <th>タイトル</th>
        <td>RED BULL BOX CART RACE TOKYO 2017.（レッドブル・ボックスカート・レース 東京 2017）</td>
      </tr>
      <tr>
        <th>開催日</th>
        <td>2017 年 10 月 22 日 ( 日 ) ※雨天決行、荒天中止の場合あり。</td>
      </tr>
      <tr>
        <th>時間</th>
        <td>12:00 ～ 17:00 予定</td>
      </tr>
      <tr>
        <th>会場</th>
        <td>赤坂サカス 広場および周辺</td>
      </tr>
      <tr>
        <th>料金</th>
        <td>観覧無料</td>
      </tr>
      <tr>
        <th>主催</th>
        <td>レッドブル・ボックスカート・レース実行委員会</td>
      </tr>
      <tr>
        <th>後援</th>
        <td>港区産業振興課</td>
      </tr>
    </tbody>
  </table><!-- /.overview__data -->
</div><!-- /.boxcart--overview -->

<div class="boxcart--related boxcart__container--even boxcart__container">
  <h2 class="related__heading"><img src="/assets/images/red-bull-box-cart-2017/related-heading.png" alt="関連記事"></h2>

  <div class="related__post">
    <a href="hog">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-box-cart-2017/related-post-figure1.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">ワールドツアー Vol.1：オハイオ</h3>
        <h4 class="related__post__category">ボックスカートレース</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hog">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-box-cart-2017/related-post-figure2.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">マッド・サイエンティストが挑んだRed Bull Box Cart Race…</h3>
        <h4 class="related__post__category">ボックスカートレース</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hog">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-box-cart-2017/related-post-figure3.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">Red Bull Box Cart Race x スター・トレック！…</h3>
        <h4 class="related__post__category">ボックスカートレース</h4>
        <p class="related__post__date">8月17日（木）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hog">
      <figure class="related__post__thumb"><img src="/assets/images/red-bull-box-cart-2017/related-post-figure4.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">【RED BULL BOX CART RACE】超マジメなバカ騒ぎに、人気YouTuberが参戦…</h3>
        <h4 class="related__post__category">ボックスカートレース</h4>
        <p class="related__post__date">8月21日（月）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

</div><!-- /.boxcart--related -->

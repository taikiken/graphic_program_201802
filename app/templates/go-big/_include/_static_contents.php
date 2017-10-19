<?php
/**
 * Author: kakoi
 * Date: 2017/10/10
 * Time: 00:00
 * Red Bull Box Cart Race ライブ配信 #2415
 * https://github.com/undotsushin/undotsushin/issues/2415
 */
?>
<div class="gobig--intro gobig__container gobig__container--odd">
  <p class="intro__catch">⽇本⼈ライダーのための、国内唯⼀のFMX（フリースタイルモトクロス）王座決定戦「GO BIG」 が今年も開催。デモンストレーションとは異なる、個々のライダースキルで競われる本大会が10周年の節目に、さらなる進化を見せつける。</p>

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <div class="intro__link__app"><a href="https://app.adjust.com/chwhc2?deep_link=sportsbull%3A%2F%2F" target="_blank">アプリでライブ配信開始の通知を受け取る</a></div>
  <?php
  endif;
  // -----------------------------------------
  ?>

  <div class="intro__timetable">
    <table>
      <tbody>
        <tr>
          <th>10:00 －</th>
          <td>ゲートオープン</td>
        </tr>
        <tr>
          <th>10:30 －</th>
          <td>オープニング（ライダー・ジャッジ・MC紹介）</td>
        </tr>
        <tr>
          <th>10:45 －</th>
          <td>GO BIG トーナメント　一回戦</td>
        </tr>
        <tr>
          <th>11:35 －</th>
          <td>GO BIG トーナメント　二回戦</td>
        </tr>
        <tr>
          <th>12:00 －</th>
          <td>CASIOプレゼンツ　WHIPコンテスト</td>
        </tr>
        <tr>
          <th>12:30 －</th>
          <td>昼休憩・WHIPコンテスト　投票 & 表彰式</td>
        </tr>
        <tr>
          <th>13:20 －</th>
          <td>GO BIG トーナメント　準決勝</td>
        </tr>
        <tr>
          <th>13:45 －</th>
          <td>モトパーク森プレゼンツ　FMX TEAM BATTLE</td>
        </tr>
        <tr>
          <th>14:35 －</th>
          <td>GO BIG トーナメント　決勝</td>
        </tr>
        <tr>
          <th>14:50 －</th>
          <td>GOBIG 2017　表彰式</td>
        </tr>
        <tr>
          <th>15:10 －</th>
          <td>FMX DEMO（終了後コース開放）</td>
        </tr>
        <tr>
          <th>15:35 －</th>
          <td>サイン会</td>
        </tr>
        <tr>
          <th>17:00</th>
          <td>イベント終了 / コースクローズ</td>
        </tr>
      </tbody>
    </table>
  </div><!-- /.intro__schedule -->
</div><!-- /.gobig--intro -->

<div class="gobig--about gobig__container gobig__container--even">
  <h2 class="about__heading"><img class="show-for-pc" src="/assets/images/go-big/about-heading.png" alt="レース概要"><img class="show-for-sp" src="/assets/sp/images/go-big/about-heading.png" alt="レース概要"></h2>

  <p class="about__lead">全⽇本フリースタイルモトクロス（FMX）選⼿権「GO BIG」 はデモンストレーションとは異なり、個々のライダースキルを競うコンテスト形式の⼤会です。<br />
  FMXは全世界にファンを持ち、⽇本でも⼈気は急上昇しています。<br />
  FMX世界最⾼峰の国際⼤会「Red Bull X-Fighters」ワールドツアーが2013 / 2014年と2年連続で⼤阪で開催され、2013年⼤会では⽇本⼈の東野貴⾏選⼿が優勝、⼤きな話題を集めました。<br />
  それに呼応するかのように、GO BIGも年々“進化”を重ね、昨年2016年には世界最強ライダートム・パジェスが参戦し世界から注⽬されました。<br />
  そして2017年。10周年を迎えるGO BIGは、さらなる進化が期待されます。</p>

  <div class="about__fmx">
    <figure class="about__fmx__figure"><img src="/assets/images/go-big/about-fmx-figure.jpg" alt=""></figure>
    <h3 class="about__fmx__heading"><img src="/assets/images/go-big/about-fmx-heading.png" alt="FMXとは"></h3>
    <p class="about__fmx__lead">モトクロスバイクを使い、キッカー（ジャンプ台）からジャンプし、そのジャンプの様々な技（トリック）、クリエイティビティなどを競うエクストリームスポーツ。</p>
  </div><!-- /.about__fmx -->

  <div class="about__featured">
    <h3 class="about__featured__heading"><img src="/assets/images/go-big/about-featured-heading.png" alt="注目選手"></h3>
    <ul class="about__featured__list">
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure1.jpg" alt=""></figure>
        <h4>鈴⽊ ⼤助</h4>
        <p class="nick">DAICE</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure2.jpg" alt=""></figure>
        <h4>釘村 孝太</h4>
        <p class="nick">KOTA</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure3.jpg" alt=""></figure>
        <h4>渡辺 元樹</h4>
        <p class="nick">WANKY</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure4.jpg" alt=""></figure>
        <h4>⾼橋 仁</h4>
        <p class="nick">HTC</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure5.jpg" alt=""></figure>
        <h4>江原 ⼤地</h4>
        <p class="nick">DAICHI</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure6.jpg" alt=""></figure>
        <h4>江原 ⼤空</h4>
        <p class="nick">- - -</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure7.jpg" alt=""></figure>
        <h4>⽚桐 弘貴</h4>
        <p class="nick">- - -</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-figure8.jpg" alt=""></figure>
        <h4>鈴⽊ 耕太</h4>
        <p class="nick">- - -</p>
      </li>
      <li class="about__featured__item">
        <figure><img src="/assets/images/go-big/about-featured-andmore.png" alt="and More."></figure>
      </li>
    </ul><!-- /.about__featured__list -->
  </div><!-- /.about__featured -->

  <div class="about__guest">
    <h3 class="about__guest__heading"><img src="/assets/images/go-big/about-guest-heading.png" alt="ゲストジャッジ"></h3>
    <div class="about__guest__container">
      <figure class="about__guest__figure"><img src="/assets/images/go-big/about-guest-figure.jpg" alt=""></figure>
      <div class="about__guest__data">
        <h4>東野 貴⾏</h4>
        <p class="nick">TAKA</p>
        <p class="about__guest__text">FMX 世界最⾼峰の国際⼤会「Red Bull XFighters」での優勝や、X-GAMES ゴールドメダル（ともに⽇本⼈初）など数々のタイトルを⼿にしてきた、⽇本が誇るFMXライダー。</p>
      </div>
    </div><!-- /.about__guest__data -->
  </div><!-- /.about__guest -->
</div><!-- /.gobig--about -->

<div class="gobig--overview gobig__container gobig__container--odd">
  <h2 class="overview__heading"><img class="show-for-pc" src="/assets/images/go-big/overview-heading.png" alt="イベント概要"><img class="show-for-sp" src="/assets/sp/images/go-big/overview-heading.png" alt="イベント概要"></h2>

  <table class="overview__data">
    <tbody>
      <tr>
        <th>名称</th>
        <td>GO BIG 2017　全⽇本フリースタイルモトクロス（FMX）選⼿権</td>
      </tr>
      <tr>
        <th>主催</th>
        <td>GO BIG実⾏委員会</td>
      </tr>
      <tr>
        <th>開催⽇時</th>
        <td>2017年11⽉4⽇（⼟）</td>
      </tr>
      <tr>
        <th>開催場所</th>
        <td>オフロードヴィレッジ　埼⽟県川越市中⽼袋150-1<br />
          <a href="http://www.westpoint.co.jp/offroadvillage/" target="_blank">http://www.westpoint.co.jp/offroadvillage/</a></td>
      </tr>
      <tr>
        <th>後援</th>
        <td>バンザイマガジン /  TOKYO FM　<span>※ 2016年実績</span></td>
      </tr>
      <tr>
        <th>協賛</th>
        <td>Red Bull Japan / ダートフリーク / ダンロップ / AVIREX　<span>※ 2016年実績</span></td>
      </tr>
      <tr>
        <th>WEB</th>
        <td><a href="http://www.gobigfmxtour.com/" target="_blank">http://www.gobigfmxtour.com/</a>　#gobigfmx</td>
      </tr>
      <tr>
        <th>観客動員</th>
        <td>1,000⼈</td>
      </tr>
      <tr>
        <th>チケット</th>
        <td>4,000円（前売） / 4,500円（当⽇）</td>
      </tr>
      <tr>
        <th>出場資格</th>
        <td>プロライダーの推奨を受けた者 / モトクロス国際A級ライセンス保持者 / 23ｍジャンプ経験者</td>
      </tr>
    </tbody>
  </table><!-- /.overview__data -->
</div><!-- /.gobig--overview -->

<div class="gobig--related gobig__container--even gobig__container">
  <h2 class="related__heading"><img class="show-for-pc" src="/assets/images/go-big/related-heading.png" alt="関連記事"><img class="show-for-sp" src="/assets/sp/images/go-big/related-heading.png" alt="関連記事"></h2>

  <div class="related__post">
    <a href="hoge">
      <figure class="related__post__thumb"><img src="/assets/images/go-big/related-post-figure1.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">GO BIG 2016 ハイライト</h3>
        <h4 class="related__post__category">FMX</h4>
        <p class="related__post__date">10月17日（火）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hoge">
      <figure class="related__post__thumb"><img src="/assets/images/go-big/related-post-figure2.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">GO BIG  2015 ハイライト</h3>
        <h4 class="related__post__category">FMX</h4>
        <p class="related__post__date">10月17日（火）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hoge">
      <figure class="related__post__thumb"><img src="/assets/images/go-big/related-post-figure3.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">GO BIG  2014 ハイライト</h3>
        <h4 class="related__post__category">FMX</h4>
        <p class="related__post__date">10月17日（火）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->

  <div class="related__post">
    <a href="hoge">
      <figure class="related__post__thumb"><img src="/assets/images/go-big/related-post-figure4.jpg" alt=""></figure>
      <div class="related__post__text">
        <h3 class="related__post__heading">GO BIG  2015 ハイライト</h3>
        <h4 class="related__post__category">FMX</h4>
        <p class="related__post__date">10月17日（火）</p>
      </div><!-- /.related__post__text -->
    </a>
  </div><!-- /.related__post -->
</div><!-- /.gobig--related -->

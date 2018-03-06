<?php
/**
 * Author: kakoi
 * Date: 2017/10/10
 * Time: 00:00
 * Red Bull Box Cart Race ライブ配信 #2415
 * https://github.com/undotsushin/undotsushin/issues/2415
 */
?>

<div class="fwt-intro">

  <?php if ($page['ua'] == 'desktop') : ?>

		<!-- /531683568/fwt-ad/fwt-pc-bigbanner -->
		<script>
		  googletag.cmd.push(function() {
		    googletag.defineSlot('/531683568/fwt-ad/fwt-pc-bigbanner', [728, 90], 'div-gpt-ad-1515647345812-0').addService(googletag.pubads());
		    googletag.pubads().enableSingleRequest();
		    googletag.enableServices();
		  });
		</script>
		<div id='div-gpt-ad-1515647345812-0' style='height:90px; width:728px;'>
		<script>
		googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515647345812-0'); });
		</script>
		</div>
		<!-- // /531683568/fwt-ad/fwt-pc-bigbanner -->

  <?php else : ?>
    <div class="fwt--sp-banner">
      <!-- /531683568/fwt-ad/fwt-sp-bigbanner1 -->
      <script>
        googletag.cmd.push(function() {
          googletag.defineSlot('/531683568/fwt-ad/fwt-sp-bigbanner1', [320, 50], 'div-gpt-ad-1514457958165-0').addService(googletag.pubads());
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
      </script>
      <div id='div-gpt-ad-1514457958165-0' style='height:50px; width:320px;'>
      <script>
      googletag.cmd.push(function() { googletag.display('div-gpt-ad-1514457958165-0'); });
      </script>
      </div>
      <!-- // /531683568/fwt-ad/fwt-sp-bigbanner1 -->
    </div>
  <?php endif; ?>

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>

  <div class="fwt-intro__link-app app_hidden">
    <a href="https://app.adjust.com/ckq556?deep_link=sportsbull%3A%2F%2F" target="_blank">アプリでライブ配信開始の通知を受け取る</a>
  </div>

  <?php
  endif;
  // -----------------------------------------
  ?>

</div>

<!--
<div class="fwt--info">
  <p>現在天候の影響で競技開始が遅延しています。</p>
</div>
-->

<section class="fwt--timetable">
  <h3><img src="../assets/images/fwt/timetable-heading.png" alt="TIMETABLE">タイムテーブル</h2>
    <p>
      <!-- 白馬大会はカナダに会場を変更して実施されることになりました。<br />
      <br /> -->
      <strong style="font-size: 16px; color: #e71a0f;">
        日本時間:3月6日(水) 16時40分頃から
      </strong><br />
        現地時間:3月6日(水) 8時40分頃から<br />
      <br />
      ライブ配信まではしばらくお待ち下さい。
    </p>
    <br />
    <p class="notice">※ タイムテーブルは、当日の進行により変更になる可能性があります。</p>
  <!-- <p>開催日及びタイムテーブルにつきましては、決まり次第このページでお知らせいたします。</p> -->
  <!--
  <table>
    <tbody>
      <tr>
        <th>8:15</th>
        <td>競技開始
          <div>スノーボード男子→スキー男子→スノーボード女子→スキー女子</div>
        </td>
      </tr>
      <tr>
        <th>11:30</th>
        <td>競技終了予定</td>
      </tr>
    </tbody>
  </table>
  <p class="notice">※ タイムテーブルは、当日の進行により変更になる可能性があります。</p>
-->
</section>

<section class="fwt--schedule">
  <h3><img src="../assets/images/fwt/schedule-heading.png" alt="SCHEDULE">大会スケジュール</h2>
  <table>
    <tbody>
      <tr class="end">
        <th>1.20 - 27</th>
        <td>日本</td>
      </tr>
      <tr class="end">
        <th>2.3 - 9</th>
        <td>カナダ</td>
      </tr>
      <tr class="next">
        <th>3.1 - 7</th>
        <td>アンドラ</td>
      </tr>
      <tr>
        <th>3.9 - 15</th>
        <td>オーストリア</td>
      </tr>
    </tbody>
  </table>
</section>


<section class="fwt--about">
  <h2><img src="../assets/images/fwt/about-heading.png" alt="ABOUT">FWTとは</h2>
  <p>
    Freeride World Tour（FWT）は1996年にスイスで第一回大会が行われ、その規模はフリーライドファンの増加と共に拡大。現在は世界で唯一最大のフリーライドの世界ツアーとなりました。<br />
    2016-2017シーズンは男女のスキー・スノーボード・予選・ジュニア合わせて4000人以上の選手が世界を転戦し、合計133大会が欧州・北米・南米・オセアニア・アジアで実施されています。<br />
    <br />
    フリーライドは、ゲレンデ滑走だけでなく山の自然な地形を楽しむ新しいウィンタースポーツのスタイルで、世界及び日本でも人気が高まっています。特に日本の質の高い大量のパウダースノーは海外で「Japow」（Japan ＋ Powder Snow）と呼ばれ、日本は最高のフリーライド体験が得られる国の一つとして認知されてきています。<br />
    多様で急峻な山々に短時間で到達でき、大量の積雪がある白馬村は、FWTから「世界でも最高水準の雪山があり、1月中旬に大会が開催できる現在世界で唯一のスキーリゾート」と認められ、今大会より日本初開催の運びとなりました。
  </p>
  <img id="readMore" src="../assets/sp/images/fwt/text-read-more.png" alt="READ MORE">
  <div class="fwt--about__movie-wrap">
    <iframe src="https://www.youtube.com/embed/-m6LoUNYZhQ?showinfo=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
  </div>
</section>

<section class="fwt--judgeing">
  <h3><img src="../assets/images/fwt/judging-heading.png" alt="JUDGEING">採点方法</h3>
  <ul id="accordion">
    <li>
      <div class="fwt--judgeing__title-wrap">
        <img src="../assets/images/fwt/no_01.png" alt="01.">
        <h5>ラインの難易度</h5>
      </div>
      <div class="fwt--judgeing__text-wrap">
        <p>ラインの難易度は、競技者が山を降りるために選ぶルートです。そのリスクの度合い、ユニークさ、想像力、クールさなどが判断材料になります。</p>
      </div>
    </li>
    <li>
      <div class="fwt--judgeing__title-wrap">
        <img src="../assets/images/fwt/no_02.png" alt="02.">
        <h5>コントロール</h5>
      </div>
      <div class="fwt--judgeing__text-wrap">
        <p>いかにユニークでクールなラインを選択してもコントロールが無くては非常に危険です。 ジャッジは、自分のコントロール不可能なほどリスクの高いラインを選択し、転倒や滑走をストップさせたライダーの得点を減点します。事前の斜面チェックでのリスクの見積もりの精度が非常に重要になります。</p>
      </div>
    </li>
    <li>
      <div class="fwt--judgeing__title-wrap">
        <img src="../assets/images/fwt/no_03.png" alt="03.">
        <h5>流動性</h5>
      </div>
      <div class="fwt--judgeing__text-wrap">
        <p>ストップ・アンド・ゴーが多すぎるライダーは減点されます。最初から最後まで、長いトラバースや、ラインを失うこと、登って逆戻りした場合は減点となります。また、ジャンプの前に長い時間ストップした場合も減点になります。</p>
      </div>
    </li>
    <li>
      <div class="fwt--judgeing__title-wrap">
        <img src="../assets/images/fwt/no_04.png" alt="04.">
        <h5>ジャンプ</h5>
      </div>
      <div class="fwt--judgeing__text-wrap">
        <p>ジャンプは、フリーライドの大会で非常に重要な要素です。クールなスタイルとアグレッシブなジャンプは大きく加点されます。大きさ、入り方、空中でのトリック着地、全体的なコントロールが採点の基準になります。</p>
      </div>
    </li>
    <li>
      <div class="fwt--judgeing__title-wrap">
        <img src="../assets/images/fwt/no_05.png" alt="05.">
        <h5>技術</h5>
      </div>
      <div class="fwt--judgeing__text-wrap">
        <p>アルペンスキーや基礎スキーで言われるスキーの技術のことです。コントロールを失った際にそれがライダーの技術不足が原因であった場合、このセクションが減点されます。他の選手がターンを刻んでいた箇所で横滑りを行ったりすることも減点対象です。</p>
      </div>
    </li>
  </ul>
</section>

<?php if ($page['ua'] !== 'desktop') : ?>
  <div class="fwt--sp-banner">
    <!-- /531683568/fwt-ad/fwt-sp-bigbanner2 -->
    <script>
      googletag.cmd.push(function() {
        googletag.defineSlot('/531683568/fwt-ad/fwt-sp-bigbanner2', [320, 50], 'div-gpt-ad-1515139762773-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    </script>
    <div id='div-gpt-ad-1515139762773-0' style='height:50px; width:320px;'>
    <script>
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515139762773-0'); });
    </script>
    </div>
    <!-- // /531683568/fwt-ad/fwt-sp-bigbanner2 -->
  </div>
<?php endif; ?>

<!--
<section class="fwt--featured">
  <h3><img src="../assets/images/fwt/featured-heading.png" alt="FEATURED">注目選手</h3>
  <ul>
    <li>
      <img src="../assets/images/fwt/feature-figure1.jpg" alt="布施 忠">
      <div class="fwt--featured__name-jp">布施 忠</div>
      <div class="fwt--featured__name-en">Tadashi Fuse</div>
      <div class="fwt--featured__type">SNOWBOARD</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure2.jpg" alt="楠泰 輔">
      <div class="fwt--featured__name-jp">楠 泰輔</div>
      <div class="fwt--featured__name-en">Taisuke Kusunoki</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure3.jpg" alt="Drew Tabke">
      <div class="fwt--featured__name-jp">Drew Tabke</div>
      <div class="fwt--featured__name-en">Drew Tabke</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure4.jpg" alt="Reine Barkers">
      <div class="fwt--featured__name-jp">Reine Barkers</div>
      <div class="fwt--featured__name-en">Reine Barkers</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure5.jpg" alt="Ryan Faye">
      <div class="fwt--featured__name-jp">Ryan Faye</div>
      <div class="fwt--featured__name-en">Ryan Faye</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure6.jpg" alt="Arianna Tricami">
      <div class="fwt--featured__name-jp">Arianna Tricami</div>
      <div class="fwt--featured__name-en">Arianna Tricami</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure7.jpg" alt="Markus Eder">
      <div class="fwt--featured__name-jp">Markus Eder</div>
      <div class="fwt--featured__name-en">Markus Eder</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/feature-figure8.jpg" alt="Jaclyn Paaso">
      <div class="fwt--featured__name-jp">Jaclyn Paaso</div>
      <div class="fwt--featured__name-en">Jaclyn Paaso</div>
      <div class="fwt--featured__type">SKI</div>
    </li>
    <li>
      <img src="../assets/images/fwt/andmore-text.png" alt="and MORE." class="fwt--featured__andmore">
    </li>
  </ul>
</section>
-->

<!--
<section class="fwt--overview">
  <div class="fwt--overview__inner">
    <h2><img src="../assets/images/fwt/overview-heading.png" alt="OVERVIEW">イベント概要</h2>
    <table>
      <tbody>
        <tr>
          <th>大会名</th>
          <td>Freeride World Tour Hakuba, Japan 2018</td>
        </tr>
        <tr>
          <th>開催日</th>
          <td>2018 年1 月20 日～27 日</td>
        </tr>
        <tr>
          <th>開催場所</th>
          <td>白馬アルパインエリア</td>
        </tr>
        <tr>
          <th>主 催</th>
          <td>FWT Hakuba 2018 実行委員会、一般社団法人白馬村観光局</td>
        </tr>
        <tr>
          <th>主 管</th>
          <td>FWT Management S.A.</td>
        </tr>
        <tr>
          <th>WEB</th>
          <td><a href="http://www.freerideworldtour.com/" target="_blank">FWT公式サイト(英語)</a></td>
        </tr>
      </tbody>
    </table>
    <p>※ ライブ配信時間は大会期間中（2018年1月20日～ 27日）の天候や積雪の状態により決定し、前日までにこのページで発表します。</p>
  </div>
</section>
-->

<section class="fwt--related">
  <h2><img src="../assets/images/fwt/related-heading.png" alt="RELATED">関連記事</h2>
  <ul>
    <li>
      <a href="/p/250564/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011123260774225000.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【100秒動画】初心者でもわかるFWT</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>年々進化し続ける「FWT（Freeride World 年々進化し続ける「FWT（Freeride World Tour）」が2018年1月、長野県白馬村※で開催される。運命の大一番を前に「FWT」解説動画が公開。FWT初心者にも入門編として解りやすい100秒動画となっている。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月11日（木） 23:24</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/250565/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011123291658879000.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【100秒動画】FWTも認める世界級パウダースノー白馬村</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>「FWT」から「世界最高水準の雪山があり、1月の大会が開催できる世界で唯一のスキーリゾート」とも言われている長野県白馬村。白馬村での大会※開催を前に白馬の魅力と「FWT」の凄さが解る100秒動画が公開された。誰もが興奮する圧巻の100秒、この冬だからこそ体感してほしい。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月11日（木） 23:26</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/a/254210/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011917340171469100.jpg" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【フォトギャラリー】Freeride World Tour Hakuba, Japan 2018</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月19日（金） 17:32</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252931/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011712471473590000.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 空撮 スノーボード女子</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWT（Freeride World Tour）へ参加する選手達は、専用のヘリコプターで頂上に向かう。2018年、長野県白馬村でも開催されるFWT。白馬での大会を前に”ヘリコプター撮影されたスノーボード女子”映像が公開中。FWTの動画では、迫力満点のウィンターショーを体感できる。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 19:35</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252930/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011712373439364800.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 空撮 スキー女子</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWT（Freeride World Tour）へ参加する選手達は、専用のヘリコプターで頂上に向かう。2018年、長野県白馬村でも開催されるFWT。白馬での大会を前に”ヘリコプター撮影されたスキー女子”映像が公開中。FWTの動画では、迫力満点のウィンターショーを体感できる。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 19:34</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252929/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011712293430398800.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 空撮 スキー男子</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWT（Freeride World Tour）へ参加する選手達は、専用のヘリコプターで頂上に向かう。2018年、長野県白馬村でも開催されるFWT。白馬での大会を前に”ヘリコプター撮影されたスキー男子”映像が公開中。FWTの動画では、迫力満点のウィンターショーを体感できる。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 19:32</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252928/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011712511269734400.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 2017男子スノーボード優勝者 トラビス・ライス(Travis Rice)</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWTには世界中から強者が参戦するが、過去の大会映像からもその凄さを体感できる。スノーボード男子で優勝したトラビスライス(Travis Rice)の動画は圧巻だ。世界最高峰とも言われる彼のパフォーマンスは、極上のウィンターショーである。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 19:28</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252924/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011712041579823800.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 選手の目線カメラ</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWT（Freeride World Tour）は、ごく僅かな選手達によってアラスカで開催された大会が起源と言われている。2018年、長野県白馬村でも開催されるFWT。白馬での大会を前に”選手の目線から撮影”された迫力満点の秘蔵映像が公開された。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 19:23</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252821/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011616172552431000.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 2017男子スキー優勝者 楠太輔</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>2018年も長野県白馬村で開催されるFWT。この大会では、日本人の活躍も注目されている。2017年のFWTでは、楠太輔(くすのき・たいすけ）が スキー男子で優勝。大自然で戦う侍スキーヤーは、怖いもの知らず。楠の大胆な滑走から燃えたぎる大和魂を感じてほしい。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 16:09</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252810/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011615250592581500.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 2017女子スキー優勝者 エリザベス ゲリッツェン（Elisabeth Gerritzen）</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>2018年も長野県白馬村で開催されるFWT。特に女性スキーヤーの活躍は、過去大会でも世界的に賞賛された。2017年開催のFWTスキー女子では、Elisabeth Gerritzen（エリザベス ゲリッツェン）が70.67で優勝。彼女のアグレッシブな滑走は、誰もが圧倒されるだろう。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 15:23</span>
        </div>
      </a>
    </li>
    <li>
      <a href="/p/252779/">
        <div class="fwt--related__image-wrap">
          <img src="https://img.sportsbull.jp/thumbnail1/img2018011613093617755800.png" alt="">
        </div>
        <div class="fwt--related__text-wrap">
          <h3>【動画】FWTスゴい映像 2017女子スノーボード優勝者 アンナ オロバ (Anna Orlova)</h3>
          <?php if ($page['ua'] === 'desktop') : ?>
          <p>FWTには世界中から強者が参戦するが、過去の大会映像からもその凄さを体感できる。スノーボード女子で優勝したアンナ オロバ (Anna Orlova) の動画は圧巻だ。完全無料スポーツアプリ「スポーツブル」では、2018年1月20日から1月27日に開催されるフリーライドスキー・スノーボード世界選手権FWT「Freeride World Tour Hakuba, Japan 2018 - The Winter Begins」を無料ライブ配信※する。</p>
          <?php endif; ?>
          <span class="fwt--related__text-wrap__category">FWT</span>
          <span class="fwt--related__text-wrap__date">1月16日（火） 13:04</span>
        </div>
      </a>
    </li>
  </ul>
</section>
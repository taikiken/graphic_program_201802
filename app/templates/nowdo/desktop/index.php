<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

  <?php include_once __DIR__."/../../_head.php"; ?>

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script>
  <script src="https://ajaxzip3.github.io/ajaxzip3.js" charset="UTF-8"></script>
  <link rel="stylesheet" href="/assets/css/<?php echo $page['dir_name']; ?>/nowdo.css?v=<?php echo $page['version']; ?>">

  <script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
      var gads = document.createElement('script');
      gads.async = true;
      gads.type = 'text/javascript';
      var useSSL = 'https:' == document.location.protocol;
      gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(gads, node);
    })();
  </script>

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'GTM-KJ33JM9');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('send', 'pageview');

  </script>
<?php
include_once __DIR__ . '/../../_env.php';
?>
</head>
<body>
<div id="whole" class="whole <?php echo $page['template_classname']; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="body-sec-inner">
      <div class="mainimg_wrap">
        <div class="id_nowdo_main">
          <!--
              <div class="id_nowdo_main_video_wrap">
                  <video id="js-id_nowdo--video" class="id_nowdo--video" width="1280" height="720" src="https://sportsbull.jp/assets/video/id-sports-2017/video.mp4" autoplay="autoplay" loop muted></video>
              </div>
-->
          <img src="../assets/images/nowdo/sp_mainimg.png" alt="" class="pc_hide sp_mainimg">
          <div class="mainimg_txt">
            <div class="main_text_wrap">
              <p class="main_copy_01"><img src="../assets/images/nowdo/main_copy_01.png" alt="今すぐ どこでも あなたを目標に近づけるパーソナルトレーニング"></p>
              <h1 class="main_ttl"><img src="../assets/images/nowdo/main_logo.png" alt="NowDo supported by SPORTS BULL"></h1>
              <p class="main_copy_02"><img src="../assets/images/nowdo/main_copy_02.png" alt="2018年春のリリースに伴い、サッカーコーチ・サッカー関連施設を募集します。"></p>
              <div class="anchor_btn"><a href="#recruit"><span>応募はこちら</span><span>応募はこちら</span></a></div>
            </div>
            <!-- /.id_sports2017__summary__text -->
          </div>
          <i class="line"></i>
        </div>
      </div>
      <!-- /.mainimg_wrap -->
      <div class="nowdo_contents">
        <section class="section_01">
          <div class="contents_inner">
            <h2 class="section_ttl"><img src="../assets/images/nowdo/section_ttl_01.png" alt="Now Doとは？"></h2>
            <p class="description_copy">Now Doは今すぐ、どこでもあなたを目標に近づけるパーソナルトレーニングサービスです。
              <br>あなたのために一流プロアスリートが考案したトレーニングメニューを厳選されたコーチが提供します。
              <br>サッカースクールなどでは実現できない個人技術の向上にコミットします。</p>
            <div class="press_release_wrap">
              <h3 class="sub_ttl"><span>プレスリリース</span></h3>
              <ul class="press_release_list">
                <li>
                  <dl>
                    <dt>2018年2月20日</dt>
                    <dd><a href="">Now Do supported by SPORTS BULLサービス開始予定</a></dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- /.section_01 -->
        <section class="section_02">
          <h2 class="section_ttl"><img src="../assets/images/nowdo/section_ttl_02.png" alt="VISION"></h2>
          <div class="vision_wrap">
            <div class="vision_block number_01">
              <div class="sp_bg"></div>
              <div class="dot_filter"></div>
              <div class="txt_wrap">
                <div class="num"><img src="../assets/images/nowdo/vision_num_01.png" alt="01"></div>
                <h3 class="block_copy">習い事の改革</h3>
                <p>個人スキルに特化したトレーニングを提供。
                  <br>好きな時間に自分にあったトレーニング
                  <br>を提供する。</p>
              </div>
            </div>
            <div class="vision_block number_02">
              <div class="sp_bg"></div>
              <div class="dot_filter"></div>
              <div class="txt_wrap">
                <div class="num"><img src="../assets/images/nowdo/vision_num_02.png" alt="02"></div>
                <h3 class="block_copy">コーチの質、<br class="br_hide">生活の向上</h3>
                <p>コーチングプログラム、
                  <br>スキルの向上とサービス提供機会の
                  <br>向上に貢献する。</p>
              </div>
            </div>
            <div class="vision_block number_03">
              <div class="sp_bg"></div>
              <div class="dot_filter"></div>
              <div class="txt_wrap">
                <div class="num"><img src="../assets/images/nowdo/vision_num_03.png" alt="03"></div>
                <h3 class="block_copy">スポーツ施設の<br class="br_hide">活性化</h3>
                <p>スポーツ施設の空き時間を
                  <br>パーソナルトレーニング利用により
                  <br>活性化させる。</p>
              </div>
            </div>
          </div>
        </section>
        <!-- /.section_02 -->
        <section class="section_03">
          <div class="contents_inner">
            <h2 class="section_ttl"><img src="../assets/images/nowdo/section_ttl_03.png" alt="MESSAGE"></h2>
            <p class="sub_copy">本田圭佑CEOメッセージ</p>
            <div class="message_video_wrap">
              <iframe width="960" height="540" src="https://www.youtube.com/embed/oi2lBGDK-tM?rel=0" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
            </div>
            <div class="message_others_wrap">
              <article>
                <div class="img"><img src="../assets/images/nowdo/message_01.png" alt=""></div>
                <div class="txt">
                  <p class="article_ttl"><img src="../assets/images/nowdo/nowdo_logo.png" alt="Now Do">の
                    <br class="pc_hide">サービス概要と
                    <br class="pc_hide">利用方法</p>
                  <p class="copy">どんな時にどのようにNowDoを利用するかを説明します。</p>
                </div>
                <p class="sp_copy pc_hide">どんな時にどのようにNowDoを利用するかを説明します。</p>
              </article>
              <article>
                <div class="img"><img src="../assets/images/nowdo/message_02.png" alt=""></div>
                <div class="txt">
                  <p class="article_ttl"><img src="../assets/images/nowdo/nowdo_logo.png" alt="Now Do">を
                    <br class="pc_hide">始めたきっかけ </p>
                  <p class="copy">サッカースクールを運営する上で見えたきた課題を
                    <br>解決する手段としてNowDoを始めます。</p>
                </div>
                <p class="sp_copy pc_hide">サッカースクールを運営する上で見えたきた課題を
                  <br>解決する手段としてNowDoを始めます。</p>
              </article>
              <article>
                <div class="img"><img src="../assets/images/nowdo/message_03.png" alt=""></div>
                <div class="txt">
                  <p class="article_ttl"><img src="../assets/images/nowdo/nowdo_logo.png" alt="Now Do">の
                    <br class="pc_hide">これから</p>
                  <p class="copy">サッカー、スポーツだけでなく、
                    <br>将来的には様々な分野でのマッチングを促進します。</p>
                </div>
                <p class="sp_copy pc_hide">サッカー、スポーツだけでなく、
                  <br>将来的には様々な分野でのマッチングを促進します。</p>
              </article>
            </div>
          </div>
        </section>
        <!-- /.section_03 -->
        <section class="section_04" id="recruit">
          <div class="dot_filter"></div>
          <div class="txt_block">
            <h2 class="section_ttl"><img src="../assets/images/nowdo/section_ttl_04.png" alt="RECRUIT"></h2>
            <p class="section_copy">コーチ・施設を募集します</p>
            <p class="txt">Now Doは私たちと一緒にユーザーに高いレベルの
              <br>パーソナルトレーニングを提供してくれる
              <br>サッカーコーチとサッカー関連施設を
              <br class="pc_hide">募集しています。</p>
            <p class="link"><a href="http://nowdo.jp/" target="_blank">Now Do(株) 公式サイトはこちら</a></p>
          </div>
        </section>
        <!-- /.section_04 -->
        <section class="section_05">
          <div class="contents_inner">
            <h2 class="section_ttl">メールフォームから応募する</h2>
            <p class="copy">ご応募の方は、下記必要事項を明記して「応募する」ボタンを押してください。</p>
              <div class="form_area_wrap">
                <ul class="tab">
                  <li class="select">コーチ募集</li>
                  <li>施設募集</li>
                </ul>
                        <div class="form_content">
                            <div class="form_block">
                               <form action="javascript://" method="post">
                               <table>
                                   <tr>
                                       <th><label for="">氏　　名</label></th>
                                       <td><input type="text" id="name1" name="name1" placeholder="姓" class="width01 mr" required> <input type="text" id="name2" name="name2" placeholder="名" class="width01" required></td>
                                   </tr>                                   

                                   <tr>
                                       <th><label for="">住　　所</label></th>
                                       <td><input type="text" id="postcode" name="postcode" placeholder="郵便番号" pattern="\d{3}-?\d{4}" class="width01" onKeyUp="AjaxZip3.zip2addr(this,'','prefectures','city','address');" required><br>
                                           <select name="prefectures" class="width01 mr" required>
                                               <option value="" selected>都道府県</option>
                                               <option value="1">北海道</option>
                                               <option value="2">青森県</option>
                                               <option value="3">岩手県</option>
                                               <option value="4">宮城県</option>
                                               <option value="5">秋田県</option>
                                               <option value="6">山形県</option>
                                               <option value="7">福島県</option>
                                               <option value="8">茨城県</option>
                                               <option value="9">栃木県</option>
                                               <option value="10">群馬県</option>
                                               <option value="11">埼玉県</option>
                                               <option value="12">千葉県</option>
                                               <option value="13">東京都</option>
                                               <option value="14">神奈川県</option>
                                               <option value="15">新潟県</option>
                                               <option value="16">富山県</option>
                                               <option value="17">石川県</option>
                                               <option value="18">福井県</option>
                                               <option value="19">山梨県</option>
                                               <option value="20">長野県</option>
                                               <option value="21">岐阜県</option>
                                               <option value="22">静岡県</option>
                                               <option value="23">愛知県</option>
                                               <option value="24">三重県</option>
                                               <option value="25">滋賀県</option>
                                               <option value="26">京都府</option>
                                               <option value="27">大阪府</option>
                                               <option value="28">兵庫県</option>
                                               <option value="29">奈良県</option>
                                               <option value="30">和歌山県</option>
                                               <option value="31">鳥取県</option>
                                               <option value="32">島根県</option>
                                               <option value="33">岡山県</option>
                                               <option value="34">広島県</option>
                                               <option value="35">山口県</option>
                                               <option value="36">徳島県</option>
                                               <option value="37">香川県</option>
                                               <option value="38">愛媛県</option>
                                               <option value="39">高知県</option>
                                               <option value="40">福岡県</option>
                                               <option value="41">佐賀県</option>
                                               <option value="42">長崎県</option>
                                               <option value="43">熊本県</option>
                                               <option value="44">大分県</option>
                                               <option value="45">宮崎県</option>
                                               <option value="46">鹿児島県</option>
                                               <option value="47">沖縄県</option>
                                           </select>
                                           
                                           <input type="text" id="city" name="city" placeholder="市区町村" class="width01" required><br>
                                           <input type="text" id="address" name="address" placeholder="番地・ビル名" class="width02" required>
                                       </td>
                                   </tr>
                                   
                                   <tr>
                                       <th>電話番号</th>
                                       <td><input type="text" id="tel" name="tel" class="width02" required></td>
                                   </tr>

                                   <tr>
                                       <th>メールアドレス</th>
                                       <td><input type="text" id="email" name="email" class="width02" required></td>
                                   </tr>

                                   <tr>
                                       <th>性　　別</th>
                                       
                                       <td>
                                           <select name="sex" class="width03" required>
                                               <option value="" selected></option>
                                               <option value="0">男性</option>
                                               <option value="1">女性</option>
                                           </select>
                                        </td>
                                   </tr>

                                   <tr>
                                       <th>生年月日</th>
                                       <td>
                                           <select name="year" class="width04" required>
                                               <option value="">-</option>
                                               <option value="1900">1900</option>
                                               <option value="1901">1901</option>
                                               <option value="1902">1902</option>
                                               <option value="1903">1903</option>
                                               <option value="1904">1904</option>
                                               <option value="1905">1905</option>
                                               <option value="1906">1906</option>
                                               <option value="1907">1907</option>
                                               <option value="1908">1908</option>
                                               <option value="1909">1909</option>
                                               <option value="1910">1910</option>
                                               <option value="1911">1911</option>
                                               <option value="1912">1912</option>
                                               <option value="1913">1913</option>
                                               <option value="1914">1914</option>
                                               <option value="1915">1915</option>
                                               <option value="1916">1916</option>
                                               <option value="1917">1917</option>
                                               <option value="1918">1918</option>
                                               <option value="1919">1919</option>
                                               <option value="1920">1920</option>
                                               <option value="1921">1921</option>
                                               <option value="1922">1922</option>
                                               <option value="1923">1923</option>
                                               <option value="1924">1924</option>
                                               <option value="1925">1925</option>
                                               <option value="1926">1926</option>
                                               <option value="1927">1927</option>
                                               <option value="1928">1928</option>
                                               <option value="1929">1929</option>
                                               <option value="1930">1930</option>
                                               <option value="1931">1931</option>
                                               <option value="1932">1932</option>
                                               <option value="1933">1933</option>
                                               <option value="1934">1934</option>
                                               <option value="1935">1935</option>
                                               <option value="1936">1936</option>
                                               <option value="1937">1937</option>
                                               <option value="1938">1938</option>
                                               <option value="1939">1939</option>
                                               <option value="1940">1940</option>
                                               <option value="1941">1941</option>
                                               <option value="1942">1942</option>
                                               <option value="1943">1943</option>
                                               <option value="1944">1944</option>
                                               <option value="1945">1945</option>
                                               <option value="1946">1946</option>
                                               <option value="1947">1947</option>
                                               <option value="1948">1948</option>
                                               <option value="1949">1949</option>
                                               <option value="1950">1950</option>
                                               <option value="1951">1951</option>
                                               <option value="1952">1952</option>
                                               <option value="1953">1953</option>
                                               <option value="1954">1954</option>
                                               <option value="1955">1955</option>
                                               <option value="1956">1956</option>
                                               <option value="1957">1957</option>
                                               <option value="1958">1958</option>
                                               <option value="1959">1959</option>
                                               <option value="1960">1960</option>
                                               <option value="1961">1961</option>
                                               <option value="1962">1962</option>
                                               <option value="1963">1963</option>
                                               <option value="1964">1964</option>
                                               <option value="1965">1965</option>
                                               <option value="1966">1966</option>
                                               <option value="1967">1967</option>
                                               <option value="1968">1968</option>
                                               <option value="1969">1969</option>
                                               <option value="1970">1970</option>
                                               <option value="1971">1971</option>
                                               <option value="1972">1972</option>
                                               <option value="1973">1973</option>
                                               <option value="1974">1974</option>
                                               <option value="1975">1975</option>
                                               <option value="1976">1976</option>
                                               <option value="1977">1977</option>
                                               <option value="1978">1978</option>
                                               <option value="1979">1979</option>
                                               <option value="1980">1980</option>
                                               <option value="1981">1981</option>
                                               <option value="1982">1982</option>
                                               <option value="1983">1983</option>
                                               <option value="1984">1984</option>
                                               <option value="1985">1985</option>
                                               <option value="1986">1986</option>
                                               <option value="1987">1987</option>
                                               <option value="1988">1988</option>
                                               <option value="1989">1989</option>
                                               <option value="1990">1990</option>
                                               <option value="1991">1991</option>
                                               <option value="1992">1992</option>
                                               <option value="1993">1993</option>
                                               <option value="1994">1994</option>
                                               <option value="1995">1995</option>
                                               <option value="1996">1996</option>
                                               <option value="1997">1997</option>
                                               <option value="1998">1998</option>
                                               <option value="1999">1999</option>
                                               <option value="2000">2000</option>
                                               <option value="2001">2001</option>
                                               <option value="2002">2002</option>
                                               <option value="2003">2003</option>
                                               <option value="2004">2004</option>
                                               <option value="2005">2005</option>
                                               <option value="2006">2006</option>
                                               <option value="2007">2007</option>
                                               <option value="2008">2008</option>
                                               <option value="2009">2009</option>
                                               <option value="2010">2010</option>
                                               <option value="2011">2011</option>
                                               <option value="2012">2012</option>
                                               <option value="2013">2013</option>
                                               <option value="2014">2014</option>
                                               <option value="2015">2015</option>
                                               <option value="2016">2016</option>
                                               <option value="2017">2017</option>
                                               <option value="2018">2018</option>
                                               <option value="2019">2019</option>
                                               <option value="2020">2020</option>
                                               <option value="2021">2021</option>
                                               <option value="2022">2022</option>
                                               <option value="2023">2023</option>
                                               <option value="2024">2024</option>
                                               <option value="2025">2025</option>
                                               <option value="2026">2026</option>
                                               <option value="2027">2027</option>
                                               <option value="2028">2028</option>
                                               <option value="2029">2029</option>
                                               <option value="2030">2030</option>
                                           </select> <span>年</span> 
                                           
                                           <select name="month" class="width03" required>
                                               <option value="">-</option>
                                               <option value="1">1</option>
                                               <option value="2">2</option>
                                               <option value="3">3</option>
                                               <option value="4">4</option>
                                               <option value="5">5</option>
                                               <option value="6">6</option>
                                               <option value="7">7</option>
                                               <option value="8">8</option>
                                               <option value="9">9</option>
                                               <option value="10">10</option>
                                               <option value="11">11</option>
                                               <option value="12">12</option>
                                           </select> <span>月</span> 
                                           
                                           <select name="day" class="width03" required>
                                               <option value="">-</option>
                                               <option value="1">1</option>
                                               <option value="2">2</option>
                                               <option value="3">3</option>
                                               <option value="4">4</option>
                                               <option value="5">5</option>
                                               <option value="6">6</option>
                                               <option value="7">7</option>
                                               <option value="8">8</option>
                                               <option value="9">9</option>
                                               <option value="10">10</option>
                                               <option value="11">11</option>
                                               <option value="12">12</option>
                                               <option value="13">13</option>
                                               <option value="14">14</option>
                                               <option value="15">15</option>
                                               <option value="16">16</option>
                                               <option value="17">17</option>
                                               <option value="18">18</option>
                                               <option value="19">19</option>
                                               <option value="20">20</option>
                                               <option value="21">21</option>
                                               <option value="22">22</option>
                                               <option value="23">23</option>
                                               <option value="24">24</option>
                                               <option value="25">25</option>
                                               <option value="26">26</option>
                                               <option value="27">27</option>
                                               <option value="28">28</option>
                                               <option value="29">29</option>
                                               <option value="30">30</option>
                                               <option value="31">31</option>
                                           </select> <span>日</span>
                                       </td>
                                   </tr>

                                   <tr>
                                       <th>取得資格</th>
                                       <td><textarea name="license" id="license" cols="30" rows="10" required></textarea></td>
                                   </tr>

                                   <tr>
                                       <th>コーチ歴</th>
                                       <td><input type="text" id="coach" name="coach" class="width03" required> <span>年</span></td>
                                   </tr>
                               </table>
                                <div class="entry_btn">
                                    <button type="submit" id="button_submit" class="contact-form__submit">応募する</button>
                                </div>
                                </form>
                            </div>
                            <div class="form_block">
                                <form action="javascript://" method="post">
                                <table>
                                    <tr>
                                        <th><label for="">施 設 名</label></th>
                                        <td><input type="text" id="_name1" name="_name1" class="width02" required></td>
                                    </tr>  
                                   
                                   
                                    <tr>
                                        <th><label for="">代表者氏名</label></th>
                                        <td><input type="text" id="_name2" name="_name2" class="width02" required></td>
                                    </tr>                                   

                                    <tr>
                                        <th><label for="">住　　所</label></th>
                                        <td><input type="text" id="_postcode" name="_postcode" placeholder="郵便番号" pattern="\d{3}-?\d{4}" required onKeyUp="AjaxZip3.zip2addr(this,'','_prefectures','_city','_address');"><br>

                                            <select name="_prefectures" class="width01 mr" required>
                                                <option value="" selected>都道府県</option>
                                                <option value="1">北海道</option>
                                                <option value="2">青森県</option>
                                                <option value="3">岩手県</option>
                                                <option value="4">宮城県</option>
                                                <option value="5">秋田県</option>
                                                <option value="6">山形県</option>
                                                <option value="7">福島県</option>
                                                <option value="8">茨城県</option>
                                                <option value="9">栃木県</option>
                                                <option value="10">群馬県</option>
                                                <option value="11">埼玉県</option>
                                                <option value="12">千葉県</option>
                                                <option value="13">東京都</option>
                                                <option value="14">神奈川県</option>
                                                <option value="15">新潟県</option>
                                                <option value="16">富山県</option>
                                                <option value="17">石川県</option>
                                                <option value="18">福井県</option>
                                                <option value="19">山梨県</option>
                                                <option value="20">長野県</option>
                                                <option value="21">岐阜県</option>
                                                <option value="22">静岡県</option>
                                                <option value="23">愛知県</option>
                                                <option value="24">三重県</option>
                                                <option value="25">滋賀県</option>
                                                <option value="26">京都府</option>
                                                <option value="27">大阪府</option>
                                                <option value="28">兵庫県</option>
                                                <option value="29">奈良県</option>
                                                <option value="30">和歌山県</option>
                                                <option value="31">鳥取県</option>
                                                <option value="32">島根県</option>
                                                <option value="33">岡山県</option>
                                                <option value="34">広島県</option>
                                                <option value="35">山口県</option>
                                                <option value="36">徳島県</option>
                                                <option value="37">香川県</option>
                                                <option value="38">愛媛県</option>
                                                <option value="39">高知県</option>
                                                <option value="40">福岡県</option>
                                                <option value="41">佐賀県</option>
                                                <option value="42">長崎県</option>
                                                <option value="43">熊本県</option>
                                                <option value="44">大分県</option>
                                                <option value="45">宮崎県</option>
                                                <option value="46">鹿児島県</option>
                                                <option value="47">沖縄県</option>
                                            </select>

                                            <input type="text" id="_city" name="_city" placeholder="市区町村" class="width01" required><br>
                                            <input type="text" id="_address" name="_address" placeholder="番地・ビル名" class="width02" required>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>電話番号</th>
                                        <td><input type="text" id="_tel" name="_tel"  class="width02" required></td>
                                    </tr>

                                    <tr>
                                        <th>メールアドレス</th>
                                        <td><input type="text" id="_email" name="_email" class="width02" required></td>
                                    </tr>

                                </table>
                                <div class="entry_btn">
                                    <button type="submit" id="_button_submit" class="contact-form__submit">応募する</button>
                                </div>
                                </form>
                            </div>
                        </div>
              </div>
          </div>
        </section>
        <!-- /.section_05 -->
      </div>
    </div>
    <!-- .body-sec-inner -->
  </div>
  <!-- /.body-sec -->

  <script>
  $(function() {
    var $tabLi = $('.tab li');
    var $form_block = $('.form_block');

    $form_block.hide();
    $form_block.eq(0).show();
    $tabLi.eq(0).addClass('select');
    /*クリックイベント*/
    $tabLi.each(function() {
      $(this).on('click', function() {
        var index = $tabLi.index(this);
        $tabLi.removeClass('select');
        $(this).addClass('select');
        $form_block.hide();
        $form_block.eq(index).show();
      });
    });
  });

  $(function() {
    $('a[href^="#"]').click(function() {
      // スクロールの速度
      var speed = 400; // ミリ秒で記述
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
  });

	$(function(){
		
		$(".form_block").each(function(){
			$(this).prepend("<div class='message'><p></p></div>");
			$(".message").hide();
		});
		
		$("form").submit(function(){
			
			var active=0;
			for(var i=0;i<$(".tab li").length;i++){
				if($(".tab li:eq("+i+")").attr("class").match(/select/)){
					active=i;
					break;
				}
			}
			
			$("input,textarea,select",this).prop("readonly",true);
			$("button",this).prop("disabled",true);
			$(this).fadeTo(100,0.5);
			$(".form_block:eq("+active+") .message").hide();
			var height=$(this).height();
			var aform=$(this);
			
			$.ajax({
				data:$(this).serialize()+"&ftype="+active,
				type:"POST",
				url:"./submit/",
				success:function(m){
					if(m.error){
						$("input,textarea,select",aform).prop("readonly",false);
						$("button",aform).prop("disabled",false);
						$(aform).fadeTo(100,1);
						$(".form_block:eq("+active+") .message").css({"color":"#D43400","lineHeight":"3em","fontWeight":"bold"});
					}else{
						$(aform).hide();
						$(".form_block:eq("+active+")").height(height);
					}
					$(".form_block:eq("+active+") .message").html(m.message).show();
					$('body,html').animate({scrollTop:$(".section_05").offset().top},500);
				}
			});
		});
	});

  </script>

<script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
// # パンくずリスト
// ==============================
  $BREADCRUMB = array(
    array(
      'label' => 'Now Do',
      'path'  => '/nowdo/'
    ),
  );
?>


<?php

include_once __DIR__."/../../_footer-responsive.php";
include_once __DIR__."/../../_debug.php";

?>
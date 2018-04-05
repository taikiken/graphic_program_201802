<?php
// app webview かを `?app=(ios|android)` から判定します
// ==============================
$from_webview = false;
if (isset($_GET['app'])) {
  if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
    $from_webview = true;
  }
}
?>

<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

  <?php include_once __DIR__."/../../_head.php"; ?>

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script>
  <script src="https://ajaxzip3.github.io/ajaxzip3.js" charset="UTF-8"></script>
    <link rel="stylesheet" href="/assets/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (min-width: 769px)">
    <link rel="stylesheet" href="/assets/sp/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (max-width: 768px)">
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
  <?php
  // app in webview 時に非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  endif;
  // -----------------------------------------
  ?>

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
              <p class="main_copy_02"><img src="../assets/images/nowdo/main_copy_02.png" alt="2018年夏前のリリースに伴い、サッカートレーナー・サッカー関連施設を募集します。"></p>
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
              <br>あなたのために一流プロアスリートが考案したトレーニングメニューを厳選されたトレーナーが提供します。
              <br>サッカースクールなどでは実現できない個人技術の向上にコミットします。</p>
            <div class="press_release_wrap">
              <h3 class="sub_ttl"><span>プレスリリース</span></h3>
              <ul class="press_release_list">
                <li>
                  <dl>
                    <dt>2018年4月5日</dt>
                    <dd><a href="/p/292521/">スポーツブルが本田圭佑 CEO が立ち上げるスポーツマッチングサービス「Now Do」の共同運営を開始</a></dd>
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
                <h3 class="block_copy">トレーナーの質、<br class="br_hide">生活の向上</h3>
                <p>トレーニングプログラム、
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
              <iframe width="960" height="540" src="https://www.youtube.com/embed/0fzaHlIG2qY?rel=0" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
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
                  <p class="copy">サッカースクールを運営する上で見えてきた課題を
                    <br>解決する手段としてNowDoを始めます。</p>
                </div>
                <p class="sp_copy pc_hide">サッカースクールを運営する上で見えてきた課題を
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

            <div class="coo_message">
              <p class="sub_copy sub_copy_coo">鈴木良介COO</p>
              <div class="coo_message_area">
                  <div class="img"><img src="../assets/images/nowdo/coo_photo.png" alt=""></div>
                  <div class="txt_area">
                      <p>
                        <span class="name">
                          鈴木 良介（すずき りょうすけ）<br />
                          Now Do株式会社 取締役副社長<br />
                        </span>
                        1981年、東京都出身。本田圭佑と共に2010年から国内外でサッカークリニックなどを開催。2012年にはSOLTILO FAMILIA SOCCER SCHOOLを本田と共に立ち上げ全国76校にわたる国内外でサッカースクール、施設運営事業を行うSOLTILO 株式会社を設立。取締役副社長に就任。<br />
                        今回のNow Do株式会社の取締役副社長に加えて、スポーツ競技におけるセンシング技術を使った(ウェアラブル)IoT事業ビジネスを展開するKnows株式会社、2019年4月からスタートする 幕張ベイエリア内の 認可保育園、インターナショナルスクールの経営を行うSOLTILO CCC株式会社の代表取締役社長も務める。
                      </p>
                  </div>
              </div>
              <p class="link"><a href="/p/293190/">Now Do社の取締役副社長 鈴木氏とスポーツブル代表黒飛が語る、 Now Doビジネスとは？</a></p>
            </div>

          </div>
        </section>
        <!-- /.section_03 -->
        <section class="section_04" id="recruit">
          <div class="txt_block">
            <h2 class="section_ttl"><img src="../assets/images/nowdo/section_ttl_04.png" alt="RECRUIT"></h2>
            <p class="section_copy">トレーナー・施設を募集します</p>
            <p class="txt">Now Doは私たちと一緒にユーザーに高いレベルの
              <br>パーソナルトレーニングを提供してくれる
              <br>サッカートレーナーとサッカー関連施設を
              <br class="pc_hide">募集しています。</p>
            <p class="link"><a href="http://nowdo.jp/" target="_blank">Now Do(株) 公式サイトはこちら</a></p>
          </div>
        </section>
        <!-- /.section_05 -->
        <section class="section_05">
          <div class="contents_inner">
            <h2 class="section_ttl">メールフォームから応募する</h2>
            <p class="copy">ご応募の方は、下記必要事項を明記して「応募する」ボタンを押してください。</p>
              <div class="form_area_wrap">
                <ul class="tab">
                  <li class="select">トレーナー募集</li>
                  <li>施設募集</li>
                </ul>
                        <div class="form_content">
                            <div class="form_block">
                               <form action="javascript://" method="post">
                               <table>
                                   <tr>
                                       <th><label for="name1">氏名<span class="required">必須</span></label></th>
                                       <td><input type="text" id="name1" name="name1" placeholder="姓" class="width01 mr" required> <input type="text" id="name2" name="name2" placeholder="名" class="width01" required></td>
                                   </tr>

                                   <tr>
                                       <th><label for="email">Eメール<span class="required">必須</span></label></th>
                                       <td><input type="text" id="email" name="email" class="width02" required></td>
                                   </tr>

                                   <tr>
                                       <th><label for="tel">電話番号</label></th>
                                       <td><input type="text" id="tel" name="tel" class="width02"></td>
                                   </tr>

                                   <tr>
                                       <th>性別<span class="required">必須</span></th>
                                       <td>
											<input type="radio" value="男" name="sex" id="sex01" required><label for="sex01">男</label>
                                            <input type="radio" value="女" name="sex" id="sex02" required><label for="sex02">女</label>
                                        </td>
                                   </tr>

                                   <tr>
                                       <th><label for="license">取得資格</label></th>
                                       <td><textarea name="license" id="license" cols="30" rows="10" placeholder="例) oooo協会指導ライセンスB級"></textarea></td>
                                   </tr>

                                   <tr>
                                       <th><label for="history01">トレーナー歴<br>指導カテゴリー</label></th>
                                       <td><textarea name="history01" id="history01" cols="30" rows="10" placeholder="例) xxxサッカースクールトレーナー5年&#10;例) xxxサッカークラブ U-18 監督 3年"></textarea></td>
                                   </tr>

                                   <tr>
                                       <th><label for="history02">競技歴</label></th>
                                       <td><textarea name="history02" id="history02" cols="30" rows="10" placeholder="例) xxxサッカーチーム U-18、xxxサッカーチームトップ"></textarea></td>
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
                                        <th><label for="_name0">施設名称<span class="required">必須</span></label></th>
                                        <td><input type="text" id="_name0" name="_name0" class="width02" required></td>
                                    </tr>

                                    <tr>
                                        <th><label for="_name1">担当者名<span class="required">必須</span></label></th>
                                       <td><input type="text" id="_name1" name="_name1" placeholder="姓" class="width01 mr" required> <input type="text" id="_name2" name="_name2" placeholder="名" class="width01" required></td>
                                    </tr>

                                    <tr>
                                        <th><label for="_postcode">住所<span class="required">必須</span></label></th>
                                        <td><input type="text" id="_postcode" name="_postcode" placeholder="郵便番号" pattern="\d{3}-?\d{4}" required onKeyUp="AjaxZip3.zip2addr(this,'','_prefectures','_city','_address');"><br>
                                            <select name="_prefectures" class="width01 mr" required>
                                                <option value="" selected>都道府県</option><option value="1">北海道</option><option value="2">青森県</option><option value="3">岩手県</option><option value="4">宮城県</option><option value="5">秋田県</option><option value="6">山形県</option><option value="7">福島県</option><option value="8">茨城県</option><option value="9">栃木県</option><option value="10">群馬県</option><option value="11">埼玉県</option><option value="12">千葉県</option><option value="13">東京都</option><option value="14">神奈川県</option><option value="15">新潟県</option><option value="16">富山県</option><option value="17">石川県</option><option value="18">福井県</option><option value="19">山梨県</option><option value="20">長野県</option><option value="21">岐阜県</option><option value="22">静岡県</option><option value="23">愛知県</option>
                                                <option value="24">三重県</option><option value="25">滋賀県</option><option value="26">京都府</option><option value="27">大阪府</option><option value="28">兵庫県</option><option value="29">奈良県</option><option value="30">和歌山県</option><option value="31">鳥取県</option><option value="32">島根県</option><option value="33">岡山県</option><option value="34">広島県</option><option value="35">山口県</option><option value="36">徳島県</option><option value="37">香川県</option><option value="38">愛媛県</option><option value="39">高知県</option><option value="40">福岡県</option><option value="41">佐賀県</option><option value="42">長崎県</option><option value="43">熊本県</option><option value="44">大分県</option><option value="45">宮崎県</option><option value="46">鹿児島県</option><option value="47">沖縄県</option>
                                            </select>
                                            <input type="text" id="_city" name="_city" placeholder="市区町村" class="width01" required><br>
                                            <input type="text" id="_address" name="_address" placeholder="番地・ビル名" class="width02" required>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th><label for="_email">Eメール<span class="required">必須</span></label></th>
                                        <td><input type="text" id="_email" name="_email" class="width02" required></td>
                                    </tr>

                                    <tr>
                                        <th><label for="_tel">電話番号<span class="required">必須</span></label></th>
                                        <td><input type="text" id="_tel" name="_tel"  class="width02" required></td>
                                    </tr>

                                   <tr>
                                       <th><label for="_note">備考</label></th>
                                       <td><textarea name="_note" id="_note" cols="30" rows="10" placeholder=""></textarea></td>
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
			$(this).prepend("<p class='message'></p>");
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
					m=$.parseJSON(m);
					if(m.error){
						$("input,textarea,select",aform).prop("readonly",false);
						$("button",aform).prop("disabled",false);
						$(aform).fadeTo(100,1);
						$(".form_block:eq("+active+") .message").css({"color":"#D43400","paddingBottom":"15px","lineHeight":"3em","fontWeight":"bold"});
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

    <!-- for facebook -->
    <script src="/assets/facebook/init.js?"></script>
    <!-- // for facebook -->
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
  // app in webview 時に非表示にする
  if (!$from_webview) :
  ?>
    <?php
      include_once __DIR__."/../../_footer-responsive.php";
    ?>
  <?php
    endif;
  // -----------------------------------------
  ?>

  <?php
    include_once __DIR__."/../../_debug.php";
  ?>
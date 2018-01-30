<?php
/**
 * パラボード 日程一覧 - mobile
 * category 一覧へ insert
 * @since 2018-01-30
 */
?>

<?php
// ------------------------------
// パラボード レギュラー index と同じ
?>
<div id="headline-container"></div>

<?php
include_once __DIR__ . '/../para-board/module/_functions.php';

//$api_result = get_recent();
// TODO 404 になるのでテスト用にデータが存在する API を使う
$api_result = get_recent_id_year(0, 2018);
$response = $api_result['response'];
if (!empty($response)) :
?>
<div class="paraboard__widjet">
  <header class="paraboard__widjet__header">
    <h2 class="paraboard__widjet__header__heading"><img src="/assets/sp/images/para-board/widjet-heading.png" alt="PARA BOARD パラボード"></h2>
    <div class="paraboard__widjet__header__sub">
      <h3 class="paraboard__widjet__header__sub__heading">直近の日程結果<span>※前後20日</span></h3>
      <div class="paraboard__widjet__header__sub__btn"><a href="/para-board/"><span>試合日程・結果一覧</span></a></div>
    </div>
  </header>
  <table class="paraboard__widjet__list">
    <tbody>
    <?php
    $para_list = $response['list'];
    foreach ($para_list as $para_date => $para_games) :
      $th_rowspan = count($para_games);

//      $tr_index = 0;
      // tr loop
      foreach ($para_games as $para_game) :
    ?>
      <tr>
        <td class="paraboard__widjet__list__game">
          <a href="/para-board/<?php echo $para_game['id']; ?>" class="paraboard__widjet__list__game__link">
            <header class="paraboard__widjet__list__game__header paraboard__widjet__list__icon--basketball">
              <p class="paraboard__widjet__list__date"><?php echo $para_date; ?></p>
              <p class="paraboard__widjet__list__game__header__category">
                <?php
                echo $para_game['sport_name'];
                ?>
              </p>
              <h4 class="paraboard__widjet__list__game__header__heading">
                <?php
                echo $para_game['competition_name'];
                ?>
              </h4>
            </header>
            <div class="paraboard__widjet__list__game__btn"><i>詳しく見る</i></div>
          </a>
        </td>
      </tr>
      <?php
//      $tr_index += 1;
      endforeach;
      // /tr
      ?>
    <?php
    endforeach;
    ?>
    </tbody>
  </table>
</div>
<?php
endif;
// パラボード 日程一覧 - 直近
?>

<aside class="sns-pr">
  <div class="sns-pr-outer">
    <dl class="sns-pr-inner">
      <dt><span>いいねして最新ニュースをチェック！</span></dt>
      <dd>
        <div class="fb-like" data-href="https://facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div>
      </dd>
    </dl><!-- /.sns-pr-inner -->
  </div><!-- /.sns-pr-outer -->
</aside><!-- /.sns-pr -->

<div id="js-headline-last-container"></div>
<?php
// イレギュラー終わり
// ------------------------------
?>

<script>
  (function(window) {
    'use strict';
    var UT = window.UT;
    var element = UT.app.Dom.headline();
    if (!element) {
      return;
    }
    var SPBL_ENV = window.SPBL_ENV || {};
    if (SPBL_ENV.env === 'development' && location.hostname.indexOf('sportsbull.jp') === -1) {
      UT.app.App.develop();
    }
    var slug = SPBL_ENV.category;
    var Model = UT.model.Model;
    var vewHeadline = new UT.sp.view.home.SPViewHeadLine(element);
    var model = new UT.model.ModelCategoriesSlug(slug);
    function done(events) {
      var dae = events.args.shift() || {};
      var headline = dae.headline || {};
      var articles = headline.articles || [];
      vewHeadline.archive = true;
      vewHeadline.renderByRelated(articles);
    }
    function fail(events) {
      console.warn('error', events, slug);
    }
    model.on(Model.COMPLETE, done);
    model.on(Model.RESPONSE_ERROR, fail);
    model.start();
  }(window));
</script>

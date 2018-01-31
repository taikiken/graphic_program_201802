<?php
/**
 * パラボード 日程一覧 - desktop
 * - 汎用 - form + list
 * @since 2018-01-30
 */
?>
<?php
// para-sports module
include_once __DIR__ . '/../module/_functions.php';

// pull-down data - select - option from `/api/v1/competition_pulldown`
$pull_down = get_pull_down();
$pull_down_response = $pull_down['response'];

// [A]
if (!empty($pull_down_response)) :
  $pull_down_response_sports = $pull_down_response['sports'];
  $pull_down_response_year = $pull_down_response['year'];

  // [B]
  if (is_array($pull_down_response_sports) || is_array($pull_down_response_year)) :
?>
<form action="javascript:void(0)" class="paraboard__selector" id="js-paraboard__selector">
<!--<form action="" name="paraboard__selector" class="paraboard__selector" id="js-paraboard__selector">-->
  <?php
  // 日程・結果一覧
  ?>
  <header class="paraboard__header">
    <h2 class="paraboard__header__heading">日程・結果一覧</h2>
    <div class="paraboard__header__search">
    <?php
    // [C]
    if (is_array($pull_down_response_sports) && count($pull_down_response_sports) > 0) :
    ?>
    <div class="paraboard__header__search__type paraboard__header__search__type--event">
      <span class="paraboard__header__search__type__heading">競技</span>
      <div class="paraboard__header__search__select__container">
        <label class="paraboard__header__search__select__label">
          <select name="sports_id" class="paraboard__header__search__select paraboard__header__search__select--event">
          <?php
          // response.sports
          foreach ($pull_down_response_sports as $para_id => $para_sports) :
          ?>
            <option value="<?php echo $para_id; ?>"><?php echo $para_sports; ?></option>
          <?php
          endforeach;
          ?>
          </select>
        </label>
      </div>
    </div>
    <?php
    endif;
    // [/C]
    ?>
    <?php
    // [D]
    if (is_array($pull_down_response_year) && count($pull_down_response_year) > 0) :
    ?>
      <div class="paraboard__header__search__type paraboard__header__search__type--year">
        <span class="paraboard__header__search__type__heading">年</span>
        <div class="paraboard__header__search__select__container">
          <label class="paraboard__header__search__select__label">
            <select name="year" class="paraboard__header__search__select paraboard__header__search__select--year">
            <?php
            // response.year
            foreach ($pull_down_response_year as $para_year) :
            ?>
              <option value="<?php echo $para_year; ?>"><?php echo $para_year; ?>年</option>
            <?php
            endforeach;
            ?>
            </select>
          </label>
        </div><!-- /.paraboard__header__search__select__container -->
      </div>
    <?php
    endif;
    // [/D]
    ?>
      <div class="xxxxxxxxxxx">
        <input type="submit" value="選択する" class="xxxxxxx" />
      </div>
    </div>
  </header>
</form>
<script>
  (function(window) {
    'use strict';
    var document = window.document;
    function onSubmit(event) {
      var formData = new FormData(event.target);
      // console.log('onSubmit', formData, formData.get('sports_id'), formData.get('year'));
      location.href = '/para-board/' + formData.get('sports_id') + '/' + formData.get('year');
    }
    function init() {
      var form = document.getElementById('js-paraboard__selector');
      if (!form) {
        return;
      }
      form.addEventListener('submit', onSubmit, false);
    }
    init();
  }(window));

</script>
  <?php
  endif;
  // [/B]
  ?>
<?php
endif;
// [/A]
?>
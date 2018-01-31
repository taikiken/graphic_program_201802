<?php
/**
 * パラボード 日程一覧 - desktop
 * - 汎用 - form
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
    $para_schedule_year_selected_index = 0;
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
          foreach ($pull_down_response_sports as $para_sports) :
            $para_id = $para_sports['id'];
            $selected_id = $para_id == $para_schedule_id;
          ?>
            <option value="<?php echo $para_id; ?>"<?php
            echo $selected_id ? ' selected' : '';
            ?>><?php echo $para_sports['name']; ?></option>
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
            foreach ($pull_down_response_year as $para_index => $para_year) :
              if ($para_schedule_year_index >= 0) {
                $para_schedule_year_selected_index = $para_index;
                $selected_year = $para_index == $para_schedule_year_index;
              } else {
                $para_schedule_year_selected_index = $para_index;
                $selected_year = $para_year == $para_schedule_year;
              }
            ?>
              <option value="<?php echo $para_year; ?>"<?php
              echo $selected_year ? ' selected' : '';
              ?>><?php echo $para_year; ?>年</option>
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
  var selected = {
    id: "<?php echo $para_schedule_id; ?>",
    year: "<?php echo $para_schedule_year_selected_index; ?>",
  };
  var initial = {
    id: null,
    year: null,
  };
  function onSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var id = formData.get('sports_id');
    var year = formData.get('year');
    if (id === initial.id && year === initial.year) {
      return;
    }
    console.log('onSubmit', '/para-board/' + id + '/' + year + '/');
    location.pathname = '/para-board/' + id + '/' + year + '/';
  }
  function selectedYear(form) {
    const index = parseInt(selected.year, 10);
    if (isNaN(index)) {
      return;
    }
    var element = form.querySelector('select[name="year"]');
    if (!element) {
      return;
    }
    var options = element.getElementsByTagName('option');
    options[index].selected = true;
  }
  function selectedId(form) {
    const index = parseInt(selected.id, 10);
    if (isNaN(index)) {
      return;
    }
    var element = form.querySelector('select[name="sports_id"]');
    if (!element) {
      return;
    }
    var options = element.getElementsByTagName('option');
    options[index].selected = true;
  }
  function init() {
    var form = document.getElementById('js-paraboard__selector');
    if (!form) {
      return;
    }
    // ---
    selectedId(form);
    selectedYear(form);
    // ---
    var formData = new FormData(form);
    initial.id = formData.get('sports_id');
    initial.year = formData.get('year');
    // ---
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
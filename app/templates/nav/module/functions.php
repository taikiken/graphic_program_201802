<?php
/**
 * 速報・データ ページ - desktop
 * 競技・種目 ページ - desktop
 * sidebar に表示する
 * @since 2018-04-11
 */

/**
 * 速報・データ - label to slug 変換します
 * @param $name string - label
 *
 * @return string slug を返します
 */
function tab_live_slug_by_label($name) {
  switch ($name) {
    case '野球': return 'baseball';
    case 'サッカー': return 'soccer';
    case 'バスケットボール': return 'basketball';
    case 'モータースポーツ': return 'motorsports';
    case 'その他':
    default:
      return 'other';
  }
}

/**
 * 競技・種目 - label to slug 変換します
 * @param $name string - label
 *
 * @return string slug を返します
 */
function tab_category_slug_by_label($name) {
  switch ($name) {
    case 'ピックアップ': return 'pickup';
    case '競技・種目':
    default:
      return 'category';
  }
}


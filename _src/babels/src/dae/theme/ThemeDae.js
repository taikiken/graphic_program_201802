/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../data/Safety';
import {ImagesDae} from './ImagesDae';

/**
 * response.theme
 * from 2016-05-30
 *
 * デザイン要素を動的に変更可能なようにAPIに追加されたデータを管理します
 *
 * https://github.com/undotsushin/undotsushin/issues/645
 *
 * <pre>
 * 表示テーマ、記事のプライマリーカテゴリーがら設定さされる
 * - CRAZYのような特殊表示ではない通常記事の場合はthemeはデフォルト表示として空とする
 * </pre>
 */
export class ThemeDae {
  /**
   * @param {Object} [theme={}] response.theme
   */
  constructor( theme:Object = {} ) {
    theme = Safety.object( theme );
    /**
     * response.theme
     * @type {Object}
     * @protected
     */
    this._theme = theme;
    /**
     * response.theme.images
     * @type {ImagesDae}
     * @protected
     */
    this._images = new ImagesDae( theme.images );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.theme
   * @return {Object|*} JSON response.theme を返します
   */
  get theme():Object {
    return this._theme;
  }
  /**
   * JSON.response.theme.base
   *
   * https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
   * <pre>
   * カラースキーム
   * - '' : 通常版
   * - dark : 通常版テーマ
   *
   * PC版デザインの色の制御は文字色や背景色を個々に指定するのではなく
   * - 通常版
   * - 反転版（ダークテーマ）
   * を基本とすることになりました。
   * </pre>
   * @return {string} JSON.response.theme.base
   */
  get base():string {
    return this.theme.base;
  }
  /**
   * response.theme.background_color
   * <pre>
   * 背景色、#付きhex値
   *
   * iOS/Android/SPはこの値をつかって背景色を設定してくさい
   * </pre>
   * @return {string} response.theme.background_color を返します
   */
  get backgroundColor():string {
    return this.theme.background_color;
  }
  /**
   * response.theme.images
   * @return {ImagesDae} response.theme.images を ImagesDae instance にし返します
   */
  get images():ImagesDae {
    return this._images;
  }
}

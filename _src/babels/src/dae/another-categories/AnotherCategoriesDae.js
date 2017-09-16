/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/14 - 19:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Safety } from '../../data/Safety';

/**
 * JSON.another_categories.area.pref
 * @since 2017-09-15
 */
export class PrefDae {
  /**
   * JSON.another_categories.area.pref
   * @param {Array.<string>} responsePref JSON.another_categories.area.pref
   */
  constructor(responsePref = []) {
    const response = Safety.array(responsePref);
    /**
     * JSON.another_categories.area.pref
     * @type {Array.<string>}
     */
    this.origin = responsePref;
    const prefs = response.map((pref) => (pref || ''));
    const list = prefs.filter(pref => (pref !== ''));
    /**
     * JSON.another_categories.area.pref
     * @type {Array.<string>}
     */
    this.list = list;
    /**
     * JSON.another_categories.area.pref 存在 flag
     * @type {boolean}
     */
    this.has = list.length > 0;
  }
}

/**
 * JSON.another_categories.area[{region: string, pref: Array.<string>}]
 * @since 2017-09-15
 */
export class RegionDae {
  /**
   * JSON.another_categories.area[{region: string, pref: Array.<string>}]
   * @param {{region: string, pref: Array.<string>}} responseRegions JSON
   */
  constructor(responseRegions = {}) {
    const response = Safety.object(responseRegions);
    /**
     * JSON.another_categories.area[{region: string, pref: Array.<string>}]
     * @type {{region: string, pref: Array.<string>}}
     */
    this.origin = responseRegions;
    /**
     * JSON.another_categories.area.region
     * @type {string}
     */
    this.region = response.region || '';
    /**
     * JSON.another_categories.area.pref
     * @type {PrefDae}
     */
    this.pref = new PrefDae(response.pref);
  }
}

/**
 * JSON.another_categories.area
 * - {@link RegionDae}
 * @since 2017-09-15
 */
export class AreaDae {
  /**
   * JSON.another_categories.area
   * @param {Array.<object>} responseArea JSON.another_categories
   */
  constructor(responseArea = []) {
    const response = Safety.array(responseArea);
    /**
     * JSON.another_categories.area
     * @type {Array.<Object>}
     */
    this.origin = responseArea;
    const list = response.map(area => (new RegionDae(area)));
    /**
     * JSON.another_categories.area convert data
     * @type {Array.<RegionDae>}
     */
    this.list = list;
    /**
     * area 情報所持フラッグ
     * @type {boolean}
     */
    this.has = list.length > 0;
  }
}

/**
 * 地域のために追加された「カテゴリ」ではないカテゴリのような区分
 * `another_categories` に対応します
 * - AnotherCategoriesDae
 *   - {@link AreaDae}
 *     - {@link RegionDae}
 *       - {@link PrefDae}
 * @since 2017-09-15
 */
export default class AnotherCategoriesDae {
  /**
   * JSON.another_categories
   * @param {Object} anotherCategories JSON.another_categories
   */
  constructor(anotherCategories = {}) {
    const response = Safety.object(anotherCategories);
    /**
     * JSON.another_categories
     * @type {{}}
     */
    this.origin = anotherCategories;
    /**
     * JSON.another_categories.area
     * @type {AreaDae}
     */
    this.area = new AreaDae(response.area);
  }
}

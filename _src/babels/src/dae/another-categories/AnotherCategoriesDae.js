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

export class PrefDae {
  constructor(responsePref = []) {
    const response = Safety.array(responsePref);
    this.origin = responsePref;
    const prefs = response.map((pref) => (pref || ''));
    const list = prefs.filter(pref => (pref !== ''));
    this.list = list;
    this.has = list.length;
  }
}

export class RegionDae {
  constructor(responseRegions = {}) {
    const response = Safety.object(responseRegions);
    this.origin = responseRegions;
    this.region = response.region || '';
    this.pref = new PrefDae(response.pref);
  }
}

export class AreaDae {
  constructor(responseArea = []) {
    const response = Safety.array(responseArea);
    this.origin = responseArea;
    const list = response.map(area => (new RegionDae(area)));
    this.list = list;
    this.has = list.length > 0;
  }
}

export default class AnotherCategoriesDae {
  constructor(anotherCategories = {}) {
    const response = Safety.object(anotherCategories);
    this.origin = anotherCategories;
    this.area = new AreaDae(response.area);
  }
}

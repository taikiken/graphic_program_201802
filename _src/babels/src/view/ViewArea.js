/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/04 - 23:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { ViewArchiveMasonryInfinite } from './ViewArchiveMasonryInfinite';
import { User } from '../app/User';
import Area from '../action/area/Area';
import AreaAuth from '../action/area/AreaAuth';
import Pref from '../action/area/Pref';
import PrefAuth from '../action/area/PrefAuth';
import { ComponentCategoryOption } from '../component/categories/ComponentCategoryOption';

export default class ViewArea extends ViewArchiveMasonryInfinite {
  constructor(element, moreElement, area = '', pref = false, option:Object = {}) {
    super(element, moreElement, null, option, true);
    const done = this.done.bind(this);
    const fail = this.fail.bind(this);
    this.action = pref ?
      this.actionPref(area, done, fail) :
      this.actionArea(area, done, fail);
    this.area = area;
    this.pref = pref;
    const categoryOption = new ComponentCategoryOption('area');
    categoryOption.start();
  }
  actionPref(area, done, fail) {
    return User.sign ?
      new Pref(area, done, fail) :
      new PrefAuth(area, done, fail);
  }
  actionArea(area, done, fail) {
    return User.sign ?
      new Area(area, done, fail) :
      new AreaAuth(area, done, fail);
  }
}

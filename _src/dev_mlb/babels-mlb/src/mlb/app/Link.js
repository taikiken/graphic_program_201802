/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/20 - 16:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const location = self.location;

export default class Link {
  static BASE = '/stats/mlb';
  // ---------------------------------------------------
  //  master/schedule
  // ---------------------------------------------------
  static schedule(yyyymmdd) {
    location.href = `${Link.BASE}/${yyyymmdd}/`;
  }
}

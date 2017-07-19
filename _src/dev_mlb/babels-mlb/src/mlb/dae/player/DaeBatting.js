/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 14:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// dae
import Normalize from '../../util/Normalize';

export default class DaeBatting {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.average = Normalize.str(origin.average, '-');
    this.hits = Normalize.int(origin.hits);
    this.runs = Normalize.int(origin.runs);
    this.stolen = Normalize.int(origin.stolen_bases);
  }
}

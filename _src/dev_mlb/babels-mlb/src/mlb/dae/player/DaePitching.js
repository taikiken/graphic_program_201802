/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 14:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// dae
import Normalize from '../../util/Normalize';

export default class DaePitching {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.average = Normalize.str(origin.average, '-');
    this.innings = Normalize.int(origin.innings);
    this.pitched = Normalize.int(origin.pitched);
    this.strikes = Normalize.int(origin.strikes);
    this.outs = Normalize.int(origin.strike_outs);
    this.dead = Normalize.int(origin.walking_dead);
    this.ra = Normalize.int(origin.ra);
    this.hits = Normalize.int(origin.hits);
  }
}

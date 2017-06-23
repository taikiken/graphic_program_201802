/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const location = self.location;
const port = location.port;
const hostname = location.hostname;
const pathname = location.pathname;

const local = port === '8080';
const dev = hostname === 'dev.sportsbull.jp';
const stg = hostname === 'stg.sportsbull.jp';
const www = hostname === 'sportsbull.jp';

export default class Env {
  static get LOCAL() {
    return 'local';
  }
  static get DEV() {
    return 'dev';
  }
  static get STG() {
    return 'stg';
  }
  static get WWW() {
    return 'www';
  }
  static mode() {
    if (www) {
      return Env.WWW;
    } else if (local) {
      return Env.LOCAL;
    } else if (dev) {
      return Env.DEV;
    } else if (stg) {
      return Env.STG;
    }
    return null;
  }
  static home(path = pathname) {
    // '/' find all
    const matches = path.match(/\//g);
    return matches.length === 1;
  }
  static stats(path = pathname) {
    return path.indexOf('/stats') === 0;
  }
}

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/31 - 21:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

export default class Positions {
  static category(position) {
    switch (position) {
      case '投': {
        return '投手';
      }
      case '捕': {
        return '捕手';
      }
      case '指': {
        return '指名打者';
      }
      case '左':
      case '右':
      case '中': {
        return '外野手';
      }
      default: {
        return '内野手';
      }
    }
  }
}

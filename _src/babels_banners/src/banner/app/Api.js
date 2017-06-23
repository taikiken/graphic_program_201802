/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from './Env';

export default class Api {
  static dev() {
    return 'https://dev-img-sportsbull-jp.s3.amazonaws.com/json/bnr-sokuhou.json';
  }
  static stg() {
    return 'https://img-sportsbull-jp.s3.amazonaws.com/json/bnr-sokuhou_stg.json';
  }
  static www() {
    return 'https://img-sportsbull-jp.s3.amazonaws.com/json/bnr-sokuhou.json';
  }
  static path() {
    switch (Env.mode()) {
      case Env.WWW: {
        return Api.www();
      }
      case Env.STG: {
        return Api.stg();
      }
      default:
      case Env.LOCAL:
      case Env.DEV: {
        return Api.dev();
      }
    }
  }
}

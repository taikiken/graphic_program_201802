/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from './banner/app/Env';
import Api from './banner/app/Api';

import Top from './banner/view/Top';
import Stats from './banner/view/Stats';

// ---
/**
 * UT.net.Ajax
 * @private
 * @type {UT.net.Ajax}
 */
const Ajax = self.UT.net.Ajax;

/**
 * sp flag - Sagen.Browser.Mobile.is
 * @private
 * @type {boolean}
 */
const sp = self.Sagen.Browser.Mobile.is();

/**
 * top 車種コンテナ出力
 * @private
 */
const topBanners = () => {
  const element = document.getElementById('js-top-banners');
  const ajax = new Ajax();
  const top = new Top(ajax, sp, element);
  top.start(Api.path());
};

/**
 * `/stats` バナー一覧
 * @private
 */
const statsBanners = () => {
  const element = document.getElementById('js-stats-banners');
  const ajax = new Ajax();
  const stats = new Stats(ajax, sp, element);
  stats.start(Api.path());
};

// 動作モード statsBanners || topBanners
if (Env.home()) {
  topBanners();
} else if (Env.stats()) {
  statsBanners();
}

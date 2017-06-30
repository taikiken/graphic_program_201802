/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:09
 * @license @taikiken
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @build @@buildTime
 */
'use strict';

// app
import Env from './banner/app/Env';
import Api from './banner/app/Api';

// view
import Top from './banner/view/Top';
import Stats from './banner/view/Stats';

// net
import Ajax from './banner/net/Ajax';

/**
 * sp flag - Sagen.Browser.Mobile.is
 * @private
 * @type {boolean}
 */
let sp = self.Sagen.Browser.Mobile.is();


/**
 * top 車種コンテナ出力
 * @private
 * @param {?Element} [bannerList=null] div#js-stats_banner-list
 */
const topBanners = (bannerList = null) => {
  const element = bannerList || document.getElementById('js-stats_banner-list');
  // console.log('topBanners', bannerList);
  if (!element) {
    return;
  }
  const ajax = new Ajax();
  const top = new Top(ajax, sp, element);
  top.start(Api.path());
};


// webview
/**
 * アプリ専用 - top banner x 4
 */
const appWebview = () => {
  const bannerList = document.getElementById('js-stats_banner-list');
  // console.log('appWebview', bannerList);
  if (bannerList) {
    sp = true;
    topBanners(bannerList);
  }
};

/**
 * `/stats` バナー一覧
 * @private
 */
const statsBanners = () => {
  const element = document.getElementById('js-stats_banners__categories');
  if (!element) {
    return;
  }
  const ajax = new Ajax();
  const stats = new Stats(ajax, sp, element);
  stats.start(Api.path());
};

// 動作モード statsBanners || topBanners
if (Env.home()) {
  topBanners();
} else if (Env.stats()) {
  statsBanners();
} else {
  appWebview();
}

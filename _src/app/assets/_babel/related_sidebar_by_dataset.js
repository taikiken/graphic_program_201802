/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/10 - 20:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// desktop / mobile
// - 関連ニュース
// - オススメ動画
// - オススメ記事
// - headline - `js-headline` container (sp / desktop) : category 使用タイプ
// dataset `script#js-exe` から取得します

const getDataset = () => {
  const scriptExe = document.getElementById('js-exe');
  if (!scriptExe) {
    return null;
  }
  const data = scriptExe.dataset || {};
  const label = data.label || '';
  const slug = data.slug;
  return {
    label,
    slug,
  };
};

const dataset = getDataset();

// UT
/**
 * UT global object
 */
const UT = self.UT;

/**
 * local 開発に対応させるためリクエスト先を変更します
 * - local -> api `dev` 使用します
 */
const host = () => {
  const hostname = location.hostname;
  const local = location.port === '8080' ||
    hostname.indexOf('192.168.1.') !== -1 ||
    hostname.indexOf('undotsushin.local') !== -1;
  // リクエスト先を変更します
  if (local) {
    UT.app.App.develop();
  }
};

/**
 * 関連ニュースを出力します
 * @param {string} slug category slug
 */
const related = (slug) => {
  const element = UT.app.Dom.board();
  const elementMore = UT.app.Dom.boardMore();
  if (!element || !elementMore) {
    return;
  }
  // 関連ニュース出力
  const archive = new UT.view.ViewCategory(slug, element, elementMore);
  archive.start();
};

/**
 * SP: 関連ニュースを出力します
 * @param {string} slug category slug
 */
const relatedSp = (slug) => {
  const element = UT.app.Dom.board();
  const elementMore = UT.app.Dom.boardMore();
  if (!element || !elementMore) {
    return;
  }
  // 関連ニュース出力
  const archive = new UT.sp.view.category.SPViewCategoryWithSlug(slug, element, elementMore);
  archive.start();
};

/**
 * div#widget-ranking-container
 * @param {string} slug category slug
 * @param {{}} [option={}] request class callback 引数
 */
const ranking = (slug, option = {}) => {
  const element = UT.app.Dom.ranking();
  // console.log('ranking', element);
  if (!element) {
    return;
  }
  // ranking
  const archive = new UT.view.sidebar.ViewRanking(element, option, slug);
  archive.start();
};

/**
 * オススメ動画
 * div#widget-recommend-container
 * @param {string} slug category slug
 * @param {{}} [option={}] request class callback 引数
 */
const video = (slug, option = {}) => {
  const element = UT.app.Dom.video();
  // console.log('video', element);
  if (!element) {
    return;
  }
  // videos
  const archive = new UT.view.sidebar.ViewVideos(element, option, slug);
  archive.start();
};

/**
 * オススメ記事
 * - `div#widget-recommend-list-container`
 * @param {string} slug category slug
 * @param {{}} [option={}] request class callback 引数
 */
const recommend = (slug, option = {}) => {
  const element = UT.app.Dom.recommend();
  // console.log('recommend', element);
  if (!element) {
    return;
  }
  // videos
  // const archive = new UT.view.sidebar.ViewRecommend(element, option, slug);
  const archive = new UT.view.sidebar.ViewVideos(element, option, slug);
  archive.start();
};

/**
 * sidebar を出力します
 * - オススメ記事
 * - 人気の記事
 * @param {string} slug category slug
 */
const sidebar = (slug) => {
  ranking(slug);
  video(slug);
  recommend(slug);
};

const headline = (slug) => {
  // headline
  const headlineOption = new UT.view.categories.ViewCategoryOption(slug);
  headlineOption.start();
};

/**
 * SP headline
 * @param {string} slug category slug
 */
const headlineSp = (slug) => {
  // headline
  const headlineOption = new UT.sp.view.categories.SPViewCategoryOption(slug);
  headlineOption.start();
};

/**
 * desktop 処理します
 * @param {string} slug category slug - dataset.slug
 */
const desktop = (slug) => {
  sidebar(slug);
  related(slug);
  headline(slug);
};

/**
 * mobile - sp 処理します
 * @param {string} slug category slug - dataset.slug
 */
const mobile = (slug) => {
  relatedSp(slug);
  headlineSp(slug);
};

/**
 * sp(phone) 判定します
 * @return {boolean} sp flag, true: sp
 */
const spDetector = () => {
  const Sagen = self.Sagen;
  if (Sagen) {
    return Sagen.Browser.Mobile.phone();
  }
  // ua
  const ua = navigator.userAgent;
  const ipad = !!ua.match(/ipad/i);
  const ipod = !!ua.match(/ipod/i);
  const iphone = !!ua.match(/iphone/i) && !ipad && !ipod;
  const androidPhone = !!ua.match(/android/i) && !!ua.match(/mobile/i);
  return iphone || ipod || androidPhone;
};

// dataset から category slug を取得します
if (dataset && dataset.slug) {
  host();
  const sp = spDetector();
  if (!sp) {
    desktop(dataset.slug);
  } else {
    mobile(dataset.slug);
  }
}

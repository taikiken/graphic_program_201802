/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/03
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

/**
 * プロジェクトに合わせタスク基本設定を行います
 *
 * 1. 階層設定を行います
 *    1. app - 開発ディレクトリ
 *    1. app/assets - css, js, img 出力ディレクトリ
 *    1. app/_babel, app/_compile - 単独の ES2015 JS
 *    1. scss - .scss ライブラリ
 *    1. sprite - スプライト画像をファイル毎にディレクトリを作成し保存します
 *    1. babels - ES2015 JS ライブラリ
 *    1. scripts - ES5 JS ライブラリ
 * 1. webpack 設定行います
 * 1. SCSS: auto prefix ブラウザ設定行います
 * 1. コード書換え情報設定
 * 1. 圧縮設定
 *    1. jpg, gif, svg
 *    1. png
 *    1. html
 *    1. css
 * 1. サーバー設定
 *
 * サーバー port を設定します
 * - `_gulp_port.babel.js` を編集
 * - `gulp_port.babel.js` へ別名保存
 */

// --------------------------------------
//  Node / Gulp plugins
// --------------------------------------
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import del from 'del';
// import pngquant from 'imagemin-pngquant';
// import spritesmith from 'gulp.spritesmith';
// import merge from 'merge-stream';

import fs from 'fs';

// --------------------------------------
//  PKG(package.json)
// --------------------------------------
import pkg from './package.json';

// --------------------------------------
//  PORT SETTING
// --------------------------------------
let port;
try {
  port = require('./gulp_port.babel').port;
  // import port from './gulp_port.babel';
} catch (error) {
  // console.warn(error);
  console.warn('*********************************');
  console.warn('*[GULP:SETTING] [404] `gulp_port.babel.js` file not found *');
  console.warn('*[GULP:SETTING] please create `gulp_port.babel.js` *');
  console.warn('*[GULP:SETTING] use default port number: 61000 *');
  console.warn('*********************************');
  port = 61000;
}

// --------------------------------------
//  METHOD
// --------------------------------------
/**
 * directory を read し file list を取得します
 * @param {string} directory path
 * @param {function} resolve success callback
 * @param {function} reject error callback
 */
const read = (directory, resolve, reject) => {
  fs.readdir(directory, (error, fileList) => {
    if (error) {
      console.error(`fs.readdir(${directory}): error: ${error}`);
      return reject(error);
    }
    // no error
    resolve(fileList);
    return fileList;
  });
};

// --------------------------------------
//  CONSTANT
// --------------------------------------
const $ = gulpLoadPlugins();

// plugins
const $$ = {};
$$.reload = browserSync.reload;
$$.browserSync = browserSync;
$$.runSequence = runSequence;
$$.webpack = webpack;
$$.del = del;
// $$.pngquant = pngquant;
// $$.spritesmith = spritesmith;
// $$.merge = merge;
// method
$$.read = read;

// --------------------------------------
//  DIRECTORY
// --------------------------------------
/**
 * 開発ルート(dev)
 * @type {string}
 */
const root = '.';

/**
 * directory object
 * @type {{
 *  root: string,
 *  tmp: ?string,
 *  app: ?object,
 *  sprite: ?object,
 *  scss: ?string,
 *  bower: ?object,
 *  babels: ?object,
 *  scripts: ?object,
 *  dist: ?object
 *  infinite: ?object
 * }}
 */
const dir = {
  root,
  tmp: null,
  app: null,
  sprite: null,
  scss: null,
  bower: null,
  babels: null,
  scripts: null,
  dist: null,
  infinite: null,
  mlb: null,
};

dir.app = {
  root,
};

// babels - infinite
const mlb = `${root}/babels-mlb`;
dir.mlb = {
  src: `${mlb}/src`,
  dependencies: `${mlb}/dependencies`,
  compile: `${mlb}/01_compile`,
  dist: `${mlb}/02_dest`,
  docs: `${mlb}/_docs`,
};

// dist
const sportsbull = '../../public';

dir.dist = {
  root: sportsbull,
  assets: {
    root: `${sportsbull}/assets`,
    mlb: `${sportsbull}/assets/mlb`,
  },
};

// --------------------------------------
//  WEBPACK CONFIG
// --------------------------------------
/**
 * 【＊】プロジェクトごとに書換えのこと
 * webpack 設定
 * @type {{
 *  entry: *,
 *  output: {path: string, publicPath: string, filename: string, chunkFilename: string}
 * }}
 */
const wpk = {
  entry: __dirname,
  output: {
    path: dir.dist.assets.mlb,
    publicPath: 'assets/mlb',
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].bundle.js',
  },
};

// --------------------------------------
//  SASS PREFIX (Browser vendor prefix)
// --------------------------------------
/**
 * 【＊】プロジェクトごとに書換えのこと
 * scss to css, vendor prefix ターゲットブラウザーバージョン
 * @type {[*]}
 */
const AUTO_PREFIX_BROWSERS = [
  'ie >= 11',
  'ie_mob >= 10',
  'ff >= 44',
  'chrome >= 48',
  'safari >= 9',
  'opera >= 34',
  'ios >= 8.4',
  'android >= 4.2',
  'bb >= 10',
];

// --------------------------------------
//  REPLACE PATTERN
// --------------------------------------
/**
 * `@@match` の部分を置換えます
 * @type {[*]}
 */
const patterns = [
  {
    match: 'buildTime',
    replacement: new Date().toLocaleString(),
  },
  {
    match: 'year',
    replacement: new Date().getFullYear(),
  },
  {
    match: 'version',
    replacement: pkg.version,
  },
  {
    match: 'copyright',
    replacement: 'Parachute',
  },
  {
    match: 'nodeEnv',
    replacement: process.env.NODE_ENV || 'development',
  },
];

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// --------------------------------------
//  COMPRESSION
// --------------------------------------
/**
 * 【＊】プロジェクトごとに書換えのこと
 * html / css minify 設定 + 画像圧縮設定
 * @type {{html: ?boolean, css: ?boolean, img: ?object, png: ?object}}
 */
const compress = {
  html: null,
  css: null,
  img: null,
  png: null,
};

// img
/**
 * @type {{optimizationLevel: number, progressive: boolean, interlaced: boolean}}
 * @see https://github.com/imagemin/imagemin-gifsicle
 * @see https://www.npmjs.com/package/imagemin-jpegtran
 * */
compress.img = {
  // gif 圧縮
  // https://github.com/imagemin/imagemin-gifsicle#optimizationlevel
  // default 1
  optimizationLevel: 3,
  // https://github.com/imagemin/imagemin-gifsicle#interlaced
  // default false
  interlaced: false,
  // jpg 圧縮
  // https://www.npmjs.com/package/imagemin-jpegtran#progressive
  // Loss less conversion to progressive.
  // default false
  progressive: false,
};

// png
/**
 * quality 設定するとクラッシュする???
 * @see https://github.com/pornel/pngquant/issues/176
 * @see https://github.com/pornel/pngquant/issues/176#issuecomment-148369516
 * > This is normal.
 * > pngquant was called with min quality 72.
 * > But with 256 colors the resulting quality is just 5 and
 * therefore the required minimum is not met.
 * @type {{speed: number, verbose: boolean}}
 */
compress.png = {
  // quality: 90,
  // https://www.npmjs.com/package/imagemin-pngquant#speed
  // Speed/quality trade-off
  // from 1 (brute-force) to 10 (fastest).
  // Speed 10 has 5% lower quality, but is 8 times faster than the default.
  // default 3
  speed: 3,
  // https://www.npmjs.com/package/imagemin-pngquant#verbose
  // Print verbose status messages.
  // default false
  verbose: true,
};

// html
compress.html = false;

// css
compress.css = true;


// --------------------------------------
//  SERVER (PORT / INDEXES)
// --------------------------------------
const server = {
  port,
  // directory indexes 設定
  indexes: true,
};

// --------------------------------------
//  ENV
// --------------------------------------
// --env production
// 標準入力を取得する - production の時に release build
const env = {
  mode: process.env.NODE_ENV || 'development',
};

// --------------------------------------
//  EXPORT
// --------------------------------------
export const module = {
  gulp,
  $,
  $$,
  dir,
  wpk,
  AUTO_PREFIX_BROWSERS,
  patterns,
  compress,
  server,
  env,
};

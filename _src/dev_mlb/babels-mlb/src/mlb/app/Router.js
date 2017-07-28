/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/21 - 16:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const location = self.location;

/**
 * MLB routing します
 * - index
 *   - `/stats/mlb/`
 *   - `/stats/mlb/YYYYMMDD/`
 * - game
 *   - `/stats/mlb/game/GAME_ID/`
 */
export default class Router {
  /**
   * `/stats/mlb/` | `/stats/mlb/YYYYMMDD/` の解析を行います
   * @param {Array.<string>} directories path directory list
   * @param {{path: ?string, id: *}} game return value
   * @returns {{path: ?string, id: *}} 解析結果を返します
   */
  static index(directories, game) {
    const length = directories.length;
    const state = Object.assign({}, game);
    state.path = 'index';
    if (length === 2) {
      return state;
    } else if (length === 3) {
      const id = directories.pop();
      console.log('Router.index', id, id.match(/\d{8}/));
      // YYYYMMDD check
      if (id.match(/\d{8}/)) {
        state.id = id;
        return state;
      }
      // 不正な形式
      return game;
    }
    // 不正
    return game;
  }
  /**
   * `/stats/mlb/game/GAME_ID` の解析を行います
   * @param {Array.<string>} directories path directory list
   * @param {{path: ?string, id: *}} game return value
   * @returns {{path: ?string, id: *}} 解析結果を返します
   */
  static games(directories, game) {
    if (directories.length !== 4) {
      return game;
    }
    const id = directories.pop();
    // numeric check
    if (id.match(/[^0-9]+/)) {
      // 数値以外にマッチ
      return game;
    }
    // clone します
    const state = Object.assign({}, game);
    state.path = 'game';
    state.id = id;
    return state;
  }
  /**
   * `location.pathname` を解析しページ情報を取得します
   * - path {?string} - index or game
   * - id
   *   - index: {string} YYYYMMDD
   *   - game: {string} GAME ID
   * @returns {{path: ?string, id: *}} routing 情報を返します
   */
  static search() {
    // return value
    const game = {
      path: null,
      id: null,
    };
    // /stats/mlb/ - 両端 `/` あり
    const pathname = location.pathname;
    // /stats/mlb/ チェック
    if (pathname.indexOf('/stats/mlb/') !== 0) {
      return game;
    }
    // `/` で分割します
    const parts = pathname.split('/');
    // 空要素を削除します
    const directories = parts.filter(data => (data !== ''));
    // {boolean} - stats, mlb を含んでいる flag
    // const mlb = directories.indexOf('stats') !== -1 && directories.indexOf('mlb');
    // if (!mlb) {
    //   return game;
    // }
    // ignore path search
    // schedule, standing, leaders, playerlist 除外します
    if (
      directories.indexOf('schedule') !== -1 ||
      directories.indexOf('standing') !== -1 ||
      directories.indexOf('leaders') !== -1 ||
      directories.indexOf('playerlist') !== -1
    ) {
      return game;
    }
    // game
    if (directories.indexOf('game') !== -1) {
      return Router.games(directories, game);
    }
    return Router.index(directories, game);
  }
}

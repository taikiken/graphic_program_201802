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

export default class Router {
  static index(directories, game) {
    const length = directories.length;
    const state = Object.assign({}, game);
    state.path = 'index';
    if (length === 2) {
      return state;
    } else if (length === 3) {
      const id = directories.pop();
      // YYYYMMDD check
      if (id.match(/\d(8)/)) {
        state.id = id;
        return state;
      }
      // 不正な形式
      return game;
    }
    return game;
  }
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
    const state = Object.assign({}, game);
    state.path = 'game';
    state.id = id;
    return state;
  }
  static search() {
    const game = {
      path: null,
      id: null,
    };
    const pathname = location.pathname;
    const parts = pathname.split('/');
    const directories = parts.filter(data => (data !== ''));
    const mlb = directories.indexOf('stats') !== -1 && directories.indexOf('mlb');
    if (!mlb) {
      return game;
    }
    // ignore path search
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

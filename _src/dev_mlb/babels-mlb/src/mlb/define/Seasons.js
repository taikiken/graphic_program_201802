/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/26 - 21:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 試合種類の日本語ラベル
 */
export default class Seasons {
  /**
   * 試合種類の日本語 key name - japanese
   * @type {{open: string, cactus_league: string, grapefruit_league: string, regular_season: string, american: string, national: string, inter_league: string, all_star: string, post_season: string, league_champion: string, world_series: string, division_playoff: string, wild_card: string}}
   */
  static seasons = {
    open: 'オープン戦',
    cactus_league: 'カクタスリーグ',
    grapefruit_league: 'グレープフルーツリーグ',
    regular_season: '公式戦',
    american: 'アメリカンリーグ',
    national: 'ナショナルリーグ',
    inter_league: 'インターリーグ',
    all_star: 'オールスター',
    post_season: 'ポストシーズン',
    league_champion: 'リーグチャンピオンシップ',
    world_series: 'ワールドシリーズ',
    division_playoff: 'ディビジョンプレイオフ',
    wild_card: 'ワイルドカードゲーム',
  };
  /**
   * key name から 日本語 label を取得します
   * @param {string} key JSON key name
   * @returns {string} 日本語 label
   */
  static title(key) {
    return Seasons.seasons[key];
  }
}

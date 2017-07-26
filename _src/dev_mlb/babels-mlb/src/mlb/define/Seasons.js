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

export default class Seasons {
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
  static title(key) {
    return Seasons.seasons[key];
  }
}

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/15 - 18:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import Normalize from '../../util/Normalize';

// dae/player
import DaePitching from '../player/DaePitching';
import DaeBatting from '../player/DaeBatting';

// define
import Status from '../../define/Status';
import Seasons from '../../define/Seasons';
import Style from '../../define/Style';

/**
 * game 毎の日本人選手情報
 */
export class DaeJapanesePlayer {
  /**
   * 日本人選手情報
   * @param {object} player JSON
   */
  constructor(player) {
    const origin = Normalize.obj(player);
    // ---
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 選手 ID
     * @type {number}
     */
    this.id = Normalize.int(origin.id);
    /**
     * 選手名称
     * @type {string}
     */
    this.player = Normalize.str(origin.name);
    /**
     * 所属チーム
     * @type {string}
     */
    this.team = Normalize.str(origin.team_name);
    /**
     * 背番号
     * @type {number}
     */
    this.number = Normalize.int(origin.number);
    /**
     * 打撃成績
     * @type {DaeBatting}
     */
    this.batting = new DaeBatting(origin.batting);
    /**
     * 投球成績
     * @type {DaePitching}
     */
    this.pitching = new DaePitching(origin.pitching);
    /**
     * batting | pitching - 選手タイプ
     * @type {string}
     */
    this.type = this.batting.has ? 'batting' : 'pitching';
  }
}

/**
 * 日本人選手リスト
 * game 毎の選手情報 -> DaeJapanesePlayer - 日本人選手
 */
export class DaeJapanesePlayers {
  /**
   * 日本人選手リスト
   * @param {Array} players JSON
   */
  constructor(players) {
    const origin = Normalize.arr(players);
    // ---
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 日本人選手リスト
     * @type {Array.<DaeJapanesePlayer>}
     */
    this.list = origin.map(player => (new DaeJapanesePlayer(player)));
  }
  /**
   * 日本人選手リストが存在するかを確認します
   * @returns {boolean} true: 存在する
   */
  has() {
    return this.list.length > 0;
  }
}

/**
 * game 毎のチーム別対戦チーム情報
 */
class DaeGameTeam {
  /**
   * game 毎の対戦チーム情報
   * @param {object} team JSON
   */
  constructor(team) {
    const origin = Normalize.obj(team);
    // ---
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 得点
     * @type {number}
     */
    this.score = Normalize.int(origin.score);
    /**
     * チーム ID
     * @type {number}
     */
    this.id = Normalize.int(origin.team_id);
    /**
     * チーム名称
     * @type {string}
     */
    this.team = Normalize.str(origin.team_name);
    /**
     * status: 4 の時の勝敗 flag
     * @type {boolean}
     */
    this.win = false;
    /**
     * status: 4 の時の勝に付与される class name,
     * {@link Style.WIN}
     * @type {string}
     */
    this.className = '';
  }
}

/**
 * game 毎の対戦情報
 */
export class DaeGame {
  /**
   * game 毎の対戦情報
   * @param {object} game JSON
   * @param {string} season season name
   * @param {string} league league name
   * */
  constructor(game, season, league) {
    const origin = Normalize.obj(game);
    const originHome = Normalize.obj(origin.home);
    const originVisitor = Normalize.obj(origin.visitor);
    const status = Normalize.int(origin.status_id);
    const home = new DaeGameTeam(originHome);
    const visitor = new DaeGameTeam(originVisitor);
    // ----
    // ゲーム勝敗をscoreから - 4: 試合終了 のみ
    if (status === 4) {
      if (home.score > visitor.score) {
        home.className = Style.WIN;
        home.win = true;
      } else {
        visitor.className = Style.WIN;
        visitor.win = true;
      }
    }
    // ----
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * game ID
     * @type {number}
     */
    this.id = Normalize.int(origin.game_id);
    /**
     * 球場名
     * @type {string}
     */
    this.stadium = Normalize.str(origin.stadium);
    /**
     * ゲーム status {@link Status}
     * @type {number}
     */
    this.status = status;
    /**
     * ホームチーム
     * @type {DaeGameTeam}
     */
    this.home = home;
    /**
     * ビジターチーム
     * @type {DaeGameTeam}
     */
    this.visitor = visitor;
    /**
     * ゲーム毎の選手情報
     * @type {DaeJapanesePlayers}
     */
    this.players = new DaeJapanesePlayers(origin.player);
    // game status label
    /**
     * game status label - 試合中...etc
     * {@link Status.label}
     * @type {string}
     */
    this.label = Normalize.str(Status.label(status));
    /**
     * game status によって変化する class name
     * {@link Status.className}
     * @type {string}
     */
    this.className = Normalize.str(Status.className(status));
    /**
     * season key name
     * @type {string}
     */
    this.season = season;
    /**
     * league key name
     * @type {string}
     */
    this.league = league;
  }
}

/**
 * game 毎の対戦情報 -> DaeGame
 * - DaeGames
 *   - {@link DaeGame}
 *     - {@link DaeGameTeam}
 *     - {@link DaeJapanesePlayers}
 *       - {@link DaeJapanesePlayer}
 */
export class DaeGames {
  /**
   * game 毎の対戦情報
   * @param {Array} games JSON
   * @param {string} season season key name
   * @param {string} league league key name
   */
  constructor(games, season, league) {
    const origin = Normalize.arr(games);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 対戦情報リスト
     * @type {Array.<DaeGame>}
     */
    this.list = origin.map(game => (new DaeGame(game, season, league)));
    /**
     * season key name
     * @type {string}
     */
    this.season = season;
    /**
     * league key name
     * @type {string}
     */
    this.league = league;
    /**
     * league key name から日本語出力情報をセットします
     * {@link Seasons.title}
     * @type {string}
     */
    this.title = Normalize.str(Seasons.title(league));
  }
  /**
   * 対戦ゲームが存在するかを確認します
   * @returns {boolean} true: 対戦ゲームが存在する
   */
  has() {
    return this.list.length > 0;
  }
}

/**
 * 日本人選手成績リストを作成します
 */
export class DaeJapanese {
  /**
   * 日本人選手成績リスト
   * @param {Array} japanese JSON
   */
  constructor(japanese) {
    const origin = Normalize.arr(japanese);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 日本人選手成績リスト
     * @type {Array.<DaeGame>}
     */
    this.list = origin.map(game => (new DaeGame(game)));
  }
  /**
   * 日本人選手リストが存在するかをチェックします
   * @returns {boolean} true: 日本人選手リストが存在する
   */
  has() {
    return this.list.length > 0;
  }
}

// season 管理
/**
 * 各リーグ試合情報を管理します
 */
export class DaeLeagues {
  /**
   * 各リーグ試合情報を管理します
   * @param {string} key JSON key name ex. `regular_season`
   * @param {Array.<DaeGames>} seasons 各リーグ試合情報
   */
  constructor(key, seasons) {
    /**
     * JSON key name - regular_season...etc
     * @type {string}
     */
    this.key = key;
    /**
     * 各リーグ試合情報
     * @type {Array.<DaeGames>}
     */
    this.list = seasons;
    /**
     * key name からシーズン日本語タイトル {@link Seasons.title}
     * @type {string}
     */
    this.title = Normalize.str(Seasons.title(key));
    /**
     * 試合情報存在 flag
     * @type {boolean}
     */
    this.enable = seasons.some(games => (games.list.length > 0));
  }
  /**
   * 試合が存在するかを取得します
   * @returns {boolean} true: 試合が存在する
   */
  has() {
    return this.list.some(games => (games.list.length));
  }
}

/**
 * シーズン情報を管理します
 */
export class DaeSeasons {
  /**
   * シーズン付属のリーグ情報を管理します
   * @param {Array.<DaeGames>} open オープン戦
   * @param {Array.<DaeGames>} regular レギュラーシーズン
   * @param {Array.<DaeGames>} star オールスター
   * @param {Array.<DaeGames>} post ポストシーズン
   */
  constructor(open, regular, star, post) {
    /**
     * シーズン JSON key 毎にリーグ情報を管理します
     * @type {{open: DaeLeagues, regular_season: DaeLeagues, all_star: DaeLeagues, post_season: DaeLeagues}}
     */
    this.season = {
      open: new DaeLeagues('open', open),
      regular_season: new DaeLeagues('regular_season', regular),
      all_star: new DaeLeagues('all_star', star),
      post_season: new DaeLeagues('post_season', post),
    };
    /**
     * 表示順を管理します
     * - open'
     * - 'regular_season'
     * - 'all_star'
     * - 'post_season'
     * @type {[string,string,string,string]}
     */
    this.list = [
      'open',
      'regular_season',
      'all_star',
      'post_season',
    ];
  }
  /**
   * シーズン JSON key からリーグ情報を取得します
   * @param {string} season シーズン JSON key
   * @returns {?DaeGames} リーグ情報を返します
   */
  leagues(season) {
    return this.season[season];
  }
}

// スケジュール JSON
/**
 * `master/schedule/YYYYMMDD.json` - スケジュール JSON
 * 指定した日付の試合スケジュールを返却します。
 * ア・リーグ、ナ・リーグ両方の情報を含んでいます。
 * 日程結果ページで使用される想定です。
 *
 * スタッツジャパンからスケジュール情報が更新された際にjsonも更新されます。
 * 日に一回更新ということですが、現状詳細な時間までわかっていません。
 *
 * スケジュール JSON -> 試合情報json - game_info.json
 * スケジュール JSON -> チーム情報json - team_info.json
 * スケジュール JSON -> メンバー情報json - member_info.json - 出場成績画面
 * 【試合終了以外】
 * スケジュール JSON -> イニング情報json - innings.json - イニング速報画面
 * @see https://aws-plus.backlog.jp/wiki/UNDO_MLBSTATS/%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%2Fjson%2F%E8%A9%A6%E5%90%88%E6%97%A5%E7%A8%8Bjson
 */
export default class DaeSchedule {
  /**
   * スケジュール JSON をパースし使用し易いように加工します
   * @param {object} schedules `master/schedule/YYYYMMDD.json` - スケジュール JSON
   */
  constructor(schedules) {
    const origin = Normalize.obj(schedules);
    const schedule = Normalize.obj(origin.schedule);
    const regular = Normalize.obj(schedule.regular_season);
    const open = Normalize.obj(schedule.open);
    const post = Normalize.obj(schedule.post_season);
    // regular
    const inter = new DaeGames(regular.inter_league, 'regular_season', 'inter_league');
    const american = new DaeGames(regular.american, 'regular_season', 'american');
    const national = new DaeGames(regular.national, 'regular_season', 'national');
    // open
    const cactus = new DaeGames(open.cactus_league, 'open', 'cactus_league');
    const grapefruit = new DaeGames(open.grapefruit_league, 'open', 'grapefruit_league');
    // post
    const wild = new DaeGames(post.wild_card, 'post_season', 'wild_card');
    const playoff = new DaeGames(post.division_playoff, 'post_season', 'division_playoff');
    const champion = new DaeGames(post.league_champion, 'post_season', 'league_champion');
    const world = new DaeGames(post.world_series, 'post_season', 'world_series');
    // all star
    const star = new DaeGames(schedule.all_star, 'all_star', 'all_star');
    // 日付
    const date = Normalize.str(origin.play_date);
    // schedule
    /**
     * スケジュール JSON original
     * @type {*}
     */
    this.origin = origin;
    /**
     * 試合日 YYYYMMDD
     * @type {*}
     */
    this.date = date;
    /**
     * 試合年 YYYY
     * @type {string}
     */
    this.year = date.substr(0, 4);
    // 試合種別毎
    // /**
    //  * ゲーム情報 -  inter league
    //  * @type {DaeGames}
    //  */
    // this.inter = inter;
    // /**
    //  * ゲーム情報 -  american league
    //  * @type {DaeGames}
    //  */
    // this.american = american;
    // /**
    //  * ゲーム情報 -  national league
    //  * @type {DaeGames}
    //  */
    // this.national = national;
    // 日本人選手
    /**
     * 試合に出場した日本人選手
     * @type {DaeJapanese}
     */
    this.japanese = new DaeJapanese(origin.japanese_players);
    // seasons
    // this.cactus = cactus;
    // this.grapefruit = grapefruit;
    /**
     * regular season list
     * @type {Array.<DaeGames>}
     */
    this.regular = [
      american,
      national,
      inter,
    ];
    /**
     * オープン戦 list
     * @type {Array.<DaeGames>}
     */
    this.open = [
      cactus,
      grapefruit,
    ];
    /**
     * post season list
     * @type {Array.<DaeGames>}
     */
    this.post = [
      wild,
      playoff,
      champion,
      world,
    ];
    /**
     * all star list - 他と処理を合わせるために配列化しています
     * @type {Array.<DaeGames>}
     */
    this.star = [
      star,
    ];
    // this.season = {
    //   open: this.open,
    //   regular_season: this.regular,
    //   all_star: this.star,
    //   post_season: this.post,
    // };
    // this.season = {
    //   open: new DaeSeason('open', this.open),
    //   regular_season: new DaeSeason('regular_season', this.regular),
    //   all_star: new DaeSeason('all_star', this.star),
    //   post_season: new DaeSeason('post_season', this.post),
    // };
    // this.seasons = [
    //   'open',
    //   'regular_season',
    //   'all_star',
    //   'post_season',
    // ];
    /**
     * season 情報を管理します
     * - regular season
     * - post season
     * - オープン戦
     * - all star
     * @type {DaeSeasons}
     */
    this.seasons = new DaeSeasons(this.open, this.regular, this.star, this.post);
  }
}

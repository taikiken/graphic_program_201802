/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// dae
import DaeInnings, { DaeEvent, DaeInningTeam } from '../../../dae/games/DaeInnings';
import DaeGameInfo from '../../../dae/games/DaeGameInfo';

// util
import Print from '../../../util/Print';


// ----------------------------------------
// イニング速報・イベント一覧・攻撃リスト
// ----------------------------------------
/**
 * イニング速報・イベント一覧・攻撃リスト
 * - 相手側スコアを `info` から取得します
 * `info.[home|visitor].board.scores.score[inning].total`
 * - visitor 攻撃時の home スコアは 1 回前を表示します
 * @param {DaeEvent} event イベント情報
 * @param {string} type home|visitor
 * @param {DaeGameInfo} info ゲーム情報
 * @param {number} inning 表示該当回
 * @returns {XML} tbody > tr
 * @constructor
 */
const ComInningsBody = ({ event, type, info, inning }) => {
  let homeScore = '';
  let visitorScore = '';
  if (type === 'home') {
    homeScore = Print.int(event.score);
    visitorScore = info.visitor.board.scores.score[inning].total;
  } else if (type === 'visitor') {
    visitorScore = Print.int(event.score);
    if (inning === 1) {
      homeScore = '0';
    } else {
      homeScore = info.home.board.scores.score[inning - 1].total;
    }
  }
  return (
    <tbody>
      <tr className={`body-${event.id}`}>
        <td className="mlb_live__inning__td--lineup">
          <span>{Print.int(event.index)}</span>
        </td>
        <td className="mlb_live__inning__td--play">
          <span className="mlb_live__inning__player">
            {Print.str(event.batter)}
          </span>
          <span className="mlb_live__inning__action">
            {Print.str(event.result)}
          </span>
        </td>
        <td className="mlb_live__inning__td--out">
          {Print.int(event.out)}
        </td>
        <td className="mlb_live__inning__td--score--home">{homeScore}</td>
        <td className="mlb_live__inning__td--score--visitor">{visitorScore}</td>
      </tr>
    </tbody>
  );
};

/**
 * propTypes
 * @type {{event: DaeEvent, type: string, info: DaeGameInfo, inning: number}}
 */
ComInningsBody.propTypes = {
  event: PropTypes.instanceOf(DaeEvent).isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  inning: PropTypes.number.isRequired,
};

// ----------------------------------------
// イニング速報・イベント一覧・投手名
// ----------------------------------------
/**
 * イニング速報・イベント一覧・投手名 - thead
 * @param {string} pitcher 投手名
 * @param {string} id event id
 * @param {DaeEvent} event イベント情報
 * @returns {XML} thead
 * @constructor
 */
const ComInningsHead = ({ pitcher, id, event }) => (
  <thead className={id} data-result={event.result}>
    <tr>
      <th className="mlb_live__inning__th--pitcher" colSpan={2}>
        ピッチャー
        <span className="mlb_live__inning__pitcher_name">
          {Print.str(pitcher)}
        </span>
      </th>
      <th className="mlb_live__inning__th--out">アウト</th>
      <th className="mlb_live__inning__th--score" colSpan={2}>スコア</th>
    </tr>
  </thead>
);

/**
 * propTypes
 * @type {{pitcher: string, id: string, event: DaeEvent}}
 */
ComInningsHead.propTypes = {
  pitcher: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  event: PropTypes.instanceOf(DaeEvent).isRequired,
};

// ----------------------------------------
// イニング速報・イベント一覧 thead / tbody 親
// ----------------------------------------
/**
 * {@link ComInningsHead} 作成します
 * 投手名を `thead` 作成し攻撃タイトルにします
 * @param {number} inning 表示該当回
 * @param {DaeEvent} event イベント情報
 * @param {string} pitcher 投手名
 * @param {number} count ユニークキー生成に使用する index
 * @returns {XML} {@link ComInningsHead}
 */
const inningsHead = (inning, event, pitcher, count) => (
  <ComInningsHead
    key={`head-${inning}-${event.id}-${count}`}
    pitcher={pitcher}
    id={event.id}
    event={event}
  />
);

/**
 * {@link ComInningsBody} を作成します
 * `tbody` 攻撃一覧を出力します
 * @param {number} inning 表示該当回
 * @param {DaeEvent} event イベント情報
 * @param {string} type home|visitor
 * @param {DaeGameInfo} info ゲーム情報 - 相手側のスコア表示に使用します
 * @param {number} count ユニークキー生成に使用する index
 * @returns {XML} {@link ComInningsBody}
 */
const inningsBody = (inning, event, type, info, count) => (
  <ComInningsBody
    key={`body-${inning}-${event.id}-${count}`}
    event={event}
    type={type}
    info={info}
    inning={inning}
  />
);

/**
 * 回別・チーム別・投手毎にタイトル
 * - 9回から1回
 * - 3 out から 0 out
 * @param {string} type home|visitor
 * @param {DaeInningTeam} team 各チームのイベント情報
 * @param {number} inning 表示該当回
 * @param {DaeGameInfo} info ゲーム情報
 * @returns {XML} div.mlb_live__inning__container > table
 * @constructor
 */
const ComInningsEvent = ({ type, team, inning, info }) => {
  // home team データチェックを追加します - 2017-08-17
  if (
    type === 'home' && (
      !info.home ||
      !info.home.board ||
      !info.home.board.scores ||
      !info.home.board.scores.score ||
      !info.home.board.scores.score[inning] ||
      !info.home.board.scores.score[inning].score
    )
  ) {
    return null;
  }
  // 最終回で home team の攻撃が無い時は出力しません
  if (
    type === 'home' &&
    inning === info.innings &&
    info.home.win &&
    info.home.board.scores.score[inning].score === 0
  ) {
    return null;
  }
  // ---------------------------------------------
  // 出力あり
  let pitcher = '';
  return (
    <div className={`mlb_live__inning__container mlb_live__inning--${type}`}>
      <h2 className="mlb_live__inning__heading">
        {Print.str(team.title)}
      </h2>
      <table className="mlb_live__inning">
        {
          team.events.opposite.map((event, index) => {
            // unique key 生成に使用します
            const count = index + 1;
            // @type {Array.<?XML>} 出力 component をリストします
            const elements = [];
            // 投手名が前回と違ったら `thead` を出力します
            if (event.pitcher && event.pitcher !== pitcher) {
              pitcher = event.pitcher;
              elements.push(inningsHead(inning, event, pitcher, count));
            }
            // 打者情報が無い場合あり - skip します
            if (event.batter) {
              elements.push(inningsBody(inning, event, type, info, count));
            }
            // elements が空の時は `null` 追加します - 何か出力しないとなので
            if (!elements.length) {
              elements.push(null);
            }
            // 出力ループを実行します
            return elements.map(element => (element));
          })
        }
      </table>
    </div>
  );
};

/**
 * propTypes
 * @type {{type: string, team: DaeInningTeam, inning: number, info: DaeGameInfo}}
 */
ComInningsEvent.propTypes = {
  type: PropTypes.string.isRequired,
  team: PropTypes.instanceOf(DaeInningTeam).isRequired,
  inning: PropTypes.number.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// イニング速報・イベント一覧
// ----------------------------------------
/**
 * イニング速報・イベント一覧
 * - ComInningsEvents
 *   - {@link ComInningsEvent}
 * @param {{home: DaeInningTeam, visitor: DaeInningTeam}} events home / visitor イベント情報
 * @param {number} inning 表示該当回
 * @param {DaeGameInfo} info ゲーム情報
 * @returns {XML} div > {@link ComInningsEvent}
 * @constructor
 */
const ComInningsEvents = ({ events, inning, info }) => {
  // home -> visitor
  // 3out -> 0out
  const home = events.home;
  const visitor = events.visitor;
  return (
    <div className="js-events-container">
      <ComInningsEvent
        type="home"
        team={home}
        inning={inning}
        info={info}
      />
      <ComInningsEvent
        type="visitor"
        team={visitor}
        inning={inning}
        info={info}
      />
    </div>
  );
};

/**
 * propTypes
 * @type {{events: {home: DaeInningTeam, visitor: DaeInningTeam}, inning: number, info: DaeGameInfo}}
 */
ComInningsEvents.propTypes = {
  events: PropTypes.shape({
    home: PropTypes.instanceOf(DaeInningTeam).isRequired,
    visitor: PropTypes.instanceOf(DaeInningTeam).isRequired,
  }).isRequired,
  inning: PropTypes.number.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// イニング速報
// ----------------------------------------
/**
 * インイング速報・親コンテナ
 * - {@link ComInningsEvents}
 * @param {DaeInnings} innings innings.json
 * @param {DaeGameInfo} info game_info.json
 * @returns {XML} div.mlb_live__inning__section > {@link ComInningsEvents}
 * @constructor
 */
const ComInning = ({ innings, info }) => {
  const events = innings.opposite;
  console.log('ComInning events', innings, events);
  // render
  return (
    <div className="mlb_live__inning__section">
      {
        events.map(inning => (
          <ComInningsEvents
            key={`innings-${inning}`}
            events={innings.board[inning]}
            inning={inning}
            info={info}
          />
        ))
      }
    </div>
  );
};

/**
 * propTypes
 * @type {{innings: DaeInnings, info: DaeGameInfo}}
 */
ComInning.propTypes = {
  innings: PropTypes.instanceOf(DaeInnings).isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

export default ComInning;

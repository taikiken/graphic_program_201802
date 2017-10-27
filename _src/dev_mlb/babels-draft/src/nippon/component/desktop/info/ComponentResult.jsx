/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/20 - 0:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';
//
// // react
// const React = self.React;

import React from 'react';
import PropTypes from 'prop-types';

// dae
import Result from '../../../dae/nippon/game/Result';
import Team from '../../../dae/nippon/Team';
import Pitcher from '../../../dae/nippon/game/Pitcher';
import Homer from '../../../dae/nippon/team/Homer';

// ----------------------------------------
// ホームラン

/**
 * ホームラン table - rowSpan option を出力
 * @param {boolean} top tr 行の上下, true: 上 - 上側に `rowspan` attribute 付与します
 * @param {number} rowSpan rowSpan option number
 * @returns {?XML} th[rowSpan=(1|2)]
 */
const homerRowSpan = (top, rowSpan) => {
  const title = '本塁打';
  if (top) {
    // 上側
    if (rowSpan === 1) {
      // 敗者ホームランなし
      return (
        <th>{title}</th>
      );
    } else if (rowSpan === 2) {
      // 敗者ホームランあり
      return (
        <th rowSpan="2">{title}</th>
      );
    }
  } else if (rowSpan === 1) {
    // 下側で 勝者ホームランあり
    return (
      <th>{title}</th>
    );
  }
  return null;
};

/**
 * ホームラン - 成績表示
 * @param {Homer} homer ホームランデータ
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} div.react-homer-record-root
 * @constructor
 */
const ComHomerRecord = ({ homer, noRecords }) => {
  if (noRecords) {
    return null;
  }
  return (
    <span className="react-homer-record-root">
      {homer.total}号({homer.inning}{homer.shotText})
    </span>
  );
};

/**
 * React.propTypes
 * @type {{
 *    homer: Homer,
 *    noRecords: boolean
 * }}
 */
ComHomerRecord.propTypes = {
  homer: PropTypes.instanceOf(Homer).isRequired,
  noRecords: PropTypes.bool.isRequired,
};

/**
 * ホームラン - tr.team or null
 * @param {boolean} top tr 行の上下, true: 上
 * @param {number} rowSpan rowSpan option number[0|1|2], 1 or 2 の時に th 出力
 * @param {Array<Homer>} homers ホームラン
 * @param {number} teamId チームID
 * @param {string} teamName チーム名ショート
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} tr.team
 * @constructor
 */
const ComHomer = ({ top, rowSpan, homers, teamId, teamName, noRecords }) => {
  if (homers.length === 0) {
    return null;
  }
  return (
    <tr className={`team team-${teamId}`}>
      {homerRowSpan(top, rowSpan)}
      <td>
        <span className="team">［{teamName}］</span>
        {
          homers.map((homer, index) => {
            const key = `homer-${teamId}`;
            const comma = index > 0 ? ' 、' : '';
            return (
              <span key={key} className="homer-root">
                {comma}
                <span className="name">{homer.nameS}</span>
                <ComHomerRecord
                  homer={homer}
                  noRecords={noRecords}
                />
              </span>
            );
          })
        }
      </td>
    </tr>
  );
};

/**
 * React.propTypes
 * @type {{
 *    top: boolean,
 *    rowSpan: number,
 *    homers: Array<Homer>,
 *    teamId: number,
 *    teamName: string,
 *    noRecords: boolean
 * }}
 */
ComHomer.propTypes = {
  top: PropTypes.bool.isRequired,
  rowSpan: PropTypes.number.isRequired,
  homers: PropTypes.arrayOf(PropTypes.instanceOf(Homer)).isRequired,
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  noRecords: PropTypes.bool.isRequired,
};

/**
 * ホームラン table
 * @param {number} count win, loose 合計のホームラン数
 * @param {Array<Homer>} winnerHomers 勝者 ホームラン
 * @param {Array<Homer>} loserHomers 敗者 ホームラン
 * @param {Team} winner 勝者
 * @param {Team} loser 敗者
 * @param {number} winnerId 勝者 チームID
 * @param {number} loserId 敗者 チームID
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} table.result-table-homer
 * @constructor
 */
const ComHomers = (
  { count, winnerHomers, loserHomers, winner, loser, winnerId, loserId, noRecords },
) => {
  if (count === 0) {
    return null;
  }
  // th rowSpan option, @default 0
  let rowSpan = 0;
  // 勝利・敗戦チームごとにホームランがあれば加算します
  if (winnerHomers.length > 0) {
    rowSpan += 1;
  }
  if (loserHomers.length > 0) {
    rowSpan += 1;
  }
  // ---
  return (
    <table className="result-table-homer">
      <tbody>
        {/* winner */}
        <ComHomer
          top
          rowSpan={rowSpan}
          homers={winnerHomers}
          teamId={winnerId}
          teamName={winner.info.nameS}
          noRecords={noRecords}
        />
        {/* loser */}
        <ComHomer
          top={false}
          rowSpan={rowSpan}
          homers={loserHomers}
          teamId={loserId}
          teamName={loser.info.nameS}
          noRecords={noRecords}
        />
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    count: number,
 *    winnerHomers: Array.<Homer>,
 *    loserHomers: Array.<Homer>,
 *    winner: Team,
 *    loser: Team,
 *    winnerId: number,
 *    loserId: number,
 *    noRecords: boolean
 * }}
 */
ComHomers.propTypes = {
  count: PropTypes.number.isRequired,
  winnerHomers: PropTypes.arrayOf(PropTypes.instanceOf(Homer)).isRequired,
  loserHomers: PropTypes.arrayOf(PropTypes.instanceOf(Homer)).isRequired,
  winner: PropTypes.instanceOf(Team).isRequired,
  loser: PropTypes.instanceOf(Team).isRequired,
  winnerId: PropTypes.number.isRequired,
  loserId: PropTypes.number.isRequired,
  noRecords: PropTypes.bool.isRequired,
};

// ----------------------------------------
// 投手
/**
 * 責任投手戦績
 * @param {Pitcher} pitcher ピッチャー
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} span.react-record-root
 * @constructor
 */
const ComPitcherRecord = ({ pitcher, noRecords }) => {
  if (noRecords) {
    return null;
  }
  return (
    <span className="react-pitcher-record-root">
      ({pitcher.win}勝{pitcher.lose}敗{pitcher.save}S)
    </span>
  );
};

/**
 * React.propType
 * @type {{
 *   pitcher: Pitcher,
 *   noRecords: boolean
 * }}
 */
ComPitcherRecord.propTypes = {
  pitcher: PropTypes.instanceOf(Pitcher).isRequired,
  noRecords: PropTypes.bool.isRequired,
};

/**
 * tr: 責任投手
 * @param {Pitcher} pitcher ピッチャー
 * @param {string} title 日本語, 勝利投手 / 敗戦投手 / セーブ
 * @param {number} teamId チームID
 * @param {string} teamName チーム名
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} tr.team
 * @constructor
 */
const ComPitcher = ({ pitcher, title, teamId, teamName, noRecords }) => {
  if (!pitcher.has || !pitcher.nameS) {
    return null;
  }
  return (
    <tr className={`team team-${teamId}`}>
      <th>{title}</th>
      <td>
        <span className="team">［{teamName}］</span>
        <span className="name">{pitcher.nameS}</span>
        <ComPitcherRecord
          pitcher={pitcher}
          noRecords={noRecords}
        />
      </td>
    </tr>
  );
};

/**
 * React.propType
 * @type {{
 *    pitcher: Pitcher,
 *    title: string,
 *    teamId: number,
 *    teamName: string,
 *    noRecords: boolean
 * }}
 */
ComPitcher.propTypes = {
  pitcher: PropTypes.instanceOf(Pitcher).isRequired,
  title: PropTypes.string.isRequired,
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  noRecords: PropTypes.bool.isRequired,
};

/**
 * table: 責任投手 - 引き分け - 出力しない
 * @param {number} winTeam Result.winTeam,  0=ビジター、1=ホーム、2=引き分け
 * @param {Result} result JSON.response.Result
 * @param {Team} winner 勝者
 * @param {Team} loser 敗者
 * @param {number} winnerId 勝者 チームID
 * @param {number} loserId 敗者 チームID
 * @param {bool} noRecords 注釈出力 flag - false: output
 * @returns {?XML} table.result-table-pitcher
 * @constructor
 */
const ComPitchers = ({ winTeam, result, winner, loser, winnerId, loserId, noRecords }) => {
  // 2: 引き分け - 出力しない
  if (winTeam === 2) {
    return null;
  }
  // output
  return (
    <table className="result-table-pitcher">
      <tbody>
        {/* win */}
        <ComPitcher
          pitcher={result.win}
          title="勝利投手"
          teamId={winnerId}
          teamName={winner.info.nameS}
          noRecords={noRecords}
        />
        {/* loose */}
        <ComPitcher
          pitcher={result.lose}
          title="敗戦投手"
          teamId={loserId}
          teamName={loser.info.nameS}
          noRecords={noRecords}
        />
        {/* save */}
        <ComPitcher
          pitcher={result.save}
          title="セーブ"
          teamId={winnerId}
          teamName={winner.info.nameS}
          noRecords={noRecords}
        />
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    winTeam: number,
 *    result: Result,
 *    winner: Team,
 *    loser: Team,
 *    winnerId: number,
 *    loserId: number,
 *    noRecords: boolean
 * }}
 */
ComPitchers.propTypes = {
  winTeam: PropTypes.number.isRequired,
  result: PropTypes.instanceOf(Result).isRequired,
  winner: PropTypes.instanceOf(Team).isRequired,
  loser: PropTypes.instanceOf(Team).isRequired,
  winnerId: PropTypes.number.isRequired,
  loserId: PropTypes.number.isRequired,
  noRecords: PropTypes.bool.isRequired,
};

// ----------------------------------------
// title
/**
 * ホームランタイトル文字
 * @param {number} count ホームラン数
 * @return {string} ホームランタイトル文字
 */
const homerTitle = count => (count > 0 ? '本塁打' : '');

/**
 * ピッチャータイトル文字
 * @param {number} winTeam Result.winTeam,  0=ビジター、1=ホーム、2=引き分け
 * @param {boolean} resultHas result に責任投手データが存在する真偽値
 * @return {string} ピッチャータイトル文字
 */
const pitcherTitle = (winTeam, resultHas) => (winTeam !== 2 && resultHas ? '責任投手' : '');


// ----------------------------------------
/**
 * 試合結果を出力します
 * @param {Result} result JSON result
 * @param {Team} winner 勝利チーム
 * @param {Team} loser 敗戦チーム
 * @param {boolean} noRecords 注釈出力 flag, false: 出力します
 * @returns {?XML} section.result
 * @constructor
 */
const ComponentResult = ({ result, winner, loser, noRecords }) => {
  // homer
  const winnerHomers = winner.homers.homers;
  const loserHomers = loser.homers.homers;
  const count = winnerHomers.length + loserHomers.length;
  // result の責任投手データがなくホームランがなかったら出力しない
  if (!result.has && count === 0) {
    return null;
  }
  // win team
  const winTeam = result.winTeam;
  // winTeamが存在しなかったら出力しない
  if (!winTeam) {
    return null;
  }
  // 引き分けでホームランがなかったら出力しない
  if (winTeam === 2 && count === 0) {
    return null;
  }
  // title
  const title = {
    pitcher: pitcherTitle(winTeam, result.has),
    homer: homerTitle(count),
  };
  const slash = title.pitcher && title.homer ? '/' : '';
  // id
  const winnerId = winner.info.id;
  const loserId = loser.info.id;
  // output
  return (
    <section className="result">
      <header className="flashreport-sec-header">
        <h2>{title.pitcher}{slash}{title.homer}</h2>
      </header>
      <div className="result-body">
        {/* 責任投手 */}
        <ComPitchers
          winTeam={winTeam}
          result={result}
          winner={winner}
          loser={loser}
          winnerId={winnerId}
          loserId={loserId}
          noRecords={noRecords}
        />
        {/* ホームラン */}
        <ComHomers
          count={count}
          winnerHomers={winnerHomers}
          loserHomers={loserHomers}
          winner={winner}
          loser={loser}
          winnerId={winnerId}
          loserId={loserId}
          noRecords={noRecords}
        />
      </div>
    </section>
  );
};

/**
 * React.propTypes
 * @type {{
 *    result: Result,
 *    winner: Team,
 *    loser: Team,
 *    noRecords: boolean
 *  }}
 */
ComponentResult.propTypes = {
  // @type {Result}
  result: PropTypes.instanceOf(Result).isRequired,
  // @type {Team}
  winner: PropTypes.instanceOf(Team).isRequired,
  // @type {Team}
  loser: PropTypes.instanceOf(Team).isRequired,
  // 戦績を表示するかしないか - @default false
  noRecords: PropTypes.bool.isRequired,
};

export default ComponentResult;

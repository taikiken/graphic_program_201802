/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/20 - 17:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// moku/util
import List from '../../../../moku/util/List';

// dae
import Team from '../../../dae/nippon/Team';

/**
 * SP スコアボード、延長は切替表示可能にします
 * @param {Team} home home team
 * @param {Team} visitor visitor team
 * @param {boolean} extra 延長表示する flag
 * @param {boolean} show 表示する flag
 * @returns {?XML} table > tr.scoreboard-header
 * @constructor
 */
const SPComponentScoreboardTable = ({ home, visitor, extra, show }) => {
  if (!show) {
    return null;
  }
  // output
  // 表示イニングを計算する, 9を確保
  const count = Math.max(home.score.inningCount, visitor.score.inningCount, 9);
  if (extra && count <= 9) {
    return null;
  }
  // count 分の配列を作成しスコアボード出力に使用します
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  // const innings = new Array(9).fill(0);
  // Android 標準ブラウザがエラーになるので代替手段を考えた
  const innings = List.fill(9, 0);
  const no = extra ? 10 : 1;
  // ----
  return (
    <table>
      <tbody>
        {/* inning */}
        <tr className="scoreboard-header">
          {
            innings.map((data, index) => {
              const inning = index + no;
              return (
                <th key={`inning-${inning}`} scope="col">
                  {inning}
                </th>
              );
            })
          }
          <th scope="col">計</th>
          <th scope="col">安</th>
          <th scope="col">失</th>
        </tr>
        {/* visitor */}
        <tr className="visitor">
          {
            innings.map((data, index) => {
              const inning = index + no;
              return (
                <td key={`visitor-inning-${inning}`}>
                  {visitor.score.getScore(inning)}
                </td>
              );
            })
          }
          <td className="total">{visitor.score.total}</td>
          <td className="hit">{visitor.score.hit}</td>
          <td className="error">{visitor.score.error}</td>
        </tr>
        {/* home */}
        <tr className="home">
          {
            innings.map((data, index) => {
              const inning = index + no;
              return (
                <td key={`home-inning-${inning}`}>
                  {home.score.getScore(inning)}
                </td>
              );
            })
          }
          <td className="total">{home.score.total}</td>
          <td className="hit">{home.score.hit}</td>
          <td className="error">{home.score.error}</td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    home: Team,
 *    visitor: Team,
 *    extra: boolean,
 *    show: boolean
 * }}
 */
SPComponentScoreboardTable.propTypes = {
  // @type {Team} - response.home
  home: PropTypes.instanceOf(Team).isRequired,
  // @type {Team} - response.visitor
  visitor: PropTypes.instanceOf(Team).isRequired,
  // 延長戦用かの真偽値
  extra: PropTypes.bool.isRequired,
  // 表示・非表示 フラッグ
  show: PropTypes.bool.isRequired,
};

export default SPComponentScoreboardTable;

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 20:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as List } from '../../util/List';
//
// // react
// const React = self.React;

import React from 'react';
import PropTypes from 'prop-types';

// moku/util
import List from '../../../../moku/util/List';

// dae
import Team from '../../../dae/nippon/Team';

/**
 * div.scoreboard, スコアボードを出力します
 * @param {Team} home data.nippon.Team
 * @param {Team} visitor data.nippon.Team
 * @returns {XML} div.scoreboard
 * @constructor
 */
const ComponentScoreboard = ({ home, visitor }) => {
  // output
  // 表示イニングを計算する, 9を確保
  const count = Math.max(home.score.inningCount, visitor.score.inningCount, 9);
  // count 分の配列を作成しスコアボード出力に使用します
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
  // const innings = new Array(count).fill(0);
  // Android 標準ブラウザがエラーになるので代替手段を考えた
  const innings = List.fill(count, 0);
  return (
    <div className="scoreboard">
      <table>
        <tbody>
          {/* inning */}
          <tr className="scoreboard-header">
            <th scope="col">&nbsp;</th>
            {
              innings.map((data, index) => {
                const inning = index + 1;
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
            <th className={`team team-${visitor.info.id}`} scope="row">{visitor.info.nameS}</th>
            {
              innings.map((data, index) => {
                const inning = index + 1;
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
            <th className={`team team-${home.info.id}`} scope="row">{home.info.nameS}</th>
            {
              innings.map((data, index) => {
                const inning = index + 1;
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
    </div>
  );
};

/**
 * React.propTypes
 * @type {{
 *    home: Team,
 *    visitor: Team
 * }}
 */
ComponentScoreboard.propTypes = {
  home: PropTypes.instanceOf(Team).isRequired,
  visitor: PropTypes.instanceOf(Team).isRequired,
};

export default ComponentScoreboard;

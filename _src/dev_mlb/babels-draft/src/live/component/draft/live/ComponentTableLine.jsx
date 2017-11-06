/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/13 - 22:12
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

// moku/util
import Type from '../../../../moku/util/Type';

// cell
import ComponentTableCellPlayer from './ComponentTableCellPlayer';
import ComponentTableCellRank from './ComponentTableCellRank';

// dae
import Players from '../../../dae/lives/Players';

/**
 * span.blank
 * @constructor
 * @returns {XML} span.blank
 */
const ComponentBlank = () => (
  <span className="blank">
    &nbsp;
  </span>
);

/**
 * 指名順の tr 相当を出力します、支配下選手 2位以降と育成枠選手
 * ```
 *  p.rank-N
 *    <ComponentTableCellRank>
 *    <ComponentTableCellPlayer>
 *    <ComponentTableCellPlayer>
 *    ...
 * ```
 * @param {number} orderNo line number: nominate orderNo と同じ
 * @param {Array.<number>} teamOrder team ID を出力順に並べた配列
 * @param {Array.<Player>} nominates nominate 選手
 * @param {boolean} roster 支配下選手 flag
 * @param {boolean} [rankOutput=true] rank 出力 flag
 * @returns {XML} p.rank-{orderNo}
 * @constructor
 */
const ComponentTableLine = ({ orderNo, teamOrder, nominates, roster, rankOutput }) => {
  // console.log('ComponentTableLine nominates', nominates);
  const rosterTxt = roster ? 'roster' : 'development';
  return (
    <p className={`rank-${orderNo}`}>
      {/* rank */}
      <ComponentTableCellRank
        rank={orderNo}
        development={!roster}
        rankOutput={rankOutput}
      />
      {/* players */}
      {
        teamOrder.map((teamId) => {
          const players = nominates[teamId];
          if (!Type.exist(players)) {
            return (
              <ComponentBlank
                key={`${rosterTxt}-player-blank-${teamId}`}
              />
            );
          }
          // 支配化選手1位のさらに詳細化したデータが players[0] ないので...
          const playerObject = players[0] || players;
          if (!Type.exist(playerObject)) {
            return (
              <ComponentBlank
                key={`${rosterTxt}-player-blank-${teamId}`}
              />
            );
          }
          const player = playerObject.player;
          // console.log('player', player.positionSlug, player.identity, player);
          return (
            <ComponentTableCellPlayer
              key={`player-${player.info.teamId}-${player.id}`}
              player={player}
              position={player.positionSlug}
              identity={player.identity}
            />
          );
        })
      }
    </p>
  );
};

/**
 * React.propTypes
 * @type {{
 *  orderNo: number,
 *  teamOrder: Array.<number>,
 *  nominates: {object},
 *  roster: boolean,
 *  rankOutput: boolean
 * }}
 */
ComponentTableLine.propTypes = {
  // @type {number} - line number: nominate orderNo と同じ
  orderNo: PropTypes.number.isRequired,
  // @type {Array<number>} - team ID を出力順に並べた配列
  teamOrder: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  nominates: PropTypes.shape({
    1: Players,
    2: Players,
    3: Players,
    4: Players,
    5: Players,
    6: Players,
    7: Players,
    8: Players,
    9: Players,
    10: Players,
    11: Players,
    12: Players,
    376: Players,
  }).isRequired,
  roster: PropTypes.bool.isRequired,
  rankOutput: PropTypes.bool,
};

/**
 * React.defaultProps
 * @type {{rankOutput: boolean}}
 */
ComponentTableLine.defaultProps = {
  rankOutput: true,
};

export default ComponentTableLine;

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 19:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Team from '../../../dae/nippon/Team';

/**
 * 選手名(nameS)を表示します
 * @param {Array.<Pitcher|Fielders>} athlete バッテリー投手・捕手別リスト
 * @returns {XML} `span`
 */
const players = athlete => (
  athlete.map((player, index) => {
    // 複数存在する時は `、`
    const comma = index > 0 ? '、' : '';
    return (
      <span key={`player-${player.backNumber}`}>
        {comma}
        <span className="name">{player.nameS}</span>
      </span>
    );
  })
);

/**
 * バッテリー
 * @param {Team} home home team
 * @param {Team} visitor visitor team
 * @constructor
 * @returns {XML} div.battery
 */
const ComponentBattery = ({ home, visitor }) => (
  <div className="battery">
    <header className="flashreport-sec-header">
      <h2>バッテリー</h2>
    </header>
    <div className="battery-body">
      <table>
        <tbody>
          {/* visitor */}
          <tr className={`team team-${visitor.info.id}`}>
            <th>{visitor.info.nameS}{/* バッテリー */}</th>
            <td>
              {players(visitor.battery.pitcher.pitchers)}
              <span className="hyphen">ー</span>
              {players(visitor.battery.catcher.fielders)}
            </td>
          </tr>
          {/* home */}
          <tr className={`team team-${home.info.id}`}>
            <th>{home.info.nameS}{/* バッテリー */}</th>
            <td>
              {players(home.battery.pitcher.pitchers)}
              <span className="hyphen">ー</span>
              {players(home.battery.catcher.fielders)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * React.propTypes
 * @type {{home: Team, visitor: Team}}
 */
ComponentBattery.propTypes = {
  home: PropTypes.instanceOf(Team).isRequired,
  visitor: PropTypes.instanceOf(Team).isRequired,
};

export default ComponentBattery;

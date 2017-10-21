/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/21 - 16:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// component
import ComponentStarterBatter from './ComponentStarterBatter';

// Table
import Table from '../Table';

// dae
// import Starter from '../../../../dae/nippon/team/Starter';
import Batters from '../../../../dae/nippon/team/Batters';

/**
 * table - スターティングメンバー・野手
 * @param {Starter} starter スターティングメンバー・野手
 * @param {*} option 野手出力項目 flag
 * @param {boolean} home home team flag
 * @returns {?XML} table.batter
 * @constructor
 */
const ComponentStarterBatters = ({ starter, option, home }) => {
  // console.log('ComponentStarterBatters starter', starter);
  if (!starter.has || !starter.batters || !starter.batters.length) {
    return null;
  }
  const which = home ? 'home' : 'visitor';
  const batters = starter.batters;
  // ----
  return (
    <table className="batter">
      <tbody>
        <tr>
          {Table.th(option.batNo, '打順', 0)}
          {Table.th(option.position, '位置', 1)}
          {Table.th(option.name, '選手名', 2)}
          {Table.th(option.battingType, '打', 3)}
          {Table.th(option.avg, '打率', 4)}
        </tr>
        {
          batters.map((batter, index) => {
            const key = `${which}-batter-${index}`;
            return (
              <ComponentStarterBatter
                key={key}
                batter={batter}
                option={option}
              />
            );
          })
        }
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    starter: Starter,
 *    option: object,
 *    home: boolean
 * }}
 */
ComponentStarterBatters.propTypes = {
  // @type {Starter}
  starter: PropTypes.instanceOf(Batters).isRequired,
  // 出力オプション
  option: PropTypes.shape({
    batNo: PropTypes.bool.isRequired,
    position: PropTypes.bool.isRequired,
    name: PropTypes.bool.isRequired,
    battingType: PropTypes.bool.isRequired,
    avg: PropTypes.bool.isRequired,
  }).isRequired,
  // @type {boolean} - true: ホームチーム
  home: PropTypes.bool.isRequired,
};

export default ComponentStarterBatters;

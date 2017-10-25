/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 21:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Table } from '../Table';
//
// // react
// const React = self.React;

import React from 'react';
import PropTypes from 'prop-types';

// Table
import Table from '../Table';

// dae
import Pitcher from '../../../../dae/nippon/team/Pitcher';

/**
 * table - 先発投手
 * @param {Pitcher} pitcher 先発投手データ
 * @param {*} option 先発投手データ出力項目 flag
 * @returns {?XML} table.pitcher
 * @constructor
 */
const ComponentStarterPitcher = ({ pitcher, option }) => {
  if (!pitcher.has) {
    return null;
  }
  // console.log('ComponentStarterPitcher pitcher', pitcher);
  // ----
  return (
    <table className="pitcher">
      <tbody>
        <tr>
          <th className="th-0">投手</th>
          <th className="th-1">位置</th>
          {Table.th(option.name, '選手名', 2)}
          {Table.th(option.pitchingArm, '投', 3)}
          {Table.th(option.era, '防御率', 4)}
        </tr>
        <tr>
          <td>先発</td>
          <td>（投）</td>
          {Table.td(option.name, pitcher.name, 'name')}
          {Table.td(option.pitchingArm, pitcher.pitchingArm)}
          {Table.td(option.era, pitcher.era)}
        </tr>
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    pitcher: Pitcher,
 *    option: object
 * }}
 */
ComponentStarterPitcher.propTypes = {
  // @type {Pitcher}
  pitcher: PropTypes.instanceOf(Pitcher).isRequired,
  // @type {{name: boolean, pitchingArm: boolean, era: boolean}}
  option: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    pitchingArm: PropTypes.bool.isRequired,
    era: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ComponentStarterPitcher;

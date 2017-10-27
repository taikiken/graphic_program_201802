/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 20:44
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
import ComponentStarter from './members/ComponentStarter';
import ComponentWarmer from './members/ComponentWarmer';

// dae
import Team from '../../../dae/nippon/Team';

/**
 * 注釈出力, props.noRecords で出力制御
 * @param {boolean} noRecords 出力 flag false: 出力します
 * @returns {?XML} p.flashreport-note or null
 */
const note = (noRecords) => {
  if (noRecords) {
    return null;
  }
  return (
    <p className="flashreport-note">※ 成績は試合開始前時点での成績です。</p>
  );
};

/**
 * スターティングメンバー、ベンチ入り選手
 * @param {Team} home home team players
 * @param {Team} visitor visitor team players
 * @param {boolean} noRecords 注釈出力フラッグ false: 出力します
 * @returns {?XML} div.js-member-root
 * @constructor
 */
const ComponentMembers = ({ home, visitor, noRecords }) => {
  const homeStarter = home.starter;
  const visitorStarter = visitor.starter;
  // 少なくとも先発メンバーがないと...
  if (!homeStarter.has || !visitorStarter.has) {
    return null;
  }
  // -------
  return (
    <div className="js-member-root">
      {/* starter */}
      <ComponentStarter
        homeStarter={homeStarter}
        visitorStarter={visitorStarter}
        home={home}
        visitor={visitor}
      />
      {/* warmer */}
      <ComponentWarmer
        homeWarmer={home.warmer}
        visitorWarmer={visitor.warmer}
        home={home}
        visitor={visitor}
      />
      {
        note(noRecords)
      }
    </div>
  );
};

/**
 * React.propTypes
 * @type {{home: Team, visitor: Team, noRecords: boolean}}
 */
ComponentMembers.propTypes = {
  // @type {Team} - response.home
  home: PropTypes.instanceOf(Team).isRequired,
  // @type {Team} - response.visitor
  visitor: PropTypes.instanceOf(Team).isRequired,
  // 戦績を表示するかしないか - @default false
  noRecords: PropTypes.bool.isRequired,
};

export default ComponentMembers;

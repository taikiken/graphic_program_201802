/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/15 - 16:07
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

// component/flash
import ComponentHeaderTeams from './live/ComponentHeaderTeams';
import ComponentTable from './live/ComponentTable';

// dae
import Teams from '../../dae/lives/Teams';

/**
 * ドラフト速報コンテナを出力する基底クラスです, `div.draft-results-body`
 * - {@link ComponentFlash}
 *   - {@link ComponentHeaderTeams}
 *   - 支配下選手
 *   - {@link ComponentTable}
 *     - {@link ComponentTableLine}
 *       - {@link ComponentTableCellRank}
 *       - {@link ComponentTableCellPlayer}
 *    - 育成枠選手
 *    - @{link ComponentTable}
 *      - {@link ComponentTableLine}
 * @param {Teams} teams React.prop - JSON 変換データ
 * @returns {?XML} `div.draft-results-body` - ドラフト速報コンテナ
 */
const ComponentFlash = ({ teams }) => (
  <div className="draft-results-body">
    {/* team header */}
    <ComponentHeaderTeams
      teams={teams.teamNames.informations}
    />
    {/* div.draft-table */}
    <ComponentTable
      teams={teams}
      teamNames={teams.teamNames}
      roster
    />
    <ComponentTable
      teams={teams}
      teamNames={teams.teamNames}
      roster={false}
    />
  </div>
);

/**
 * React.propTypes
 * @type {{teams: Teams}}
 */
ComponentFlash.propTypes = {
  teams: PropTypes.instanceOf(Teams).isRequired,
};

export default ComponentFlash;

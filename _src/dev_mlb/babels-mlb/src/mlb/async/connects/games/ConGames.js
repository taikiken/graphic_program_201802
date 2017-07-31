/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/27 - 21:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { connect } from 'react-redux';

// component
import ComOverview from '../../../component/game/ComOverview';
import ComInfo from '../../../component/game/ComInfo';
import ComScore from '../../../component/game/ComScore';


/**
 * redux state to props を map します
 * @param {*} game game state
 * @returns {*} 更新 state
 */
const mapStateToProps = ({ game }) => (game);

/**
 * mapStateToProps - {@link ComOverview}
 * @type {*}
 */
const ConOverview = connect(mapStateToProps)(ComOverview);
/**
 * mapStateToProps - {@link ComInfo}
 * @type {*}
 */
const ConInfo = connect(mapStateToProps)(ComInfo);
/**
 * mapStateToProps - {@link ComScore}
 * @type {*}
 */
const ConScore = connect(mapStateToProps)(ComScore);

/**
 * redux action - game
 * @type {{ConOverview: *, ConInfo: *, ConScore: *}}
 */
const games = {
  ConOverview,
  ConInfo,
  ConScore,
};

export default games;

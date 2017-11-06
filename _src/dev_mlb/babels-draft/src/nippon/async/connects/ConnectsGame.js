/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:25
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
import ComponentGame from '../../component/desktop/ComponentGame';
import ComponentNippon from '../../component/desktop/ComponentNippon';

// component/mobile
import SPComponentGame from '../../component/mobile/SPComponentGame';
import SPComponentFirst from '../../component/mobile/SPComponentFirst';
import SPComponentSecond from '../../component/mobile/SPComponentSecond';
import SPComponentThird from '../../component/mobile/SPComponentThird';

/**
 * redux state to prop
 * @param {*} game ajax action
 * @returns {*} redux state to props
 */
const mapStateToProps = ({ game }) => (game);

/**
 * redux connect - ComponentGame
 * @type {*}
 */
const ConnectsGame = connect(mapStateToProps)(ComponentGame);
/**
 * redux connect - ComponentNippon
 * @type {*}
 */
const ConnectsNippon = connect(mapStateToProps)(ComponentNippon);
// mobile
/**
 * redux connect - SPComponentGame
 * @type {*}
 */
const SPConnectsGame = connect(mapStateToProps)(SPComponentGame);
/**
 * redux connect - SPComponentFirst
 * @type {*}
 */
const SPConnectsFirst = connect(mapStateToProps)(SPComponentFirst);
/**
 * redux connect - SPComponentSecond
 * @type {*}
 */
const SPConnectsSecond = connect(mapStateToProps)(SPComponentSecond);
/**
 * redux connect - SPComponentThird
 * @type {*}
 */
const SPConnectsThird = connect(mapStateToProps)(SPComponentThird);

/**
 * redux connect object
 * @type {{ConnectsGame: *, ConnectsNippon: *, SPConnectsGame: *, SPConnectsFirst: *, SPConnectsSecond: *, SPConnectsThird: *}}
 */
const games = {
  ConnectsGame,
  ConnectsNippon,
  SPConnectsGame,
  SPConnectsFirst,
  SPConnectsSecond,
  SPConnectsThird,
};

export default games;

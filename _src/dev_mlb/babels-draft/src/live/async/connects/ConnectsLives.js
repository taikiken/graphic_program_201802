/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { connect } from 'react-redux';

import ComponentLives from '../../component/ComponentLives';

/**
 * react-redux - connect する live state コンバーター
 * @param {*} player redux state
 * @returns {*} redux state
 */
// const mapStateToProps = ({ live }) => {
//   console.log('mapStateToProps', live);
//   return live;
// };
const mapStateToProps = ({ live }) => (live);

/**
 * redux.connect - {@link ComponentLives}
 * @type {*}
 */
const ConnectsLives = connect(mapStateToProps)(ComponentLives);

export default ConnectsLives;

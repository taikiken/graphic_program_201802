/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/21 - 15:11
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
import ComponentDraft from '../../component/ComponentDraft';

// state to props
/**
 * react-redux - connect する schedule state コンバーター
 * @param {*} player redux state
 * @returns {*} redux state
 */
const mapStateToProps = ({ player }) => (player);
// const mapStateToProps = ({ player }) => {
//   console.log('ConnectsPlayers.mapStateToProps', player);
//   return player;
// };

/**
 * redux.connect - {@link ComponentDraft}
 * @type {*}
 */
const ConnectsPlayers = connect(mapStateToProps)(ComponentDraft);

export default ConnectsPlayers;

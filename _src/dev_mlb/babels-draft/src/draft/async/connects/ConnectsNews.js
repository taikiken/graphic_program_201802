/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 20:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { connect } from 'react-redux';

import ComponentNews from '../../component/ComponentNews';

/**
 * react-redux - connect する schedule state コンバーター
 * @param {*} player redux state
 * @returns {*} redux state
 */
const mapStateToProps = ({ news }) => (news);

/**
 * redux.connect - {@link ComponentNews}
 * @type {*}
 */
const ConnectsNews = connect(mapStateToProps)(ComponentNews);

export default ConnectsNews;

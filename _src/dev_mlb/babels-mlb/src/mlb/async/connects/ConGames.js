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
import ComOverview from '../../component/game/ComOverview';

// console.log('ConGames ComOverview', ComOverview);
// const mapStateToProps = ({ game }) => (game);
const mapStateToProps = ({ game }) => {
  console.log('ConGames.mapStateToProps', game);
  return game;
};

const ConOverview = connect(mapStateToProps)(ComOverview);

const games = {
  ConOverview,
};

export default games;

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/27 - 21:14
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

// util
import Print from '../../util/Print';

// dae
import DaeGameInfo from '../../dae/games/DaeGameInfo';

// define
import Style from '../../define/Style';

const ComOverview = ({ game }) => {
  if (!game) {
    return null;
  }
  // -----
  const teamClass = 'mlb__game__overview__team';
  const homeClass = game.home.win ? Style.WIN : '';
  const visitorClass = game.visitor.win ? Style.WIN : '';
  const statusClass = game.className;
  // render
  return (
    <div className="mlb_live__overview">
      <div className="mlb_live__overview__inner">
        <p className={`${teamClass} ${teamClass}--home ${Print.str(game.home.className)}`}>
          {Print.str(game.home.team)}
        </p>
        <div className="mlb_live__overview__info">
          <p className="mlb_live__overview__info__date">{Print.str(game.title)}</p>
          <p className="mlb_live__overview__info__score">
            <span className={`mlb__game__overview__info__score--home ${homeClass}`}>
              {Print.int(game.home.total)}
            </span>
            <span className="mlb_live__overview__info__score--vs">vs</span>
            <span className={`mlb__game__overview__info__score--visitor ${visitorClass}`}>
              {Print.int(game.visitor.total)}
            </span>
          </p>
          <p className={`mlb__game__overview__info__status ${statusClass}`}>
            {Print.str(game.label)}
          </p>
        </div>
        <p className={`${teamClass} ${teamClass}--visitor ${visitorClass}`}>
          {Print.str(game.visitor.team)}
        </p>
      </div>
    </div>
  );
};

ComOverview.propTypes = {
  game: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

export default ComOverview;

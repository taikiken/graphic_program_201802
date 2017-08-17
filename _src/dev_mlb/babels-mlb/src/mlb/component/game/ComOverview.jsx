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

/**
 * 上部スコア - data が無い時は空で出力します
 * @returns {XML} div.mlb_live__overview
 * @constructor
 * @since 2017-08-17
 * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
 */
const ComOverviewEmpty = () => {
  const teamClass = 'mlb_live__overview__team';
  // render
  return (
    <div className="mlb_live__overview">
      <div className="mlb_live__overview__inner">
        <p className={`${teamClass} ${teamClass}--home`}>
          &nbsp;
        </p>
        <div className="mlb_live__overview__info">
          <p className="mlb_live__overview__info__date">&nbsp;</p>
          <p className="mlb_live__overview__info__score">
            <span className="mlb_live__overview__info__score--home">
              &nbsp;
            </span>
            <span className="mlb_live__overview__info__score--vs">vs</span>
            <span className="mlb_live__overview__info__score--visitor">
              &nbsp;
            </span>
          </p>
          <p className="mlb_live__overview__info__status">
            &nbsp;
          </p>
          <p className="mlb_live__overview__info__place">
            &nbsp;
          </p>
        </div>
        <p className={`${teamClass} ${teamClass}--visitor`}>
          &nbsp;
        </p>
      </div>
    </div>
  );
};

/**
 * GAME: 上部対戦成績
 * @param {?DaeGameInfo} info JSON - game_info.json
 * @returns {?XML} div.mlb_live__overview
 * @constructor
 */
const ComOverview = ({ info }) => {
  // console.log('ComOverview info', info);
  if (!info) {
    // 空タグを出力する
    // @since 2017-08-17
    // @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
    return <ComOverviewEmpty />;
    // return null;
  }
  // -----
  const teamClass = 'mlb_live__overview__team';
  const homeClass = info.home.win ? Style.WIN : '';
  const visitorClass = info.visitor.win ? Style.WIN : '';
  const statusClass = info.className;
  // render
  return (
    <div className="mlb_live__overview">
      <div className="mlb_live__overview__inner">
        <p className={`${teamClass} ${teamClass}--home ${Print.str(info.home.className)}`}>
          {Print.str(info.home.jp)}
        </p>
        <div className="mlb_live__overview__info">
          <p className="mlb_live__overview__info__date">{Print.str(info.title)}</p>
          <p className="mlb_live__overview__info__score">
            <span className={`mlb_live__overview__info__score--home ${homeClass}`}>
              {Print.int(info.home.total)}
            </span>
            <span className="mlb_live__overview__info__score--vs">vs</span>
            <span className={`mlb_live__overview__info__score--visitor ${visitorClass}`}>
              {Print.int(info.visitor.total)}
            </span>
          </p>
          <p className={`mlb_live__overview__info__status ${statusClass}`}>
            {Print.str(info.label)}
          </p>
          <p className="mlb_live__overview__info__place">
            {Print.str(info.stadium)}
          </p>
        </div>
        <p className={`${teamClass} ${teamClass}--visitor ${visitorClass}`}>
          {Print.str(info.visitor.jp)}
        </p>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @type {{info: *}}
 */
ComOverview.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo),
};

/**
 * defaultProps
 * @type {{info: ?DaeGameInfo}}
 */
ComOverview.defaultProps = {
  info: null,
};

export default ComOverview;

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/26 - 21:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// dae/schedule
import { DaeLeagues, DaeSeasons, DaeGames, DaeGame } from '../../../dae/schedule/DaeSchedule';

// util
import Print from '../../../util/Print';

// ----------------------------------------
// 各ゲーム
// ----------------------------------------
const teamClass = 'mlb__game__overview__team';

const ComGame = ({ game }) => {
  const homeClass = game.home.win ? '.mlb__game__result--win' : '';
  const visitorClass = game.visitor.win ? '.mlb__game__result--win' : '';
  const statusClass = game.className;
  return (
    <div className="mlb__game__overview">
      <p className={`${teamClass} ${teamClass}--home ${Print.str(game.home.className)}`}>
        {Print.str(game.home.team)}
      </p>
      <div className="mlb__game__overview__info">
        <p className="mlb__game__overview__info__place">
          {Print.str(game.stadium)}
        </p>
        <p className="mlb__game__overview__info__score">
          <span className={`mlb__game__overview__info__score--home ${homeClass}`}>
            {Print.int(game.home.score)}
          </span>
          <span className="mlb__game__overview__info__score--vs">-</span>
          <span className={`mlb__game__overview__info__score--visitor ${visitorClass}`}>
            {Print.int(game.visitor.score)}
          </span>
        </p>
        <p className={`mlb__game__overview__info__status ${statusClass}`}>
          {Print.str(game.label)}
        </p>
      </div>
      <p
        className={`mlb__game__overview__team mlb__game__overview__team--visitor ${visitorClass}`}
      >
        {Print.str(game.visitor.team)}
      </p>
    </div>
  );
};

ComGame.propTypes = {
  game: PropTypes.instanceOf(DaeGame).isRequired,
};

// ----------------------------------------
// 各リーグ list 処理
// ----------------------------------------
const ComGames = ({ games }) => {
  if (!games.has()) {
    return null;
  }
  return (
    <div className="game-container">
      <h3 className="mlb__schedule__result__heading">{games.title}</h3>
      {
        games.list.map(game => <ComGame key={`game-${game.id}`} game={game} />)
      }
    </div>
  );
};

ComGames.propTypes = {
  games: PropTypes.instanceOf(DaeGames).isRequired,
};

// ----------------------------------------
// 各シーズン list 処理
// ----------------------------------------
const ComSeasons = ({ leagues }) => (
  <div className="mlb__schedule__result__container">
    {
      leagues.list.map(games => <ComGames key={`${games.season}-${games.league}`} games={games} />)
    }
  </div>
);

ComSeasons.propTypes = {
  leagues: PropTypes.instanceOf(DaeLeagues).isRequired,
};

// ----------------------------------------
// 日程・結果
// ----------------------------------------
export default class ComScheduleList extends Component {
  static propTypes = {
    seasons: PropTypes.instanceOf(DaeSeasons).isRequired,
    team: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      type: props.type,
    };
  }
  render() {
    return (
      <div className="mlb__schedule__result__section">
        {
          this.props.seasons.list.map((season) => {
            // @type {DaeLeagues}
            const leagues = this.props.seasons.leagues(season);
            if (!leagues.enable) {
              return null;
            }
            console.log('ComScheduleList leagues', leagues);
            return (
              <ComSeasons
                key={`season-${leagues.key}`}
                leagues={leagues}
              />
            );
          })
        }
      </div>
    );
  }
}

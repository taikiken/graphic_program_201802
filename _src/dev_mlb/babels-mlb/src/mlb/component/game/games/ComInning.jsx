/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:07
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

// dae
import DaeInnings, { DaeEvent, DaeInningTeam } from '../../../dae/games/DaeInnings';

// util
import Print from '../../../util/Print';

const ComInningsBody = ({ event, type }) => {
  // TODO score, 対戦相手のスコア表示方法を考える
  let homeScore = '';
  let visitorScore = '';
  if (type === 'home') {
    homeScore = Print.int(event.score);
  } else if (type === 'visitor') {
    visitorScore = Print.int(event.score);
  }
  return (
    <tr>
      <td className="mlb_live__inning__td--lineup">&nbsp;</td>
      <td className="mlb_live__inning__td--play">
        <span className="mlb_live__inning__player">
          {Print.str(event.batter)}
        </span>
        <span className="mlb_live__inning__action">
          {Print.str(event.result)}
        </span>
      </td>
      <td className="mlb_live__inning__td--out">
        {Print.int(event.out)}
      </td>
      <td className="mlb_live__inning__td--score--home">{homeScore}</td>
      <td className="mlb_live__inning__td--score--visitor">{visitorScore}</td>
    </tr>
  );
};

ComInningsBody.propTypes = {
  event: PropTypes.instanceOf(DaeEvent).isRequired,
  type: PropTypes.string.isRequired,
};

const ComInningsHead = ({ pitcher }) => (
  <thead>
    <tr>
      <th className="mlb_live__inning__th--pitcher" colSpan={2}>
        ピッチャー
        <span className="mlb_live__inning__pitcher_name">
          {Print.str(pitcher)}
        </span>
      </th>
      <th className="mlb_live__inning__th--out">アウト</th>
      <th className="mlb_live__inning__th--score" colSpan={2}>スコア</th>
    </tr>
  </thead>
);

ComInningsHead.propTypes = {
  pitcher: PropTypes.string.isRequired,
};

const ComInningsEvent = ({ type, team, inning }) => {
  let pitcher = '';
  return (
    <div className={`mlb_live__inning__container mlb_live__inning--${type}`}>
      <h2 className="mlb_live__inning__heading">
        {Print.str(team.title)}
      </h2>
      <table className="mlb_live__inning">
        {
          team.events.opposite.map((event, index) => {
            const count = index + 1;
            if (event.pitcher && event.pitcher !== pitcher) {
              pitcher = event.pitcher;
              return (
                <ComInningsHead
                  key={`${type}-${count}-head-${inning}-${event.out}-${event.score}`}
                  pitcher={pitcher}
                />
              );
            }
            if (!event.batter) {
              return null;
            }
            return (
              <tbody key={`${type}-${count}-body-${inning}-${event.out}-${event.score}`}>
                <ComInningsBody
                  event={event}
                  type={type}
                />
              </tbody>
            );
          })
        }
      </table>
    </div>
  );
};

ComInningsEvent.propTypes = {
  type: PropTypes.string.isRequired,
  team: PropTypes.instanceOf(DaeInningTeam).isRequired,
  inning: PropTypes.number.isRequired,
};

const ComInningsEvents = ({ events, inning }) => {
  // home -> visitor
  // 3out -> 0out
  const home = events.home;
  const visitor = events.visitor;
  return (
    <div className="js-events-container">
      <ComInningsEvent
        type="home"
        team={home}
        inning={inning}
      />
      <ComInningsEvent
        type="visitor"
        team={visitor}
        inning={inning}
      />
    </div>
  );
};

ComInningsEvents.propTypes = {
  events: PropTypes.shape({
    home: PropTypes.instanceOf(DaeInningTeam).isRequired,
    visitor: PropTypes.instanceOf(DaeInningTeam).isRequired,
  }).isRequired,
  inning: PropTypes.number.isRequired,
};

// ----------------------------------------
// イニング速報
// ----------------------------------------
const ComInning = ({ innings }) => {
  const events = innings.opposite;
  console.log('ComInning events', innings, events);
  // render
  return (
    <div className="mlb_live__inning__section">
      {
        events.map(inning => (
          <ComInningsEvents
            key={`innings-${inning}`}
            events={innings.board[inning]}
            inning={inning}
          />
        ))
      }
    </div>
  );
};

ComInning.propTypes = {
  innings: PropTypes.instanceOf(DaeInnings).isRequired,
};

export default ComInning;

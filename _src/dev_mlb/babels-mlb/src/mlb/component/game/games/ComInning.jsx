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
import DaeGameInfo from '../../../dae/games/DaeGameInfo';

// util
import Print from '../../../util/Print';

const ComInningsBody = ({ event, type, info, inning }) => {
  // TODO score, 対戦相手のスコア表示方法を考える
  let homeScore = '';
  let visitorScore = '';
  if (type === 'home') {
    homeScore = Print.int(event.score);
    visitorScore = info.visitor.board.scores.score[inning].total;
  } else if (type === 'visitor') {
    visitorScore = Print.int(event.score);
    if (inning === 1) {
      homeScore = '0';
    } else {
      homeScore = info.home.board.scores.score[inning - 1].total;
    }
  }
  return (
    <tbody>
      <tr className={`body-${event.id}`}>
        <td className="mlb_live__inning__td--lineup">
          <span>{Print.int(event.index)}</span>
        </td>
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
    </tbody>
  );
};

ComInningsBody.propTypes = {
  event: PropTypes.instanceOf(DaeEvent).isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  inning: PropTypes.number.isRequired,
};

const ComInningsHead = ({ pitcher, id, event }) => (
  <thead className={id} data-result={event.result}>
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
  id: PropTypes.string.isRequired,
  event: PropTypes.instanceOf(DaeEvent).isRequired,
};

const inningsHead = (inning, event, pitcher, count) => (
  <ComInningsHead
    key={`head-${inning}-${event.id}-${count}`}
    pitcher={pitcher}
    id={event.id}
    event={event}
  />
);

const inningsBody = (inning, event, type, info, count) => (
  <ComInningsBody
    key={`body-${inning}-${event.id}-${count}`}
    event={event}
    type={type}
    info={info}
    inning={inning}
  />
);

const ComInningsEvent = ({ type, team, inning, info }) => {
  // console.log('ComInningsEvent', type, inning, info.innings, info.home.win, info.home.board.scores.score[inning]);
  if (
    type === 'home' &&
    inning === info.innings &&
    info.home.win &&
    info.home.board.scores.score[inning].score === 0
  ) {
    return null;
  }
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
            const elements = [];
            if (event.pitcher && event.pitcher !== pitcher) {
              pitcher = event.pitcher;
              // return (
              //   <ComInningsHead
              //     key={`head-${inning}-${event.id}`}
              //     pitcher={pitcher}
              //     id={event.id}
              //   />
              // );
              elements.push(inningsHead(inning, event, pitcher, count));
            }
            if (event.batter) {
              elements.push(inningsBody(inning, event, type, info, count));
            }
            if (!elements.length) {
              elements.push(null);
            }
            return elements.map(element => (element));
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
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

const ComInningsEvents = ({ events, inning, info }) => {
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
        info={info}
      />
      <ComInningsEvent
        type="visitor"
        team={visitor}
        inning={inning}
        info={info}
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
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// イニング速報
// ----------------------------------------
const ComInning = ({ innings, info }) => {
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
            info={info}
          />
        ))
      }
    </div>
  );
};

ComInning.propTypes = {
  innings: PropTypes.instanceOf(DaeInnings).isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

export default ComInning;

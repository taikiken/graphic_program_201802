/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/22 - 14:15
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

// dae/schedule
import DaeSchedule from '../../dae/schedule/DaeSchedule';

import ComJapanese from './node/ComJapanese';

// // dae/player
// import DaeBatting from '../../dae/player/DaeBatting';
// import DaePitching from '../../dae/player/DaePitching';
//
// // util
// import Day from '../../util/Day';
// import Print from '../../util/Print';
//
// // ----------------------------------------
// // section.mlb__today_jp
// // ----------------------------------------
// const ComBatting = ({ player }) => (
//   <tr>
//     <th className="mlb__today_jp__record__th">成績</th>
//     <td className="mlb__today_jp__record__td">打率：{Print.str(player.average)}</td>
//     <td className="mlb__today_jp__record__td">{Print.int(player.bats)}打数{Print.int(player.hits)}安打</td>
//     <td className="mlb__today_jp__record__td">{Print.int(player.run)}打点</td>
//   </tr>
// );
//
// ComBatting.propTypes = {
//   player: PropTypes.instanceOf(DaeBatting).isRequired,
// };
//
// const ComPitching = ({ player }) => (
//   <tr>
//     <th className="mlb__today_jp__record__th">成績</th>
//     <td className="mlb__today_jp__record__td">防御率：{Print.str(player.average)}</td>
//     <td className="mlb__today_jp__record__td">投球数：{Print.int(player.pitched)}</td>
//     <td className="mlb__today_jp__record__td">失点：{Print.int(player.ra)}</td>
//   </tr>
// );
//
// ComPitching.propTypes = {
//   player: PropTypes.instanceOf(DaePitching).isRequired,
// };
//
// const ComPlayer = ({ player }) => {
//   console.log('ComJaPlayer player', player);
//   const batting = player.type === 'batting';
//   const ComType = batting ? ComBatting : ComPitching;
//   const comStats = batting ? player.batting : player.pitching;
//   return (
//     <div className="mlb_jp_stats">
//       <div className="mlb__today_jp__player">
//         <h3 className="mlb__today_jp__player__name">{Print.str(player.player)}</h3>
//         <dl className="mlb__today_jp__player__profile">
//           <dt className="mlb__today_jp__player__profile__team">{Print.str(player.team)}</dt>
//           <dd className="mlb__today_jp__player__profile__uniform_num">
//             背番号<span>{Print.int(player.number)}</span>
//           </dd>
//         </dl>
//       </div>
//       {/* 成績 */}
//       <div className="mlb__today_jp__record__container">
//         <table className="mlb__today_jp__record">
//           <tbody>
//             <ComType
//               player={comStats}
//             />
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
//
// ComPlayer.propTypes = {
//   player: PropTypes.instanceOf(DaeJapanesePlayer).isRequired,
// };
//
// const ComGame = ({ game }) => {
//   if (!game.players.has()) {
//     return null;
//   }
//   console.log('ComGame game', game);
//   // const elements = game.players.list.map((player) => {
//   //   console.log('ComGame player', player);
//   //   return (
//   //     <ComPlayer
//   //       key={player.id}
//   //       player={player}
//   //     />
//   //   );
//   // });
//   // console.log('ComGame elements', elements);
//   // return elements;
//   // return null;
//   return (
//     <div className="com-player-container">
//       {
//         game.players.list.map(player => (
//           <ComPlayer
//             key={`japanese-${player.id}`}
//             player={player}
//           />
//         ))
//       }
//       <div className="mlb__game__overview">
//         <p className="mlb__game__overview__team mlb__game__overview__team--home">
//           {Print.str(game.home.team)}
//         </p>
//         <div className="mlb__game__overview__info">
//           <p className="mlb__game__overview__info__place">
//             {Print.str(game.stadium)}
//           </p>
//           <p className="mlb__game__overview__info__score">
//             <span className="mlb__game__overview__info__score--home">
//               {Print.int(game.home.score)}
//             </span>
//             <span className="mlb__game__overview__info__score--vs">-</span>
//             <span className="mlb__game__overview__info__score--visitor">
//               {Print.int(game.visitor.score)}
//             </span>
//           </p>
//           <p className="mlb__game__overview__info__status">
//             {Print.str(game.label)}
//           </p>
//         </div>
//         <p className="mlb__game__overview__team mlb__game__overview__team--visitor">
//           {Print.str(game.visitor.team)}
//         </p>
//       </div>
//     </div>
//   );
// };
//
// ComGame.propTypes = {
//   game: PropTypes.instanceOf(DaeGame).isRequired,
// };
//
//
// const ComJapanese = ({ japanese, date }) => {
//   if (!japanese.has()) {
//     return null;
//   }
//   console.log('ComJapanese japanese', japanese, date);
//   return (
//     <section className="mlb__today_jp">
//       <h2 className="mlb__today_jp__heading">{Day.title(date)}に出場した日本人選手</h2>
//       {
//         japanese.list.map(game => (
//           <ComGame
//             key={`${game.id}-${game.status}`}
//             game={game}
//           />
//         ))
//       }
//     </section>
//   );
// };
//
// ComJapanese.propTypes = {
//   japanese: PropTypes.instanceOf(DaeJapanese).isRequired,
//   date: PropTypes.shape({
//     year: PropTypes.number.isRequired,
//     month: PropTypes.number.isRequired,
//     day: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default class ComScheduleMam extends Component {
//   static propTypes = {
//     schedule: PropTypes.instanceOf(DaeSchedule),
//     date: PropTypes.shape({
//       year: PropTypes.number,
//       month: PropTypes.number,
//       day: PropTypes.number,
//     }),
//   };
//   static defaultProps = {
//     schedule: null,
//     date: null,
//   };
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       team: 'all',
//       league: 'all',
//     };
//   }
//   render() {
//     if (!this.props.schedule || !this.props.date) {
//       return null;
//     }
//     return (
//       <div className="index-container">
//         <ComJapanese
//           japanese={this.props.schedule.japanese}
//           date={this.props.date}
//         />
//       </div>
//     );
//   }
// }

const ComScheduleMam = ({ schedule, date }) => {
  if (!schedule || !date) {
    return null;
  }
  // render
  return (
    <div className="index-container">
      <ComJapanese
        japanese={schedule.japanese}
        date={date}
      />
    </div>
  );
};

ComScheduleMam.propTypes = {
  schedule: PropTypes.instanceOf(DaeSchedule),
  date: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

ComScheduleMam.defaultProps = {
  schedule: null,
  date: null,
};

export default ComScheduleMam;
